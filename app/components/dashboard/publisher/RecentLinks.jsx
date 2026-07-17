// app/components/dashboard/publisher/RecentLinks.jsx
"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Link2, Settings, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import AnimatedLoader from '@/app/components/common/AnimatedLoader';

export default function RecentLinks({ onManageLinks }) {
    const [links, setLinks] = useState([]);
    const [status, setStatus] = useState('loading'); // 'loading' | 'idle' | 'error'

    useEffect(() => {
        let isActive = true;
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const response = await fetch('/api/publisher/recent-links?limit=5', {
                    cache: 'no-store',
                    signal: controller.signal
                });
                if (!response.ok) {
                    throw new Error('Unable to load recent links');
                }
                const payload = await response.json();
                if (!isActive) return;
                setLinks(payload?.data || []);
                setStatus('idle');
            } catch (error) {
                if (error.name === 'AbortError') return;
                console.error('RecentLinks fetch error:', error);
                if (!isActive) return;
                setStatus('error');
            }
        };

        fetchData();

        return () => {
            isActive = false;
            controller.abort();
        };
    }, []);

    const handleCopy = async (url) => {
        if (!url) {
            toast.error('Link unavailable to copy');
            return;
        }
        if (typeof navigator === 'undefined' || !navigator.clipboard) {
            toast.error('Clipboard not available');
            return;
        }
        try {
            await navigator.clipboard.writeText(url);
            toast.success('Link copied to clipboard');
        } catch (error) {
            console.error('Copy failed', error);
            toast.error('Unable to copy link');
        }
    };

    const renderContent = () => {
        if (status === 'loading') {
            return (
                <div className="flex flex-col items-center gap-3 py-6">
                    <AnimatedLoader size={52} speed={1.3} color="#4BA4B4" />
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Loading recent links...</p>
                </div>
            );
        }

        if (status === 'error') {
            return <p className="text-sm text-slate-500">Unable to fetch links. Please try again later.</p>;
        }

        if (links.length === 0) {
            return (
                <div className="text-center text-sm text-slate-500 py-6">
                    No links yet. Create a tracking link to see your recent activity here.
                </div>
            );
        }

        return links.map((link) => (
            <button
                key={link.id}
                type="button"
                onClick={() => handleCopy(link.url)}
                className="w-full text-left focus:outline-none"
            >
                <div className="flex items-center justify-between border-b border-slate-200/40 py-3 last:border-b-0">
                    <div>
                        <p className="font-semibold text-slate-900 leading-tight">{link.name}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                            <LinkIcon className="w-3 h-3" />
                            <span>Click to copy link</span>
                        </div>
                    </div>
                    <Badge
                        variant="outline"
                        className="text-xs bg-slate-100 text-slate-600 border-slate-200 flex items-center gap-1"
                    >
                        <LinkIcon className="w-3 h-3 text-slate-500" />
                        copy
                    </Badge>
                </div>
            </button>
        ));
    };

    return (
        <Card className="border-slate-200/60 shadow-lg backdrop-blur-sm bg-white/70">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <Link2 className="w-5 h-5 text-blue-500" />
                    Recent Links
                </CardTitle>
                <CardDescription>
                    Latest 5 published tracking links
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {renderContent()}

                <Button
                    onClick={onManageLinks}
                    variant="outline"
                    className="w-full border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                    <Settings className="w-4 h-4 mr-2" />
                    Manage All Links
                </Button>
            </CardContent>
        </Card>
    );
}
