// app/dashboard/page.jsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Separator } from '@/app/components/ui/separator';
import { Progress } from '@/app/components/ui/progress';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import {
    TrendingUp,
    Zap,
    Link2,
    DollarSign,
    Eye,
    MousePointer,
    ShoppingCart,
    CreditCard,
    BarChart3,
    Crown,
    Settings,
    Rocket,
    Shield,
    Globe,
    Star
} from 'lucide-react';
import DashboardStats from '@/app/components/dashboard/DashboardStats';

export default function DashboardPage() {
    const [urlInput, setUrlInput] = useState('');
    const router = useRouter();

    const handleCreateLink = () => {
        if (urlInput.trim()) {
            console.log('Creating link for:', urlInput);
            alert(`Link created for: ${urlInput}`);
            setUrlInput('');
        }
    };

    const openLinkConverter = () => {
        router.push('/dashboard/link-converter');
    };

    const openEarningsDetails = () => {
        router.push('/dashboard/earnings');
    };

    const stats = [
        { icon: Eye, value: '75', label: 'Impressions', change: '+8%', color: 'blue' },
        { icon: MousePointer, value: '75', label: 'Clicks', change: '+15%', color: 'green' },
        { icon: ShoppingCart, value: '2', label: 'Orders', change: '+2', color: 'purple' },
        { icon: CreditCard, value: '$10.51', label: 'Commissions', change: '+$2.30', color: 'orange' },
    ];

    const premiumFeatures = [
        { icon: BarChart3, title: 'Advanced Analytics', description: 'Deep insights with custom reports' },
        { icon: Globe, title: 'Custom Domains', description: 'Branded links with your domain' },
        { icon: Shield, title: 'Priority Support', description: '24/7 dedicated support team' },
        { icon: Rocket, title: 'API Access', description: 'Full API integration capabilities' },
    ];

    const getColorClasses = (color) => {
        const colors = {
            blue: 'from-blue-500 to-blue-600',
            green: 'from-green-500 to-green-600',
            purple: 'from-purple-500 to-purple-600',
            orange: 'from-orange-500 to-orange-600',
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 py-8">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-10">
                {/* Welcome Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                Welcome back, Buddy
                            </h1>
                            <p className="text-lg text-slate-600 mt-2 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-green-500" />
                                Your dashboard is performing great today
                            </p>
                        </div>
                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                                BD
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                {/* 3-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">

                    {/* Column 1 - Premium Features Banner */}
                    <div className="lg:col-span-3 h-full">
                        <Card className="border-0 shadow-lg h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full -translate-y-16 translate-x-16"></div>
                            <CardContent className="p-6 flex flex-col justify-between flex-1 relative z-10">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                                            <Crown className="w-6 h-6 text-yellow-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xl">Premium Plan</h3>
                                            <p className="text-slate-300 text-sm">Unlock full potential</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {premiumFeatures.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
                                                <feature.icon className="w-5 h-5 text-blue-400" />
                                                <div>
                                                    <p className="font-medium text-sm">{feature.title}</p>
                                                    <p className="text-slate-400 text-xs">{feature.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-300">Storage</span>
                                            <span className="font-medium">65% used</span>
                                        </div>
                                        <Progress value={65} className="h-2 bg-white/10" />
                                    </div>
                                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg">
                                        <Zap className="w-4 h-4 mr-2" />
                                        Upgrade to Pro
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Column 2 - Earnings & Insights */}
                    <div className="lg:col-span-6 space-y-6">

                        {/* Lifetime Earnings Card */}
                        <Card className="border-slate-200/60 shadow-lg backdrop-blur-sm bg-white/70">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                                        <DollarSign className="w-5 h-5 text-green-500" />
                                        Lifetime Earnings
                                    </CardTitle>
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                        <TrendingUp className="w-3 h-3 mr-1" />
                                        +12% growth
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Main Earnings */}
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/60 shadow-sm">
                                        <p className="text-sm text-slate-600 mb-2 font-medium">Total earnings</p>
                                        <p className="text-4xl font-bold text-slate-900 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                            $302.56
                                        </p>
                                        <div className="flex items-center gap-2 mt-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <p className="text-xs text-slate-500">Updated just now</p>
                                        </div>
                                    </div>

                                    {/* Breakdown */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-4 bg-slate-50/50 rounded-xl border border-slate-200/50">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-100 rounded-lg">
                                                    <ShoppingCart className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <span className="text-sm font-medium text-slate-600">Order earnings</span>
                                            </div>
                                            <span className="font-semibold text-slate-900">$302.56</span>
                                        </div>
                                        <div className="flex justify-between items-center p-4 bg-slate-50/50 rounded-xl border border-slate-200/50">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-amber-100 rounded-lg">
                                                    <Star className="w-4 h-4 text-amber-600" />
                                                </div>
                                                <span className="text-sm font-medium text-slate-600">Rewards</span>
                                            </div>
                                            <span className="font-semibold text-slate-900">$0</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Insights Card */}
                        <DashboardStats stats={stats} />
                    </div>

                    {/* Column 3 - Link Generation */}
                    <div className="lg:col-span-3 space-y-6">

                        {/* VOILA Banner */}
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                            <CardContent className="p-6 relative z-10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                            <Link2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">VOLA Link Converter</h3>
                                            <p className="text-purple-100 text-sm">Professional link management</p>
                                        </div>
                                    </div>
                                    <p className="text-purple-100 text-sm leading-relaxed">
                                        Generate commissioned links with advanced tracking and analytics.
                                    </p>
                                    <Button
                                        onClick={openLinkConverter}
                                        className="w-full bg-white text-purple-600 hover:bg-gray-50 font-semibold shadow-lg"
                                    >
                                        <Rocket className="w-4 h-4 mr-2" />
                                        Create Link
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Create Link Section */}
                        <Card className="border-slate-200/60 shadow-lg backdrop-blur-sm bg-white/70">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                    <Link2 className="w-5 h-5 text-blue-500" />
                                    Create Affiliate Link
                                </CardTitle>
                                <CardDescription className="flex items-center gap-2">
                                    <Settings className="w-4 h-4" />
                                    Quick link generator
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/60">
                                    <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                                    <p className="text-sm text-slate-700 flex-1">
                                        Paste any product or website URL to generate your affiliate link instantly.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <Input
                                        type="url"
                                        value={urlInput}
                                        onChange={(e) => setUrlInput(e.target.value)}
                                        placeholder="https://example.com/your-product"
                                        className="w-full border-slate-300 focus:border-blue-500"
                                    />
                                    <Button
                                        onClick={handleCreateLink}
                                        disabled={!urlInput.trim()}
                                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg disabled:opacity-50"
                                    >
                                        <Zap className="w-4 h-4 mr-2" />
                                        GENERATE LINK
                                    </Button>
                                </div>

                                <Separator className="bg-slate-200/60" />

                                <div className="text-xs text-slate-500 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                        <p>Real-time click tracking</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                        <p>Conversion analytics</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                                        <p>Customizable parameters</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}