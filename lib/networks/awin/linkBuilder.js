// lib/networks/awin/linkBuilder.js
import { getAwinCredentials } from './client';

const DEFAULT_AWIN_API_BASE_URL = 'https://api.awin.com';
const DEEPLINK_ERROR_MESSAGE = 'This advertiser does not allow Awin deeplink/tracking link generation.';

function getConfig(credentials = {}) {
  const base = getAwinCredentials(credentials);
  return {
    ...base,
    apiBaseUrl: (process.env.AWIN_API_BASE_URL || base.apiBaseUrl || DEFAULT_AWIN_API_BASE_URL).replace(/\/+$/, ''),
  };
}

function validateAdvertiserId(advertiserId) {
  if (advertiserId === undefined || advertiserId === null || advertiserId === '') {
    throw new Error('advertiserId is required.');
  }

  const numericId = Number(advertiserId);
  if (!Number.isFinite(numericId)) {
    throw new Error('advertiserId must be numeric.');
  }

  return numericId;
}

function validateDestinationUrl(destinationUrl) {
  if (destinationUrl === undefined || destinationUrl === null || destinationUrl === '') {
    return undefined;
  }

  let value = String(destinationUrl).trim();
  if (!/^https?:\/\//i.test(value)) {
    value = `https://${value.replace(/^\/+/, '')}`;
  }

  const parsed = new URL(value);
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('destinationUrl must be a valid http or https URL.');
  }

  return parsed.toString();
}

function cleanDomainOrUrl(urlStr) {
  if (!urlStr) return '';
  let clean = urlStr.trim();
  if (!/^https?:\/\//i.test(clean)) {
    clean = `https://${clean}`;
  }
  try {
    const parsed = new URL(clean);
    return parsed.hostname.replace(/^www\./i, '').toLowerCase();
  } catch {
    return clean.slice(0, 250);
  }
}

export function getAwinTrackingParameters(publisher, sourceUrl, additionalParams = {}) {
  if (!publisher?._id) {
    throw new Error('publisher._id is required.');
  }

  const resolvedUrl = sourceUrl || publisher.links?.[0] || publisher.website || '';
  const domain = cleanDomainOrUrl(resolvedUrl);

  const params = {
    campaign: (process.env.AWIN_CAMPAIGN_NAME || 'kanqoo').slice(0, 250),
    clickref: String(publisher.pubId || publisher._id).slice(0, 250),
    clickref2: domain.slice(0, 250),
    clickref3: String(publisher.userType || publisher.role || 'publisher').slice(0, 250),
  };

  if (additionalParams?.clickref4) params.clickref4 = String(additionalParams.clickref4).slice(0, 250);
  if (additionalParams?.clickref5) params.clickref5 = String(additionalParams.clickref5).slice(0, 250);
  if (additionalParams?.clickref6) params.clickref6 = String(additionalParams.clickref6).slice(0, 250);

  return params;
}

function buildAwinUrl(path, config) {
  const url = new URL(`${config.apiBaseUrl}/publishers/${config.publisherId}/linkbuilder/${path}`);
  url.searchParams.set('accessToken', config.token);
  return url.toString();
}

async function readAwinResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json().catch(() => null);
  }
  return response.text().catch(() => '');
}

function sanitizeBody(body, token) {
  if (!body) return body;
  const serialized = typeof body === 'string' ? body : JSON.stringify(body);
  return serialized.replaceAll(token, '[redacted]');
}

function isAwinDeeplinkError(body) {
  const text = String(typeof body === 'string' ? body : JSON.stringify(body || {})).toLowerCase();
  return (
    text.includes('deeplink') ||
    text.includes('deep link') ||
    text.includes('not permitted') ||
    text.includes('not allowed') ||
    text.includes('linkbuilder not enabled') ||
    text.includes('deeplinknotpermitted')
  );
}

function getErrorMessage(body) {
  if (isAwinDeeplinkError(body)) return DEEPLINK_ERROR_MESSAGE;
  if (body && typeof body === 'object') {
    return body.message || body.error || body.error_description || 'Awin link builder request failed.';
  }
  return body || 'Awin link builder request failed.';
}

async function requestLinkBuilder(path, { credentials = {}, method = 'POST', body } = {}) {
  const config = getConfig(credentials);

  const response = await fetch(buildAwinUrl(path, config), {
    method,
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });

  const result = await readAwinResponse(response);
  if (!response.ok) {
    console.error('[AwinLinkBuilder] Request failed', {
      path,
      status: response.status,
      body: sanitizeBody(result, config.token),
    });
    const error = new Error(getErrorMessage(result));
    error.statusCode = response.status;
    error.status = response.status;
    error.body = result;
    throw error;
  }

  return result;
}

export async function generateAwinTrackingLink({
  advertiserId,
  destinationUrl,
  publisher,
  sourceUrl,
  additionalParams = {},
  shorten = false,
  credentials = {},
}) {
  const body = {
    advertiserId: validateAdvertiserId(advertiserId),
    destinationUrl: validateDestinationUrl(destinationUrl),
    parameters: getAwinTrackingParameters(publisher, sourceUrl, additionalParams),
    shorten: Boolean(shorten),
  };

  if (!body.destinationUrl) {
    delete body.destinationUrl;
  }

  const result = await requestLinkBuilder('generate', { credentials, body });

  return {
    trackingUrl: result?.url,
    shortUrl: result?.shortUrl || null,
    parameters: body.parameters,
    raw: result,
  };
}

export async function generateAwinBatchTrackingLinks({
  requests,
  publisher,
  credentials = {},
}) {
  if (!Array.isArray(requests) || requests.length === 0) {
    throw new Error('requests array is required and cannot be empty.');
  }

  const batchRequests = requests.map(req => {
    const r = {
      advertiserId: validateAdvertiserId(req.advertiserId),
      parameters: getAwinTrackingParameters(publisher, req.sourceUrl, req.additionalParams),
    };
    const dest = validateDestinationUrl(req.destinationUrl);
    if (dest) {
      r.destinationUrl = dest;
    }
    return r;
  });

  const result = await requestLinkBuilder('generate-batch', {
    credentials,
    body: { requests: batchRequests },
  });

  return result;
}

export async function getAwinLinkBuilderQuota(credentials = {}) {
  return requestLinkBuilder('quota', { credentials, method: 'GET' });
}
