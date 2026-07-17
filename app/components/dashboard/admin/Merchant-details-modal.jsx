// app/components/merchant-details-modal.jsx
import React from 'react';
import {
    X,
    Building,
    DollarSign,
    Globe,
    Users,
    Star,
    Calendar,
    TrendingUp,
    Link2,
    ShoppingBag,
    Clock,
    Award,
    BarChart3,
    ExternalLink
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Separator } from '@/app/components/ui/separator';
import {
    Check,
    Smartphone,
    Zap,
    Gift,
    Mail,
    FileText
} from 'lucide-react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/app/components/ui/card';
export default function MerchantDetailsModal({ merchant, isOpen, onClose }) {
    if (!isOpen || !merchant) return null;

    const getNetworkBadge = (network) => {
        const config = {
            rakuten: { variant: 'default', label: 'Rakuten', color: 'bg-blue-100 text-blue-800 border-blue-200' },
            cj: { variant: 'secondary', label: 'CJ Affiliate', color: 'bg-purple-100 text-purple-800 border-purple-200' },
            aewin: { variant: 'outline', label: 'Awin', color: 'bg-green-100 text-green-800 border-green-200' }
        };
        return config[network] || { variant: 'outline', label: network, color: 'bg-gray-100 text-gray-800 border-gray-200' };
    };

    const getCountryFlag = (countryCode) => {
        const flags = {
            US: '🇺🇸',
            UK: '🇬🇧',
            DE: '🇩🇪',
            FR: '🇫🇷',
            CA: '🇨🇦',
            AU: '🇦🇺'
        };
        return flags[countryCode] || '🌐';
    };

    const networkBadge = getNetworkBadge(merchant.network);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#4BA4B4] to-[#B45B4B] rounded-xl flex items-center justify-center">
                            <Building className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 unbounded-600">{merchant.name}</h2>
                            <div className="flex items-center gap-3 mt-2">
                                <Badge className={networkBadge.color}>
                                    {networkBadge.label}
                                </Badge>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    Active
                                </Badge>
                            </div>
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

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                    <div className="p-6">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-slate-50 rounded-xl p-4 text-center">
                                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-slate-900">{merchant.commission}</div>
                                <div className="text-sm text-slate-600">Commission</div>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4 text-center">
                                <Star className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-slate-900">{merchant.rating}</div>
                                <div className="text-sm text-slate-600">Rating</div>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4 text-center">
                                <ShoppingBag className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-slate-900">{merchant.products}</div>
                                <div className="text-sm text-slate-600">Products</div>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4 text-center">
                                <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-slate-900">{merchant.payout || '30 days'}</div>
                                <div className="text-sm text-slate-600">Payout</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column - Basic Info */}
                            <div className="space-y-6">
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
                                                <label className="text-sm font-medium text-slate-600">Category</label>
                                                <p className="text-slate-900 font-semibold">{merchant.category}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-slate-600">Country</label>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">{getCountryFlag(merchant.country)}</span>
                                                    <p className="text-slate-900 font-semibold">{merchant.country}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-slate-600">Description</label>
                                            <p className="text-slate-700 mt-1">
                                                {merchant.description || 'Leading brand offering premium products and services with excellent affiliate support and timely payouts.'}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white border-slate-200 shadow-sm">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5 text-[#B45B4B]" />
                                            Performance Metrics
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-slate-600">Conversion Rate</span>
                                                <span className="font-semibold text-slate-900">3.2%</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-slate-600">Average Order Value</span>
                                                <span className="font-semibold text-slate-900">$89.50</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-slate-600">EPC (Earnings Per Click)</span>
                                                <span className="font-semibold text-slate-900">$0.45</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-slate-600">Cookie Duration</span>
                                                <span className="font-semibold text-slate-900">30 days</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column - Additional Info */}
                            <div className="space-y-6">
                                <Card className="bg-white border-slate-200 shadow-sm">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <Award className="w-5 h-5 text-amber-500" />
                                            Commission Details
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold text-amber-900">Base Commission</span>
                                                <Badge variant="default" className="bg-amber-500 text-white">
                                                    {merchant.commission}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-slate-600">Tiered Commissions</span>
                                                <span className="font-semibold text-slate-900">Available</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-slate-600">Performance Bonus</span>
                                                <span className="font-semibold text-slate-900">Up to 5%</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-slate-600">Seasonal Promotions</span>
                                                <span className="font-semibold text-slate-900">Yes</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white border-slate-200 shadow-sm">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <BarChart3 className="w-5 h-5 text-[#4BA4B4]" />
                                            Quick Actions
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <Button className="w-full bg-[#4BA4B4] hover:bg-[#3a8a99] flex items-center gap-2">
                                            <Link2 className="w-4 h-4" />
                                            Create Tracking Link
                                        </Button>
                                        <Button variant="outline" className="w-full flex items-center gap-2">
                                            <ExternalLink className="w-4 h-4" />
                                            Visit Merchant Site
                                        </Button>
                                        <Button variant="outline" className="w-full flex items-center gap-2">
                                            <BarChart3 className="w-4 h-4" />
                                            View Analytics
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white border-slate-200 shadow-sm">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-[#B45B4B]" />
                                            Last Updated
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-600">Data Refresh</span>
                                            <span className="font-semibold text-slate-900">
                                                {merchant.lastUpdated || '2024-01-15'}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Additional Features */}
                        <div className="mt-8">
                            <Card className="bg-white border-slate-200 shadow-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Users className="w-5 h-5 text-[#4BA4B4]" />
                                        Program Features
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                                <Check className="w-4 h-4 text-green-600" />
                                            </div>
                                            <span className="text-sm font-medium text-slate-900">Deep Linking</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <Smartphone className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <span className="text-sm font-medium text-slate-900">Mobile Tracking</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                                <Zap className="w-4 h-4 text-purple-600" />
                                            </div>
                                            <span className="text-sm font-medium text-slate-900">Real-time Stats</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                                                <Gift className="w-4 h-4 text-amber-600" />
                                            </div>
                                            <span className="text-sm font-medium text-slate-900">Promo Tools</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                                <Mail className="w-4 h-4 text-red-600" />
                                            </div>
                                            <span className="text-sm font-medium text-slate-900">Email Support</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                                <FileText className="w-4 h-4 text-indigo-600" />
                                            </div>
                                            <span className="text-sm font-medium text-slate-900">API Access</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4" />
                        Last synced: {merchant.lastUpdated || '2024-01-15'}
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                        <Button className="bg-[#4BA4B4] hover:bg-[#3a8a99] flex items-center gap-2">
                            <Link2 className="w-4 h-4" />
                            Create Link
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

