// app/components/dashboard/publisher/EarningsOverview.jsx
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { DollarSign, CreditCard, Calendar } from 'lucide-react';
import { Clock } from './icons/Clock';

export default function EarningsOverview({ onWithdraw }) {
    return (
        <Card className="border-slate-200/60 shadow-lg backdrop-blur-sm bg-white/70">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-500" />
                        Earnings Overview
                    </CardTitle>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Calendar className="w-3 h-3 mr-1" />
                        This Month
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Current Balance */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/60 shadow-sm">
                        <p className="text-sm text-slate-600 mb-2 font-medium">Available Balance</p>
                        <p className="text-4xl font-bold text-slate-900 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            --
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                            <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                            <p className="text-xs text-slate-500">Connect a payout method to enable withdrawals.</p>
                        </div>
                    </div>

                    {/* Pending & Total */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-slate-50/50 rounded-xl border border-slate-200/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-100 rounded-lg">
                                    <Clock className="w-4 h-4 text-amber-600" />
                                </div>
                                <span className="text-sm font-medium text-slate-600">Pending</span>
                            </div>
                            <span className="font-semibold text-slate-900">--</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-50/50 rounded-xl border border-slate-200/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <DollarSign className="w-4 h-4 text-blue-600" />
                                </div>
                                <span className="text-sm font-medium text-slate-600">Total Earned</span>
                            </div>
                            <span className="font-semibold text-slate-900">--</span>
                        </div>
                    </div>
                </div>

                <Button
                    onClick={onWithdraw}
                    disabled
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-lg"
                >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Request Withdrawal
                </Button>
                <p className="text-xs text-center text-slate-500">
                    Withdrawals will be available once you have an available balance.
                </p>
            </CardContent>
        </Card>
    );
}
