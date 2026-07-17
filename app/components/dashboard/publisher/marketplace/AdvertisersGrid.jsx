"use client";

import { Fragment } from 'react';
import { Loader2, RefreshCcw } from 'lucide-react';
import AdvertiserCard from './AdvertiserCard';

export default function AdvertisersGrid({
  advertisers = [],
  onAdvertiserClick,
  onGetLink,
  onApply,
  generatingLinks = {},
  generatedLinks = {},
  isLoading,
  isLoadingMore = false,
  canLoadMore = false,
  onLoadMore,
}) {
  const safeAdvertisers = Array.isArray(advertisers)
    ? advertisers.filter(Boolean)
    : [];
  const total = safeAdvertisers.length;

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Available Advertisers
          </h2>
          <p className="text-sm text-slate-600">
            {isLoading
              ? 'Loading advertisers...'
              : `Showing ${total} advertiser${total === 1 ? '' : 's'}`}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white/80 py-16 text-slate-500">
            <Loader2 className="mb-4 h-6 w-6 animate-spin text-emerald-500" />
            Fetching advertiser catalog…
          </div>
        ) : total === 0 ? (
          <div className="col-span-full rounded-2xl border border-slate-200 bg-white/70 p-8 text-center">
            <p className="text-base font-semibold text-slate-600">
              No advertisers match your filters.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Try adjusting the search, category, or partnership filters.
            </p>
          </div>
        ) : (
          safeAdvertisers.map((advertiser) => {
            const merchantId = advertiser?.merchant?.id;
            const generatedLink =
              merchantId != null ? generatedLinks?.[merchantId] : null;
            const isGenerating =
              merchantId != null ? generatingLinks?.[merchantId] : false;

            return (
              <Fragment key={merchantId ?? crypto.randomUUID()}>
                <div className="flex flex-col">
                  <AdvertiserCard
                    advertiser={advertiser}
                    onClick={onAdvertiserClick}
                    onGetLink={onGetLink}
                    onApply={onApply}
                    isGenerating={isGenerating}
                    generatedLink={generatedLink}
                  />
                </div>
              </Fragment>
            );
          })
        )}
      </div>

      {!isLoading && total > 0 && onLoadMore && (
        <div className="pt-4 text-center">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={isLoadingMore || !canLoadMore}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoadingMore && (
              <RefreshCcw className="h-4 w-4 animate-spin text-emerald-500" />
            )}
            {canLoadMore
              ? isLoadingMore
                ? 'Loading more…'
                : 'Load more advertisers'
              : 'All advertisers loaded'}
          </button>
        </div>
      )}
    </div>
  );
}
