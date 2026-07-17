// app/components/dashboard/publisher/reporting/ReportingFilters.jsx
import React from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Calendar } from '@/app/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { Badge } from '@/app/components/ui/badge';
import { CalendarIcon, Filter, X } from 'lucide-react';
import { format, subDays, startOfMonth, endOfMonth, startOfDay, endOfDay } from 'date-fns';
import { Card, CardContent } from '@/app/components/ui/card';

const PRESETS = [
    { label: 'Today', getRange: () => ({ from: startOfDay(new Date()), to: endOfDay(new Date()) }) },
    { label: 'Yesterday', getRange: () => ({ from: startOfDay(subDays(new Date(), 1)), to: endOfDay(subDays(new Date(), 1)) }) },
    { label: 'Last 7 Days', getRange: () => ({ from: startOfDay(subDays(new Date(), 7)), to: endOfDay(new Date()) }) },
    { label: 'Last 30 Days', getRange: () => ({ from: startOfDay(subDays(new Date(), 30)), to: endOfDay(new Date()) }) },
    { label: 'This Month', getRange: () => ({ from: startOfMonth(new Date()), to: endOfMonth(new Date()) }) },
    {
        label: 'Last Month', getRange: () => ({
            from: startOfMonth(subDays(startOfMonth(new Date()), 1)),
            to: endOfMonth(subDays(startOfMonth(new Date()), 1))
        })
    },
];

const ADVERTISERS = ['Nike', 'Adidas', 'Apple', 'Amazon', 'Sephora', 'Wayfair'];

export default function ReportingFilters({
    dateRange,
    onDateRangeChange,
    selectedAdvertisers,
    onAdvertisersChange,
    customId,
    onCustomIdChange,
    defaultDateRange
}) {
    const handlePresetSelect = (preset) => {
        onDateRangeChange(preset.getRange());
    };

    const handleAdvertiserSelect = (advertiser) => {
        if (advertiser && !selectedAdvertisers.includes(advertiser)) {
            onAdvertisersChange([...selectedAdvertisers, advertiser]);
        }
    };

    const removeAdvertiser = (advertiserToRemove) => {
        onAdvertisersChange(selectedAdvertisers.filter(adv => adv !== advertiserToRemove));
    };

    const clearAllFilters = () => {
        if (defaultDateRange?.from || defaultDateRange?.to) {
            onDateRangeChange({
                from: defaultDateRange?.from ? new Date(defaultDateRange.from) : undefined,
                to: defaultDateRange?.to ? new Date(defaultDateRange.to) : undefined,
            });
        } else {
            onDateRangeChange({ from: subDays(new Date(), 30), to: new Date() });
        }
        onAdvertisersChange([]);
        onCustomIdChange('');
    };

    const hasCustomFilters = (() => {
        const hasAdvertisers = selectedAdvertisers.length > 0;
        const hasCustomId = Boolean(customId);
        const hasDateOverride = (() => {
            if (!defaultDateRange?.from || !defaultDateRange?.to || !dateRange?.from || !dateRange?.to) {
                return false;
            }
            return (
                dateRange.from.getTime() !== defaultDateRange.from.getTime() ||
                dateRange.to.getTime() !== defaultDateRange.to.getTime()
            );
        })();
        return hasAdvertisers || hasCustomId || hasDateOverride;
    })();

    return (
        <Card className="border-slate-200/60 shadow-lg backdrop-blur-sm bg-white/70 mb-6">
            <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                    <Filter className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-slate-900">Report Filters</h3>
                    {hasCustomFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearAllFilters}
                            className="text-slate-500 hover:text-slate-700"
                        >
                            Clear All
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Date Range */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Date Range</label>
                        <div className="flex gap-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal border-slate-300"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dateRange.from ? (
                                            dateRange.to ? (
                                                <>
                                                    {format(dateRange.from, 'MMM d, yyyy')} - {format(dateRange.to, 'MMM d, yyyy')}
                                                </>
                                            ) : (
                                                format(dateRange.from, 'MMM d, yyyy')
                                            )
                                        ) : (
                                            <span>Pick a date range</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <div className="flex border-b">
                                        {PRESETS.map((preset) => (
                                            <Button
                                                key={preset.label}
                                                variant="ghost"
                                                className="flex-1 rounded-none text-xs"
                                                onClick={() => handlePresetSelect(preset)}
                                            >
                                                {preset.label}
                                            </Button>
                                        ))}
                                    </div>
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={dateRange?.from ?? defaultDateRange?.from}
                                        selected={{
                                            from: dateRange?.from,
                                            to: dateRange?.to
                                        }}
                                        onSelect={(range) => onDateRangeChange({
                                            from: range?.from,
                                            to: range?.to
                                        })}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {/* Advertiser Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Advertisers</label>
                        <div className="space-y-2">
                            <Select onValueChange={handleAdvertiserSelect}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select advertisers" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ADVERTISERS.map(advertiser => (
                                        <SelectItem key={advertiser} value={advertiser}>
                                            {advertiser}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Selected advertisers badges */}
                            {selectedAdvertisers.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                    {selectedAdvertisers.map(advertiser => (
                                        <Badge key={advertiser} variant="secondary" className="bg-blue-50 text-blue-700">
                                            {advertiser}
                                            <X
                                                className="w-3 h-3 ml-1 cursor-pointer"
                                                onClick={() => removeAdvertiser(advertiser)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Custom ID Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Custom ID</label>
                        <Input
                            placeholder="Filter by subid..."
                            value={customId}
                            onChange={(e) => onCustomIdChange(e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
