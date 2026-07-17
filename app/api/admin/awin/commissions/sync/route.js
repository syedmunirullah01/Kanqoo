// app/api/admin/awin/commissions/sync/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Merchant from '@/models/Merchant';
import { fetchProgrammeDetails } from '@/lib/networks/awin/client';
import { normalizeProgrammeDetails } from '@/lib/networks/awin/normalizer';

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 20;
const DEFAULT_REFRESH_HOURS = 24;

function getCredentials() {
  const oauthToken = process.env.AWIN_OAUTH_TOKEN || process.env.AWIN_ACCESS_TOKEN;
  const publisherId = process.env.AWIN_PUB_ID || process.env.AWIN_PUBLISHER_ID;

  if (!oauthToken) {
    throw new Error('Missing Awin OAuth token. Please define AWIN_OAUTH_TOKEN or AWIN_ACCESS_TOKEN.');
  }

  if (!publisherId) {
    throw new Error('Missing Awin Publisher ID. Please define AWIN_PUB_ID or AWIN_PUBLISHER_ID.');
  }

  return {
    oauthToken: oauthToken.trim(),
    publisherId: publisherId.trim(),
  };
}

function parsePositiveInt(value, fallback) {
  const n = Number.parseInt(String(value || ''), 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function getBatchLimit(request) {
  const { searchParams } = new URL(request.url);
  const fromQuery = searchParams.get('limit');
  const fromEnv = process.env.AWIN_COMMISSION_SYNC_LIMIT;
  return Math.min(parsePositiveInt(fromQuery || fromEnv, DEFAULT_LIMIT), MAX_LIMIT);
}

function getRefreshCutoff(request) {
  const { searchParams } = new URL(request.url);
  const force = searchParams.get('force') === '1' || searchParams.get('force') === 'true';
  if (force) return null;

  const refreshHours = parsePositiveInt(
    searchParams.get('refreshHours') || process.env.AWIN_COMMISSION_REFRESH_HOURS,
    DEFAULT_REFRESH_HOURS,
  );

  return new Date(Date.now() - refreshHours * 60 * 60 * 1000);
}

function buildMerchantQuery(cutoff) {
  const base = {
    network: 'awin',
    mid: { $exists: true, $ne: '' },
  };

  if (!cutoff) return base;

  return {
    ...base,
    $or: [
      { commissionLastFetchedAt: { $exists: false } },
      { commissionLastFetchedAt: null },
      { commissionLastFetchedAt: { $lt: cutoff } },
    ],
  };
}

async function syncOneMerchant(merchant, credentials) {
  const advertiserId = String(merchant.mid || '').trim();
  if (!advertiserId) {
    return { mid: advertiserId, success: false, error: 'Missing merchant mid' };
  }

  const detail = await fetchProgrammeDetails(advertiserId, credentials);
  const normalized = detail ? normalizeProgrammeDetails(detail) : null;

  if (!normalized) {
    await Merchant.updateOne(
      { _id: merchant._id },
      {
        $set: {
          commissionLastFetchedAt: new Date(),
          lastEnrichedAt: new Date(),
        },
      },
    );

    return { mid: advertiserId, success: false, error: 'No programme details returned' };
  }

  const update = {
    commission: normalized.commission || merchant.commission || 'N/A',
    returnDays: normalized.returnDays || merchant.returnDays || '',
    averagePaymentTime: normalized.averagePaymentTime || merchant.averagePaymentTime || '',
    partnershipStatus: normalized.partnershipStatus || merchant.partnershipStatus || 'Joined',
    canPartner: normalized.canPartner ?? merchant.canPartner,
    isEnriched: true,
    commissionLastFetchedAt: new Date(),
    lastEnrichedAt: new Date(),
  };

  // Keep useful enriched metadata if Awin details returned it.
  if (normalized.description) update.description = normalized.description;
  if (normalized.url) update.url = normalized.url;
  if (normalized.logoUrl) update.logoUrl = normalized.logoUrl;
  if (Array.isArray(normalized.categories) && normalized.categories.length) update.categories = normalized.categories;
  if (Array.isArray(normalized.shipsTo) && normalized.shipsTo.length) update.shipsTo = normalized.shipsTo;
  if (normalized.country) update.country = normalized.country;
  if (normalized.raw) update.rawDetails = normalized.raw;

  await Merchant.updateOne(
    { _id: merchant._id },
    { $set: update },
  );

  return {
    mid: advertiserId,
    name: merchant.name,
    success: true,
    commission: update.commission,
    averagePaymentTime: update.averagePaymentTime,
  };
}

export async function POST(request) {
  try {
    await dbConnect();

    const credentials = getCredentials();
    const limit = getBatchLimit(request);
    const cutoff = getRefreshCutoff(request);
    const query = buildMerchantQuery(cutoff);

    const merchants = await Merchant.find(query)
      .select('_id mid name commission returnDays averagePaymentTime partnershipStatus canPartner commissionLastFetchedAt')
      .sort({ commissionLastFetchedAt: 1, lastSyncedAt: 1, createdAt: 1 })
      .limit(limit)
      .lean();

    const results = [];
    for (const merchant of merchants) {
      try {
        const result = await syncOneMerchant(merchant, credentials);
        results.push(result);
      } catch (error) {
        console.error(`[AwinCommissionSync] Failed for merchant ${merchant.mid}:`, error.message);
        results.push({
          mid: String(merchant.mid || ''),
          name: merchant.name,
          success: false,
          error: error.message,
        });
      }
    }

    const updated = results.filter((item) => item.success).length;
    const failed = results.length - updated;
    const remaining = await Merchant.countDocuments(query);

    return NextResponse.json({
      success: true,
      network: 'awin',
      limit,
      processed: results.length,
      updated,
      failed,
      remaining,
      refreshCutoff: cutoff?.toISOString?.() || null,
      results,
      message: results.length
        ? `Awin commission sync processed ${results.length} merchants.`
        : 'No Awin merchants need commission refresh right now.',
    });
  } catch (error) {
    console.error('Awin commission sync failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  return POST(request);
}
