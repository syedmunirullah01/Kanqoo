// app/api/publisher/marketplace/deep-links/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Merchant from '@/models/Merchant';
import User from '@/models/User';
import adapterManager from '@/lib/adapters/adapter-manager';
import { getRakutenAccessToken } from '@/lib/rakuten-auth';
import { generateAwinTrackingLink } from '@/lib/networks/awin/linkBuilder';
import Link from '@/models/Link';

function isNumericString(s) {
  return typeof s === 'string' && /^\d+$/.test(s.trim());
}

function hostnameOf(u) {
  try {
    return new URL(u).hostname.replace(/^www\./i, '').toLowerCase();
  } catch {
    return '';
  }
}

function getRootDomain(hostname) {
  if (!hostname) return '';
  const parts = hostname.split('.');
  return parts.slice(-2).join('.');
}

function getBaseUrl(request) {
  const envUrl =
    process.env.BASE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXTAUTH_URL ||
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
    process.env.RAILWAY_STATIC_URL;

  if (envUrl) return envUrl.replace(/\/$/, '');

  const host = request.headers.get('host');
  const protoHeader = request.headers.get('x-forwarded-proto');
  const proto = protoHeader || (host && host.includes('localhost') ? 'http' : 'https');
  return host ? `${proto}://${host}` : 'https://example.com';
}

function ensureUrlScheme(value) {
  const trimmed = (value || '').trim();
  if (!trimmed) return '';
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function normalizeNetwork(value) {
  const normalized = String(value || '').trim().toLowerCase();
  return ['rakuten', 'awin'].includes(normalized) ? normalized : '';
}

function isApprovedMerchant(merchant) {
  const status = String(merchant?.partnershipStatus || merchant?.status || '').toLowerCase();
  if (['approved', 'active', 'partner', 'joined'].some((value) => status.includes(value))) return true;
  if (merchant?.canPartner === true && merchant?.network === 'awin') return true;
  return false;
}

async function findApprovedMerchant({ merchantId, urlHost, network }) {
  const networkFilter = network ? { network } : { network: { $in: ['rakuten', 'awin'] } };
  let merchant = null;

  if (merchantId && isNumericString(merchantId)) {
    merchant = await Merchant.findOne({
      ...networkFilter,
      $or: [
        { mid: String(merchantId) },
        { merchantId: String(merchantId) },
        { merchant_id: String(merchantId) },
        { id: String(merchantId) },
      ],
    }).lean();
  }

  if (!merchant && urlHost) {
    merchant = await Merchant.findOne({
      ...networkFilter,
      $or: [
        { url: { $regex: urlHost, $options: 'i' } },
        { 'raw.url': { $regex: urlHost, $options: 'i' } },
        { 'raw.displayUrl': { $regex: urlHost, $options: 'i' } },
        { 'raw.programmeInfo.displayUrl': { $regex: urlHost, $options: 'i' } },
        { programUrl: { $regex: urlHost, $options: 'i' } },
        { landingPage: { $regex: urlHost, $options: 'i' } },
      ],
    }).lean();
  }

  if (!merchant || !isApprovedMerchant(merchant)) return null;
  return merchant;
}

async function generateRakutenLink({ merchant, mid, normalizedUrl, u1 }) {
  const { accessToken: bearerToken } = await getRakutenAccessToken();
  const adapter = adapterManager.getAdapter('rakuten');

  return adapter.generateDeepLink(
    { bearerToken },
    {
      url: normalizedUrl,
      advertiserId: mid,
      u1,
    },
  );
}

async function generateAwinLink({ merchant, mid, normalizedUrl, publisher, sourceUrl }) {
  const result = await generateAwinTrackingLink({
    advertiserId: mid,
    destinationUrl: normalizedUrl || merchant.url,
    publisher,
    sourceUrl,
  });

  if (!result.trackingUrl) {
    const error = new Error('Awin did not return a tracking URL for this advertiser.');
    error.code = 'SERVER_ERROR';
    throw error;
  }

  return {
    advertiserId: mid,
    advertiserName: merchant.name,
    advertiserUrl: merchant.url,
    deepLinkUrl: result.trackingUrl,
    originalUrl: normalizedUrl,
    u1: result.parameters?.clickref || null,
    trackingParams: result.parameters || {},
    raw: result.raw,
  };
}

export async function POST(req) {
  let body = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON in request body.' }, { status: 400 });
  }

  const rawUrl = (body?.url || '').trim();
  const explicitMerchantId = (body?.merchantId ?? body?.advertiserId ?? body?.mid ?? '').toString().trim();
  const requestedNetwork = normalizeNetwork(body?.network);
  const requestSourceUrl = (body?.sourceUrl || body?.subpublisherUrl || '').trim();

  if (!rawUrl) {
    return NextResponse.json({ success: false, error: 'Product or merchant URL is required.' }, { status: 400 });
  }

  const normalizedUrl = ensureUrlScheme(rawUrl);
  try {
    new URL(normalizedUrl);
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid URL format. Please enter a complete URL.' }, { status: 400 });
  }

  if (explicitMerchantId && !isNumericString(explicitMerchantId)) {
    return NextResponse.json({ success: false, error: 'Invalid merchant ID format. Merchant ID must be numeric.' }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Authentication required. Please log in.' }, { status: 401 });
  }

  await dbConnect();
  const publisher = await User.findById(session.user.id).lean();
  if (!publisher) {
    return NextResponse.json({ success: false, error: 'Publisher account not found.' }, { status: 404 });
  }

  const subpublisherUrl = requestSourceUrl || publisher.links?.[0] || publisher.website || '';
  const resolvedSourceUrl = subpublisherUrl ? ensureUrlScheme(subpublisherUrl) : '';
  const sourceDomain = hostnameOf(resolvedSourceUrl);

  let u1 = String(publisher.pubId || publisher._id);
  if (u1.length > 256) u1 = u1.slice(0, 256);
  const affiliateId = publisher._id;
  const urlHost = hostnameOf(normalizedUrl);

  const merchant = await findApprovedMerchant({
    merchantId: explicitMerchantId,
    urlHost: explicitMerchantId ? undefined : urlHost,
    network: requestedNetwork,
  });

  if (!merchant) {
    return NextResponse.json(
      { success: false, error: 'Merchant is not approved or not found. Please ensure you have an active partnership with this merchant.' },
      { status: 403 },
    );
  }

  const network = normalizeNetwork(merchant.network) || requestedNetwork || 'rakuten';
  const mid = String(merchant.mid || merchant.merchantId || merchant.merchant_id || merchant.id || '').trim();

  if (!isNumericString(mid)) {
    return NextResponse.json({ success: false, error: 'Merchant configuration error. Please contact support.' }, { status: 500 });
  }

  const merchantHost = hostnameOf(merchant.url);
  if (merchantHost && urlHost) {
    const urlRootDomain = getRootDomain(urlHost);
    const merchantRootDomain = getRootDomain(merchantHost);

    if (urlRootDomain && merchantRootDomain && urlRootDomain !== merchantRootDomain) {
      return NextResponse.json(
        {
          success: false,
          error: `The URL domain "${urlHost}" doesn't match merchant "${merchant.name}" (${merchantHost}). Please use a URL from the merchant's website.`,
          details: { providedDomain: urlHost, expectedDomain: merchantHost, merchantName: merchant.name },
        },
        { status: 400 },
      );
    }
  }

  const baseUrl = getBaseUrl(req);

  try {
    const existingLink = await Link.findOne({
      affiliateId,
      merchantId: mid,
      networkName: network,
      destinationUrl: normalizedUrl,
      isActive: true,
    }).lean();

    if (existingLink) {
      const cloakedUrl = `${baseUrl}/go/${existingLink.shortId}`;
      return NextResponse.json({
        success: true,
        data: {
          advertiserId: mid,
          advertiserName: merchant.name,
          advertiserUrl: merchant.url,
          deepLinkUrl: existingLink.originalUrl,
          cloakedUrl,
          originalUrl: normalizedUrl,
          u1,
          network,
          isExisting: true,
        },
      });
    }
  } catch (error) {
    console.error('Error checking existing publisher links:', error);
  }

  try {
    const generated = network === 'awin'
      ? await generateAwinLink({ merchant, mid, normalizedUrl, publisher, sourceUrl: resolvedSourceUrl })
      : await generateRakutenLink({ merchant, mid, normalizedUrl, u1 });

    const trackingParams = network === 'awin' ? {
      ...generated.trackingParams,
      campaign: generated.trackingParams.campaign,
      clickref: generated.trackingParams.clickref,
      clickref2: generated.trackingParams.clickref2,
      clickref3: generated.trackingParams.clickref3,
      clickref4: generated.trackingParams.clickref4,
      clickref5: generated.trackingParams.clickref5,
      clickref6: generated.trackingParams.clickref6,
      sourceUrl: resolvedSourceUrl || undefined,
      sourceDomain: sourceDomain || undefined,
      subpublisherId: generated.trackingParams.clickref,
      subpublisherUrl: resolvedSourceUrl || undefined,
    } : (u1 ? { u1 } : {});

    const newLink = await Link.create({
      originalUrl: generated.deepLinkUrl,
      affiliateId,
      merchantId: mid,
      networkName: network,
      destinationUrl: normalizedUrl,
      trackingParams,
      merchantInfo: {
        name: merchant.name,
        category: merchant.categories?.[0] || undefined,
        network,
      },
    });

    const cloakedUrl = `${baseUrl}/go/${newLink.shortId}`;

    return NextResponse.json({
      success: true,
      data: {
        advertiserId: generated.advertiserId || mid,
        advertiserName: generated.advertiserName || merchant.name,
        advertiserUrl: generated.advertiserUrl || merchant.url,
        deepLinkUrl: generated.deepLinkUrl,
        cloakedUrl,
        originalUrl: normalizedUrl,
        u1: generated.u1 || u1,
        network,
        isExisting: false,
      },
    });
  } catch (error) {
    console.error('POST /api/publisher/marketplace/deep-links error:', error);

    const status = error?.statusCode || error?.status || 500;
    const message = error?.message || 'Failed to generate affiliate link.';
    const lower = message.toLowerCase();

    let userMessage = message;
    if (lower.includes('rate limit')) userMessage = 'Too many requests. Please wait a moment and try again.';
    if (lower.includes('auth') || lower.includes('unauthorized')) userMessage = 'Authentication failed. Please refresh network credentials.';
    if (lower.includes('deeplink') || lower.includes('deep link')) userMessage = `${merchant.name} does not allow deep link generation for this URL.`;

    return NextResponse.json({
      success: false,
      error: userMessage,
      errorCode: error?.code || null,
      details: process.env.NODE_ENV === 'development' ? {
        originalError: message,
        merchantId: mid,
        merchantName: merchant.name,
        network,
        url: normalizedUrl,
      } : undefined,
    }, { status });
  }
}
