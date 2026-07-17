"use client"

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import {
    Search, Download, RefreshCw, Building, Globe, Filter, ChevronDown, Eye,
    Calendar, Link2, X, Clock, ChevronUp, DollarSign, ShoppingBag, Check
} from 'lucide-react';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { toast } from 'sonner';

// --- Debounce Hook (Utility) ---
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

// --- Merchant Details Modal (Refined) ---
function MerchantDetailsModal({ merchant, isOpen, onClose }) {
    if (!isOpen || !merchant) return null;

    const getNetworkBadge = (network) => {
        const config = {
            rakuten: { label: 'Rakuten', color: 'bg-blue-100 text-blue-800 border-blue-200' },
            cj: { label: 'CJ Affiliate', color: 'bg-purple-100 text-purple-800 border-purple-200' },
            awin: { label: 'Awin', color: 'bg-green-100 text-green-800 border-green-200' }
        };
        return config[network] || { label: network, color: 'bg-gray-100 text-gray-800 border-gray-200' };
    };

    const getStatusBadge = (s) => {
        const map = {
            active: 'bg-green-50 text-green-700 border-green-200',
            pending: 'bg-amber-50 text-amber-700 border-amber-200',
            inactive: 'bg-slate-100 text-slate-700 border-slate-200'
        };
        return map[s?.toLowerCase()] || 'bg-slate-100 text-slate-600 border-slate-200';
    };

    const networkBadge = getNetworkBadge(merchant.network);
    const statusBadge = getStatusBadge(merchant.status);

    return (
        // Modal window wrapper - yeh pehle se hi screen ke center mein hai
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#4BA4B4] to-[#B45B4B] rounded-xl flex items-center justify-center">
                            <Building className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{merchant.name}</h2>
                            <div className="flex items-center gap-3 mt-2">
                                <Badge className={networkBadge.color}>{networkBadge.label}</Badge>
                                <Badge variant="outline" className={statusBadge}>{merchant.status || 'Unknown'}</Badge>
                            </div>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-100">
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Scrollable Body */}
                <div className="overflow-y-auto flex-grow p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-slate-50 rounded-xl p-4 text-center">
                            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <div className="text-lg font-bold text-slate-900 truncate">{merchant.commission || 'N/A'}</div>
                            <div className="text-sm text-slate-600">Commission</div>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 text-center">
                            <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                            <div className="text-lg font-bold text-slate-900">{merchant.returnDays || 'N/A'} days</div>
                            <div className="text-sm text-slate-600">Return Days</div>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 text-center">
                            <ShoppingBag className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <div className="text-lg font-bold text-slate-900 truncate">{merchant.categories?.[0] || 'N/A'}</div>
                            <div className="text-sm text-slate-600">Main Category</div>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 text-center">
                            <Check className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                            {/* Code is correct, needs new data from sync */}
                            <div className="text-lg font-bold text-slate-900 truncate capitalize">{merchant.status || 'N/A'}</div>
                            <div className="text-sm text-slate-600">Partnership</div>
                        </div>
                    </div>

                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Building className="w-5 h-5 text-[#4BA4B4]" />
                                Merchant Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-slate-600">MID</label>
                                    <p className="text-slate-900 font-semibold">{merchant.mid}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-600">Country</label>
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-slate-500" />
                                        <p className="text-slate-900 font-semibold">{merchant.country || '—'}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-600">Description</label>
                                <p className="text-slate-700 mt-1 text-sm max-h-32 overflow-y-auto">{merchant.description || 'No description available.'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-600">Categories</label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {merchant.categories?.length ? merchant.categories.map(cat => (
                                        <Badge key={cat} variant="outline" className="bg-slate-100 text-slate-700">{cat}</Badge>
                                    )) : <span className="text-sm text-slate-500">—</span>}
                                </div>
                            </div>

                            {/* **CHANGE: "Ships To" section add kar diya hai** */}
                            <div>
                                <label className="text-sm font-medium text-slate-600">Ships To</label>
                                <div className="flex flex-wrap gap-1.5 mt-2 max-h-24 overflow-y-auto p-2 bg-slate-50 rounded-md border border-slate-200">
                                    {merchant.shipsTo?.length ? merchant.shipsTo.map(countryCode => (
                                        <Badge key={countryCode} variant="outline" className="bg-white text-slate-700 font-mono text-xs border-slate-300">
                                            {countryCode}
                                        </Badge>
                                    )) : <span className="text-sm text-slate-500 px-1">—</span>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Footer */}
                <div className="flex-shrink-0 flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4" />
                        Last updated: {new Date(merchant.updatedAt).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" onClick={onClose}>Close</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Main Page Component ---
export default function MerchantsPage() {
    // Filters State
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedNetwork, setSelectedNetwork] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedCountry, setSelectedCountry] = useState('all');

    // Debounced value for API calls
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    // Data & Loading State
    const [isLoading, setIsLoading] = useState(true); // For initial page load
    const [isFetching, setIsFetching] = useState(false); // For "Fetch" button
    const [isFetchingMore, setIsFetchingMore] = useState(false); // For "Load More"
    const [error, setError] = useState(null);
    const [merchants, setMerchants] = useState([]);
    const [lastSynced, setLastSynced] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [totalAvailable, setTotalAvailable] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    // Modal State
    const [selectedMerchant, setSelectedMerchant] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Scroll State
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Job State for Background Awin Commission Sync
    const [syncJob, setSyncJob] = useState(null);
    const [showProgressCard, setShowProgressCard] = useState(false);

    const fetchJobStatus = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/awin/commissions/status');
            const data = await res.json();
            if (data?.success && data?.data) {
                setSyncJob(data.data);
                if (data.data.status === 'running') {
                    setShowProgressCard(true);
                }
            }
        } catch (e) {
            console.error('Failed to fetch sync job status:', e);
        }
    }, []);

    useEffect(() => {
        fetchJobStatus();
    }, [fetchJobStatus]);

    useEffect(() => {
        if (syncJob?.status !== 'running') return;
        const interval = setInterval(() => {
            fetchJobStatus();
        }, 5000);
        return () => clearInterval(interval);
    }, [syncJob?.status, fetchJobStatus]);

    const handleStartCommissionJob = async () => {
        setIsFetching(true);
        const toastId = toast.loading('Starting Awin commission sync job...');
        try {
            const res = await fetch('/api/admin/awin/commissions/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ staleHours: 24, limit: 20 }),
            });
            const data = await res.json();
            if (!res.ok || !data?.success) {
                throw new Error(data?.error || 'Failed to start job');
            }
            setSyncJob(data.data);
            setShowProgressCard(true);
            toast.success('Awin commission sync job started successfully.', { id: toastId });
            loadMerchants({ page: 1, append: false });
        } catch (e) {
            toast.error(e.message || 'Failed to start job', { id: toastId });
        } finally {
            setIsFetching(false);
        }
    };

    const handleTriggerTick = async () => {
        setIsFetching(true);
        const toastId = toast.loading('Running Awin commission sync tick...');
        try {
            const res = await fetch('/api/admin/awin/commissions/tick', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok || !data?.success) {
                throw new Error(data?.error || 'Tick failed');
            }
            if (data.job) {
                setSyncJob(data.job);
            }
            toast.success(data.message || 'Tick completed.', { id: toastId });
            loadMerchants({ page: 1, append: false });
        } catch (e) {
            toast.error(e.message || 'Tick failed', { id: toastId });
        } finally {
            setIsFetching(false);
        }
    };

    const PAGE_SIZE = 50;

    const handleExport = () => {
        if (!merchants || merchants.length === 0) {
            toast.error('No merchants to export');
            return;
        }
        
        const headers = ['Merchant Name', 'MID', 'Network', 'Categories', 'Country', 'Commission', 'Status'];
        const csvRows = merchants.map(m => {
            const categories = m.categories?.length ? `"${m.categories.join(', ')}"` : 'N/A';
            return `"${m.name || ''}","${m.mid || ''}","${m.network || ''}",${categories},"${m.country || ''}","${m.commission || ''}","${m.status || ''}"`;
        });
        
        const csvContent = [headers.join(','), ...csvRows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `merchants_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Export completed successfully');
    };

    // Filter options (could be dynamic, but static for now)
    const networks = useMemo(() => [
        { value: 'all', label: 'All Networks' },
        { value: 'rakuten', label: 'Rakuten' },
        { value: 'awin', label: 'Awin' },
    ], []);

    // Dynamically computed categories based on merchants shown below
    const categories = useMemo(() => {
        const set = new Set();
        merchants.forEach((m) => {
            if (Array.isArray(m.categories)) {
                m.categories.forEach(cat => {
                    if (cat && cat.trim()) set.add(cat.trim());
                });
            }
        });
        const sorted = Array.from(set).sort((a, b) => a.localeCompare(b));
        return [
            { value: 'all', label: 'All Categories' },
            ...sorted.map(cat => ({ value: cat, label: cat }))
        ];
    }, [merchants]);

    // Dynamically computed countries based on merchants shown below
    const countries = useMemo(() => {
        const set = new Set();
        merchants.forEach((m) => {
            if (m.country && m.country.trim()) {
                set.add(m.country.trim());
            }
        });
        const sorted = Array.from(set).sort((a, b) => a.localeCompare(b));
        return [
            { value: 'all', label: 'All Countries' },
            ...sorted.map(c => ({ value: c, label: c }))
        ];
    }, [merchants]);

    // --- Data Fetching ---
    const loadMerchants = useCallback(async ({ page = 1, append = false } = {}) => {
        if (append) setIsFetchingMore(true); else setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                page: String(page),
                limit: String(PAGE_SIZE),
            });

            if (debouncedSearchTerm) params.set('search', debouncedSearchTerm);
            if (selectedNetwork !== 'all') params.set('network', selectedNetwork);
            if (selectedCategory !== 'all') params.set('category', selectedCategory);
            if (selectedCountry !== 'all') params.set('country', selectedCountry);

            const response = await fetch(`/api/admin/merchants?${params.toString()}`, { cache: 'no-store' });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || `Failed to fetch merchants (${response.status})`);
            }

            const payload = await response.json();
            const normalized = payload.data.map(m => ({ ...m, id: m._id?.toString() || m.id }));

            setMerchants(prev => append ? [...prev, ...normalized] : normalized);
            setTotalAvailable(payload.total);
            setCurrentPage(payload.page);
            setHasMore(payload.hasMore);

        } catch (err) {
            setError(err.message);
            toast.error(err.message || 'Failed to load merchants');
        } finally {
            if (append) setIsFetchingMore(false); else setIsLoading(false);
        }
    }, [PAGE_SIZE, debouncedSearchTerm, selectedNetwork, selectedCategory, selectedCountry]);

    // --- Syncing ---
    const handleSyncNetwork = async (networkToSync) => {
        setIsFetching(true);
        setError(null);
        let toastId;
        try {
            if (networkToSync === 'rakuten') {
                toastId = toast.loading('Rakuten merchant sync started...');
            } else if (networkToSync === 'awin') {
                toastId = toast.loading('Awin merchant sync started...');
            } else if (networkToSync === 'awin-commissions') {
                toastId = toast.loading('Awin commission sync started...');
            } else {
                toastId = toast.loading('All networks sync started...');
            }

            let totalSynced = 0;
            let totalRecordsParsed = 0;
            let showAwinZeroWarning = false;

            const performSync = async (endpoint, label) => {
                const res = await fetch(endpoint, { method: 'POST' });
                const result = await res.json();
                
                if (!res.ok || result?.success === false) {
                    throw new Error(result?.error || `${label} sync failed (${res.status})`);
                }
                
                console.log(`${label} Sync Result:`, result);
                
                const synced = Number.isFinite(result?.totalSynced) ? result.totalSynced : 0;
                const parsed = Number.isFinite(result?.totalRecordsParsed) ? result.totalRecordsParsed : 0;
                
                if (label === 'Awin' && synced === 0) {
                    showAwinZeroWarning = true;
                }
                
                totalSynced += synced;
                totalRecordsParsed += parsed;
            };

            if (networkToSync === 'rakuten') {
                await performSync('/api/admin/merchants', 'Rakuten');
                setLastSynced(new Date().toISOString());
                toast.success(`Sync complete · ${totalSynced} Rakuten merchants updated`, { id: toastId });
            } else if (networkToSync === 'awin') {
                await performSync('/api/admin/awin/merchants/sync', 'Awin');
                setLastSynced(new Date().toISOString());
                if (showAwinZeroWarning) {
                    toast.warning('Awin sync completed but 0 joined programmes returned. Check Awin account approval, publisher ID, token permissions, or relationship=joined.', { id: toastId, duration: 8000 });
                } else {
                    toast.success(`Sync complete · ${totalSynced} Awin merchants updated`, { id: toastId });
                }
            } else if (networkToSync === 'awin-commissions') {
                const res = await fetch('/api/admin/awin/commissions/sync?limit=20', { method: 'POST' });
                const result = await res.json();
                if (!res.ok || result?.success === false) {
                    throw new Error(result?.error || `Awin Commissions sync failed (${res.status})`);
                }
                const updated = result?.updated ?? 0;
                const processed = result?.processed ?? 0;
                const remaining = result?.remaining ?? 0;
                setLastSynced(new Date().toISOString());
                toast.success(`Awin commission sync completed · ${updated} updated · ${processed} processed · ${remaining} remaining`, { id: toastId });
            } else if (networkToSync === 'all') {
                // Sequential execution of both sync endpoints
                await performSync('/api/admin/merchants', 'Rakuten');
                await performSync('/api/admin/awin/merchants/sync', 'Awin');
                setLastSynced(new Date().toISOString());
                if (showAwinZeroWarning) {
                    toast.warning(`All networks sync completed. Total: ${totalSynced} merchants updated. Note: Awin returned 0 joined programmes. Check Awin account approval, publisher ID, token permissions, or relationship=joined.`, { id: toastId, duration: 8000 });
                } else {
                    toast.success(`All networks sync completed · ${totalSynced} merchants updated · ${totalRecordsParsed} records parsed`, { id: toastId });
                }
            }

            // After sync, reload the first page with current filters
            loadMerchants({ page: 1, append: false });

        } catch (err) {
            toast.error(err.message || 'Sync failed', { id: toastId });
            setError(err.message);
        } finally {
            setIsFetching(false);
        }
    };

    // --- Effects ---
    // Load merchants on initial render and when filters change
    useEffect(() => {
        loadMerchants({ page: 1, append: false });
    }, [loadMerchants]); // loadMerchants is memoized with useCallback

    // Scroll listener
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- Render Helpers ---
    const getStatusBadge = (s) => {
        const map = {
            active: 'bg-green-50 text-green-700 border-green-200',
            pending: 'bg-amber-50 text-amber-700 border-amber-200',
            inactive: 'bg-slate-100 text-slate-700 border-slate-200'
        };
        return map[s?.toLowerCase()] || 'bg-slate-100 text-slate-600 border-slate-200';
    };

    const merchantStats = useMemo(() => {
        const total = Number.isFinite(totalAvailable) ? totalAvailable : merchants.length;
        let activeCount = 0;
        let pendingCount = 0;
        const countryCounts = new Map();
        const categoryCounts = new Map();
        const commissionValues = [];

        merchants.forEach((merchant) => {
            const status = (merchant.status || '').toLowerCase();
            if (status === 'active') activeCount += 1;
            if (status === 'pending') pendingCount += 1;

            const country = merchant.country;
            if (country) {
                countryCounts.set(country, (countryCounts.get(country) || 0) + 1);
            }

            if (Array.isArray(merchant.categories)) {
                merchant.categories.forEach((category) => {
                    if (!category) return;
                    const key = category.trim();
                    if (!key) return;
                    categoryCounts.set(key, (categoryCounts.get(key) || 0) + 1);
                });
            }

            if (merchant.commission) {
                const match = merchant.commission.match(/(\d+(\.\d+)?)/);
                if (match) {
                    commissionValues.push(parseFloat(match[1]));
                }
            }
        });

        const uniqueCountries = countryCounts.size;
        const topCountry = Array.from(countryCounts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
        const topCategory = Array.from(categoryCounts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
        const averageCommission = commissionValues.length
            ? commissionValues.reduce((sum, value) => sum + value, 0) / commissionValues.length
            : null;

        return {
            total,
            activeCount,
            pendingCount,
            uniqueCountries,
            topCountry,
            topCategory,
            averageCommission,
            commissionSampleSize: commissionValues.length,
            onPage: merchants.length,
        };
    }, [merchants, totalAvailable]);

    return (
        <div className="min-h-screen bg-slate-50/30 py-6">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-20">

                {/* --- Header --- */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Merchants</h1>
                            <p className="text-slate-600 mt-2">Manage your affiliate merchants.</p>
                            {lastSynced && (
                                <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                                    <Calendar className="w-4 h-4" />
                                    Last synced: {new Date(lastSynced).toLocaleString()}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-4 sm:mt-0">
                            <Button variant="outline" onClick={handleExport} className="flex items-center gap-2">
                                <Download className="w-4 h-4" /> Export
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button disabled={isFetching} className="flex items-center gap-2 bg-[#4BA4B4] hover:bg-[#3a8a99] min-w-[180px]">
                                        <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                                        {isFetching ? 'Syncing Data...' : 'Sync Merchant Data'}
                                        <ChevronDown className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleSyncNetwork('rakuten')} disabled={isFetching}>
                                        Sync Rakuten Merchants
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleSyncNetwork('awin')} disabled={isFetching}>
                                        Sync Awin Merchants
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleSyncNetwork('awin-commissions')} disabled={isFetching}>
                                        Sync Awin Commissions
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleSyncNetwork('all')} disabled={isFetching}>
                                        Sync All Merchants
                                    </DropdownMenuItem>
                                    <div className="h-px bg-slate-100 my-1" />
                                    <DropdownMenuItem onClick={handleStartCommissionJob} disabled={isFetching || syncJob?.status === 'running'}>
                                        Start Awin Commission Sync
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleTriggerTick} disabled={isFetching}>
                                        Run Awin Commission Tick Now
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setShowProgressCard(true)}>
                                        View Awin Commission Progress
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>

                {/* --- Awin Commission Sync Progress Card --- */}
                {showProgressCard && syncJob && (
                    <Card className="bg-slate-900 text-white border-slate-800 shadow-xl mb-10 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4">
                            <button onClick={() => setShowProgressCard(false)} className="text-slate-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <CardHeader className="border-b border-slate-800/80 pb-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ${syncJob.status === 'running' ? 'animate-pulse' : ''}`}>
                                    <RefreshCw className={`w-5 h-5 ${syncJob.status === 'running' ? 'animate-spin' : ''}`} />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-bold font-unbounded text-emerald-400">Awin Commission Sync Job</CardTitle>
                                    <CardDescription className="text-slate-400 text-sm">
                                        Background sync worker state
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Status</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`h-2.5 w-2.5 rounded-full ${
                                                syncJob.status === 'running' ? 'bg-amber-500 animate-pulse' :
                                                syncJob.status === 'completed' ? 'bg-emerald-500' :
                                                'bg-rose-500'
                                            }`} />
                                            <span className="text-sm font-semibold capitalize">{syncJob.status}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Progress</p>
                                        <p className="text-2xl font-bold mt-1 text-slate-100">{syncJob.processed?.toLocaleString() || 0} <span className="text-sm text-slate-400 font-normal">/ {syncJob.total?.toLocaleString() || 0} processed</span></p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Updated</p>
                                            <p className="text-lg font-semibold text-emerald-400 mt-1">{syncJob.updated?.toLocaleString() || 0}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Failed</p>
                                            <p className="text-lg font-semibold text-rose-400 mt-1">{syncJob.failed?.toLocaleString() || 0}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Remaining</p>
                                            <p className="text-lg font-semibold text-slate-300 mt-1">{syncJob.remaining?.toLocaleString() || 0}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Last Run At</p>
                                        <p className="text-sm text-slate-300 mt-1">
                                            {syncJob.lastRunAt ? new Date(syncJob.lastRunAt).toLocaleString() : 'Never'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            <span>Progress Bar</span>
                                            <span>{syncJob.percentage || 0}%</span>
                                        </div>
                                        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700">
                                            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500" style={{ width: `${syncJob.percentage || 0}%` }} />
                                        </div>
                                    </div>
                                    {syncJob.status === 'failed' && syncJob.error && (
                                        <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs flex gap-2">
                                            <span className="font-semibold flex-shrink-0">Error:</span>
                                            <span className="line-clamp-2">{syncJob.error}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* --- Merchant Snapshot Cards --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Total Merchants</p>
                                    <p className="text-2xl font-bold text-slate-900">{merchantStats.total.toLocaleString()}</p>
                                    <p className="text-xs text-slate-500 mt-2">
                                        Showing {merchantStats.onPage} in this view{merchantStats.topCategory ? ` · Top vertical: ${merchantStats.topCategory}` : ''}
                                    </p>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <ShoppingBag className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Active Partnerships</p>
                                    <p className="text-2xl font-bold text-slate-900">{merchantStats.activeCount}</p>
                                    <p className="text-xs text-slate-500 mt-2">{merchantStats.pendingCount} pending approval</p>
                                </div>
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <Check className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Average Commission</p>
                                    <p className="text-2xl font-bold text-slate-900">
                                        {merchantStats.averageCommission !== null ? `${merchantStats.averageCommission.toFixed(1)}%` : '—'}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-2">
                                        Based on {merchantStats.commissionSampleSize} merchants with terms
                                    </p>
                                </div>
                                <div className="p-3 bg-amber-100 rounded-lg">
                                    <DollarSign className="w-6 h-6 text-amber-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Global Coverage</p>
                                    <p className="text-2xl font-bold text-slate-900">{merchantStats.uniqueCountries}</p>
                                    <p className="text-xs text-slate-500 mt-2">
                                        Top market: {merchantStats.topCountry || '—'}
                                    </p>
                                </div>
                                <div className="p-3 bg-purple-100 rounded-lg">
                                    <Globe className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            {/* --- Error Message --- */}
            {error && (
                <div className="mb-8 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    onClick={() => setError(null)}
                >
                    <strong>Error:</strong> {error}
                </div>
            )}

            {/* --- Filters Card --- */}
            <Card className="bg-white border-slate-200 shadow-sm mb-6">
                <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        <div className="relative w-full lg:w-auto flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <Input placeholder="Search by name, MID, or category..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 w-full" />
                        </div>
                        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex items-center gap-2 flex-1 sm:flex-none justify-center">
                                        <Filter className="w-4 h-4" />
                                        <span className="truncate max-w-[100px] sm:max-w-none">{networks.find(n => n.value === selectedNetwork)?.label}</span>
                                        <ChevronDown className="w-4 h-4 flex-shrink-0" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {networks.map(n => <DropdownMenuItem key={n.value} onClick={() => setSelectedNetwork(n.value)}>{n.label}</DropdownMenuItem>)}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex items-center gap-2 flex-1 sm:flex-none justify-center">
                                        <Filter className="w-4 h-4" />
                                        <span className="truncate max-w-[100px] sm:max-w-none">{categories.find(c => c.value === selectedCategory)?.label}</span>
                                        <ChevronDown className="w-4 h-4 flex-shrink-0" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {categories.map(c => <DropdownMenuItem key={c.value} onClick={() => setSelectedCategory(c.value)}>{c.label}</DropdownMenuItem>)}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex items-center gap-2 flex-1 sm:flex-none justify-center">
                                        <Globe className="w-4 h-4" />
                                        <span className="truncate max-w-[100px] sm:max-w-none">{countries.find(c => c.value === selectedCountry)?.label}</span>
                                        <ChevronDown className="w-4 h-4 flex-shrink-0" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {countries.map(c => <DropdownMenuItem key={c.value} onClick={() => setSelectedCountry(c.value)}>{c.label}</DropdownMenuItem>)}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* --- Merchants Table Card --- */}
            <Card className="bg-white border-slate-200 shadow-sm w-full overflow-hidden">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-semibold">All Merchants</CardTitle>
                            <CardDescription>
                                Showing {merchants.length} of {totalAvailable} merchants
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50/50">
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Merchant Name</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Network</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Categories</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Country</th>
                                    {/* **CHANGE: Added Commission Header** */}
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Commission</th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Status</th>
                                    <th className="text-right py-4 px-6 text-sm font-semibold text-slate-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {isLoading ? (
                                    // Skeleton Loading
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td className="py-4 px-6"><div className="h-4 bg-slate-200 rounded w-3/4"></div></td>
                                            <td className="py-4 px-6"><div className="h-4 bg-slate-200 rounded w-1/2"></div></td>
                                            <td className="py-4 px-6"><div className="h-4 bg-slate-200 rounded w-full"></div></td>
                                            <td className="py-4 px-6"><div className="h-4 bg-slate-200 rounded w-1/4"></div></td>
                                            {/* **CHANGE: Added Commission Skeleton** */}
                                            <td className="py-4 px-6"><div className="h-4 bg-slate-200 rounded w-1/2"></div></td>
                                            <td className="py-4 px-6"><div className="h-4 bg-slate-200 rounded w-1/2"></div></td>
                                            <td className="py-4 px-6 text-right"><div className="h-8 bg-slate-200 rounded w-16 ml-auto"></div></td>
                                        </tr>
                                    ))
                                ) : merchants.length === 0 ? (
                                    <tr>
                                        {/* **CHANGE: Updated colSpan to 7** */}
                                        <td colSpan="7" className="py-12 px-6 text-center">
                                            <Search className="w-12 h-12 text-slate-300 mx-auto" />
                                            <h3 className="text-lg font-semibold text-slate-900 mt-4">No merchants found</h3>
                                            <p className="text-slate-500 mt-1">Try adjusting your search or filters.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    merchants.map(merchant => (
                                        <tr 
                                            key={merchant.id} 
                                            className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                                            onClick={() => { setSelectedMerchant(merchant); setIsModalOpen(true); }}
                                        >
                                            <td className="py-4 px-6">
                                                <div>
                                                    <div className="font-medium text-slate-900">{merchant.name}</div>
                                                    <div className="text-xs text-slate-500">MID: {merchant.mid}</div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <Badge variant="default" className="bg-blue-100 text-blue-800 border-blue-200 capitalize">{merchant.network}</Badge>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-slate-700 truncate max-w-xs">
                                                {merchant.categories?.length ? merchant.categories.join(', ') : '—'}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="text-sm">{merchant.country || '—'}</span>
                                            </td>
                                            {/* **CHANGE: Added Commission Data** */}
                                            <td className="py-4 px-6 text-sm text-slate-700 max-w-[150px] truncate" title={merchant.commission}>
                                                {merchant.commission || '—'}
                                            </td>
                                            <td className="py-4 px-6">
                                                <Badge variant="outline" className={`capitalize ${getStatusBadge(merchant.status)}`}>{merchant.status}</Badge>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <Button variant="outline" size="sm" onClick={() => { setSelectedMerchant(merchant); setIsModalOpen(true); }}>
                                                    <Eye className="w-4 h-4 mr-2" /> View
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* --- Load More Button --- */}
                    {hasMore && !isLoading && (
                        <div className="border-t border-slate-200 bg-slate-50/30 p-6 text-center">
                            <Button
                                onClick={() => loadMerchants({ page: currentPage + 1, append: true })}
                                className="bg-[#4BA4B4] hover:bg-[#3a8a99]"
                                disabled={isFetchingMore}
                            >
                                {isFetchingMore ? (
                                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                ) : null}
                                {isFetchingMore ? 'Loading...' : 'Load More'}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            </div>

            {/* --- Modal & Scroll-to-Top --- */}
            <MerchantDetailsModal merchant={selectedMerchant} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {showScrollTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-[#4BA4B4] to-[#B45B4B] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                    <ChevronUp className="w-6 h-6" />
                </button>
            )}
        </div>
    );
}
