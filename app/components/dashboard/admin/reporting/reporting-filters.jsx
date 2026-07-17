// app/components/dashboard/admin/reporting/reporting-filters.jsx
'use client';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Calendar, ChevronDown, RefreshCw } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';

export default function ReportingFilters({
    dateRange,
    setDateRange,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedCountry,
    setSelectedCountry,
    selectedAdvertiser,
    setSelectedAdvertiser,
    currency,
    setCurrency,
    countriesOptions,
    advertiserOptions,
    currencyOptions,
    onApply,
    isApplying
}) {
    const dateRanges = [
        { value: 'today', label: 'Today' },
        { value: 'yesterday', label: 'Yesterday' },
        { value: 'last_7_days', label: 'Last 7 Days' },
        { value: 'last_30_days', label: 'Last 30 Days' },
        { value: 'last_90_days', label: 'Last 90 Days' },
        { value: 'this_month', label: 'This Month' },
        { value: 'last_month', label: 'Last Month' },
        { value: 'custom', label: 'Custom Range' }
    ];

    const countries = countriesOptions || [
        { value: 'all', label: 'All Countries' },
        { value: 'US', label: 'United States' },
        { value: 'UK', label: 'United Kingdom' },
        { value: 'FR', label: 'France' },
        { value: 'DE', label: 'Germany' },
        { value: 'CA', label: 'Canada' },
        { value: 'BR', label: 'Brazil' },
        { value: 'JP', label: 'Japan' },
        { value: 'AU', label: 'Australia' }
    ];

    const advertisers = advertiserOptions || [
        { value: 'all', label: 'All Advertisers' },
        { value: 'amazon', label: 'Amazon' },
        { value: 'nike', label: 'Nike' },
        { value: 'apple', label: 'Apple' },
        { value: 'microsoft', label: 'Microsoft' },
        { value: 'adidas', label: 'Adidas' },
        { value: 'sony', label: 'Sony' }
    ];

    const currencies = currencyOptions || ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];

    return (
        <Card className="bg-white border-slate-200 shadow-sm mb-6">
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Quick Dates Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Quick Dates</label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full justify-between">
                                    {dateRanges.find(d => d.value === dateRange)?.label}
                                    <ChevronDown className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full">
                                {dateRanges.map((range) => (
                                    <DropdownMenuItem
                                        key={range.value}
                                        onClick={() => setDateRange(range.value)}
                                    >
                                        {range.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Start Date */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <Input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* End Date */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">End Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <Input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Country */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Country</label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full justify-between">
                                    {countries.find(c => c.value === selectedCountry)?.label}
                                    <ChevronDown className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full">
                                {countries.map((country) => (
                                    <DropdownMenuItem
                                        key={country.value}
                                        onClick={() => setSelectedCountry(country.value)}
                                    >
                                        {country.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Advertisers */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Advertisers</label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full justify-between">
                                    {advertisers.find(a => a.value === selectedAdvertiser)?.label}
                                    <ChevronDown className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full">
                                {advertisers.map((advertiser) => (
                                    <DropdownMenuItem
                                        key={advertiser.value}
                                        onClick={() => setSelectedAdvertiser(advertiser.value)}
                                    >
                                        {advertiser.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Currency Selector */}
                <div className="mt-4 flex items-center gap-4">
                    <label className="text-sm font-medium text-slate-700">Currency:</label>
                    <div className="flex gap-2">
                        {currencies.map((curr) => (
                            <Button
                                key={curr}
                                variant={currency === curr ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrency(curr)}
                                className={currency === curr ? "bg-[#4BA4B4] hover:bg-[#3a8a99]" : ""}
                            >
                                {curr}
                            </Button>
                        ))}
                    </div>
                </div>

                {onApply && (
                    <div className="mt-6 flex justify-end">
                        <Button
                            onClick={onApply}
                            disabled={isApplying}
                            className="bg-[#4BA4B4] hover:bg-[#3a8a99] min-w-[140px]"
                        >
                            {isApplying ? (
                                <>
                                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Apply Filters'
                            )}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
