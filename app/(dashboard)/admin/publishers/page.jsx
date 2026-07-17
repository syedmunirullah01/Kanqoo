// app/dashboard/publishers/page.jsx - Updated with real data, modals
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { showSuccessToast, showErrorToast } from '@/lib/toast-utils';
import {
    Search,
    Filter,
    User,
    Mail,
    Calendar,
    DollarSign,
    CheckCircle2,
    Clock,
    XCircle,
    Eye,
    Edit,
    Trash2,
    Download,
    Users,
    TrendingUp,
    BarChart3,
    RefreshCw,
    RotateCcw,
    AlertTriangle,
    Archive,
    SlidersHorizontal,
    X
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { Checkbox } from '@/app/components/ui/checkbox';
import PublisherEditModal from '@/app/components/dashboard/admin/publishers/PublisherEditModal';
import PublisherDetailsModal from '@/app/components/dashboard/admin/publishers/PublisherDetailsModal';

export default function PublishersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [publishers, setPublishers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPublisher, setSelectedPublisher] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [detailPublisher, setDetailPublisher] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [statusFilters, setStatusFilters] = useState([]);
    const [roleFilters, setRoleFilters] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const statusOptions = useMemo(() => ([
        { value: 'approved', label: 'Approved' },
        { value: 'pending', label: 'Pending' },
        { value: 'suspended', label: 'Suspended' },
        { value: 'declined', label: 'Declined' },
        { value: 'faded', label: 'Deletion Pending' },
    ]), []);

    const roleOptions = useMemo(() => ([
        { value: 'publisher', label: 'Publisher' },
        { value: 'social media manager', label: 'Social Media Manager' },
        { value: 'data entry', label: 'Data Entry' },
        { value: 'admin', label: 'Admin' },
    ]), []);

    useEffect(() => {
        fetchPublishers();
    }, []);

    const toggleFilterValue = (value, setFilter) => {
        const normalized = value.toLowerCase();
        setFilter((prev) => {
            if (prev.includes(normalized)) {
                return prev.filter((item) => item !== normalized);
            }
            return [...prev, normalized];
        });
    };

    const resetFilters = () => {
        setStatusFilters([]);
        setRoleFilters([]);
    };

    const fetchPublishers = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/admin/publishers');
            const result = await response.json();

            if (result.success) {
                setPublishers(result.data);
            }
        } catch (error) {
            showErrorToast('Fetch Failed', 'Failed to load publishers.');
        } finally {
            setIsLoading(false);
        }
    };

    const searchQuery = searchTerm.trim().toLowerCase();
    const filteredPublishers = publishers.filter((publisher) => {
        const composite = `${publisher.fullName || ''} ${publisher.email || ''} ${publisher.role || ''}`;
        const matchesSearch = !searchQuery || composite.toLowerCase().includes(searchQuery);
        const matchesStatus =
            statusFilters.length === 0 ||
            statusFilters.includes((publisher.status || 'pending').toLowerCase());
        const matchesRole =
            roleFilters.length === 0 ||
            roleFilters.includes((publisher.role || '').toLowerCase());
        return matchesSearch && matchesStatus && matchesRole;
    });

    const totalPublishers = publishers.length;
    const approvedPublishers = publishers.filter((p) => p.status === 'approved').length;
    const pendingPublishers = publishers.filter((p) => p.status === 'pending').length;
    const suspendedPublishers = publishers.filter((p) => p.status === 'suspended').length;
    const declinedPublishers = publishers.filter((p) => p.status === 'declined').length;
    const fadedPublishers = publishers.filter((p) => p.status === 'faded').length;
    const activeFilterCount = statusFilters.length + roleFilters.length;
    const hasActiveFilters = activeFilterCount > 0;

    const parseCurrency = (value) => {
        if (!value) return 0;
        const amount = parseFloat(String(value).replace(/[^0-9.-]+/g, ''));
        return Number.isNaN(amount) ? 0 : amount;
    };

    const parsePercentage = (value) => {
        if (!value) return null;
        const percentage = parseFloat(String(value).replace('%', ''));
        return Number.isNaN(percentage) ? null : percentage;
    };

    const totalRevenue = publishers.reduce((sum, publisher) => sum + parseCurrency(publisher.totalEarnings), 0);
    const avgRevShareValue = (() => {
        const values = publishers
            .filter((publisher) => publisher.role === 'publisher')
            .map((publisher) => parsePercentage(publisher.revShare))
            .filter((value) => value !== null);
        if (!values.length) return null;
        const total = values.reduce((acc, curr) => acc + curr, 0);
        return Math.round(total / values.length);
    })();
    const activeThisMonth = approvedPublishers;

    const formatDate = (value) => {
        if (!value) return 'N/A';
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
    };

    const getStatusBadge = (status) => {
        const config = {
            approved: { variant: 'default', icon: CheckCircle2, label: 'Approved', color: 'text-green-600' },
            pending: { variant: 'secondary', icon: Clock, label: 'Pending', color: 'text-amber-600' },
            suspended: { variant: 'destructive', icon: XCircle, label: 'Suspended', color: 'text-red-600' },
            declined: { variant: 'destructive', icon: AlertTriangle, label: 'Declined', color: 'text-red-500' },
            faded: { variant: 'outline', icon: Archive, label: 'Deletion Pending', color: 'text-slate-600' }
        };

        const { variant, icon: Icon, label, color } = config[status] || config.pending;

        return (
            <Badge variant={variant} className="flex items-center gap-1 w-fit">
                <Icon className={`w-3 h-3 ${color}`} />
                {label}
            </Badge>
        );
    };

    const getPerformanceBadge = (earnings) => {
        const num = parseCurrency(earnings);
        const config = {
            excellent: num > 2000,
            good: num > 1000,
            new: num === 0
        };
        const perf = config.excellent ? 'excellent' : config.good ? 'good' : 'new';
        const label = perf === 'excellent' ? 'Excellent' : perf === 'good' ? 'Good' : 'New';

        return (
            <Badge variant="outline" className={`text-xs ${perf === 'excellent' ? 'bg-green-100 text-green-800' : perf === 'good' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'}`}>
                {label}
            </Badge>
        );
    };

    const handleSuspendPublisher = async (publisherId) => {
        try {
            const response = await fetch('/api/admin/publishers', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: publisherId, status: 'suspended' })
            });
            const result = await response.json();

            if (result.success) {
                setPublishers((prev) => prev.map((p) => (p.id === publisherId ? result.data : p)));
                if (detailPublisher?.id === publisherId) {
                    setDetailPublisher(result.data);
                }
                showSuccessToast('Publisher Suspended', 'Publisher has been suspended.');
            } else {
                showErrorToast('Suspend Failed', result.error);
            }
        } catch (error) {
            showErrorToast('Suspend Failed', 'Failed to suspend publisher.');
        }
    };

    const handleApprovePublisher = async (publisherId) => {
        try {
            const response = await fetch('/api/admin/publishers', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: publisherId, status: 'approved' })
            });
            const result = await response.json();

            if (result.success) {
                setPublishers((prev) => prev.map((p) => (p.id === publisherId ? result.data : p)));
                if (detailPublisher?.id === publisherId) {
                    setDetailPublisher(result.data);
                }
                showSuccessToast('Publisher Approved', 'Publisher has been approved.');
            } else {
                showErrorToast('Approve Failed', result.error);
            }
        } catch (error) {
            showErrorToast('Approve Failed', 'Failed to approve publisher.');
        }
    };

    const handleDeletePublisher = async (publisherId) => {
        const confirmDelete = window.confirm('This will deactivate the publisher and schedule permanent deletion in 30 days. Continue?');
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/admin/publishers?id=${publisherId}`, {
                method: 'DELETE',
            });
            const result = await response.json();

            if (result.success) {
                if (result.data) {
                    setPublishers((prev) => prev.map((publisher) => (publisher.id === publisherId ? result.data : publisher)));
                    if (detailPublisher?.id === publisherId) {
                        setDetailPublisher(result.data);
                    }
                } else {
                    setPublishers((prev) => prev.filter((publisher) => publisher.id !== publisherId));
                    if (detailPublisher?.id === publisherId) {
                        setDetailPublisher(null);
                        setIsDetailsModalOpen(false);
                    }
                }
                showSuccessToast('Deletion Scheduled', 'Publisher will be permanently removed after 30 days unless revived.');
            } else {
                showErrorToast('Delete Failed', result.error || 'Failed to schedule deletion.');
            }
        } catch (error) {
            showErrorToast('Delete Failed', 'Failed to schedule deletion.');
        }
    };

    const handleRevivePublisher = async (publisherId) => {
        const confirmRestore = window.confirm('Restore this publisher and reactivate their access?');
        if (!confirmRestore) return;

        try {
            const response = await fetch('/api/admin/publishers', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: publisherId, action: 'revive' })
            });
            const result = await response.json();

            if (result.success) {
                setPublishers((prev) => prev.map((publisher) => (publisher.id === publisherId ? result.data : publisher)));
                if (detailPublisher?.id === publisherId) {
                    setDetailPublisher(result.data);
                }
                showSuccessToast('Publisher Restored', 'The account is active again.');
            } else {
                showErrorToast('Restore Failed', result.error || 'Failed to restore publisher.');
            }
        } catch (error) {
            showErrorToast('Restore Failed', 'Failed to restore publisher.');
        }
    };

    const handleEditPublisher = (publisher) => {
        setSelectedPublisher(publisher);
        setIsEditModalOpen(true);
    };

    const handleViewPublisher = (publisher) => {
        setDetailPublisher(publisher);
        setIsDetailsModalOpen(true);
    };

    const handleSavePublisher = (updatedPublisher) => {
        setPublishers((prev) => prev.map((p) => (p.id === updatedPublisher.id ? updatedPublisher : p)));
        if (detailPublisher?.id === updatedPublisher.id) {
            setDetailPublisher(updatedPublisher);
        }
        setIsEditModalOpen(false);
        setSelectedPublisher(null);
    };

    const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    const formatCurrency = (value) => currencyFormatter.format(parseCurrency(value));

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-10">

                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Publishers</h1>
                            <p className="text-slate-600 mt-2">Monitor registered publishers, social media managers, data entry members, and administrators.</p>
                        </div>
                        <div className="flex items-center gap-3 mt-4 sm:mt-0">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                    placeholder="Search members..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4"
                                />
                            </div>
                        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                        className={`flex items-center gap-2 ${hasActiveFilters ? 'border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100' : ''}`}
                                    >
                                        <SlidersHorizontal className="w-4 h-4" />
                                        {hasActiveFilters ? `Filters (${activeFilterCount})` : 'Filters'}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent align="end" className="w-80 p-0">
                                    <div className="p-4 space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="text-sm font-semibold text-slate-900">Filter Publishers</h4>
                                                <p className="text-xs text-slate-500">Narrow by status or team role.</p>
                                            </div>
                                            {hasActiveFilters && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-slate-500 hover:text-slate-700"
                                                    onClick={() => {
                                                        resetFilters();
                                                        setIsFilterOpen(false);
                                                    }}
                                                >
                                                    Clear
                                                </Button>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Status</p>
                                                <div className="space-y-2">
                                                    {statusOptions.map((status) => {
                                                        const checked = statusFilters.includes(status.value);
                                                        return (
                                                            <label
                                                                key={status.value}
                                                                htmlFor={`status-${status.value}`}
                                                                className="flex items-center justify-between gap-3 text-sm text-slate-700"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <Checkbox
                                                                        id={`status-${status.value}`}
                                                                        checked={checked}
                                                                        onCheckedChange={() => toggleFilterValue(status.value, setStatusFilters)}
                                                                    />
                                                                    <span className="capitalize">{status.label}</span>
                                                                </div>
                                                                {checked && <Badge variant="outline" className="text-xs capitalize">{status.label}</Badge>}
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Role</p>
                                                <div className="space-y-2">
                                                    {roleOptions.map((role) => {
                                                        const checked = roleFilters.includes(role.value);
                                                        return (
                                                            <label
                                                                key={role.value}
                                                                htmlFor={`role-${role.value}`}
                                                                className="flex items-center justify-between gap-3 text-sm text-slate-700"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <Checkbox
                                                                        id={`role-${role.value}`}
                                                                        checked={checked}
                                                                        onCheckedChange={() => toggleFilterValue(role.value, setRoleFilters)}
                                                                    />
                                                                    <span className="capitalize">{role.label}</span>
                                                                </div>
                                                                {checked && <Badge variant="outline" className="text-xs capitalize">{role.label}</Badge>}
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={fetchPublishers}
                                disabled={isLoading}
                                className="flex items-center gap-2 border border-slate-200 text-slate-600 hover:text-slate-800 hover:border-slate-300"
                                title="Refresh publisher list"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Refresh
                            </Button>
                        </div>
                    </div>
                </div>

                {hasActiveFilters && (
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                        {statusFilters.map((status) => (
                            <Badge key={`status-chip-${status}`} variant="secondary" className="flex items-center gap-1 capitalize bg-blue-50 text-blue-700 border-blue-200">
                                {statusOptions.find((option) => option.value === status)?.label || status}
                                <button
                                    type="button"
                                    className="ml-1 text-blue-500 hover:text-blue-700"
                                    onClick={() => toggleFilterValue(status, setStatusFilters)}
                                    aria-label={`Remove ${status} filter`}
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </Badge>
                        ))}
                        {roleFilters.map((role) => (
                            <Badge key={`role-chip-${role}`} variant="secondary" className="flex items-center gap-1 capitalize bg-purple-50 text-purple-700 border-purple-200">
                                {roleOptions.find((option) => option.value === role)?.label || role}
                                <button
                                    type="button"
                                    className="ml-1 text-purple-500 hover:text-purple-700"
                                    onClick={() => toggleFilterValue(role, setRoleFilters)}
                                    aria-label={`Remove ${role} filter`}
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </Badge>
                        ))}
                        <button
                            type="button"
                            className="text-xs text-slate-500 hover:text-slate-700 underline"
                            onClick={() => resetFilters()}
                        >
                            Clear all
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Total Accounts</p>
                                    <p className="text-2xl font-bold text-slate-900">{totalPublishers}</p>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Approved</p>
                                    <p className="text-2xl font-bold text-slate-900">{approvedPublishers}</p>
                                </div>
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Pending</p>
                                    <p className="text-2xl font-bold text-slate-900">{pendingPublishers}</p>
                                </div>
                                <div className="p-3 bg-amber-100 rounded-lg">
                                    <Clock className="w-6 h-6 text-amber-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Suspended</p>
                                    <p className="text-2xl font-bold text-slate-900">{suspendedPublishers}</p>
                                </div>
                                <div className="p-3 bg-red-100 rounded-lg">
                                    <XCircle className="w-6 h-6 text-red-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Declined</p>
                                    <p className="text-2xl font-bold text-slate-900">{declinedPublishers}</p>
                                </div>
                                <div className="p-3 bg-orange-100 rounded-lg">
                                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Deletion Pending</p>
                                    <p className="text-2xl font-bold text-slate-900">{fadedPublishers}</p>
                                </div>
                                <div className="p-3 bg-slate-100 rounded-lg">
                                    <Archive className="w-6 h-6 text-slate-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                                    <p className="text-2xl font-bold text-slate-900">{currencyFormatter.format(totalRevenue)}</p>
                                </div>
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Avg. Rev Share</p>
                                    <p className="text-2xl font-bold text-slate-900">{avgRevShareValue !== null ? `${avgRevShareValue}%` : 'N/A'}</p>
                                </div>
                                <div className="p-3 bg-purple-100 rounded-lg">
                                    <TrendingUp className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Active This Month</p>
                                    <p className="text-2xl font-bold text-slate-900">{activeThisMonth}/{totalPublishers}</p>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <BarChart3 className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="bg-white border-slate-200 shadow-sm">
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <CardTitle className="text-xl font-semibold">Team Management</CardTitle>
                                <CardDescription>
                                    Review and manage every registered publisher, social media manager, data entry teammate, and administrator.
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => {/* Export logic */ }}>
                                    <Download className="w-4 h-4" />
                                    Export
                                </Button>
                                <Badge variant="outline" className="text-sm">
                                    {filteredPublishers.length} Accounts
                                </Badge>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-lg border border-slate-200 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Publisher</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Status</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Rev Share</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Joined Date</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Earnings</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">Performance</th>
                                        <th className="text-right py-4 px-6 text-sm font-semibold text-slate-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {filteredPublishers.map((publisher) => (
                                        <tr key={publisher.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                                                        <User className="w-5 h-5 text-slate-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-900">{publisher.fullName}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <Mail className="w-3 h-3 text-slate-400" />
                                                            <span className="text-sm text-slate-600">{publisher.email}</span>
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-2 mt-2">
                                                            {publisher.role && (
                                                                <Badge variant="outline" className="text-xs capitalize">
                                                                    {publisher.role}
                                                                </Badge>
                                                            )}
                                                            {publisher.pubId && (
                                                                <Badge variant="outline" className="text-xs">
                                                                    {publisher.pubId}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                {getStatusBadge(publisher.status)}
                                                {publisher.status === 'faded' && (
                                                    <div className="mt-1 space-y-1">
                                                        {publisher.statusBeforeFade && (
                                                            <p className="text-xs text-slate-500">Previous: {publisher.statusBeforeFade}</p>
                                                        )}
                                                        {publisher.fadeUntil && (
                                                            <p className="text-xs text-slate-500">
                                                                Scheduled deletion: {formatDate(publisher.fadeUntil)}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-4 px-6">
                                                {publisher.role === 'publisher' ? (
                                                    <div className="flex items-center gap-2">
                                                        <DollarSign className="w-4 h-4 text-green-600" />
                                                        <span className="font-semibold text-slate-900">
                                                            {publisher.revShare || 'Not set'}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-slate-500">N/A</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-slate-400" />
                                                    <span className="text-slate-600 text-sm">{formatDate(publisher.createdAt)}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="space-y-1">
                                                    <div className="text-sm font-semibold text-slate-900">
                                                        {formatCurrency(publisher.totalEarnings)}
                                                    </div>
                                                    <div className="text-xs text-slate-500">
                                                        Pending: {formatCurrency(publisher.pendingEarnings)}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                {getPerformanceBadge(publisher.totalEarnings)}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleViewPublisher(publisher)}
                                                        className="h-8"
                                                        title="View publisher details"
                                                        aria-label="View publisher details"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleEditPublisher(publisher)}
                                                        className="h-8"
                                                        title="Edit publisher"
                                                        aria-label="Edit publisher"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    {['pending', 'declined'].includes(publisher.status) && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleApprovePublisher(publisher.id)}
                                                            className="h-8 text-green-600 border-green-200 hover:bg-green-50"
                                                            title="Approve publisher"
                                                            aria-label="Approve publisher"
                                                        >
                                                            <CheckCircle2 className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                    {publisher.status === 'approved' && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleSuspendPublisher(publisher.id)}
                                                            className="h-8 text-red-600 border-red-200 hover:bg-red-50"
                                                            title="Suspend publisher"
                                                            aria-label="Suspend publisher"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                    {publisher.status !== 'faded' ? (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleDeletePublisher(publisher.id)}
                                                            className="h-8 text-red-600 border-red-200 hover:bg-red-50"
                                                            title="Delete publisher"
                                                            aria-label="Delete publisher"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleRevivePublisher(publisher.id)}
                                                            className="h-8 text-blue-600 border-blue-200 hover:bg-blue-50"
                                                            title="Revive publisher"
                                                            aria-label="Revive publisher"
                                                        >
                                                            <RotateCcw className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => window.open(`mailto:${publisher.email}`, '_blank')}
                                                        className="h-8"
                                                        title="Send email"
                                                        aria-label="Send email"
                                                    >
                                                        <Mail className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredPublishers.length === 0 && !isLoading && (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">No accounts found</h3>
                                <p className="text-slate-600 mb-4">Adjust your search filters. New registrations will appear here automatically.</p>
                            </div>
                        )}

                        {isLoading && (
                            <div className="text-center py-12">
                                <RefreshCw className="w-8 h-8 text-slate-400 animate-spin mx-auto mb-4" />
                                <p className="text-slate-600">Loading publishers...</p>
                            </div>
                        )}

                        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                            <span className="font-medium">Status Legend:</span>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                <span>Approved</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-amber-600" />
                                <span>Pending</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <XCircle className="w-4 h-4 text-red-600" />
                                <span>Suspended</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-orange-600" />
                                <span>Declined</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Archive className="w-4 h-4 text-slate-600" />
                                <span>Deletion Pending</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <PublisherEditModal
                    publisher={selectedPublisher}
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedPublisher(null);
                    }}
                    onSave={handleSavePublisher}
                />
                <PublisherDetailsModal
                    publisher={detailPublisher}
                    isOpen={isDetailsModalOpen}
                    onClose={() => {
                        setIsDetailsModalOpen(false);
                        setDetailPublisher(null);
                    }}
                />
            </div>
        </div>
    );
}
