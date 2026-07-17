// lib/networks/awin/client.js
const DEFAULT_AWIN_API_BASE_URL = 'https://api.awin.com';

function getCredentials(credentials = {}) {
  const token =
    credentials.oauthToken ||
    credentials.accessToken ||
    process.env.AWIN_OAUTH_TOKEN ||
    process.env.AWIN_ACCESS_TOKEN;

  const publisherId =
    credentials.publisherId ||
    credentials.pubId ||
    process.env.AWIN_PUB_ID ||
    process.env.AWIN_PUBLISHER_ID;

  if (!token) {
    throw new Error('[Awin] Missing AWIN_OAUTH_TOKEN environment variable.');
  }

  if (!publisherId) {
    throw new Error('[Awin] Missing AWIN_PUB_ID environment variable.');
  }

  return {
    token: String(token).trim(),
    publisherId: String(publisherId).trim(),
    apiBaseUrl: (process.env.AWIN_API_BASE_URL || DEFAULT_AWIN_API_BASE_URL).replace(/\/+$/, ''),
  };
}

function buildHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  };
}

async function readErrorBody(response) {
  return response.text().catch(() => '');
}

export async function fetchJoinedProgrammes(credentials = {}) {
  const { token, publisherId, apiBaseUrl } = getCredentials(credentials);
  const url = `${apiBaseUrl}/publishers/${publisherId}/programmes?relationship=joined`;

  const response = await fetch(url, {
    headers: buildHeaders(token),
    cache: 'no-store',
  });

  if (!response.ok) {
    const body = await readErrorBody(response);
    throw new Error(`[Awin] Joined programmes request failed (${response.status}): ${body}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export async function fetchProgrammeDetails(advertiserId, credentials = {}) {
  if (advertiserId === undefined || advertiserId === null || advertiserId === '') {
    throw new Error('[Awin] advertiserId is required.');
  }

  const { token, publisherId, apiBaseUrl } = getCredentials(credentials);
  const url = `${apiBaseUrl}/publishers/${publisherId}/programmedetails?advertiserId=${encodeURIComponent(String(advertiserId))}`;

  const response = await fetch(url, {
    headers: buildHeaders(token),
    cache: 'no-store',
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    const body = await readErrorBody(response);
    throw new Error(`[Awin] Programme details request failed for ${advertiserId} (${response.status}): ${body}`);
  }

  return response.json();
}

export function getAwinCredentials(credentials = {}) {
  return getCredentials(credentials);
}
