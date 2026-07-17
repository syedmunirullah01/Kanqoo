// lib/adapters/base-adapter.js
export class BaseAdapter {
    constructor() {
        if (this.constructor === BaseAdapter) {
            throw new Error('BaseAdapter is abstract and cannot be instantiated');
        }
    }

    // Required methods that all adapters must implement
    async authenticate(credentials) {
        throw new Error('authenticate method must be implemented');
    }

    async syncMerchants() {
        throw new Error('syncMerchants method must be implemented');
    }

    async syncCommissions(startDate, endDate) {
        throw new Error('syncCommissions method must be implemented');
    }

    async testConnection() {
        throw new Error('testConnection method must be implemented');
    }

    async syncReports() {
        throw new Error('syncReports method must be implemented');
    }

    async getReportingData() {
        throw new Error('getReportingData method must be implemented');
    }

    // Optional methods with default implementations
    async getNetworkInfo() {
        return {
            name: this.constructor.name.replace('Adapter', ''),
            version: '1.0.0',
            capabilities: []
        };
    }

    validateCredentials(credentials) {
        const errors = [];
        if (!credentials.apiKey) errors.push('API key is required');
        if (!credentials.apiSecret) errors.push('API secret is required');
        return errors;
    }

    formatError(error) {
        return {
            message: error.message,
            code: error.code || 'UNKNOWN_ERROR',
            timestamp: new Date().toISOString()
        };
    }
}

export default BaseAdapter;
