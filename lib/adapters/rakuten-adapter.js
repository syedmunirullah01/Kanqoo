// lib/adapters/rakuten-adapter.js
import BaseAdapter from './base-adapter';
import { parse } from 'csv-parse/sync';
import crypto from 'crypto';

// Helper function for delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let merchantModelPromise = null;
async function getMerchantModel() {
  if (!merchantModelPromise) {
    merchantModelPromise = import('@/models/Merchant').then((mod) => mod.default);
  }
  return merchantModelPromise;
}

async function ensureDbConnection() {
  const { default: dbConnect } = await import('@/lib/mongodb');
  return dbConnect();
}

let rakutenReportModelPromise = null;
async function getRakutenReportModel() {
  if (!rakutenReportModelPromise) {
    rakutenReportModelPromise = import('@/models/RakutenClickReport').then((mod) => mod.default);
  }
  return rakutenReportModelPromise;
}

let currencyRateModelPromise = null;
async function getCurrencyRateModel() {
  if (!currencyRateModelPromise) {
    currencyRateModelPromise = import('@/models/CurrencyRate').then((mod) => mod.default);
  }
  return currencyRateModelPromise;
}

const RAKUTEN_NETWORKS = {
  us: { id: 1, country: 'US', label: 'United States', currency: 'USD' },
  uk: { id: 3, country: 'UK', label: 'United Kingdom', currency: 'GBP' },
  fr: { id: 7, country: 'FR', label: 'France', currency: 'EUR' },
  de: { id: 9, country: 'DE', label: 'Germany', currency: 'EUR' },
  ca: { id: 5, country: 'CA', label: 'Canada', currency: 'CAD' },
  br: { id: 8, country: 'BR', label: 'Brazil', currency: 'BRL' },
  jp: { id: 11, country: 'JP', label: 'Japan', currency: 'JPY' },
  au: { id: 41, country: 'AU', label: 'Australia', currency: 'AUD' },
};

const NETWORKS_BY_ID = new Map(Object.values(RAKUTEN_NETWORKS).map((network) => [network.id, network]));

function parseCurrency(value) {
  if (value === null || value === undefined) return 0;
  const numeric = Number(String(value).replace(/[^0-9.-]+/g, ''));
  return Number.isFinite(numeric) ? numeric : 0;
}

function parseInteger(value) {
  if (value === null || value === undefined) return 0;
  const numeric = parseInt(String(value).replace(/[^0-9-]+/g, ''), 10);
  return Number.isFinite(numeric) ? numeric : 0;
}

function parseReportDate(value) {
  if (!value) return null;
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }
  const normalized = String(value).trim();
  if (!normalized) return null;

  // Expecting formats like m/d/yy or m/d/yyyy
  const parts = normalized.split(/[/-]/).map((segment) => segment.trim());
  if (parts.length === 3) {
    let [month, day, year] = parts.map((segment) => parseInt(segment, 10));
    if (!Number.isFinite(month) || !Number.isFinite(day) || !Number.isFinite(year)) {
      return null;
    }
    if (year < 100) {
      year += 2000;
    }
    return new Date(Date.UTC(year, month - 1, day));
  }

  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function computeRecordHash(inputs) {
  return crypto.createHash('sha256').update(inputs.join('|')).digest('hex');
}

function ensureRatesShape(entry) {
  if (!entry) {
    return {
      baseCurrency: 'USD',
      rates: { USD: 1 },
    };
  }

  const baseCurrency = entry.baseCurrency || 'USD';
  const ratesObject = entry.rates instanceof Map ? Object.fromEntries(entry.rates.entries()) : entry.rates;
  return {
    baseCurrency,
    rates: {
      USD: 1,
      ...ratesObject,
    },
  };
}

function convertAmount(amount, fromCurrency, toCurrency, rates, baseCurrency = 'USD') {
  if (!Number.isFinite(amount)) return 0;
  const source = (fromCurrency || baseCurrency || 'USD').toUpperCase();
  const target = (toCurrency || baseCurrency || 'USD').toUpperCase();
  if (source === target) {
    return amount;
  }

  const sourceRate = rates[source];
  const targetRate = rates[target];

  if (!sourceRate || !targetRate) {
    return amount;
  }

  const amountInBase = amount * sourceRate;
  return amountInBase / targetRate;
}

export default class RakutenAdapter extends BaseAdapter {
  // Define both required tokens
  requiredCredentials = ['bearerToken', 'reportToken'];

  async authenticate() {
    // Authentication is done via Bearer token in headers
  }

  normalizeStatus(rawStatus) {
    const value = (rawStatus || '').toString().trim().toLowerCase();
    if (!value) return 'unknown';
    if (value.includes('active')) return 'active';
    if (value.includes('pending')) return 'pending';
    if (value.includes('expired') || value.includes('inactive')) return 'inactive';
    return value;
  }

  /**
  * **NEW HELPER:** Commission string ko parse karke clean karta hai
  */
  normalizeCommission(rawCommission) {
    if (!rawCommission || typeof rawCommission !== 'string') {
      return 'N/A'; // Agar data nahi hai
    }

    // Pehle currency ranges dhoondein taake dollar/sterling offers dikha sakein
    const currencyRegex = /[\$€£]\s*\d[\d,\.]*(?:\s*-\s*[\$€£]?\s*\d[\d,\.]*)?/;
    const currencyMatch = currencyRegex.exec(rawCommission);
    if (currencyMatch) {
      const startIndex = typeof currencyMatch.index === 'number' ? currencyMatch.index : rawCommission.indexOf(currencyMatch[0]);
      const afterCurrency = rawCommission.slice(startIndex + currencyMatch[0].length);
      const perSuffixMatch = afterCurrency.match(/^\s*(per\b[^;\|\n\r]*)/i);
      let normalizedCurrency = currencyMatch[0].replace(/\s+/g, ' ').trim();
      if (perSuffixMatch) {
        normalizedCurrency += ` ${perSuffixMatch[1].trim()}`;
      }
      return normalizedCurrency;
    }

    // Regex jo tamam percentage numbers ko dhoondta hai (jaise 8%, 12.5%, 10%)
    const regex = /(\d+(\.\d+)?)\s*%/g;
    const matches = [...rawCommission.matchAll(regex)];

    if (matches.length === 0) {
      // Agar koi percentage nahi mili, toh original string (ya uska hissa) return karein
      if (rawCommission.toLowerCase().includes('see terms')) {
        return 'See Terms';
      }
      return rawCommission.length > 50 ? rawCommission.substring(0, 47) + '...' : rawCommission;
    }

    // Tamam numbers ko extract karein
    const numbers = matches.map(match => parseFloat(match[1]));

    if (numbers.length === 0) {
      return rawCommission; // Fallback
    }

    // Sab se badi percentage dhoondein
    const maxPercent = Math.max(...numbers);

    // Check karein agar sab numbers same hain
    const allSame = numbers.every(num => num === maxPercent);

    if (allSame && numbers.length === 1) {
      // Agar sirf ek hi number hai (jaise "8%")
      return `${maxPercent}%`;
    } else {
      // Agar multiple numbers hain (jaise "8%, 10%, 12%")
      return `Up to ${maxPercent}%`;
    }
  }

  /**
  * Main sync function following the 3-step plan.
  */
  async syncMerchants(credentials) {
    // Use the specific tokens
    const { bearerToken, reportToken } = credentials;
    if (!bearerToken || !reportToken) {
      throw new Error('Rakuten bearerToken and reportToken are required');
    }

    // Use bearerToken for API headers
    const headers = {
      'Authorization': `Bearer ${bearerToken}`,
      'Accept': 'application/json'
    };

    await ensureDbConnection();
    const Merchant = await getMerchantModel();
    console.log('Starting Rakuten sync with new 3-step API plan...');

    // --- Step 1: Fetch all active partnerships (handles pagination) ---
    console.log('Step 1: Fetching all active partnerships...');
    const allPartnerships = await this.fetchAllActivePartnerships(headers);
    console.log(`Step 1: Fetched ${allPartnerships.length} total active partnerships.`);

    if (allPartnerships.length === 0) {
      console.warn('No active partnerships found. Sync complete.');
      return { totalRecordsParsed: 0, totalSynced: 0, nUpserted: 0, nModified: 0 };
    }

    // --- Step 1b: Save base merchant data ---
    const initialOperations = allPartnerships.map(p => {
      const ad = p.advertiser;
      if (!ad || !ad.id) {
        console.warn('Skipping partnership with missing advertiser data:', p);
        return null;
      }

      const mid = ad.id.toString();
      const canPartner =
        typeof ad?.can_partner === 'boolean' ? ad.can_partner : undefined;
      const partnershipStatus =
        p.status ||
        (typeof canPartner === 'boolean'
          ? canPartner
            ? 'available'
            : 'not available'
          : undefined);

      return {
        updateOne: {
          filter: { mid: mid, network: 'rakuten' },
          update: {
            $set: {
              mid: mid,
              name: ad.name,
              status: this.normalizeStatus(ad.status),
              categories: ad.categories || [],
              ...(partnershipStatus
                ? { partnershipStatus }
                : { partnershipStatus: 'unknown' }),
              ...(typeof canPartner === 'boolean' ? { canPartner } : {}),
              network: 'rakuten',
            }
          },
          upsert: true,
          setDefaultsOnInsert: true
        }
      };
    }).filter(Boolean);

    let upsertedCount = 0;
    let modifiedCount = 0;

    if (initialOperations.length > 0) {
      const bulkResult = await Merchant.bulkWrite(initialOperations);
      upsertedCount = bulkResult.upsertedCount;
      modifiedCount = bulkResult.modifiedCount;
      console.log(`Step 1b: Synced base data. Upserted: ${upsertedCount}, Modified: ${modifiedCount}`);
    }

    const allMids = allPartnerships.map(p => p.advertiser.id).filter(Boolean);

    // --- Step 2: Enrich with advertiser details (in batches) ---
    console.log(`Step 2: Enriching ${allMids.length} merchants with details (in batches)...`);
    const detailOperations = await this.fetchAdvertiserDetailsInBatches(allMids, headers);

    if (detailOperations.length > 0) {
      const detailResult = await Merchant.bulkWrite(detailOperations);
      console.log(`Step 2: Enriched details. Modified: ${detailResult.modifiedCount}`);
      modifiedCount = detailResult.modifiedCount;
    }

    // --- Step 3: Enrich with Commission/Terms (from CSV report) ---
    console.log('Step 3: Fetching CSV report for commission/terms data...');
    const commissionOperations = await this.fetchCommissionData(reportToken, new Set(allMids.map(String)));

    if (commissionOperations.length > 0) {
      const commissionResult = await Merchant.bulkWrite(commissionOperations);
      console.log(`Step 3: Enriched commission/terms. Modified: ${commissionResult.modifiedCount}`);
      modifiedCount += commissionResult.modifiedCount;
    }

    console.log('Rakuten sync complete.');
    return {
      totalRecordsParsed: allPartnerships.length,
      totalSynced: allMids.length,
      nUpserted: upsertedCount,
      nModified: modifiedCount
    };
  }

  /**
  * Step 1 Helper: Fetches all pages from the v1/partnerships endpoint.
  */
  async fetchAllActivePartnerships(headers) {
    let allPartnerships = [];
    let page = 1;
    let hasMore = true;
    const limit = 200; // API max limit
    const baseUrl = `https://api.linksynergy.com/v1/partnerships?advertiser_status=active&partner_status=active&limit=${limit}`;

    while (hasMore) {
      const url = `${baseUrl}&page=${page}`;
      console.log(`Fetching partnerships page ${page}...`);
      try {
        const response = await fetch(url, { headers }); // headers contain bearerToken
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Partnership API failed (${response.status}): ${errorText}`);
        }

        const data = await response.json();

        if (data.partnerships && data.partnerships.length > 0) {
          allPartnerships.push(...data.partnerships);
        }

        const total = data._metadata.total;
        const currentPage = data._metadata.page;

        if ((currentPage * limit) >= total || !data.partnerships || data.partnerships.length === 0) {
          hasMore = false;
        } else {
          page++;
        }
      } catch (error) {
        console.error(`Error fetching page ${page}:`, error.message);
        hasMore = false; // Stop on error
      }
    }
    return allPartnerships;
  }

  /**
  * Step 2 Helper: Fetches advertiser details in batches to respect rate limit.
  */
  async fetchAdvertiserDetailsInBatches(mids, headers) {
    const allOperations = [];
    const BATCH_SIZE = 90; // 100 calls/min limit, 90 is safer
    const MINUTE_DELAY = 61000; // 61 seconds (to be safe)

    const midChunks = [];
    for (let i = 0; i < mids.length; i += BATCH_SIZE) {
      midChunks.push(mids.slice(i, i + BATCH_SIZE));
    }

    console.log(`Step 2: Starting detail fetch in ${midChunks.length} batches of up to ${BATCH_SIZE} MIDs.`);

    for (let i = 0; i < midChunks.length; i++) {
      const chunk = midChunks[i];
      console.log(`Step 2: Processing batch ${i + 1} of ${midChunks.length} (${chunk.length} MIDs).`);

      const promises = chunk.map(mid =>
        fetch(`https://api.linksynergy.com/v2/advertisers/${mid}`, { headers }) // headers contain bearerToken
          .then(async res => {
            if (!res.ok) {
              console.warn(`Failed to fetch details for MID ${mid} (${res.status})`);
              return null;
            }
            return res.json();
          })
          .catch(err => {
            console.error(`Error fetching details for MID ${mid}:`, err.message);
            return null;
          })
      );

      const results = await Promise.allSettled(promises);

      for (const result of results) {
        if (result.status === 'fulfilled' && result.value && result.value.advertiser) {
          const ad = result.value.advertiser;
          const mid = ad.id.toString();

          const canPartner =
            typeof ad?.can_partner === 'boolean' ? ad.can_partner : undefined;

          const updateData = {
            url: ad.url,
            country: ad.contact?.country,
            shipsTo: ad.policies?.international_capabilities?.ships_to || [],
            raw: ad
          };

          if (typeof canPartner === 'boolean') {
            updateData.canPartner = canPartner;
          }

          allOperations.push({
            updateOne: {
              filter: { mid: mid, network: 'rakuten' },
              update: { $set: updateData }
            }
          });
        }
      }

      if (i < midChunks.length - 1) {
        console.log(`Step 2: Batch ${i + 1} complete. Waiting ${MINUTE_DELAY / 1000} seconds for rate limit...`);
        await delay(MINUTE_DELAY);
      }
    }

    console.log('Step 2: All batches processed.');
    return allOperations;
  }

  /**
  * Step 3 Helper: Fetches and parses the CSV report for commission data.
  */
  async fetchCommissionData(reportToken, approvedMidsSet) {
    const url = `http://reportws.linksynergy.com/downloadreport.php?token=${reportToken}&reportid=13`;
    const operations = [];

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        if (errorText.toLowerCase().includes('invalid token')) {
          console.error('Step 3: CSV fetch failed. The *reportToken* is invalid or has expired.');
        }
        throw new Error(`Fetch failed (${response.status}): ${errorText.substring(0, 200)}...`);
      }

      const csvText = await response.text();
      const records = parse(csvText, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      });

      console.log(`Step 3: Parsed ${records.length} records from CSV. Filtering against ${approvedMidsSet.size} approved MIDs.`);

      for (const record of records) {
        const mid = record.MID;

        if (mid && approvedMidsSet.has(mid)) {
          // **CHANGE: Naya commission helper yahan istemal kiya gaya hai**
          const updateData = {
            commission: this.normalizeCommission(record['Commission Terms']),
            termsUrl: record['Link to T&C'],
            returnDays: record['Return Days'],
            description: record['Advertiser Description']
          };

          operations.push({
            updateOne: {
              filter: { mid: mid, network: 'rakuten' },
              update: { $set: updateData }
            }
          });
        }
      }
    } catch (error) {
      console.error('Step 3: Failed to fetch or parse commission CSV:', error.message);
    }

    return operations;
  }

  async syncCommissions() {
    console.warn('syncCommissions() is not implemented. Commissions are synced via syncMerchants().');
    return [];
  }

  /**
  * Tests the connection using the v1 API (with bearerToken).
  */
  async testConnection(credentials) {
    const { bearerToken } = credentials;
    if (!bearerToken) {
      return { success: false, message: 'bearerToken is required for test' };
    }

    const headers = { 'Authorization': `Bearer ${bearerToken}`, 'Accept': 'application/json' };
    const url = 'https://api.linksynergy.com/v1/partnerships?limit=1';

    try {
      const response = await fetch(url, { headers });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API test failed (${response.status}): ${errorText}`);
      }
      const data = await response.json();
      return { success: true, count: data._metadata.total };
    } catch (error) {
      console.error('Test connection failed:', error);
      return { success: false, message: error.message };
    }
  }

  getNetworkInfo() {
    return { name: 'Rakuten', version: '2.0-API', capabilities: ['merchants', 'deep_links'] };
  }

  /**
  * Validates both tokens.
  */
  validateCredentials(credentials) {
    const errors = [];
    if (!credentials.bearerToken) errors.push('bearerToken is required');
    if (!credentials.reportToken) errors.push('reportToken is required');
    return errors;
  }

  /**
  * Generates a deep link using Rakuten's v1 Deep Links API.
  * FIXED: Corrected according to Rakuten documentation
  */
  async generateDeepLink(credentials = {}, options = {}) {
    const { bearerToken } = credentials;
    if (!bearerToken) {
      const err = new Error('Rakuten bearerToken is required to generate deep links.');
      err.code = 'AUTH_ERROR';
      throw err;
    }

    const rawUrl = typeof options.url === 'string' ? options.url.trim() : '';
    if (!rawUrl) {
      const err = new Error('A product URL is required to generate a deep link.');
      err.code = 'URL_REQUIRED';
      throw err;
    }

    const advertiserSource =
      options.advertiserId ??
      options.advertiser_id ??
      options.mid ??
      options.merchantId ??
      options.merchant_id;

    const advertiserIdString = advertiserSource !== undefined && advertiserSource !== null
      ? String(advertiserSource).trim()
      : '';

    if (!advertiserIdString) {
      const err = new Error('An advertiser ID (MID) is required to generate a deep link.');
      err.code = 'INVALID_MERCHANT_ID';
      throw err;
    }

    if (!/^\d+$/.test(advertiserIdString)) {
      const err = new Error('Advertiser ID must be a numeric value.');
      err.code = 'INVALID_MERCHANT_ID';
      throw err;
    }

    const payload = {
      url: rawUrl,
      advertiser_id: parseInt(advertiserIdString, 10),
    };

    const u1Value = typeof options.u1 === 'string' ? options.u1.trim() : '';
    if (u1Value) {
      payload.u1 = u1Value;
    }

    console.log('Sending deep link request to Rakuten:', {
      endpoint: 'https://api.linksynergy.com/v1/links/deep_links',
      advertiser_id: advertiserIdString,
      has_u1: !!u1Value,
      product_url: rawUrl.substring(0, 100) + (rawUrl.length > 100 ? '...' : '')
    });

    let response;
    let rawResponseText = '';

    try {
      response = await fetch('https://api.linksynergy.com/v1/links/deep_links', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      rawResponseText = await response.text();
    } catch (networkError) {
      console.error('Rakuten deep link network error:', networkError);
      const err = new Error('Unable to connect to Rakuten API. Please try again in a few moments.');
      err.code = networkError.name === 'TimeoutError' ? 'TIMEOUT_ERROR' : 'NETWORK_ERROR';
      err.originalError = networkError;
      throw err;
    }

    console.log('Rakuten API raw response:', rawResponseText);

    let parsed;
    try {
      parsed = rawResponseText ? JSON.parse(rawResponseText) : null;
    } catch (parseError) {
      console.error('Failed to parse Rakuten API response:', parseError);
      const err = new Error('Invalid response format from Rakuten API.');
      err.code = 'API_FORMAT_ERROR';
      err.originalError = parseError;
      throw err;
    }

    if (!response.ok) {
      const status = response.status;
      const errorCode =
        parsed?.error?.code ||
        parsed?.code ||
        parsed?._metadata?.error_code ||
        parsed?.error_code ||
        'DEEP_LINK_ERROR';

      const detailMessage =
        parsed?.error?.message ||
        parsed?.message ||
        rawResponseText ||
        'Rakuten deep link API request failed.';

      const mappedErrors = {
        ACCESS_DENIED: {
          message: `No active partnership exists for merchant ID ${advertiserIdString}. Please ensure you are approved before generating links.`,
          code: 'NO_PARTNERSHIP',
          status: status || 403,
        },
        DEEP_LINK_DENIED: {
          message: 'The provided URL contains terms that Rakuten has blocked. Try a different product page.',
          code: 'BLACKLIST_ERROR',
          status: status || 400,
        },
        DEEP_LINKING_NOT_ENABLED: {
          message: `Merchant ${advertiserIdString} does not allow deep linking.`,
          code: 'DEEP_LINKING_DISABLED',
          status: status || 400,
        },
        URL_TEMPLATE_MISMATCH: {
          message: 'The URL does not match the advertiser’s allowed format. Use a valid product page URL.',
          code: 'URL_MISMATCH',
          status: status || 400,
        },
        CANNOT_RESOLVE_ADVERTISER: {
          message: `Invalid merchant ID: ${advertiserIdString} is not recognized by Rakuten.`,
          code: 'INVALID_MERCHANT_ID',
          status: status || 404,
        },
        ENTITY_DECODE_ERROR: {
          message: 'Rakuten could not decode the request body. Please check the URL and try again.',
          code: 'API_FORMAT_ERROR',
          status: status || 400,
        },
        UNEXPECTED_ERROR: {
          message: 'Rakuten encountered an unexpected error. Please try again shortly.',
          code: 'SERVER_ERROR',
          status: status || 500,
        },
      };

      if (mappedErrors[errorCode]) {
        const mapping = mappedErrors[errorCode];
        const err = new Error(mapping.message);
        err.code = mapping.code;
        err.statusCode = mapping.status;
        err.details = parsed;
        throw err;
      }

      if (status === 401 || status === 403) {
        const err = new Error('Authentication failed with Rakuten API. Please refresh your credentials.');
        err.code = 'AUTH_ERROR';
        err.statusCode = status;
        err.details = parsed;
        throw err;
      }

      if (status === 429) {
        const err = new Error('Rakuten rate limit exceeded. Please wait a moment and try again.');
        err.code = 'RATE_LIMIT';
        err.statusCode = status;
        err.details = parsed;
        throw err;
      }

      const err = new Error(detailMessage);
      err.code = 'DEEP_LINK_ERROR';
      err.statusCode = status || 500;
      err.details = parsed;
      throw err;
    }

    const advertiserInfo = parsed?.advertiser || {};
    const deepLinkUrl =
      advertiserInfo?.deep_link?.deep_link_url ||
      advertiserInfo?.deep_link?.url ||
      advertiserInfo?.deep_links?.deep_link_url ||
      advertiserInfo?.deep_links?.deep_links ||
      advertiserInfo?.deep_links?.val ||
      parsed?.deep_link_url ||
      parsed?.advertiser?.deep_link_url ||
      null;

    const result = {
      advertiserId: advertiserInfo.id || advertiserIdString,
      advertiserName: advertiserInfo.name || null,
      advertiserUrl: advertiserInfo.url || null,
      deepLinkUrl,
      originalUrl: rawUrl,
      u1: u1Value || advertiserInfo?.deep_link?.u1 || null,
      raw: parsed,
    };

    console.log('Processed deep link result:', {
      advertiserId: result.advertiserId,
      advertiserName: result.advertiserName,
      deepLinkUrl: result.deepLinkUrl?.substring(0, 100) + (result.deepLinkUrl?.length > 100 ? '...' : ''),
      hasU1: !!result.u1
    });

    if (!result.deepLinkUrl) {
      const err = new Error('Rakuten did not return a deep link URL. The advertiser may not support deep linking for this URL.');
      err.code = 'SERVER_ERROR';
      throw err;
    }

    return result;
  }

  buildClicksReportUrl(reportToken, networkId, startDate, endDate) {
    const url = new URL('https://ran-reporting.rakutenmarketing.com/en-US/reports/clicks-report/filters');
    const params = url.searchParams;

    params.set('include_summary', 'Y');
    params.set('network', String(networkId));
    params.set('tz', 'GMT');
    params.set('date_type', 'transaction');
    params.set('date_range', 'custom');
    params.set('date_format', 'm/d/yy');
    params.set('start_date', this.formatReportDate(startDate));
    params.set('end_date', this.formatReportDate(endDate));
    params.set('token', reportToken);

    return url.toString();
  }

  formatReportDate(dateLike) {
    const date = dateLike ? new Date(dateLike) : new Date();
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const shortYear = year % 100;
    return `${month}/${day}/${shortYear.toString().padStart(2, '0')}`;
  }

  normalizeClicksReportRecord(record, networkConfig) {
    const memberId = String(record['Member ID (U1)'] || '').trim();
    const mid = String(record.MID || '').trim();
    const advertiserName = record['Advertiser Name'] || 'Unknown Advertiser';

    const clicks = parseInteger(record['# of Clicks']);
    const averageOrderValue = parseCurrency(record['Average Order Value']);
    const grossSales = parseCurrency(record['Gross Sales']);
    const salesAmount = parseCurrency(record['Sales']);
    const totalCommission = parseCurrency(record['Total Commission']);

    const estimatedOrders = averageOrderValue > 0 ? Math.round(grossSales / averageOrderValue) : 0;

    const processDate = parseReportDate(record['Process Date']);
    const transactionDate = parseReportDate(record['Transaction Date']);

    const hash = computeRecordHash([
      networkConfig.id,
      networkConfig.country,
      memberId,
      mid,
      advertiserName,
      transactionDate ? transactionDate.toISOString().slice(0, 10) : '',
      totalCommission.toFixed(2),
      grossSales.toFixed(2),
      salesAmount.toFixed(2),
      clicks,
    ]);

    return {
      recordHash: hash,
      networkId: networkConfig.id,
      networkCountry: networkConfig.country,
      currency: networkConfig.currency,
      memberId,
      mid,
      advertiserName,
      clicks,
      clickIpAddress: record['Click IP Address'] || null,
      averageOrderValue,
      consumerRegion: record['Consumer Region'] || null,
      grossSales,
      salesAmount,
      estimatedOrders,
      processDate,
      lockStatus: record['Lock Status'] || null,
      totalCommission,
      transactionDate,
      commissionStatus: record['Commission Status'] || null,
      raw: record,
    };
  }

  async fetchClicksReportForNetwork(reportToken, networkConfig, startDate, endDate) {
    const url = this.buildClicksReportUrl(reportToken, networkConfig.id, startDate, endDate);
    const response = await fetch(url, {
      headers: {
        Accept: 'text/csv',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Clicks report request failed for network ${networkConfig.country} (${networkConfig.id}) [${response.status}]: ${errorText.slice(0, 200)}`);
    }

    const csvText = await response.text();
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    return records;
  }

  async syncClicksReports(credentials, options = {}) {
    const { reportToken } = credentials || {};
    if (!reportToken) {
      throw new Error('Rakuten reportToken is required to sync clicks reports');
    }

    const defaultStart = new Date(Date.UTC(2025, 0, 1));
    const yesterday = new Date();
    yesterday.setUTCHours(0, 0, 0, 0);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);

    const startDate = options.startDate ? new Date(options.startDate) : defaultStart;
    const endDate = options.endDate ? new Date(options.endDate) : yesterday;

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      throw new Error('Invalid start or end date provided for report sync');
    }

    if (startDate > endDate) {
      throw new Error('Start date must not be after end date');
    }

    await ensureDbConnection();
    const RakutenReport = await getRakutenReportModel();

    const results = [];
    let totalRecords = 0;
    let upserted = 0;
    let modified = 0;

    for (const networkConfig of Object.values(RAKUTEN_NETWORKS)) {
      try {
        const records = await this.fetchClicksReportForNetwork(reportToken, networkConfig, startDate, endDate);
        if (!records.length) {
          results.push({
            country: networkConfig.country,
            networkId: networkConfig.id,
            currency: networkConfig.currency,
            fetched: 0,
            upserted: 0,
            modified: 0,
          });
          continue;
        }

        const normalizedRecords = records.map((row) => this.normalizeClicksReportRecord(row, networkConfig));
        const bulkOps = normalizedRecords.map((entry) => ({
          updateOne: {
            filter: { recordHash: entry.recordHash },
            update: { $set: entry },
            upsert: true,
          },
        }));

        const bulkResult = await RakutenReport.bulkWrite(bulkOps, { ordered: false });

        const networkSummary = {
          country: networkConfig.country,
          networkId: networkConfig.id,
          currency: networkConfig.currency,
          fetched: normalizedRecords.length,
          upserted: bulkResult.upsertedCount || 0,
          modified: bulkResult.modifiedCount || 0,
        };

        totalRecords += normalizedRecords.length;
        upserted += networkSummary.upserted;
        modified += networkSummary.modified;
        results.push(networkSummary);
      } catch (error) {
        results.push({
          country: networkConfig.country,
          networkId: networkConfig.id,
          currency: networkConfig.currency,
          error: error.message,
        });
      }
    }

    return {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      totalNetworks: results.length,
      totalRecords,
      upserted,
      modified,
      networks: results,
    };
  }

  async getLatestCurrencyRates() {
    await ensureDbConnection();
    const CurrencyRate = await getCurrencyRateModel();
    const latest = await CurrencyRate.findOne().sort({ updatedAt: -1 }).lean();
    return ensureRatesShape(latest);
  }

  async syncReports(credentials, options = {}) {
    return this.syncClicksReports(credentials, options);
  }

  async getReportingData(options = {}) {
    const {
      startDate: startDateInput,
      endDate: endDateInput,
      currency = 'USD',
      networkCountry = 'all',
      advertiser,
      memberId,
    } = options;

    await ensureDbConnection();
    const RakutenReport = await getRakutenReportModel();
    const { baseCurrency, rates } = await this.getLatestCurrencyRates();

    const startDate = startDateInput ? new Date(startDateInput) : new Date(Date.UTC(2025, 0, 1));
    const endDate = endDateInput ? new Date(endDateInput) : new Date();

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      throw new Error('Invalid start or end date for reporting query');
    }

    const query = {
      transactionDate: {
        $gte: startDate,
        $lte: endDate,
      },
    };

    if (networkCountry && networkCountry !== 'all') {
      query.networkCountry = networkCountry.toUpperCase();
    }

    if (advertiser) {
      query.advertiserName = { $regex: new RegExp(advertiser, 'i') };
    }

    if (memberId) {
      query.memberId = memberId;
    }

    const records = await RakutenReport.find(query).lean();

    const summary = {
      clicks: 0,
      grossSales: 0,
      sales: 0,
      commission: 0,
      orders: 0,
    };

    const publishersMap = new Map();
    const networksMap = new Map();
    const currenciesMap = new Map();

    records.forEach((record) => {
      const displayCurrency = currency.toUpperCase();

      const grossSalesConverted = convertAmount(record.grossSales, record.currency, displayCurrency, rates, baseCurrency);
      const salesConverted = convertAmount(record.salesAmount, record.currency, displayCurrency, rates, baseCurrency);
      const commissionConverted = convertAmount(record.totalCommission, record.currency, displayCurrency, rates, baseCurrency);

      summary.clicks += record.clicks || 0;
      summary.grossSales += grossSalesConverted;
      summary.sales += salesConverted;
      summary.commission += commissionConverted;
      summary.orders += record.estimatedOrders || 0;

      // Networks aggregation
      const networkKey = record.networkCountry;
      if (!networksMap.has(networkKey)) {
        networksMap.set(networkKey, {
          country: networkKey,
          networkId: record.networkId,
          currency: record.currency,
          clicks: 0,
          grossSales: 0,
          sales: 0,
          commission: 0,
          orders: 0,
        });
      }
      const networkEntry = networksMap.get(networkKey);
      networkEntry.clicks += record.clicks || 0;
      networkEntry.grossSales += grossSalesConverted;
      networkEntry.sales += salesConverted;
      networkEntry.commission += commissionConverted;
      networkEntry.orders += record.estimatedOrders || 0;

      // Currency aggregation
      if (!currenciesMap.has(record.currency)) {
        currenciesMap.set(record.currency, {
          currency: record.currency,
          grossSales: 0,
          sales: 0,
          commission: 0,
          convertedSales: 0,
          convertedCommission: 0,
        });
      }
      const currencyEntry = currenciesMap.get(record.currency);
      currencyEntry.grossSales += record.grossSales || 0;
      currencyEntry.sales += record.salesAmount || 0;
      currencyEntry.commission += record.totalCommission || 0;
      currencyEntry.convertedSales += salesConverted;
      currencyEntry.convertedCommission += commissionConverted;

      // Publisher aggregation
      const publisherKey = record.memberId;
      if (!publishersMap.has(publisherKey)) {
        publishersMap.set(publisherKey, {
          memberId: record.memberId,
          publisherName: record.memberId,
          clicks: 0,
          grossSales: 0,
          sales: 0,
          commission: 0,
          orders: 0,
          advertisers: new Map(),
          currencyBreakdown: new Map(),
        });
      }

      const publisherEntry = publishersMap.get(publisherKey);
      publisherEntry.clicks += record.clicks || 0;
      publisherEntry.grossSales += grossSalesConverted;
      publisherEntry.sales += salesConverted;
      publisherEntry.commission += commissionConverted;
      publisherEntry.orders += record.estimatedOrders || 0;

      if (!publisherEntry.currencyBreakdown.has(record.currency)) {
        publisherEntry.currencyBreakdown.set(record.currency, {
          currency: record.currency,
          grossSales: 0,
          sales: 0,
          commission: 0,
          convertedSales: 0,
          convertedCommission: 0,
        });
      }
      const publisherCurrencyEntry = publisherEntry.currencyBreakdown.get(record.currency);
      publisherCurrencyEntry.grossSales += record.grossSales || 0;
      publisherCurrencyEntry.sales += record.salesAmount || 0;
      publisherCurrencyEntry.commission += record.totalCommission || 0;
      publisherCurrencyEntry.convertedSales += salesConverted;
      publisherCurrencyEntry.convertedCommission += commissionConverted;

      if (!publisherEntry.advertisers.has(record.advertiserName)) {
        publisherEntry.advertisers.set(record.advertiserName, {
          name: record.advertiserName,
          clicks: 0,
          grossSales: 0,
          sales: 0,
          commission: 0,
          orders: 0,
          network: record.networkCountry,
        });
      }
      const advertiserEntry = publisherEntry.advertisers.get(record.advertiserName);
      advertiserEntry.clicks += record.clicks || 0;
      advertiserEntry.grossSales += grossSalesConverted;
      advertiserEntry.sales += salesConverted;
      advertiserEntry.commission += commissionConverted;
      advertiserEntry.orders += record.estimatedOrders || 0;
    });

    const publishers = Array.from(publishersMap.values()).map((entry) => {
      const advertisers = Array.from(entry.advertisers.values())
        .map((adv) => ({
          ...adv,
          epc: adv.clicks ? Number((adv.commission / adv.clicks).toFixed(2)) : 0,
        }))
        .sort((a, b) => b.commission - a.commission);

      const currencyBreakdown = Array.from(entry.currencyBreakdown.values()).map((info) => ({
        ...info,
        grossSales: Number(info.grossSales.toFixed(2)),
        sales: Number(info.sales.toFixed(2)),
        commission: Number(info.commission.toFixed(2)),
        convertedSales: Number(info.convertedSales.toFixed(2)),
        convertedCommission: Number(info.convertedCommission.toFixed(2)),
      }));

      return {
        memberId: entry.memberId,
        publisherName: entry.publisherName,
        clicks: entry.clicks,
        grossSales: Number(entry.grossSales.toFixed(2)),
        sales: Number(entry.sales.toFixed(2)),
        commission: Number(entry.commission.toFixed(2)),
        orders: entry.orders,
        epc: entry.clicks ? Number((entry.commission / entry.clicks).toFixed(2)) : 0,
        currency: currency.toUpperCase(),
        currencyBreakdown,
        advertisers,
      };
    }).sort((a, b) => b.commission - a.commission);

    const networks = Array.from(networksMap.values()).map((entry) => ({
      ...entry,
      grossSales: Number(entry.grossSales.toFixed(2)),
      sales: Number(entry.sales.toFixed(2)),
      commission: Number(entry.commission.toFixed(2)),
    })).sort((a, b) => b.commission - a.commission);

    const currencyBreakdown = Array.from(currenciesMap.values()).map((entry) => ({
      ...entry,
      grossSales: Number(entry.grossSales.toFixed(2)),
      sales: Number(entry.sales.toFixed(2)),
      commission: Number(entry.commission.toFixed(2)),
      convertedSales: Number(entry.convertedSales.toFixed(2)),
      convertedCommission: Number(entry.convertedCommission.toFixed(2)),
    }));

    const publisherWithHighestEpc = publishers.reduce((acc, current) => {
      if (!acc || current.epc > acc.epc) return current;
      return acc;
    }, null);

    return {
      summary: {
        currency: currency.toUpperCase(),
        baseCurrency,
        totalClicks: summary.clicks,
        totalGrossSales: Number(summary.grossSales.toFixed(2)),
        totalSales: Number(summary.sales.toFixed(2)),
        totalCommission: Number(summary.commission.toFixed(2)),
        totalOrders: summary.orders,
        conversionRate: summary.clicks ? Number(((summary.orders / summary.clicks) * 100).toFixed(2)) : 0,
        averageEpc: summary.clicks ? Number((summary.commission / summary.clicks).toFixed(2)) : 0,
        publishersCount: publishers.length,
        networksCount: networks.length,
        topPublisherByEpc: publisherWithHighestEpc ? {
          memberId: publisherWithHighestEpc.memberId,
          epc: publisherWithHighestEpc.epc,
        } : null,
      },
      publishers,
      networks,
      currencyBreakdown,
      rates: {
        baseCurrency,
        rates,
      },
      filters: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        networkCountry: networkCountry || 'all',
        currency: currency.toUpperCase(),
      },
      totals: summary,
    };
  }
}
