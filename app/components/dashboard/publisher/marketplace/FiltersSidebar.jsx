"use client";

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Slider } from '@/app/components/ui/slider';
import { Search, FilterX } from 'lucide-react';

export default function FiltersSidebar({
  filters,
  onFiltersChange,
  onClearFilters,
  categories = [],
  countries = []
}) {
  const [categoryQuery, setCategoryQuery] = useState('');
  const [countryQuery, setCountryQuery] = useState('');

  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({ ...prev, [key]: value }));
  };

  const filteredCategories = useMemo(() => {
    if (!categoryQuery.trim()) return categories;
    const query = categoryQuery.trim().toLowerCase();
    return categories.filter(({ label }) => label.toLowerCase().includes(query));
  }, [categories, categoryQuery]);

  const filteredCountries = useMemo(() => {
    if (!countryQuery.trim()) return countries;
    const query = countryQuery.trim().toLowerCase();
    return countries.filter(({ label }) => label.toLowerCase().includes(query));
  }, [countries, countryQuery]);

  return (
    <Card className="border-slate-200/60 shadow-lg backdrop-blur-sm bg-white/70 sticky top-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-500" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Search</label>
          <Input
            placeholder="Brand name or category..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Category</label>
          <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              <div className="sticky top-0 z-10 bg-popover px-2 pb-2">
                <Input
                  value={categoryQuery}
                  onChange={(event) => setCategoryQuery(event.target.value)}
                  placeholder="Search categories..."
                  className="h-8 text-xs"
                />
              </div>
              <SelectItem value="all">All categories</SelectItem>
              {filteredCategories.length === 0 && (
                <div className="px-2 py-2 text-xs text-slate-500">No categories found</div>
              )}
              {filteredCategories.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Minimum Commission */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-700">
            Min Commission: {filters.minCommission}%
          </label>
          <Slider
            value={[filters.minCommission]}
            onValueChange={([value]) => handleFilterChange('minCommission', value)}
            max={50}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>0%</span>
            <span>50%</span>
          </div>
        </div>

        {/* Ships To */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Ships To</label>
          <Select value={filters.country} onValueChange={(value) => handleFilterChange('country', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Any country" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              <div className="sticky top-0 z-10 bg-popover px-2 pb-2">
                <Input
                  value={countryQuery}
                  onChange={(event) => setCountryQuery(event.target.value)}
                  placeholder="Search countries..."
                  className="h-8 text-xs"
                />
              </div>
              <SelectItem value="all">Any country</SelectItem>
              {filteredCountries.length === 0 && (
                <div className="px-2 py-2 text-xs text-slate-500">No countries found</div>
              )}
              {filteredCountries.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="w-full border-slate-300 text-slate-700 hover:bg-slate-50"
        >
          <FilterX className="w-4 h-4 mr-2" />
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
}



