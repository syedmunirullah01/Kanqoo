"use client";
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Zap, Clock, CheckCircle, Loader2, Copy, Link2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

const STATUS_META = {
  approved: {
    dotClass: 'bg-emerald-500',
    actionClass:
      'bg-[var(--color-secondary)] hover:bg-[var(--color-primary)]/90 text-white hover:text- text-white dark:bg-[#4BA4B4]/90 dark:hover:bg-[#3a8a99]/90',
    icon: CheckCircle,
    actionLabel: 'Get Link'
  },
  pending: {
    dotClass: 'bg-amber-500',
    actionClass:
      'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200',
    icon: Clock,
    disabled: true,
    actionLabel: 'Get Link'
  },
  not_joined: {
    dotClass: 'bg-slate-400 dark:bg-slate-500',
    dotStyle: { backgroundColor: 'var(--color-secondary)' },
    actionClass: 'text-white hover:opacity-90 dark:hover:opacity-95',
    actionStyle: { backgroundColor: 'var(--color-primary)' },
    icon: Zap,
    actionLabel: 'Join Program'
  }
};

export default function AdvertiserCard({
  advertiser,
  onClick,
  onGetLink,
  onApply,
  isGenerating = false,
  generatedLink,
}) {
  if (!advertiser || !advertiser.merchant) {
    return null;
  }

  const { merchant, partnershipStatus } = advertiser;
  const status = STATUS_META[partnershipStatus] ?? STATUS_META.not_joined;
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (generatedLink && partnershipStatus === 'approved') {
      setIsAnimating(true);
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [generatedLink, partnershipStatus]);

  const handlePrimaryAction = (event) => {
    event.stopPropagation();
    if (partnershipStatus === 'not_joined') {
      onApply?.(merchant.id);
      return;
    }

    if (partnershipStatus === 'approved') {
      if (isGenerating) return;
      setIsAnimating(true);
      if (onGetLink) {
        onGetLink(advertiser);
      } else {
        onClick?.(advertiser);
      }
      return;
    }

    if (partnershipStatus === 'pending' && onClick) {
      onClick(advertiser);
    }
  };

  const ActionIcon = status.icon || Zap;
  const actionLabel =
    partnershipStatus === 'not_joined' && merchant.partnershipType !== 'auto-approve'
      ? 'Apply Now'
      : status.actionLabel;
  const hasExternalUrl = Boolean(merchant.url);
  const displayUrl = hasExternalUrl
    ? merchant.url.replace(/^https?:\/\//, '')
    : '';
  const externalHref = hasExternalUrl
    ? (merchant.url.startsWith('http') ? merchant.url : `https://${merchant.url}`)
    : '#';
  const returnDaysLabel =
    !merchant.returnDays || merchant.returnDays === 'N/A'
      ? 'N/A'
      : `${merchant.returnDays} days`;
  
  const isAwin = String(merchant.network || '').toLowerCase() === 'awin';
  const paymentTimingLabel = isAwin ? 'Average Payment Time' : 'Return days';
  const paymentTimingValue = isAwin
    ? (merchant.averagePaymentTime ? `${merchant.averagePaymentTime} days` : 'N/A')
    : returnDaysLabel;
  const paymentTimingDesc = isAwin ? 'Avg validation window' : 'Attribution window';

  const displayLink = generatedLink?.cloakedUrl || generatedLink?.deepLinkUrl || '';
  const termsHref = merchant.termsUrl && (merchant.termsUrl.startsWith('http') ? merchant.termsUrl : `https://${merchant.termsUrl}`);
  const statusDisplay =
    merchant.partnershipType === 'manual'
      ? 'Status Active'
      : merchant.partnershipType
        ? merchant.partnershipType.replace('-', ' ')
        : 'Status Pending';

  const copyToClipboard = async (event) => {
    event.stopPropagation();
    if (!displayLink) return;

    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      toast.error('Clipboard not available in this environment', {
        style: {
          background: 'var(--color-secondary)',
          color: 'var(--color-accent)'
        }
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(displayLink);
      toast.success('Link copied to clipboard', {
        style: {
          background: 'var(--color-primary)',
          color: 'var(--color-accent)',
          border: '1px solid var(--color-secondary)'
        }
      });
    } catch (_error) {
      toast.error('Unable to copy link', {
        style: {
          background: 'var(--color-secondary)',
          color: 'var(--color-accent)'
        }
      });
    }
  };

  const copyMerchantUrl = async (event) => {
    event.stopPropagation();
    if (!externalHref || externalHref === '#') return;

    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      toast.error('Clipboard not available in this environment', {
        style: {
          background: 'var(--color-secondary)',
          color: 'var(--color-accent)'
        }
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(externalHref);
      toast.success('Merchant URL copied to clipboard', {
        style: {
          background: 'var(--color-primary)',
          color: 'var(--color-accent)',
          border: '1px solid var(--color-secondary)'
        }
      });
    } catch (_error) {
      toast.error('Unable to copy merchant URL', {
        style: {
          background: 'var(--color-secondary)',
          color: 'var(--color-accent)'
        }
      });
    }
  };

  return (
    <article
      onClick={() => onClick?.(advertiser)}
      className={cn(
        'group relative flex h-full cursor-pointer flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-900',
        isGenerating && 'pointer-events-none blur-[1px]'
      )}
    >
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-[var(--color-primary)]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <span
        className={cn(
          'absolute right-6 top-6 inline-flex h-2.5 w-2.5 items-center justify-center rounded-full z-10',
          status.dotClass
        )}
        style={status.dotStyle}
      />

      <header className="flex items-start justify-between gap-4 relative z-10">
        <div className="flex items-baseline gap-4">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md dark:border-slate-700 dark:bg-slate-950">
            {/* Animated ring when generating */}
            {isGenerating && (
              <div className="absolute -inset-2 rounded-xl border-2 border-[var(--color-primary)]/30 animate-ping" />
            )}
            <Avatar className="h-10 w-10">
              <AvatarImage src={merchant.logoUrl} alt={`${merchant.name} logo`} />
              <AvatarFallback className="text-sm font-semibold uppercase text-[color:var(--color-primary)] dark:text-[color:var(--color-secondary)]">
                {merchant.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div>
            <div className="flex w-full flex-col gap-1">
              <h3 className="text-base font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[color:var(--color-primary)] dark:text-white">
                {merchant.name}
              </h3>
              {hasExternalUrl ? (
                <button
                  type="button"
                  onClick={copyMerchantUrl}
                  className="inline-flex w-max items-center gap-1 text-xs font-medium text-slate-500 transition-all duration-300 hover:text-[color:var(--color-primary)] hover:scale-105 dark:text-slate-400 dark:hover:text-[color:var(--color-secondary)]"
                >
                  <Copy className="h-3 w-3" />
                  <span className="font-medium text-slate-500/80 underline decoration-dotted underline-offset-4 dark:text-slate-400/80">
                    {displayUrl}
                  </span>
                </button>
              ) : (
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  Link unavailable
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2"></div>
      </header>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 relative z-10">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:border-[color:var(--color-primary)]/30 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800/50">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Commission
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            {merchant.commission}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Per qualified conversion</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:border-[color:var(--color-primary)]/30 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800/50">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {paymentTimingLabel}
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            {paymentTimingValue}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{paymentTimingDesc}</p>
        </div>
      </section>

      <section className="mt-6 flex flex-wrap gap-2 relative z-10">
        {merchant.categories.slice(0, 3).map((category) => (
          <Badge
            key={category}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition-all duration-300 hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)] hover:scale-105 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-[color:var(--color-secondary)] dark:hover:text-[color:var(--color-secondary)]"
          >
            {category}
          </Badge>
        ))}
        {merchant.categories.length > 3 && (
          <Badge className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition-all duration-300 hover:scale-105 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            +{merchant.categories.length - 3}
          </Badge>
        )}
      </section>

      <section className="mt-4 flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 relative z-10">
        <span className="truncate">
          Ships to {merchant.shipsTo.slice(0, 3).join(', ')}
          {merchant.shipsTo.length > 3 && ` +${merchant.shipsTo.length - 3} markets`}
        </span>
        <div className="flex items-center gap-2">
          <span className="flex-shrink-0 font-semibold text-slate-600 dark:text-slate-300">
            {statusDisplay}
          </span>
        </div>
      </section>

      <footer className="mt-6 relative z-10">
        {partnershipStatus === 'approved' && displayLink ? (
          <div
            className={cn(
              "flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 shadow-sm transition-all duration-500",
              showSuccess
                ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary)]/5 shadow-lg scale-105"
                : "hover:border-[color:var(--color-primary)] hover:shadow-md"
            )}
            onClick={(event) => event.stopPropagation()}
          >
            {/* Success animation */}
            {showSuccess && (
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-5 w-5 text-[color:var(--color-primary)] animate-pulse" />
              </div>
            )}

            <Link2 className={cn(
              "h-4 w-4 flex-shrink-0 transition-colors duration-300",
              showSuccess ? "text-[color:var(--color-primary)]" : "text-slate-500"
            )} />

            <a
              href={displayLink}
              onClick={(event) => event.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex-1 truncate font-medium transition-colors duration-300",
                showSuccess
                  ? "text-[color:var(--color-primary)] font-semibold"
                  : "text-slate-700 hover:text-[color:var(--color-primary)]"
              )}
              title={displayLink}
            >
              {displayLink}
            </a>
            <button
              type="button"
              onClick={copyToClipboard}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300",
                showSuccess
                  ? "border-[color:var(--color-primary)] bg-white text-[color:var(--color-primary)] shadow-md hover:scale-110"
                  : "border-slate-200 bg-white text-slate-600 hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)] hover:scale-105"
              )}
              title="Copy link"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <Button
            type="button"
            onClick={handlePrimaryAction}
            disabled={status.disabled || (partnershipStatus === 'approved' && isGenerating)}
            className={cn(
              'relative flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-500 overflow-hidden',
              status.actionClass,
              (status.disabled || (partnershipStatus === 'approved' && isGenerating)) && 'cursor-not-allowed opacity-60',
              isAnimating && 'scale-105 shadow-lg'
            )}
            style={status.actionStyle}
          >
            {/* Animated background for generating state */}
            {isGenerating && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.5s_infinite]" />
            )}

            {/* Pulse animation for generating */}
            {isGenerating && (
              <div className="absolute inset-0 rounded-xl border-2 border-white/30 animate-pulse" />
            )}

            <div className="relative z-10 flex items-center gap-2">
              {partnershipStatus === 'approved' && isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="animate-pulse">Generating...</span>
                </>
              ) : (
                <>
                  <ActionIcon className={cn(
                    "h-4 w-4 transition-transform duration-300",
                    isAnimating && "scale-110"
                  )} />
                  <span>{actionLabel}</span>
                </>
              )}
            </div>
          </Button>
        )}
      </footer>

      {/* Floating particles animation for generating state */}
      {isGenerating && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[var(--color-primary)] rounded-full animate-float"
              style={{
                left: `${20 + i * 30}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      )}
    </article>
  );
}
