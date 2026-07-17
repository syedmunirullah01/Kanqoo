'use client';

import React, { useState } from 'react';
import { Badge } from '@/app/components/ui/badge';
import { Card, CardContent } from '@/app/components/ui/card';
import { ChevronDown, ChevronUp, CreditCard, ExternalLink } from 'lucide-react';

function formatNumber(value) {
  if (!Number.isFinite(value)) return '0';
  return Number(value).toLocaleString();
}

function makeFormatter(currency) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency || 'USD',
    maximumFractionDigits: 2,
  });
}

export default function CurrencyBreakdownAccordion({ publisher, baseCurrency = 'USD' }) {
  const [isOpen, setIsOpen] = useState(false);
  const baseFormatter = makeFormatter(baseCurrency);

  const currencyBreakdown = publisher.currencyBreakdown || [];
  const advertisers = publisher.advertisers || [];

  return (
    <>
      <tr
        className="cursor-pointer transition-colors hover:bg-slate-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#4BA4B4] to-[#B45B4B] text-sm font-semibold text-white">
              {publisher.rank ?? '—'}
            </div>
            <div>
              <p className="font-semibold text-slate-900">{publisher.publisherName || publisher.memberId}</p>
              <p className="text-xs font-mono text-slate-500">Member ID: {publisher.memberId}</p>
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <span className="font-semibold text-slate-900">{formatNumber(publisher.clicks)}</span>
        </td>
        <td className="px-6 py-4">
          <span className="font-semibold text-slate-900">
            {baseFormatter.format(publisher.sales || 0)}
          </span>
        </td>
        <td className="px-6 py-4">
          <span className="font-semibold text-slate-900">{formatNumber(publisher.orders)}</span>
        </td>
        <td className="px-6 py-4">
          <span className="font-semibold text-green-600">
            {baseFormatter.format(publisher.commission || 0)}
          </span>
        </td>
        <td className="px-6 py-4">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {baseFormatter.format(publisher.epc || 0)}
          </Badge>
        </td>
        <td className="px-6 py-4">
          <div className="flex justify-end">
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-slate-400" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-5 w-5 text-slate-400" aria-hidden="true" />
            )}
          </div>
        </td>
      </tr>

      {isOpen && (
        <tr>
          <td colSpan={7} className="bg-slate-25 border-b border-slate-200">
            <div className="space-y-6 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">Currency Breakdown</h4>
                  <p className="text-sm text-slate-500">
                    Local currency totals converted into {baseCurrency} using the latest rates.
                  </p>
                </div>
                <Badge variant="outline" className="bg-slate-100 text-slate-700">
                  {currencyBreakdown.length} currencies
                </Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {currencyBreakdown.length === 0 && (
                  <Card className="bg-slate-50 border-dashed border-slate-200 md:col-span-2 xl:col-span-4">
                    <CardContent className="flex items-center justify-between gap-3 p-4">
                      <div>
                        <p className="font-medium text-slate-900">No currency data</p>
                        <p className="text-sm text-slate-500">
                          Sync recent reports to populate currency breakdowns.
                        </p>
                      </div>
                      <CreditCard className="h-5 w-5 text-slate-400" />
                    </CardContent>
                  </Card>
                )}

                {currencyBreakdown.map((entry) => {
                  const localFormatter = makeFormatter(entry.currency);
                  const convertedFormatter = makeFormatter(baseCurrency);

                  return (
                    <Card key={entry.currency} className="border-slate-200 bg-white">
                      <CardContent className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-700">{entry.currency}</span>
                          <Badge variant="outline" className="text-xs">
                            {entry.currency}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Gross Sales</span>
                            <span className="font-semibold text-slate-900">
                              {localFormatter.format(entry.grossSales || 0)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Net Sales</span>
                            <span className="font-semibold text-slate-900">
                              {localFormatter.format(entry.sales || 0)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Commission</span>
                            <span className="font-semibold text-slate-900">
                              {localFormatter.format(entry.commission || 0)}
                            </span>
                          </div>
                        </div>
                        {entry.currency !== baseCurrency && (
                          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
                            <div className="flex items-center justify-between">
                              <span>Converted Sales</span>
                              <span className="font-semibold text-slate-900">
                                {convertedFormatter.format(entry.convertedSales || 0)}
                              </span>
                            </div>
                            <div className="mt-1 flex items-center justify-between">
                              <span>Converted Commission</span>
                              <span className="font-semibold text-slate-900">
                                {convertedFormatter.format(entry.convertedCommission || 0)}
                              </span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-slate-900">Top Advertisers</h4>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {advertisers.length} active brands
                  </Badge>
                </div>
                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium">Advertiser</th>
                        <th className="px-4 py-3 text-left font-medium">Region</th>
                        <th className="px-4 py-3 text-right font-medium">Clicks</th>
                        <th className="px-4 py-3 text-right font-medium">Orders</th>
                        <th className="px-4 py-3 text-right font-medium">Sales</th>
                        <th className="px-4 py-3 text-right font-medium">Commission</th>
                        <th className="px-4 py-3 text-right font-medium">EPC</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {advertisers.length === 0 && (
                        <tr>
                          <td colSpan={7} className="px-4 py-6 text-center text-slate-500">
                            No advertiser performance data available.
                          </td>
                        </tr>
                      )}
                      {advertisers.map((brand) => (
                        <tr key={brand.name}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <ExternalLink className="h-4 w-4 text-slate-400" />
                              <span className="font-medium text-slate-900">{brand.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className="text-xs">
                              {brand.network || brand.country || 'N/A'}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-right text-slate-900">
                            {formatNumber(brand.clicks)}
                          </td>
                          <td className="px-4 py-3 text-right text-slate-900">
                            {formatNumber(brand.orders)}
                          </td>
                          <td className="px-4 py-3 text-right text-slate-900">
                            {baseFormatter.format(brand.sales || 0)}
                          </td>
                          <td className="px-4 py-3 text-right text-green-600 font-semibold">
                            {baseFormatter.format(brand.commission || 0)}
                          </td>
                          <td className="px-4 py-3 text-right text-blue-600 font-semibold">
                            {baseFormatter.format(brand.epc || 0)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
