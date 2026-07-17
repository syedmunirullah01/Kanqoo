// app/dashboard/earnings/page.jsx
'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Separator } from '@/app/components/ui/separator';
import { 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Download, 
  Filter,
  Search,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

export default function EarningsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('Aug 28, 2024 - Oct 2, 2025');

  // Sample data for the earnings table
  const earningsData = [
    {
      id: 1,
      transactionDate: 'Oct 2, 2024',
      orderId: 'ORD-7842',
      product: 'Premium Widget',
      amount: 45.23,
      status: 'confirmed',
      source: 'Website'
    },
    {
      id: 2,
      transactionDate: 'Oct 1, 2024',
      orderId: 'ORD-7841',
      product: 'Basic Plan',
      amount: 29.99,
      status: 'pending',
      source: 'Affiliate'
    },
    {
      id: 3,
      transactionDate: 'Sep 30, 2024',
      orderId: 'ORD-7840',
      product: 'Enterprise Suite',
      amount: 199.99,
      status: 'confirmed',
      source: 'Direct'
    },
    {
      id: 4,
      transactionDate: 'Sep 29, 2024',
      orderId: 'ORD-7839',
      product: 'Starter Kit',
      amount: 15.50,
      status: 'failed',
      source: 'Website'
    },
    {
      id: 5,
      transactionDate: 'Sep 28, 2024',
      orderId: 'ORD-7838',
      product: 'Add-on Service',
      amount: 12.75,
      status: 'confirmed',
      source: 'Affiliate'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { variant: 'default', icon: CheckCircle, label: 'Confirmed' },
      pending: { variant: 'secondary', icon: Clock, label: 'Pending' },
      failed: { variant: 'destructive', icon: XCircle, label: 'Failed' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
        <IconComponent className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const totalConfirmed = earningsData
    .filter(item => item.status === 'confirmed')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalPending = earningsData
    .filter(item => item.status === 'pending')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalFailed = earningsData
    .filter(item => item.status === 'failed')
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-10">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Earnings</h1>
              <p className="text-slate-600 mt-2">Track your earnings and transaction history</p>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Sidebar - Summary Cards */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Lifetime Earnings Card */}
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardDescription className="text-sm font-medium text-slate-600">
                  LIFETIME EARNINGS
                </CardDescription>
                <CardTitle className="text-3xl font-bold text-slate-900">
                  ${totalConfirmed.toFixed(2)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+12.5% from last period</span>
                </div>
              </CardContent>
            </Card>

            {/* Earnings Breakdown */}
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Earnings Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Confirmed</span>
                    <span className="font-semibold text-slate-900">${totalConfirmed.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Pending</span>
                    <span className="font-semibold text-slate-900">${totalPending.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Failed</span>
                    <span className="font-semibold text-slate-900">${totalFailed.toFixed(2)}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">Rewards</span>
                  <span className="font-semibold text-slate-900">$0.00</span>
                </div>
              </CardContent>
            </Card>

            {/* Billing Summary */}
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Billing Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-slate-900">Approved</p>
                      <p className="text-xs text-slate-500">Balance: $0</p>
                    </div>
                    <span className="font-semibold text-green-600">${totalConfirmed.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Redeemed</span>
                    <span className="font-semibold text-slate-900">${totalConfirmed.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Table */}
          <div className="lg:col-span-3">
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-semibold">Transaction History</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4" />
                      {dateRange}
                    </CardDescription>
                  </div>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Type here to search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Table */}
                <div className="rounded-lg border border-slate-200 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900">Transaction Date</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900">Order ID</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900">Product</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900">Source</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900">Status</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-slate-900">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {earningsData.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 text-sm text-slate-900">
                            {transaction.transactionDate}
                          </td>
                          <td className="py-3 px-4 text-sm text-slate-600 font-mono">
                            {transaction.orderId}
                          </td>
                          <td className="py-3 px-4 text-sm text-slate-900">
                            {transaction.product}
                          </td>
                          <td className="py-3 px-4 text-sm text-slate-600">
                            {transaction.source}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {getStatusBadge(transaction.status)}
                          </td>
                          <td className="py-3 px-4 text-sm text-slate-900 text-right font-semibold">
                            ${transaction.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Table Summary */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-900">Combined Earnings</p>
                          <p className="text-2xl font-bold text-blue-900">
                            ${(totalConfirmed + totalPending).toFixed(2)}
                          </p>
                        </div>
                        <DollarSign className="w-8 h-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-amber-50 border-amber-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-amber-900">Pending</p>
                          <p className="text-2xl font-bold text-amber-900">
                            ${totalPending.toFixed(2)}
                          </p>
                        </div>
                        <Clock className="w-8 h-8 text-amber-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-red-50 border-red-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-red-900">Failed</p>
                          <p className="text-2xl font-bold text-red-900">
                            ${totalFailed.toFixed(2)}
                          </p>
                        </div>
                        <AlertCircle className="w-8 h-8 text-red-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm text-slate-600">
                    Showing 1 to {earningsData.length} of {earningsData.length} results
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" className="bg-slate-900 text-white">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
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