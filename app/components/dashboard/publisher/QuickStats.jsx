// app/components/dashboard/publisher/QuickStats.jsx
import { Card, CardContent } from '@/app/components/ui/card';
import { TrendingUp } from 'lucide-react';

const getColorClasses = (color) => {
    const colors = {
        blue: 'from-blue-500 to-blue-600',
        green: 'from-green-500 to-green-600',
        purple: 'from-purple-500 to-purple-600',
        orange: 'from-orange-500 to-orange-600',
    };
    return colors[color] || colors.blue;
};

const getTextColorClasses = (color) => {
    const colors = {
        blue: 'text-blue-600',
        green: 'text-green-600',
        purple: 'text-purple-600',
        orange: 'text-orange-600',
    };
    return colors[color] || colors.blue;
};

export default function QuickStats({ stats = [] }) {
    if (!stats.length) {
        return (
            <Card className="border-slate-200/60 shadow-sm bg-white/80">
                <CardContent className="p-6 text-center">
                    <div className="text-sm font-semibold text-slate-900">No quick stats available</div>
                    <p className="text-xs text-slate-500 mt-2">
                        Connect your performance data to see clicks, conversions, and earnings here.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat, index) => (
                <div key={index} className="relative group">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${getColorClasses(stat.color)} rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300`}></div>
                    <Card className="relative border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-white/80 hover:bg-white/90">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl shadow-sm bg-gradient-to-br ${getColorClasses(stat.color)}`}>
                                    <stat.icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-right">
                                    <div className={`text-sm font-semibold ${getTextColorClasses(stat.color)}`}>
                                        {stat.change}
                                    </div>
                                    <div className="text-xs text-slate-500">this month</div>
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</p>
                            <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">{stat.label}</p>
                            <div className="mt-4 flex items-center text-xs text-slate-500">
                                <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                                Positive trend
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    );
}
