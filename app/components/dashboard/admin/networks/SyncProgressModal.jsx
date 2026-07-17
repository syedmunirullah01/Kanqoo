// app\components\dashboard\admin\networks\SyncProgressModal.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import {
  X,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Database,
  TrendingUp,
  Users,
  DollarSign,
  Calendar
} from 'lucide-react';

export default function SyncProgressModal({ network, isOpen, onClose, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');
  const [syncDetails, setSyncDetails] = useState({
    merchants: 0,
    products: 0,
    commissions: 0,
    earnings: 0
  });

  const handleSync = async () => {
    setIsSyncing(true);
    setProgress(0);
    setSyncStatus('Initializing sync...');
    setSyncDetails({ merchants: 0, products: 0, commissions: 0, earnings: 0 });

    // Simulate sync steps with realistic timing
    const steps = [
      { status: 'Connecting to API...', duration: 1000, detail: 'Establishing secure connection' },
      { status: 'Authenticating credentials...', duration: 1500, detail: 'Verifying API access' },
      { status: 'Fetching merchant data...', duration: 2000, detail: 'Downloading merchant list' },
      { status: 'Syncing product catalog...', duration: 2500, detail: 'Updating product information' },
      { status: 'Processing commission rates...', duration: 1800, detail: 'Calculating commissions' },
      { status: 'Updating earnings data...', duration: 2200, detail: 'Syncing revenue figures' },
      { status: 'Finalizing sync...', duration: 1200, detail: 'Completing data integration' }
    ];

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      setSyncStatus(step.status);
      
      // Update progress
      setProgress(((i + 1) / steps.length) * 100);
      
      // Simulate data updates
      if (i === 2) setSyncDetails(prev => ({ ...prev, merchants: 1250 }));
      if (i === 3) setSyncDetails(prev => ({ ...prev, products: 45000 }));
      if (i === 4) setSyncDetails(prev => ({ ...prev, commissions: 342 }));
      if (i === 5) setSyncDetails(prev => ({ ...prev, earnings: 2450.75 }));

      await new Promise(resolve => setTimeout(resolve, step.duration));
    }

    setIsSyncing(false);
    setSyncStatus('Sync completed successfully!');
    
    // Auto close after success
    setTimeout(() => {
      onComplete();
      onClose();
    }, 2000);
  };

  // Start sync when modal opens
  useEffect(() => {
    if (isOpen && network) {
      handleSync();
    }
  }, [isOpen, network]);

  if (!isOpen || !network) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={!isSyncing ? onClose : undefined}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Syncing {network.name}</h2>
              <p className="text-slate-600 text-sm">Updating network data and performance metrics</p>
            </div>
          </div>
          {!isSyncing && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Sync Progress</span>
                <span className="font-medium text-slate-900">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Status Message */}
            <div className="text-center">
              <div className={`flex items-center justify-center gap-2 text-sm font-medium ${
                isSyncing ? 'text-blue-600' : 'text-green-600'
              }`}>
                {isSyncing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                {syncStatus}
              </div>
            </div>

            {/* Sync Details */}
            <Card className="bg-slate-50 border-slate-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-slate-900 mb-3">Sync Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-slate-600">Merchants</p>
                      <p className="font-semibold text-slate-900">{syncDetails.merchants.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-purple-600" />
                    <div>
                      <p className="text-slate-600">Products</p>
                      <p className="font-semibold text-slate-900">{syncDetails.products.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="text-slate-600">Commissions</p>
                      <p className="font-semibold text-slate-900">{syncDetails.commissions.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-amber-600" />
                    <div>
                      <p className="text-slate-600">Earnings</p>
                      <p className="font-semibold text-slate-900">${syncDetails.earnings.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Network Information */}
            <Card className="bg-white border-slate-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-slate-900 mb-3">Network Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Network:</span>
                    <p className="font-medium text-slate-900">{network.name}</p>
                  </div>
                  <div>
                    <span className="text-slate-600">Last Sync:</span>
                    <p className="font-medium text-slate-900">{network.lastSync}</p>
                  </div>
                  <div>
                    <span className="text-slate-600">Status:</span>
                    <Badge variant={network.status === 'connected' ? 'default' : 'secondary'}>
                      {network.status}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-slate-600">API:</span>
                    <Badge variant={network.apiStatus === 'active' ? 'default' : 'destructive'}>
                      {network.apiStatus}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            {!isSyncing && progress === 100 && (
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-green-900">Sync Completed</h4>
                      <p className="text-sm text-green-700">
                        All data has been successfully synchronized. Performance metrics are now up to date.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Error State (for demo) */}
            {!isSyncing && progress < 100 && progress > 0 && (
              <Card className="bg-amber-50 border border-amber-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-amber-900">Sync in Progress</h4>
                      <p className="text-sm text-amber-700">
                        Please don't close this window while synchronization is in progress.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-6 border-t border-slate-200 bg-slate-50">
          {!isSyncing && (
            <Button onClick={onClose} className="bg-[#4BA4B4] hover:bg-[#3a8a99]">
              {progress === 100 ? 'View Results' : 'Close'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}