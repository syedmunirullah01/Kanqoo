"use client";

import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const CTA_FALLBACK = 'Discover merchant';

export default function PromotedMerchantsCard() {
  const [merchants, setMerchants] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading', 'error', 'idle'

  useEffect(() => {
    let isMounted = true;
    const fetchMerchants = async () => {
      try {
        const response = await fetch('/api/publisher/promoted-merchants', { cache: 'no-store' });
        if (!response.ok) throw new Error('Failed to load promoted merchants');
        const payload = await response.json();
        if (!isMounted) return;
        setMerchants(payload?.data || []);
        setStatus('idle');
      } catch (error) {
        console.error('PromotedMerchantsCard error:', error);
        if (!isMounted) return;
        setMerchants([]);
        setStatus('error');
      }
    };

    fetchMerchants();
    return () => {
      isMounted = false;
    };
  }, []);

  const hasContent = status === 'idle' && merchants.length > 0;

  const sortedMerchants = useMemo(() => {
    return [...merchants].sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0));
  }, [merchants]);

  const renderMerchantRow = (merchant) => {
    const categoryLabel = merchant.category || 'General';
    const ctaLabel = merchant.ctaText || CTA_FALLBACK;
    const handleAction = () => {
      if (!merchant.url) return;
      window.open(merchant.url, '_blank', 'noopener,noreferrer');
    };

    return (
      <div key={`${merchant.mid}-${categoryLabel}`} className="flex flex-col gap-2 p-4 rounded-2xl border border-slate-200 bg-white/70 shadow-sm backdrop-blur">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 text-slate-700 text-xs font-semibold tracking-wide">
              {merchant.logoUrl ? (
                <img src={merchant.logoUrl} alt={merchant.headline || merchant.mid} className="h-12 w-12 rounded-xl object-cover" />
              ) : (
                (merchant.headline || merchant.mid).slice(0, 2).toUpperCase()
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{merchant.headline || merchant.mid}</p>
              <p className="text-xs uppercase tracking-wide text-slate-500">{categoryLabel}</p>
            </div>
          </div>
          <Badge className="capitalize bg-emerald-50 text-emerald-700 border-emerald-100">{merchant.badge || 'Featured'}</Badge>
        </div>

        <div className="flex justify-between items-center gap-3">
          <div>
            <p className="text-xs font-semibold text-slate-500">Commission</p>
            <p className="text-base font-semibold text-slate-900">{merchant.commission || 'Contact us'}</p>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2 text-slate-800" onClick={handleAction} disabled={!merchant.url}>
            {ctaLabel}
            <ArrowUpRight className="w-3 h-3" />
          </Button>
        </div>
        {merchant.summary && (
          <p className="text-xs text-slate-500 max-h-16 overflow-hidden text-ellipsis">{merchant.summary}</p>
        )}
      </div>
    );
  };

  return (
    <Card className="border-0 shadow-xl bg-white backdrop-blur-md">
      <CardHeader className="px-6 pt-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Top merchants to promote
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Curated by our admins · This banner appears for every publisher.
            </CardDescription>
          </div>
          <Badge className="bg-slate-100 text-slate-700 border-slate-200">Admin Pick</Badge>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2 space-y-4">
        {status === 'loading' && (
          <div className="space-y-3">
            {[1, 2].map((item) => (
              <div key={item} className="h-20 rounded-2xl bg-slate-100/80 animate-pulse" />
            ))}
          </div>
        )}
        {status === 'error' && (
          <p className="text-sm text-slate-500">Unable to load promoted merchants. Please try again later.</p>
        )}
        {hasContent && sortedMerchants.map(renderMerchantRow)}
        {status === 'idle' && merchants.length === 0 && (
          <p className="text-sm text-slate-500">
            Admin has not curated any merchants yet. They will appear here once selected.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
