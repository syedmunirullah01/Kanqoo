// lib/rakuten-auth.js
import dbConnect from '@/lib/mongodb';
import RakutenAuthState from '@/models/RakutenAuthState';

const TOKEN_ENDPOINT = process.env.RAKUTEN_TOKEN_ENDPOINT || 'https://api.linksynergy.com/token';
const EXPIRY_BUFFER_MS = 60 * 1000; // refresh 1 minute before expiry

const normalize = (value) => (typeof value === 'string' ? value.trim() : '');

const computeTokenKey = () => {
  const explicit = normalize(process.env.RAKUTEN_TOKEN_KEY);
  if (explicit) return explicit;

  const clientId = normalize(process.env.RAKUTEN_CLIENT_ID);
  const clientSecret = normalize(process.env.RAKUTEN_CLIENT_SECRET);
  if (!clientId || !clientSecret) {
    throw new Error('Rakuten client credentials are not configured (RAKUTEN_CLIENT_ID / RAKUTEN_CLIENT_SECRET).');
  }

  return Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
};

const requestNewToken = async (refreshToken) => {
  const tokenKey = computeTokenKey();
  const scope = normalize(process.env.RAKUTEN_SCOPE);
  if (!scope) {
    throw new Error('RAKUTEN_SCOPE environment variable is required.');
  }

  const body = new URLSearchParams({
    refresh_token: refreshToken,
    scope,
  }).toString();

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokenKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Rakuten token refresh failed (${response.status}): ${text || 'Unknown error'}`);
  }

  let data;
  try {
    data = await response.json();
  } catch (parseError) {
    throw new Error('Rakuten token refresh failed: invalid JSON response.');
  }

  if (!data?.access_token || !data?.refresh_token) {
    throw new Error('Rakuten token refresh response missing required fields.');
  }

  const expiresIn = Number(data.expires_in) || 3600;
  const expiresAt = new Date(Date.now() + expiresIn * 1000);

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt,
    scope,
  };
};

const loadAuthState = async (scope) => {
  await dbConnect();
  return RakutenAuthState.findOne({ scope: scope || null }).sort({ updatedAt: -1 });
};

const persistAuthState = async (state) => {
  await dbConnect();
  const filter = { scope: state.scope || null };
  await RakutenAuthState.findOneAndUpdate(
    filter,
    {
      $set: {
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        expiresAt: state.expiresAt,
      },
    },
    { upsert: true, new: true }
  );
};

export async function getRakutenAccessToken({ forceRefresh = false } = {}) {
  const scope = normalize(process.env.RAKUTEN_SCOPE);
  if (!scope) {
    throw new Error('RAKUTEN_SCOPE environment variable is required.');
  }

  let state = await loadAuthState(scope);

  const refreshToken =
    normalize(state?.refreshToken) || normalize(process.env.RAKUTEN_REFRESH_TOKEN);

  if (!refreshToken) {
    throw new Error('Rakuten refresh token is missing. Set RAKUTEN_REFRESH_TOKEN or accept invite once to store it.');
  }

  const now = Date.now();
  const isExpired =
    !state?.accessToken ||
    !state?.expiresAt ||
    state.expiresAt.getTime() - EXPIRY_BUFFER_MS <= now ||
    forceRefresh;

  if (!isExpired) {
    return {
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
      expiresAt: state.expiresAt,
    };
  }

  const updatedState = await requestNewToken(refreshToken);
  await persistAuthState(updatedState);

  return {
    accessToken: updatedState.accessToken,
    refreshToken: updatedState.refreshToken,
    expiresAt: updatedState.expiresAt,
  };
}

export async function invalidateRakutenAccessToken() {
  await dbConnect();
  await RakutenAuthState.deleteMany({});
}
