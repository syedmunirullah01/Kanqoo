// app/components/dashboard/publisher/PublisherHeader.jsx
'use client';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { TrendingUp, Target } from 'lucide-react';

export default function PublisherHeader() {
    const { data: session } = useSession();
    const userName = session?.user?.name || 'Publisher';
    const initials = userName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'PU';

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        Publisher Dashboard
                    </h1>
                    <p className="text-lg text-slate-600 mt-2 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        Welcome back, {userName}! Your performance is growing steadily
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Target className="w-3 h-3 mr-1" />
                        Tier 2 Publisher
                    </Badge>
                    <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    );
}