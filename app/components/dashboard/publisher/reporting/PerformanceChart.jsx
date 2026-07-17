// app/components/dashboard/publisher/reporting/PerformanceChart.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, MousePointer, ShoppingCart, Target } from 'lucide-react';

const PerformanceChart = ({ data, metric, onMetricChange }) => {
    const metrics = [
        { value: 'commission', label: 'Commission', icon: DollarSign, color: '#10b981' },
        { value: 'clicks', label: 'Clicks', icon: MousePointer, color: '#3b82f6' },
        { value: 'sales', label: 'Sales', icon: ShoppingCart, color: '#8b5cf6' },
        { value: 'orders', label: 'Orders', icon: Target, color: '#f59e0b' }
    ];

    const currentMetric = metrics.find(m => m.value === metric);

    const formatTooltip = (value, name) => {
        switch (name) {
            case 'commission':
                return [`$${value.toFixed(2)}`, 'Commission'];
            case 'sales':
                return [`$${value.toFixed(2)}`, 'Sales'];
            case 'clicks':
                return [value.toLocaleString(), 'Clicks'];
            case 'orders':
                return [value, 'Orders'];
            default:
                return [value, name];
        }
    };

    return (
        <Card className="border-slate-200/60 shadow-lg backdrop-blur-sm bg-white/70">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold text-slate-900">
                        Performance Over Time
                    </CardTitle>
                    <Tabs value={metric} onValueChange={onMetricChange} className="w-auto">
                        <TabsList className="bg-slate-100/50 p-1 rounded-xl">
                            {metrics.map((metricItem) => {
                                const IconComponent = metricItem.icon;
                                return (
                                    <TabsTrigger
                                        key={metricItem.value}
                                        value={metricItem.value}
                                        className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs"
                                    >
                                        <IconComponent className="w-3 h-3 mr-1" />
                                        {metricItem.label}
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                    </Tabs>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis
                                dataKey="date"
                                stroke="#64748b"
                                fontSize={12}
                            />
                            <YAxis
                                stroke="#64748b"
                                fontSize={12}
                                tickFormatter={(value) => {
                                    if (metric === 'commission' || metric === 'sales') {
                                        return `$${value}`;
                                    }
                                    return value.toLocaleString();
                                }}
                            />
                            <Tooltip
                                formatter={formatTooltip}
                                labelFormatter={(label) => `Date: ${label}`}
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey={metric}
                                stroke={currentMetric.color}
                                strokeWidth={3}
                                dot={{ fill: currentMetric.color, strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, fill: currentMetric.color }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default PerformanceChart;