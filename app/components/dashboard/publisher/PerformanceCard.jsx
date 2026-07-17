// app/components/dashboard/publisher/PerformanceCard.jsx
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { BarChart3 } from 'lucide-react';

export default function PerformanceCard({ onViewDetails, isMinimal = false }) {
    const statItems = [
        { label: 'Conversion Rate', value: '--' },
        { label: 'Avg. Commission', value: '--' },
        { label: 'Top Campaign', value: '--' },
    ];

    const cardClasses = isMinimal
        ? 'border border-slate-200 shadow-lg bg-white text-slate-900'
        : 'border-0 shadow-lg h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden';

    const statClasses = isMinimal
        ? 'flex justify-between items-center p-3 rounded-2xl border border-slate-100 bg-slate-50'
        : 'flex justify-between items-center p-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm';

    const titleTextColor = isMinimal ? 'text-slate-900' : 'text-white';
    const subtitleTextColor = isMinimal ? 'text-slate-500' : 'text-slate-300';

    return (
        <Card className={cardClasses}>
            {!isMinimal && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full -translate-y-16 translate-x-16" />
            )}
            <CardContent className={`p-6 flex flex-col justify-between flex-1 ${isMinimal ? '' : 'relative z-10'}`}>
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${isMinimal ? 'bg-slate-100' : 'bg-white/10 backdrop-blur-sm'}`}>
                            <BarChart3 className={`w-6 h-6 ${isMinimal ? 'text-slate-700' : 'text-yellow-400'}`} />
                        </div>
                        <div>
                            <h3 className={`font-bold text-xl ${titleTextColor}`}>Performance</h3>
                            <p className={`text-sm ${subtitleTextColor}`}>This month</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {statItems.map((stat) => (
                            <div key={stat.label} className={statClasses}>
                                <span className="text-sm">{stat.label}</span>
                                <span className="font-bold text-lg">{stat.value}</span>
                            </div>
                        ))}
                        <p className={`text-xs text-center ${subtitleTextColor}`}>
                            Performance metrics will appear once data is available.
                        </p>
                    </div>
                </div>

                <div>
                    <Button
                        onClick={onViewDetails}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg"
                    >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Details
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
