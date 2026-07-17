// app/publisher/marketplace/page.jsx
"use client";
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import MarketplaceHeader from '@/app/components/dashboard/publisher/marketplace/MarketplaceHeader';
import FiltersSidebar from '@/app/components/dashboard/publisher/marketplace/FiltersSidebar';
import AdvertisersGrid from '@/app/components/dashboard/publisher/marketplace/AdvertisersGrid';
import AdvertiserDetailModal from '@/app/components/dashboard/publisher/marketplace/AdvertiserDetailModal';
import DeepLinkCreator from '@/app/components/dashboard/publisher/marketplace/DeepLinkCreator';
import { toast } from 'sonner';

const normalizeMerchantForMarketplace = (merchant) => {
    const getNumericMid = () => {
        const midCandidate =
            merchant?.mid ??
            merchant?.merchantId ??
            merchant?.merchant_id ??
            merchant?.id;
        const midStr = midCandidate != null ? String(midCandidate).trim() : '';
        return /^\d+$/.test(midStr) ? midStr : '';
    };

    const safeArray = (value, mapFn) => {
        const baseArray = Array.isArray(value)
            ? value
            : typeof value === 'string' && value.trim()
                ? [value.trim()]
                : [];
        if (typeof mapFn === 'function') {
            return baseArray.map(item => mapFn(item)).filter(Boolean);
        }
        return baseArray;
    };

    const normalizeCookieDuration = (input) => {
        if (input === null || input === undefined) return 'N/A';
        if (typeof input === 'number' && Number.isFinite(input)) return String(input);
        if (typeof input === 'string') {
            const match = input.match(/\d+/);
            if (match) return match[0];
            return input.trim() || 'N/A';
        }
        return 'N/A';
    };

    const status = (merchant?.partnershipStatus || '').toLowerCase();
    let normalizedStatus = 'not_joined';
    if (['approved', 'active', 'partner', 'joined'].includes(status)) {
        normalizedStatus = 'approved';
    } else if (['pending', 'awaiting', 'processing', 'in_review'].includes(status)) {
        normalizedStatus = 'pending';
    } else if (['not available', 'rejected'].includes(status)) {
        normalizedStatus = 'pending';
    }

    const partnershipType =
        merchant?.partnershipType ||
        (merchant?.canPartner === true ? 'auto-approve' : 'manual');

    const rawUrl =
        merchant?.url ||
        merchant?.website ||
        merchant?.programUrl ||
        merchant?.landingPage ||
        merchant?.raw?.defaultLanding ||
        merchant?.raw?.url ||
        '';

    const commission =
        merchant?.commission ||
        merchant?.raw?.commission ||
        merchant?.raw?.default_commission ||
        'N/A';

    const returnDays = normalizeCookieDuration(
        merchant?.returnDays ??
        merchant?.cookieDuration ??
        merchant?.raw?.cookie_duration
    );

    const merchantId = getNumericMid();

    return {
        merchant: {
            id: merchantId,
            name: merchant?.name || 'Unknown Merchant',
            logoUrl: merchant?.logoUrl || merchant?.logo || '',
            url: rawUrl,
            description: merchant?.description || merchant?.summary || '',
            commission: typeof commission === 'number' ? `${commission}%` : commission,
            returnDays,
            categories: safeArray(merchant?.categories, (item) => item?.toString().trim()).slice(0, 8),
            shipsTo: safeArray(merchant?.shipsTo, (item) => item?.toString().trim().toUpperCase()),
            partnershipType,
            network: merchant?.network || '',
            termsUrl: merchant?.termsUrl || merchant?.raw?.terms_url || '',
            averagePaymentTime: merchant?.averagePaymentTime || '',
        },
        partnershipStatus: normalizedStatus
    };
};

const PAGE_SIZE = 60;

export default function MarketplacePage() {
    const [advertisers, setAdvertisers] = useState([]);
    const [filteredAdvertisers, setFilteredAdvertisers] = useState([]);
    const [selectedAdvertiser, setSelectedAdvertiser] = useState(null);
    const [deepLinkAdvertiser, setDeepLinkAdvertiser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        category: 'all',
        minCommission: 0,
        country: 'all'
    });
    const filtersRef = useRef(filters);
    useEffect(() => {
        filtersRef.current = filters;
    }, [filters]);

    // Track generating state per merchant (for inline cards)
    const [generatingLinks, setGeneratingLinks] = useState({});

    // Store generated links per merchant (for inline cards)
    const [generatedLinks, setGeneratedLinks] = useState({});

    // Ref for scrolling to DeepLinkCreator
    const builderRef = useRef(null);

    const [publisherLinks, setPublisherLinks] = useState([]);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await fetch('/api/admin/profile');
                const data = await res.json();
                if (data.success && data.data) {
                    setPublisherLinks(data.data.links || []);
                }
            } catch (e) {
                console.error('Failed to load profile links for compliance', e);
            }
        }
        fetchProfile();
    }, []);


    const categoryOptions = useMemo(() => {
        const map = new Map();
        advertisers.forEach((adv) => {
            (adv.merchant.categories || []).forEach((category) => {
                if (!category) return;
                const key = category.trim().toLowerCase();
                if (!key) return;
                if (!map.has(key)) {
                    map.set(key, category.trim());
                }
            });
        });
        return Array.from(map.entries())
            .sort((a, b) => a[1].localeCompare(b[1]))
            .map(([value, label]) => ({ value, label }));
    }, [advertisers]);

    const countryOptions = useMemo(() => {
        const map = new Map();
        advertisers.forEach((adv) => {
            (adv.merchant.shipsTo || []).forEach((country) => {
                if (!country) return;
                const label = country.trim();
                if (!label) return;
                const key = label.toLowerCase();
                if (!map.has(key)) {
                    map.set(key, label);
                }
            });
        });
        return Array.from(map.entries())
            .sort((a, b) => a[1].localeCompare(b[1]))
            .map(([value, label]) => ({ value, label }));
    }, [advertisers]);

    const fetchMerchants = useCallback(async ({ page = 1, append = false, filters: overrideFilters } = {}) => {
        append ? setIsLoadingMore(true) : setIsLoading(true);
        setError('');
        const appliedFilters = overrideFilters ?? filtersRef.current;
        try {
            const params = new URLSearchParams({ limit: String(PAGE_SIZE), page: String(page) });
            if (appliedFilters.search?.trim()) {
                params.set('search', appliedFilters.search.trim());
            }
            if (appliedFilters.category && appliedFilters.category !== 'all') {
                params.set('category', appliedFilters.category);
            }
            if (appliedFilters.country && appliedFilters.country !== 'all') {
                params.set('country', appliedFilters.country);
            }

            const response = await fetch(`/api/admin/merchants?${params.toString()}`, { cache: 'no-store' });
            if (!response.ok) throw new Error(`Failed to load merchants (status ${response.status})`);
            const payload = await response.json();
            if (!payload?.success) throw new Error(payload?.error || 'Failed to load merchants');

            const mapped = (payload.data || [])
                .map(normalizeMerchantForMarketplace)
                .filter(x => x.merchant.id);

            setHasMore(Boolean(payload?.hasMore));
            setCurrentPage(page);

            if (append) {
                setAdvertisers(prev => {
                    const ids = new Set(prev.map(it => it.merchant.id));
                    return [...prev, ...mapped.filter(m => !ids.has(m.merchant.id))];
                });
            } else {
                setAdvertisers(mapped);
            }
        } catch (err) {
            console.error('Marketplace merchants load failed:', err);
            setError(err.message || 'Unable to load merchants right now.');
            if (!append) {
                setAdvertisers([]);
                setHasMore(false);
            }
        } finally {
            append ? setIsLoadingMore(false) : setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMerchants({
            page: 1,
            append: false,
            filters: {
                search: filters.search,
                category: filters.category,
                country: filters.country,
            },
        });
    }, [filters.search, filters.category, filters.country, fetchMerchants]);

    useEffect(() => {
        if (!advertisers.length) {
            setFilteredAdvertisers([]);
            return;
        }

        if (filters.minCommission <= 0) {
            setFilteredAdvertisers(advertisers);
            return;
        }

        const min = Number(filters.minCommission) || 0;
        const filtered = advertisers.filter(adv => {
            const match = adv.merchant.commission.match(/(\d+)%/);
            return match && parseInt(match[1], 10) >= min;
        });

        setFilteredAdvertisers(filtered);
    }, [advertisers, filters.minCommission]);

    const updateAdvertiserStatus = useCallback((advertiserId, status) => {
        setAdvertisers(prev => prev.map(adv =>
            adv.merchant.id === advertiserId ? { ...adv, partnershipStatus: status } : adv
        ));
        setFilteredAdvertisers(prev => prev.map(adv =>
            adv.merchant.id === advertiserId ? { ...adv, partnershipStatus: status } : adv
        ));
    }, []);

    const handleClearDeepLinkAdvertiser = useCallback(() => setDeepLinkAdvertiser(null), []);

    // Called from grid "Get Link" button - generates inline
    const handleGetLink = useCallback(async (advertiser) => {
        const merchantId = advertiser?.merchant?.id;
        const merchantUrl = advertiser?.merchant?.url;

        if (!merchantId) {
            console.error('Invalid merchant ID');
            return;
        }

        // Check if already generating
        if (generatingLinks[merchantId]) {
            return;
        }

        const network = advertiser?.merchant?.network;


        // Start generating
        setGeneratingLinks(prev => ({ ...prev, [merchantId]: true }));
        setGeneratedLinks(prev => ({ ...prev, [merchantId]: null })); // Clear previous

        try {
            const payload = {
                url: merchantUrl,
                merchantId: merchantId,
                network: network,
            };
            if (publisherLinks.length > 0) {
                payload.sourceUrl = publisherLinks[0];
            }
            const response = await fetch('/api/publisher/marketplace/deep-links', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok || !data?.success) {
                throw new Error(data?.error || 'Failed to generate link');
            }

            const linkPayload = {
                ...data.data,
                timestamp: Date.now(),
            };

            setGeneratedLinks(prev => ({
                ...prev,
                [merchantId]: linkPayload
            }));

            const linkToCopy = linkPayload.cloakedUrl || linkPayload.deepLinkUrl;

            if (linkToCopy && typeof navigator !== 'undefined' && navigator.clipboard) {
                try {
                    await navigator.clipboard.writeText(linkToCopy);
                    toast.success('Link ready and copied to clipboard', {
                        style: {
                            background: 'var(--color-primary)',
                            color: 'var(--color-accent)',
                            border: '1px solid var(--color-secondary)'
                        }
                    });
                } catch (_copyError) {
                    toast.success('Link ready', {
                        description: 'Unable to copy automatically. Use the copy icon to grab it.',
                        style: {
                            background: 'var(--color-primary)',
                            color: 'var(--color-accent)',
                            border: '1px solid var(--color-secondary)'
                        }
                    });
                }
            } else {
                toast.success('Link ready', {
                    description: 'Use the copy icon to grab it.',
                    style: {
                        background: 'var(--color-primary)',
                        color: 'var(--color-accent)',
                        border: '1px solid var(--color-secondary)'
                    }
                });
            }

        } catch (error) {
            console.error('Link generation error:', error);
            toast.error(error.message || 'Failed to generate link', {
                style: {
                    background: 'var(--color-secondary)',
                    color: 'var(--color-accent)'
                }
            });
            setGeneratedLinks(prev => {
                const next = { ...prev };
                delete next[merchantId];
                return next;
            });
        } finally {
            setGeneratingLinks(prev => ({ ...prev, [merchantId]: false }));
        }
    }, [generatingLinks]);

    // Called when user wants to use DeepLinkCreator component
    const handleSelectForBuilder = useCallback((advertiser) => {
        setDeepLinkAdvertiser(advertiser);
        // Scroll to builder
        requestAnimationFrame(() => {
            builderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }, []);

    const handleAdvertiserClick = (advertiser) => {
        setSelectedAdvertiser(advertiser);
        setIsModalOpen(true);
    };

    const handleApply = (advertiserId) => {
        updateAdvertiserStatus(advertiserId, 'pending');
        if (deepLinkAdvertiser?.merchant?.id === advertiserId) setDeepLinkAdvertiser(null);
        setIsModalOpen(false);
    };

    const handleLoadMore = () => {
        if (isLoadingMore || !hasMore) return;
        fetchMerchants({ page: currentPage + 1, append: true });
    };

    const totalAdvertisers = advertisers.length;
    const activeLinks = advertisers.filter(adv => adv.partnershipStatus === 'approved').length;

    const clearFilters = () => {
        setFilters({
            search: '',
            category: 'all',
            minCommission: 0,
            country: 'all'
        });
    };

    const clickThroughRate = totalAdvertisers > 0
        ? Math.round((activeLinks / totalAdvertisers) * 1000) / 10
        : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 py-8">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-10">
                <MarketplaceHeader
                    totalAdvertisers={totalAdvertisers}
                    activeLinks={activeLinks}
                    ctr={clickThroughRate}
                    resultCount={filteredAdvertisers.length}
                />

                {error && (
                    <div className="mb-6 flex flex-col gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                        <span>{error}</span>
                        <div>
                            <button
                                type="button"
                                onClick={fetchMerchants}
                                className="inline-flex items-center gap-2 rounded-lg border border-rose-300 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-rose-600"
                            >
                                Retry Loading Merchants
                            </button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1">
                        <FiltersSidebar
                            filters={filters}
                            onFiltersChange={setFilters}
                            onClearFilters={clearFilters}
                            categories={categoryOptions}
                            countries={countryOptions}
                        />
                    </div>

                    <div className="lg:col-span-3 space-y-6">
                        {/* Deep Link Creator - Works Independently */}
                        <div ref={builderRef}>
                            <DeepLinkCreator
                                selectedAdvertiser={deepLinkAdvertiser}
                                onClearAdvertiser={handleClearDeepLinkAdvertiser}
                                advertisers={advertisers}
                            />
                        </div>

                        {/* Advertisers Grid - Inline Link Generation */}
                        <AdvertisersGrid
                            advertisers={filteredAdvertisers}
                            isLoading={isLoading}
                            isLoadingMore={isLoadingMore}
                            canLoadMore={hasMore}
                            onLoadMore={handleLoadMore}
                            onAdvertiserClick={handleAdvertiserClick}
                            onApply={handleApply}
                            onGetLink={handleGetLink}
                            generatingLinks={generatingLinks}
                            generatedLinks={generatedLinks}
                        />
                    </div>
                </div>

                <AdvertiserDetailModal
                    advertiser={selectedAdvertiser}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onApply={handleApply}
                    onGetLink={handleGetLink}
                    isGeneratingLink={selectedAdvertiser?.merchant?.id ? generatingLinks[selectedAdvertiser.merchant.id] : false}
                    generatedLink={selectedAdvertiser?.merchant?.id ? generatedLinks[selectedAdvertiser.merchant.id] : null}
                />
            </div>
        </div>
    );
}











