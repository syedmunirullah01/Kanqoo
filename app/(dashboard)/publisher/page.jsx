// app/publisher/page.jsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PublisherHeader from '@/app/components/dashboard/publisher/PublisherHeader';
import PerformanceCard from '@/app/components/dashboard/publisher/PerformanceCard';
import EarningsOverview from '@/app/components/dashboard/publisher/EarningsOverview';
import QuickStats from '@/app/components/dashboard/publisher/QuickStats';
import QuickActions from '@/app/components/dashboard/publisher/QuickActions';
import RecentLinks from '@/app/components/dashboard/publisher/RecentLinks';
import PromotedMerchantsCard from '@/app/components/dashboard/publisher/PromotedMerchantsCard';

export default function PublisherPage() {
    const [urlInput, setUrlInput] = useState('');
    const router = useRouter();

    const openLinkManager = () => {
        router.push('/publisher/marketplace');
    };

    const openPerformance = () => {
        router.push('/publisher/performance');
    };

    const openWithdraw = () => {
        router.push('/publisher/withdraw');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 py-8">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-10">
                <PublisherHeader />
                
                {/* 3-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
                    {/* Column 1 - Performance Overview */}
                    <div className="lg:col-span-3 space-y-6">
                        <PerformanceCard onViewDetails={openPerformance} isMinimal />
                        <PromotedMerchantsCard />
                    </div>

                    {/* Column 2 - Main Content */}
                    <div className="lg:col-span-6 space-y-6">
                        <EarningsOverview onWithdraw={openWithdraw} />
                        <QuickStats />
                    </div>

                    {/* Column 3 - Quick Actions & Links */}
                    <div className="lg:col-span-3 space-y-6">
                        <QuickActions 
                            onCreateLink={() => setUrlInput('https://')}
                            onAnalytics={openPerformance}
                            onReferrals={() => router.push('/publisher/referrals')}
                            onWithdraw={openWithdraw}
                        />
                        <RecentLinks onManageLinks={openLinkManager} />
                    </div>
                </div>
            </div>
        </div>
    );
}
