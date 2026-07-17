// app/components/dashboard/admin/reporting/stats-cards.jsx
'use client';
import { Card, CardContent } from '@/app/components/ui/card';
import { DollarSign, MousePointer, ShoppingCart, TrendingUp } from 'lucide-react';

export default function StatsCards({ totals, currency = 'USD' }) {
    const safeTotals = {
        clicks: totals?.clicks || 0,
        orders: totals?.orders || 0,
        sales: totals?.sales || 0,
        commission: totals?.commission || 0,
    };

    const currencyFormatter = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency,
        maximumFractionDigits: 2,
    });

    const stats = [
        {
            label: 'Total Clicks',
            value: safeTotals.clicks.toLocaleString(),
            icon: MousePointer,
            color: 'blue'
        },
        {
            label: 'Total Orders',
            value: safeTotals.orders.toLocaleString(),
            icon: ShoppingCart,
            color: 'green'
        },
        {
            label: 'Total Sales',
            value: currencyFormatter.format(safeTotals.sales),
            icon: DollarSign,
            color: 'purple'
        },
        {
            label: 'Total Commission',
            value: currencyFormatter.format(safeTotals.commission),
            icon: TrendingUp,
            color: 'amber'
        }
    ];

    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        purple: 'bg-purple-100 text-purple-600',
        amber: 'bg-amber-100 text-amber-600'
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <Card key={index} className="bg-white border-slate-200 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
