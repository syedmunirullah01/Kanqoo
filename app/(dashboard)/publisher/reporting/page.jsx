// app/publisher/reporting/page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Button } from '@/app/components/ui/button';
import { subDays, startOfDay, endOfDay } from 'date-fns';
import { Download, Filter, DollarSign, BarChart3, Target } from 'lucide-react';
import ReportingFilters from '@/app/components/dashboard/publisher/reporting/ReportingFilters';
import KpiCards from '@/app/components/dashboard/publisher/reporting/KpiCards';
import PerformanceChart from '@/app/components/dashboard/publisher/reporting/PerformanceChart';
import AdvertiserPerformanceTable from '@/app/components/dashboard/publisher/reporting/AdvertiserPerformanceTable';
import SubIdPerformanceTable from '@/app/components/dashboard/publisher/reporting/SubIdPerformanceTable';
import TransactionLogTable from '@/app/components/dashboard/publisher/reporting/TransactionLogTable';
import { mockTransactions, mockAdvertiserPerformance, mockSubIdPerformance, mockChartData } from '@/lib/mockReportingData';

const FALLBACK_DATE_RANGE = (() => {
    const now = new Date();
    return { from: subDays(now, 30), to: now };
})();

const DEFAULT_DATE_RANGE = (() => {
    if (!mockTransactions.length) {
        return FALLBACK_DATE_RANGE;
    }

    const timestamps = mockTransactions
        .map((txn) => new Date(txn.timestamp))
        .filter((date) => !Number.isNaN(date.getTime()));

    if (!timestamps.length) {
        return FALLBACK_DATE_RANGE;
    }

    const minDate = timestamps.reduce((min, current) => (current < min ? current : min), timestamps[0]);
    const maxDate = timestamps.reduce((max, current) => (current > max ? current : max), timestamps[0]);

    return {
        from: startOfDay(minDate),
        to: endOfDay(maxDate),
    };
})();

export default function ReportingPage() {
    const [dateRange, setDateRange] = useState(() => ({
        from: DEFAULT_DATE_RANGE.from ? new Date(DEFAULT_DATE_RANGE.from) : undefined,
        to: DEFAULT_DATE_RANGE.to ? new Date(DEFAULT_DATE_RANGE.to) : undefined,
    }));
    const [selectedAdvertisers, setSelectedAdvertisers] = useState([]);
    const [customId, setCustomId] = useState('');
    const [chartMetric, setChartMetric] = useState('commission');
    const [filteredData, setFilteredData] = useState({
        transactions: [],
        advertiserPerformance: [],
        subIdPerformance: [],
        chartData: []
    });

    // Apply filters
    useEffect(() => {
        let filteredTransactions = [...mockTransactions];
        let filteredAdvertiserPerformance = [...mockAdvertiserPerformance];
        let filteredSubIdPerformance = [...mockSubIdPerformance];
        let filteredChartData = [...mockChartData];

        // Filter by date range
        if (dateRange?.from || dateRange?.to) {
            const from = dateRange?.from ? startOfDay(dateRange.from) : null;
            const to = dateRange?.to ? endOfDay(dateRange.to) : null;

            filteredTransactions = filteredTransactions.filter((txn) => {
                const txnDate = new Date(txn.timestamp);
                if (Number.isNaN(txnDate.getTime())) {
                    return false;
                }
                if (from && txnDate < from) return false;
                if (to && txnDate > to) return false;
                return true;
            });

            filteredChartData = filteredChartData.filter((point) => {
                const pointDate = new Date(point.date);
                if (Number.isNaN(pointDate.getTime())) {
                    return false;
                }
                if (from && pointDate < from) return false;
                if (to && pointDate > to) return false;
                return true;
            });
        }

        // Filter by advertisers
        if (selectedAdvertisers.length > 0) {
            filteredTransactions = filteredTransactions.filter(txn =>
                selectedAdvertisers.includes(txn.advertiserName)
            );
            filteredAdvertiserPerformance = filteredAdvertiserPerformance.filter(item =>
                selectedAdvertisers.includes(item.advertiserName)
            );
        }

        // Filter by custom ID
        if (customId) {
            filteredTransactions = filteredTransactions.filter(txn =>
                txn.subid.toLowerCase().includes(customId.toLowerCase())
            );
            filteredSubIdPerformance = filteredSubIdPerformance.filter(item =>
                item.subid.toLowerCase().includes(customId.toLowerCase())
            );
        }

        setFilteredData({
            transactions: filteredTransactions,
            advertiserPerformance: filteredAdvertiserPerformance,
            subIdPerformance: filteredSubIdPerformance,
            chartData: filteredChartData
        });
    }, [dateRange, selectedAdvertisers, customId]);

    // Calculate KPIs from filtered data
    const calculateKPIs = () => {
        const transactions = filteredData.transactions;

        const totalCommission = transactions
            .filter(txn => txn.status === 'Approved')
            .reduce((sum, txn) => sum + txn.commissionAmount, 0);

        const totalSales = transactions
            .filter(txn => txn.status === 'Approved')
            .reduce((sum, txn) => sum + txn.saleAmount, 0);

        const totalOrders = transactions.filter(txn => txn.status === 'Approved').length;

        // For demo, we'll calculate clicks from performance data
        const totalClicks = filteredData.advertiserPerformance.reduce((sum, item) => sum + item.clicks, 0);

        const conversionRate = totalClicks > 0 ? (totalOrders / totalClicks) * 100 : 0;
        const epc = totalClicks > 0 ? totalCommission / totalClicks : 0;

        return {
            totalCommission,
            totalSales,
            totalOrders,
            totalClicks,
            conversionRate,
            epc
        };
    };

    const kpis = calculateKPIs();

    const handleExport = () => {
        // Implement export functionality
        console.log('Exporting data...');
    };

    return (
        // <div className="min-h-screen bg-[var(--color-bg)] py-8">
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 py-8">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-10">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                Performance Reporting
                            </h1>
                            <p className="text-lg text-slate-600 mt-2 flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-blue-500" />
                                Track your earnings and optimize your strategy
                            </p>
                        </div>
                        <Button
                            onClick={handleExport}
                            variant="outline"
                            className="border-slate-300 text-slate-700 hover:bg-slate-50"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Export Report
                        </Button>
                    </div>
                </div>

                {/* Global Filters */}
                <ReportingFilters
                    dateRange={dateRange}
                    onDateRangeChange={(range) => {
                        if (!range) {
                            setDateRange({ from: undefined, to: undefined });
                            return;
                        }
                        let { from, to } = range;
                        if (from && !to) {
                            to = from;
                        }
                        if (from && to && to < from) {
                            const temp = from;
                            from = to;
                            to = temp;
                        }
                        setDateRange({
                            from: from ? new Date(from) : undefined,
                            to: to ? new Date(to) : undefined,
                        });
                    }}
                    selectedAdvertisers={selectedAdvertisers}
                    onAdvertisersChange={setSelectedAdvertisers}
                    customId={customId}
                    onCustomIdChange={setCustomId}
                    defaultDateRange={DEFAULT_DATE_RANGE}
                />

                {/* KPI Cards */}
                <div className="mb-8">
                    <KpiCards kpis={kpis} />
                </div>

                {/* Performance Chart */}
                <div className="mb-8">
                    <PerformanceChart
                        data={filteredData.chartData}
                        metric={chartMetric}
                        onMetricChange={setChartMetric}
                    />
                </div>

                {/* Detailed Reports */}
                <Card className="border-slate-200/60 shadow-lg backdrop-blur-sm bg-white/70">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-xl font-semibold text-slate-900">
                            Detailed Performance Reports
                        </CardTitle>
                        <CardDescription>
                            Analyze your performance by advertiser, custom IDs, and individual transactions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="advertisers" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-3 bg-slate-100/50 p-1 rounded-2xl">
                                <TabsTrigger value="advertisers" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                    <Target className="w-4 h-4 mr-2" />
                                    By Advertiser
                                </TabsTrigger>
                                <TabsTrigger value="subids" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                    <Filter className="w-4 h-4 mr-2" />
                                    By Custom ID
                                </TabsTrigger>
                                <TabsTrigger value="transactions" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                    <DollarSign className="w-4 h-4 mr-2" />
                                    Transaction Log
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="advertisers">
                                <AdvertiserPerformanceTable data={filteredData.advertiserPerformance} />
                            </TabsContent>

                            <TabsContent value="subids">
                                <SubIdPerformanceTable data={filteredData.subIdPerformance} />
                            </TabsContent>

                            <TabsContent value="transactions">
                                <TransactionLogTable data={filteredData.transactions} />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
