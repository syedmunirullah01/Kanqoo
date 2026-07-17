// app/components/dashboard/publisher/reporting/KpiCards.jsx
import React from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { DollarSign, ShoppingCart, MousePointer, Target, TrendingUp, BarChart3 } from 'lucide-react';

const KpiCards = ({ kpis }) => {
    const cards = [
        {
            label: "Total Commission",
            value: `$${kpis.totalCommission.toFixed(2)}`,
            description: "Your earnings",
            icon: DollarSign,
            color: "green",
            trend: "+12.5%"
        },
        {
            label: "Total Sales",
            value: `$${kpis.totalSales.toFixed(2)}`,
            description: "Revenue generated",
            icon: ShoppingCart,
            color: "blue",
            trend: "+8.2%"
        },
        {
            label: "Total Orders",
            value: kpis.totalOrders.toLocaleString(),
            description: "Completed purchases",
            icon: Target,
            color: "purple",
            trend: "+5.1%"
        },
        {
            label: "Total Clicks",
            value: kpis.totalClicks.toLocaleString(),
            description: "Link interactions",
            icon: MousePointer,
            color: "orange",
            trend: "+15.3%"
        },
        {
            label: "Conversion Rate",
            value: `${kpis.conversionRate.toFixed(2)}%`,
            description: "Orders per click",
            icon: BarChart3,
            color: "indigo",
            trend: "+0.2%"
        },
        {
            label: "EPC",
            value: `$${kpis.epc.toFixed(4)}`,
            description: "Earnings per click",
            icon: TrendingUp,
            color: "emerald",
            trend: "+$0.002"
        }
    ];

    const getColorClasses = (color) => {
        const colors = {
            green: 'from-green-500 to-emerald-600',
            blue: 'from-blue-500 to-blue-600',
            purple: 'from-purple-500 to-purple-600',
            orange: 'from-orange-500 to-orange-600',
            indigo: 'from-indigo-500 to-indigo-600',
            emerald: 'from-emerald-500 to-emerald-600'
        };
        return colors[color] || colors.blue;
    };

    const getTrendColor = (trend) => {
        return trend.includes('+') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {cards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                    <Card key={index} className="border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-white/70 hover:bg-white/90">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${getColorClasses(card.color)}`}>
                                    <IconComponent className="w-5 h-5 text-white" />
                                </div>
                                <Badge variant="outline" className={`${getTrendColor(card.trend)} border-transparent text-xs`}>
                                    {card.trend}
                                </Badge>
                            </div>

                            <div className="space-y-2">
                                <p className="text-2xl font-bold text-slate-900">
                                    {card.value}
                                </p>
                                <p className="text-sm font-semibold text-slate-700">
                                    {card.label}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {card.description}
                                </p>
                            </div>

                            {/* Progress indicator */}
                            <div className="mt-4 w-full bg-slate-100 rounded-full h-1.5">
                                <div
                                    className={`h-1.5 rounded-full bg-gradient-to-r ${getColorClasses(card.color)}`}
                                    style={{ width: `${70 + (index * 5)}%` }}
                                ></div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default KpiCards;