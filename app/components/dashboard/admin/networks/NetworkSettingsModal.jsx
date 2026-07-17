// app/components/dashboard/admin/networks/NetworkSettingsModal.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { showSuccessToast, showErrorToast } from '@/lib/toast-utils';
import { decrypt, isEncrypted, encrypt } from '@/lib/encryption';
import {
  X,
  Save,
  RefreshCw,
  AlertCircle,
  Wifi,
  Eye,
  EyeOff
} from 'lucide-react';
import adapterManager from '@/lib/adapters/adapter-manager';

export default function NetworkSettingsModal({ network, isOpen, onClose, onSave }) {
  const [settings, setSettings] = useState({
    autoSync: true,
    syncFrequency: '6h',
    reportEmails: true,
    emailFrequency: 'daily',
    notifications: true,
    credentials: {} // For editing credentials
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [fieldVisibility, setFieldVisibility] = useState({
    sid: false,
    clientId: false,
    clientSecret: false
  });
  const [testResult, setTestResult] = useState(null);

  // Initialize settings when network changes
  useEffect(() => {
    if (network && network.credentials) {
      // Decrypt credentials for editing
      let decryptedCredentials = {};

      try {
        if (network.credentials.apiKey && isEncrypted(network.credentials.apiKey)) {
          decryptedCredentials.sid = decrypt(network.credentials.apiKey);
        } else {
          decryptedCredentials.sid = network.credentials.apiKey || network.credentials.sid || '';
        }

        if (network.credentials.apiSecret && isEncrypted(network.credentials.apiSecret)) {
          decryptedCredentials.clientSecret = decrypt(network.credentials.apiSecret);
        } else {
          decryptedCredentials.clientSecret = network.credentials.apiSecret || network.credentials.clientSecret || '';
        }

        // For Rakuten, clientId might be stored separately or might not exist
        decryptedCredentials.clientId = network.credentials.clientId || '';

      } catch (error) {
        console.warn('Failed to decrypt credentials:', error);
        // Fallback to raw values if decryption fails
        decryptedCredentials = {
          sid: network.credentials.sid || network.credentials.apiKey || '',
          clientId: network.credentials.clientId || '',
          clientSecret: network.credentials.clientSecret || network.credentials.apiSecret || ''
        };
      }

      setSettings({
        autoSync: network.autoSync !== undefined ? network.autoSync : true,
        syncFrequency: network.syncFrequency || '6h',
        reportEmails: network.reportEmails !== undefined ? network.reportEmails : true,
        emailFrequency: network.emailFrequency || 'daily',
        notifications: network.notifications !== undefined ? network.notifications : true,
        credentials: decryptedCredentials
      });
    }
  }, [network]);

  const handleSave = async () => {
    setIsLoading(true);

    try {
      const updateData = {
        id: network.id,
        ...settings,
        settings: {
          emailReports: settings.reportEmails,
          emailFrequency: settings.emailFrequency,
          notifications: settings.notifications
        }
      };

      // Map form fields back to database fields and encrypt
      const encryptedCredentials = {};

      // Map Rakuten form fields to database fields
      if (updateData.credentials.sid) {
        encryptedCredentials.apiKey = encrypt(updateData.credentials.sid);
      }

      if (updateData.credentials.clientId) {
        encryptedCredentials.clientId = updateData.credentials.clientId; // Client ID doesn't need encryption
      }

      if (updateData.credentials.clientSecret) {
        encryptedCredentials.apiSecret = encrypt(updateData.credentials.clientSecret);
      }

      updateData.credentials = encryptedCredentials;

      onSave(updateData); // Parent handles fetch
      showSuccessToast('Settings Updated', 'Network settings saved successfully.');
      onClose();
    } catch (error) {
      showErrorToast('Update Failed', 'Failed to update settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    if (!network.adapter) {
      showErrorToast('Test Failed', 'Adapter not configured.');
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const adapter = adapterManager.getAdapter(network.adapter);
      const result = await adapter.testConnection(settings.credentials);

      setTestResult(result);
      if (result.success) {
        showSuccessToast('Test Successful', 'API connection verified.');
      } else {
        showErrorToast('Test Failed', result.message);
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: error.message
      });
      showErrorToast('Test Failed', error.message);
    } finally {
      setIsTesting(false);
    }
  };

  const handleCredentialsChange = (credField, value) => {
    setSettings(prev => ({
      ...prev,
      credentials: { ...prev.credentials, [credField]: value }
    }));
  };

  const toggleFieldVisibility = (field) => {
    setFieldVisibility(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  if (!isOpen || !network) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Wifi className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{network.name} Settings</h2>
              <p className="text-slate-600 text-sm">Configure network integration and preferences</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
          <div className="space-y-6">

            {/* API Configuration */}
            <Card className="bg-white border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wifi className="w-5 h-5 text-green-600" />
                  API Configuration
                </CardTitle>
                <CardDescription>
                  Manage your API credentials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Credentials
                  </label>
                  <div className="space-y-2">
                    {network.adapter === 'rakuten' && (
                      <>
                        <div className="relative">
                          <label className="text-xs text-slate-500">SID (Account ID)</label>
                          <Input
                            type={fieldVisibility.sid ? "text" : "password"}
                            value={settings.credentials.sid || ''}
                            onChange={(e) => handleCredentialsChange('sid', e.target.value)}
                            className="mt-1 pr-10"
                            placeholder="Enter SID"
                          />
                          <button
                            type="button"
                            onClick={() => toggleFieldVisibility('sid')}
                            className="absolute right-3 top-8 text-slate-400 hover:text-slate-600"
                          >
                            {fieldVisibility.sid ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 " />}
                          </button>
                        </div>
                        <div className="relative">
                          <label className="text-xs text-slate-500">Client ID</label>
                          <Input
                            type={fieldVisibility.clientId ? "text" : "password"}
                            value={settings.credentials.clientId || ''}
                            onChange={(e) => handleCredentialsChange('clientId', e.target.value)}
                            className="mt-1 pr-10"
                            placeholder="Enter Client ID"
                          />
                          <button
                            type="button"
                            onClick={() => toggleFieldVisibility('clientId')}
                            className="absolute right-3 top-8 text-slate-400 hover:text-slate-600"
                          >
                            {fieldVisibility.clientId ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        <div className="relative">
                          <label className="text-xs text-slate-500">Client Secret</label>
                          <Input
                            type={fieldVisibility.clientSecret ? "text" : "password"}
                            value={settings.credentials.clientSecret || ''}
                            onChange={(e) => handleCredentialsChange('clientSecret', e.target.value)}
                            className="mt-1 pr-10"
                            placeholder="Enter Client Secret"
                          />
                          <button
                            type="button"
                            onClick={() => toggleFieldVisibility('clientSecret')}
                            className="absolute right-3 top-8 text-slate-400 hover:text-slate-600"
                          >
                            {fieldVisibility.clientSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </>
                    )}
                    {/* Add other adapter-specific fields here */}
                  </div>

                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <AlertCircle className="w-4 h-4" />
            Changes will take effect immediately
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-[#4BA4B4] hover:bg-[#3a8a99] flex items-center gap-2"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
