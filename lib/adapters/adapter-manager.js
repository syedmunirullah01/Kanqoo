// lib/adapters/adapter-manager.js
import RakutenAdapter from './rakuten-adapter';
import AwinAdapter from './awin-adapter';
import BaseAdapter from './base-adapter';

export class AdapterManager {
  constructor() {
    this.adapters = new Map();
    this.initializeAdapters();
  }

  initializeAdapters() {
    this.registerAdapter('rakuten', new RakutenAdapter());
    this.registerAdapter('awin', new AwinAdapter());
    // Future adapters will be registered here
    // this.registerAdapter('cj', new CJAdapter());
  }

  registerAdapter(networkId, adapterInstance) {
    if (!(adapterInstance instanceof BaseAdapter)) {
      throw new Error('Adapter must be an instance of BaseAdapter');
    }
    this.adapters.set(networkId, adapterInstance);
  }

  getAdapter(networkId) {
    const adapter = this.adapters.get(String(networkId || '').toLowerCase());
    if (!adapter) {
      throw new Error(`No adapter found for network: ${networkId}`);
    }
    return adapter;
  }

  getSupportedNetworks() {
    return Array.from(this.adapters.keys());
  }

  getAvailableNetworks() {
    const networks = [];
    
    for (const [networkId, adapter] of this.adapters) {
      const info = adapter.getNetworkInfo();
      networks.push({
        id: networkId,
        ...info,
        requiredCredentials: adapter.requiredCredentials || []
      });
    }
    
    return networks;
  }

  async testAllConnections(credentialsMap) {
    const results = {};
    
    for (const [networkId, credentials] of Object.entries(credentialsMap)) {
      try {
        const adapter = this.getAdapter(networkId);
        results[networkId] = await adapter.testConnection(credentials);
      } catch (error) {
        results[networkId] = {
          success: false,
          message: error.message,
          error: error,
          timestamp: new Date().toISOString()
        };
      }
    }
    
    return results;
  }

  validateCredentials(networkId, credentials) {
    const adapter = this.getAdapter(networkId);
    return adapter.validateCredentials(credentials);
  }

  async syncAllNetworks(credentialsMap, options = {}) {
    const results = {};
    
    for (const [networkId, credentials] of Object.entries(credentialsMap)) {
      try {
        const adapter = this.getAdapter(networkId);
        const merchantResult = await adapter.syncMerchants(credentials, options);
        results[networkId] = {
          merchants: merchantResult.merchants,
          total: merchantResult.total,
          commissions: await adapter.syncCommissions(
            credentials, 
            options.startDate, 
            options.endDate, 
            options
          )
        };
      } catch (error) {
        results[networkId] = { error: error.message };
      }
    }
    
    return results;
  }
}

const adapterManager = new AdapterManager();
export default adapterManager;
