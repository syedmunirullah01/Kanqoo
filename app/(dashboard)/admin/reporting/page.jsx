"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import {
  Download,
  RefreshCw,
  Search,
  BarChart3,
  Globe,
  LineChart,
  Target,
  ShieldCheck,
} from 'lucide-react';
import ReportingFilters from '@/app/components/dashboard/admin/reporting/reporting-filters';
import StatsCards from '@/app/components/dashboard/admin/reporting/stats-cards';
import CurrencyBreakdownAccordion from '@/app/components/dashboard/admin/reporting/currency-breakdown-accordion';

const NETWORK_LABELS = {
  US: 'United States',
  UK: 'United Kingdom',
  FR: 'France',
  DE: 'Germany',
  CA: 'Canada',
  BR: 'Brazil',
  JP: 'Japan',
  AU: 'Australia',
};

function formatDateInput(date) {
  const value = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(value.getTime())) {
    return '';
  }
  return value.toISOString().slice(0, 10);
}

function getYesterday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - 1);
  return date;
}

function computeDateRange(range) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const map = {
    today: { start: today, end: today },
    yesterday: { start: new Date(today.getTime() - 86400000), end: new Date(today.getTime() - 86400000) },
    last_7_days: { start: new Date(today.getTime() - 6 * 86400000), end: today },
    last_30_days: { start: new Date(today.getTime() - 29 * 86400000), end: today },
    last_90_days: { start: new Date(today.getTime() - 89 * 86400000), end: today },
    this_month: {
      start: new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1)),
      end: today,
    },
    last_month: (() => {
      const year = today.getUTCFullYear();
      const month = today.getUTCMonth();
      const start = new Date(Date.UTC(year, month - 1, 1));
      const end = new Date(Date.UTC(year, month, 0));
      return { start, end };
    })(),
  };

  const selected = map[range];
  if (!selected) {
    return null;
  }
  return {
    start: formatDateInput(selected.start),
    end: formatDateInput(selected.end),
  };
}

function createCurrencyOptions(rates) {
  if (!rates) return ['USD'];
  const keys = Object.keys(rates);
  return keys.length ? keys.sort() : ['USD'];
}

function formatCurrency(value, currency) {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency || 'USD',
    maximumFractionDigits: 2,
  });
  return formatter.format(Number(value) || 0);
}

export default function ReportingPage() {
  const [dateRange, setDateRange] = useState('custom');
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState(formatDateInput(getYesterday()));
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedAdvertiser, setSelectedAdvertiser] = useState('all');
  const [currency, setCurrency] = useState('USD');
  const [searchTerm, setSearchTerm] = useState('');

  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState(null);
  const [syncMessage, setSyncMessage] = useState(null);

  const fetchReport = useCallback(async ({ showSkeleton = false } = {}) => {
    setError(null);
    if (showSkeleton) {
      setIsLoading(true);
    } else {
      setIsApplying(true);
    }

    const params = new URLSearchParams();
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    if (currency) params.set('currency', currency);
    if (selectedCountry && selectedCountry !== 'all') params.set('networkCountry', selectedCountry);
    if (selectedAdvertiser && selectedAdvertiser !== 'all') params.set('advertiser', selectedAdvertiser);

    try {
      const response = await fetch(`/api/admin/reporting?${params.toString()}`, { cache: 'no-store' });
      const payload = await response.json();
      if (!response.ok || !payload.success) {
        throw new Error(payload.error || `Failed to load reporting data (${response.status})`);
      }
      setReportData(payload.data);
    } catch (err) {
      console.error('Reporting fetch failed:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
      setIsApplying(false);
    }
  }, [startDate, endDate, currency, selectedCountry, selectedAdvertiser]);

  const handleApplyFilters = useCallback(() => {
    fetchReport({ showSkeleton: false });
  }, [fetchReport]);

  const handleSyncReports = useCallback(async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    setError(null);

    try {
      const response = await fetch('/api/admin/reporting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDate,
          endDate,
        }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success) {
        throw new Error(payload.error || `Failed to sync reports (${response.status})`);
      }
      setSyncMessage(`Synced ${payload.data.upserted} new records across ${payload.data.totalNetworks} networks.`);
      await fetchReport({ showSkeleton: false });
    } catch (err) {
      console.error('Report sync failed:', err);
      setError(err.message);
    } finally {
      setIsSyncing(false);
    }
  }, [startDate, endDate, fetchReport]);

  useEffect(() => {
    fetchReport({ showSkeleton: true });
  }, [fetchReport]);

  useEffect(() => {
    if (dateRange === 'custom') return;
    const range = computeDateRange(dateRange);
    if (range) {
      setStartDate(range.start);
      setEndDate(range.end);
    }
  }, [dateRange]);

  const advertisersOptions = useMemo(() => {
    if (!reportData || !reportData.publishers) {
      return [{ value: 'all', label: 'All Advertisers' }];
    }
    const unique = new Set();
    reportData.publishers.forEach((publisher) => {
      (publisher.advertisers || []).forEach((adv) => {
        if (adv.name) unique.add(adv.name);
      });
    });
    const options = Array.from(unique).sort();
    return [
      { value: 'all', label: 'All Advertisers' },
      ...options.map((label) => ({ value: label, label })),
    ];
  }, [reportData]);

  const countriesOptions = useMemo(() => {
    if (!reportData || !reportData.networks) {
      return [{ value: 'all', label: 'All Countries' }];
    }
    const unique = new Map();
    reportData.networks.forEach((network) => {
      unique.set(network.country, NETWORK_LABELS[network.country] || network.country);
    });
    return [
      { value: 'all', label: 'All Countries' },
      ...Array.from(unique.entries()).map(([value, label]) => ({ value, label })),
    ];
  }, [reportData]);

  const currencyOptions = useMemo(() => {
    if (!reportData || !reportData.rates) {
      return ['USD'];
    }
    return createCurrencyOptions(reportData.rates.rates);
  }, [reportData]);

  const filteredPublishers = useMemo(() => {
    if (!reportData || !Array.isArray(reportData.publishers)) {
      return [];
    }
    const term = searchTerm.trim().toLowerCase();
    const list = term
      ? reportData.publishers.filter((publisher) => {
          const nameMatch = publisher.publisherName?.toLowerCase().includes(term);
          const memberMatch = publisher.memberId?.toLowerCase().includes(term);
          const advertiserMatch = (publisher.advertisers || []).some((adv) =>
            adv.name?.toLowerCase().includes(term)
          );
          return nameMatch || memberMatch || advertiserMatch;
        })
      : reportData.publishers;

    return list.map((publisher, index) => ({
      ...publisher,
      rank: index + 1,
    }));
  }, [reportData, searchTerm]);

  const summary = reportData?.summary;
  const totals = summary
    ? {
        clicks: summary.totalClicks || 0,
        orders: summary.totalOrders || 0,
        sales: summary.totalSales || 0,
        commission: summary.totalCommission || 0,
      }
    : { clicks: 0, orders: 0, sales: 0, commission: 0 };

  const conversionRate = summary?.conversionRate || 0;
  const averageEpc = summary?.averageEpc || 0;
  const topPublisher = summary?.topPublisherByEpc;

  const currencyBreakdown = reportData?.currencyBreakdown || [];
  const networks = reportData?.networks || [];

  const isInitialLoading = isLoading && !reportData;

  return (
    <div className="min-h-screen bg-slate-50/30 py-6">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-20">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Rakuten Reporting</h1>
            <p className="mt-2 text-sm text-slate-600">
              Analyze multi-country performance and commissions from January 1, 2025 through today.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <Badge variant="outline" className="bg-slate-100 text-slate-600">
                Range: {startDate} → {endDate}
              </Badge>
              <Badge variant="outline" className="bg-slate-100 text-slate-600">
                Display Currency: {currency}
              </Badge>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2" onClick={() => window.print()}>
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button
              onClick={handleSyncReports}
              disabled={isSyncing}
              className="flex items-center gap-2 bg-[#4BA4B4] hover:bg-[#3a8a99]"
            >
              <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync Reports'}
            </Button>
          </div>
        </div>

        <ReportingFilters
          dateRange={dateRange}
          setDateRange={setDateRange}
          startDate={startDate}
          setStartDate={(value) => {
            setStartDate(value);
            setDateRange('custom');
          }}
          endDate={endDate}
          setEndDate={(value) => {
            setEndDate(value);
            setDateRange('custom');
          }}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedAdvertiser={selectedAdvertiser}
          setSelectedAdvertiser={setSelectedAdvertiser}
          currency={currency}
          setCurrency={setCurrency}
          countriesOptions={countriesOptions}
          advertiserOptions={advertisersOptions}
          currencyOptions={currencyOptions}
          onApply={handleApplyFilters}
          isApplying={isApplying}
        />

        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search publishers or advertisers..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="pl-10"
            />
          </div>
          {syncMessage && (
            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
              {syncMessage}
            </Badge>
          )}
        </div>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4 text-sm text-red-700">
              <div className="font-semibold">Error</div>
              <div>{error}</div>
            </CardContent>
          </Card>
        )}

        {isInitialLoading ? (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="border-slate-200">
                  <CardContent className="animate-pulse space-y-4 p-6">
                    <div className="h-4 w-32 rounded bg-slate-200" />
                    <div className="h-8 w-20 rounded bg-slate-300" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="border-slate-200">
              <CardContent className="p-6">
                <div className="h-32 w-full animate-pulse rounded-lg bg-slate-200" />
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            <StatsCards totals={totals} currency={currency} />

            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BarChart3 className="h-5 w-5 text-[#4BA4B4]" />
                    Performance Summary
                  </CardTitle>
                  <CardDescription>Key KPIs for the selected reporting window</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Conversion Rate</p>
                      <p className="text-xl font-semibold text-slate-900">{conversionRate.toFixed(2)}%</p>
                    </div>
                    <Target className="h-5 w-5 text-slate-400" />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Average EPC</p>
                      <p className="text-xl font-semibold text-slate-900">
                        {formatCurrency(averageEpc, currency)}
                      </p>
                    </div>
                    <LineChart className="h-5 w-5 text-slate-400" />
                  </div>
                  {topPublisher && (
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs uppercase tracking-wide text-slate-500">Top EPC Publisher</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">{topPublisher.memberId}</p>
                      <p className="text-xs text-slate-500">
                        EPC {formatCurrency(topPublisher.epc, currency)} in {currency}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-slate-200 bg-white lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Globe className="h-5 w-5 text-[#4BA4B4]" />
                    Network Coverage
                  </CardTitle>
                  <CardDescription>Performance split across Rakuten country networks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {networks.length === 0 && (
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                        No network data available yet.
                      </div>
                    )}
                    {networks.map((network) => (
                      <div
                        key={network.country}
                        className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-slate-900">
                            {NETWORK_LABELS[network.country] || network.country}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {network.currency}
                          </Badge>
                        </div>
                        <div className="mt-3 space-y-1 text-sm">
                          <div className="flex justify-between text-slate-600">
                            <span>Clicks</span>
                            <span className="font-medium text-slate-900">
                              {network.clicks.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-slate-600">
                            <span>Sales</span>
                            <span className="font-medium text-slate-900">
                              {formatCurrency(network.sales, currency)}
                            </span>
                          </div>
                          <div className="flex justify-between text-slate-600">
                            <span>Commission</span>
                            <span className="font-medium text-green-600">
                              {formatCurrency(network.commission, currency)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6 border-slate-200 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldCheck className="h-5 w-5 text-[#4BA4B4]" />
                  Currency Summary
                </CardTitle>
                <CardDescription>
                  Raw and converted totals for each supported Rakuten network currency.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {currencyBreakdown.length === 0 && (
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                      No currency data available — sync reports to populate this section.
                    </div>
                  )}
                  {currencyBreakdown.map((entry) => (
                    <div key={entry.currency} className="rounded-lg border border-slate-200 bg-white p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-900">{entry.currency}</p>
                        <Badge variant="outline" className="text-xs">
                          Local
                        </Badge>
                      </div>
                      <div className="mt-3 space-y-1 text-sm">
                        <div className="flex justify-between text-slate-600">
                          <span>Sales</span>
                          <span className="font-semibold text-slate-900">
                            {formatCurrency(entry.sales, entry.currency)}
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Commission</span>
                          <span className="font-semibold text-green-600">
                            {formatCurrency(entry.commission, entry.currency)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
                        <div className="flex justify-between">
                          <span>Converted Sales</span>
                          <span className="font-semibold text-slate-900">
                            {formatCurrency(entry.convertedSales, currency)}
                          </span>
                        </div>
                        <div className="mt-1 flex justify-between">
                          <span>Converted Commission</span>
                          <span className="font-semibold text-slate-900">
                            {formatCurrency(entry.convertedCommission, currency)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6 border-slate-200 bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Publisher Performance</CardTitle>
                <CardDescription>
                  Detailed publisher metrics with drill-down currency and advertiser insights.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                          Publisher
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                          Clicks
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                          Sales ({currency})
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                          Orders
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                          Commission ({currency})
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                          EPC
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {filteredPublishers.length === 0 && (
                        <tr>
                          <td colSpan={7} className="px-6 py-10 text-center text-sm text-slate-500">
                            No publishers match the current filters.
                          </td>
                        </tr>
                      )}
                      {filteredPublishers.map((publisher) => (
                        <CurrencyBreakdownAccordion
                          key={publisher.memberId}
                          publisher={publisher}
                          baseCurrency={currency}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
