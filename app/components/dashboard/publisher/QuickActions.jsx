// app/components/dashboard/publisher/QuickActions.jsx
import { Card, CardContent } from '@/app/components/ui/card';
import { Share2, BarChart3, Users, DollarSign, Zap } from 'lucide-react';

const quickActions = [
    { icon: Share2, title: 'Create Link', description: 'Generate new affiliate link' },
    { icon: BarChart3, title: 'Analytics', description: 'View performance reports' },
    { icon: Users, title: 'Refer Friends', description: 'Earn commission on referrals' },
    { icon: DollarSign, title: 'Withdraw', description: 'Request payment' },
];

export default function QuickActions({ onCreateLink, onAnalytics, onReferrals, onWithdraw }) {
    const actions = [
        { ...quickActions[0], action: onCreateLink },
        { ...quickActions[1], action: onAnalytics },
        { ...quickActions[2], action: onReferrals },
        { ...quickActions[3], action: onWithdraw },
    ];

    return (
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
            <CardContent className="p-6 relative z-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Quick Actions</h3>
                            <p className="text-blue-100 text-sm">Get started quickly</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {actions.map((action, index) => (
                            <button
                                key={index}
                                onClick={action.action}
                                className="w-full flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/10"
                            >
                                <action.icon className="w-4 h-4" />
                                <div className="text-left">
                                    <p className="font-medium text-sm">{action.title}</p>
                                    <p className="text-blue-100 text-xs">{action.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}