// app/dashboard/networks/page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Separator } from '@/app/components/ui/separator';
import {
  showSuccessToast,
  showErrorToast,
  showNetworkSuccessToast,
  showNetworkErrorToast
} from '@/lib/toast-utils'; // Fixed imports
import {
  Search,
  Plus,
  Settings,
  Link2,
  Activity,
  Users,
  DollarSign,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
} from 'lucide-react';
import NetworkSettingsModal from '@/app/components/dashboard/admin/networks/NetworkSettingsModal.jsx';
import RakutenSetupModal from '@/app/components/dashboard/admin/networks/RakutenSetupModal';

export default function NetworksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [networks, setNetworks] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isRakutenModalOpen, setIsRakutenModalOpen] = useState(false);

  // Fetch networks on component mount
  useEffect(() => {
    fetchNetworks();
  }, []);

  const fetchNetworks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/networks');
      const result = await response.json();

      if (result.success) {
        setNetworks(result.data);
      } else {
        showErrorToast('Failed to Load', result.error || 'Could not fetch networks');
      }
    } catch (error) {
      console.error('Failed to fetch networks:', error);
      showErrorToast('Network Error', 'Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNetworkAdded = (newNetwork) => {
    setNetworks(prev => [newNetwork, ...prev]);
    showNetworkSuccessToast(newNetwork.name);
  };

  const filteredNetworks = networks.filter(network =>
    network.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    network.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const config = {
      connected: { variant: 'default', icon: CheckCircle2, label: 'Connected', color: 'text-green-600' },
      pending: { variant: 'secondary', icon: Clock, label: 'Pending', color: 'text-amber-600' },
      disconnected: { variant: 'destructive', icon: XCircle, label: 'Disconnected', color: 'text-red-600' }
    };

    const { variant, icon: Icon, label, color } = config[status] || config.pending;

    return (
      <Badge variant={variant} className="flex items-center gap-1 w-fit">
        <Icon className={`w-3 h-3 ${color}`} />
        {label}
      </Badge>
    );
  };

  const getApiStatusBadge = (status) => {
    return (
      <Badge
        variant="outline"
        className={`text-xs ${status === 'active' ? 'bg-green-50 text-green-700 border-green-200' :
          status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
            'bg-red-50 text-red-700 border-red-200'
          }`}
      >
        {status === 'active' ? 'API Active' : status === 'pending' ? 'API Pending' : 'API Inactive'}
      </Badge>
    );
  };

  const handleSettingsClick = (network) => {
    setSelectedNetwork(network);
    setIsSettingsModalOpen(true);
  };

  const handleSaveSettings = async (settings) => {
    try {
      const response = await fetch('/api/admin/networks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedNetwork.id,
          ...settings
        }),
      });

      const result = await response.json();

      if (result.success) {
        setNetworks(prev =>
          prev.map(network =>
            network.id === selectedNetwork.id ? result.data : network
          )
        );
        showSuccessToast('Settings Updated', 'Network settings saved successfully.');
      } else {
        showErrorToast('Update Failed', result.error);
      }
    } catch (error) {
      showErrorToast('Update Failed', 'Failed to update settings. Please try again.');
    }
  };

  // Calculate stats from real data
  const stats = {
    connected: networks.filter(n => n.status === 'connected').length,
    totalEarnings: networks.reduce((sum, network) => sum + (network.earnings || 0), 0),
    totalMerchants: networks.reduce((sum, network) => {
      const rawCount = network.merchantCount ?? network.merchants ?? 0;
      const parsedCount = parseInt(rawCount, 10);
      return sum + (Number.isNaN(parsedCount) ? 0 : parsedCount);
    }, 0),
    activeSync: networks.filter(n => n.apiStatus === 'active').length
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-10">

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Affiliate Networks</h1>
              <p className="text-slate-600 mt-2">Manage your connected affiliate networks and track performance</p>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search networks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4"
                />
              </div>
              <Button
                variant="outline"
                onClick={fetchNetworks}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button onClick={() => setIsRakutenModalOpen(true)} className="bg-[#4BA4B4] hover:bg-[#3a8a99]">
                <Plus className="w-4 h-4 mr-2" />
                Add Network
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Connected Networks</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.connected}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <Link2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-slate-900">${stats.totalEarnings.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Merchants</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.totalMerchants.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Sync Status</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.activeSync}/{networks.length} Active</p>
                </div>
                <div className="p-3 bg-amber-100 rounded-lg">
                  <Activity className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Networks Table */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">Connected Networks</CardTitle>
                <CardDescription>
                  Manage your affiliate network connections and monitor performance
                </CardDescription>
              </div>
              <Badge variant="outline" className="w-fit mt-2 sm:mt-0">
                {filteredNetworks.length} Networks
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* Table */}
            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Network</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Commission</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Merchants</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Earnings</th>
                    <th className="text-right py-4 px-6 text-sm font-semibold text-slate-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredNetworks.map((network) => (
                    <tr key={network.id || network._id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                            <Link2 className="w-5 h-5 text-slate-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{network.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {network.adapter || 'Unknown'}
                              </Badge>
                              {getApiStatusBadge(network.apiStatus)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {getStatusBadge(network.status)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="font-semibold text-slate-900">{network.commission}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="text-slate-900">{network.merchantCount || 0}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-slate-900">${network.totalEarnings?.toLocaleString() || '0'}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSettingsClick(network)}
                            title="Network Settings"
                          >
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredNetworks.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Link2 className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No networks found</h3>
                <p className="text-slate-600 mb-4">Get started by adding your first affiliate network</p>
                <Button onClick={() => setIsRakutenModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Network
                </Button>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <RefreshCw className="w-8 h-8 text-slate-400 animate-spin mx-auto mb-4" />
                <p className="text-slate-600">Loading networks...</p>
              </div>
            )}

            {/* Connection Status Legend */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <span className="font-medium">Status Legend:</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Connected</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-600" />
                <span>Disconnected</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Modal Components*/}
        <NetworkSettingsModal
          network={selectedNetwork}
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
          onSave={handleSaveSettings}
        />

        <RakutenSetupModal
          isOpen={isRakutenModalOpen}
          onClose={() => setIsRakutenModalOpen(false)}
          onNetworkAdded={handleNetworkAdded}
        />

      </div>
    </div>
  );
}
