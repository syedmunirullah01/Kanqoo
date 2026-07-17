// lib/adapters/awin-adapter.js
import BaseAdapter from './base-adapter';
import { fetchJoinedProgrammes, fetchProgrammeDetails } from '@/lib/networks/awin/client';
import { normalizeProgrammeListItem, normalizeProgrammeDetails } from '@/lib/networks/awin/normalizer';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const RATE_DELAY_MS = 3200;

export default class AwinAdapter extends BaseAdapter {
  requiredCredentials = ['oauthToken', 'publisherId'];

  validateCredentials(credentials = {}) {
    const errors = [];
    const token = credentials.oauthToken || credentials.accessToken || process.env.AWIN_OAUTH_TOKEN || process.env.AWIN_ACCESS_TOKEN;
    const publisherId = credentials.publisherId || credentials.pubId || process.env.AWIN_PUB_ID || process.env.AWIN_PUBLISHER_ID;

    if (!token) errors.push('Awin OAuth token is required');
    if (!publisherId) errors.push('Awin publisher ID is required');

    return errors;
  }

  async authenticate(credentials = {}) {
    return this.testConnection(credentials);
  }

  async syncMerchants(credentials = {}, _options = {}) {
    const errors = this.validateCredentials(credentials);
    if (errors.length) {
      throw new Error(`[Awin] Missing credentials: ${errors.join(', ')}`);
    }

    const rawItems = await fetchJoinedProgrammes(credentials);
    const merchants = rawItems.map(normalizeProgrammeListItem).filter(Boolean);

    return {
      merchants,
      total: rawItems.length,
      totalRecordsParsed: rawItems.length,
      totalSynced: merchants.length,
    };
  }

  async enrichDetailsBatch(merchants = [], credentials = {}) {
    const results = [];

    for (const merchant of merchants) {
      try {
        const detail = await fetchProgrammeDetails(merchant.mid, credentials);
        const normalized = detail ? normalizeProgrammeDetails(detail) : null;

        if (normalized) {
          results.push({
            ...normalized,
            isEnriched: true,
            lastEnrichedAt: new Date(),
          });
        }
      } catch (error) {
        console.error(`[Awin] Failed to enrich merchant ${merchant.mid}:`, error.message);
      }

      await sleep(RATE_DELAY_MS);
    }

    return results;
  }

  async enrichCommissionBatch(merchants = [], credentials = {}) {
    const results = [];

    for (const merchant of merchants) {
      try {
        const detail = await fetchProgrammeDetails(merchant.mid, credentials);
        const normalized = detail ? normalizeProgrammeDetails(detail) : null;

        if (normalized) {
          results.push({
            mid: merchant.mid,
            commission: normalized.commission,
            returnDays: normalized.returnDays,
            averagePaymentTime: normalized.averagePaymentTime,
            commissionLastFetchedAt: new Date(),
          });
        }
      } catch (error) {
        console.error(`[Awin] Failed to fetch commission for ${merchant.mid}:`, error.message);
      }

      await sleep(RATE_DELAY_MS);
    }

    return results;
  }

  async syncCommissions() {
    console.warn('Awin commission sync is available through enrichCommissionBatch().');
    return [];
  }

  async testConnection(credentials = {}) {
    const errors = this.validateCredentials(credentials);
    if (errors.length) {
      return { success: false, message: errors.join(', ') };
    }

    try {
      const programmes = await fetchJoinedProgrammes(credentials);
      return {
        success: true,
        count: programmes.length,
        message: `Connected to Awin. ${programmes.length} joined programmes found.`,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  getNetworkInfo() {
    return {
      name: 'Awin',
      version: '1.0-API',
      website: 'https://www.awin.com',
      description: 'Awin affiliate network integration for joined programmes and tracking links.',
      capabilities: ['merchants', 'tracking_links', 'deep_links'],
    };
  }
}
