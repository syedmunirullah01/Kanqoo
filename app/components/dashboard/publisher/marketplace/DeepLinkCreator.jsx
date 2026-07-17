"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { toast } from 'sonner';
import { Loader2, Link2, Copy, Store, XCircle, ExternalLink, AlertCircle, CheckCircle, Zap, ArrowRight } from 'lucide-react';

const STATUS = { IDLE: 'idle', GENERATING: 'generating', SUCCESS: 'success', ERROR: 'error' };

const hostnameOf = (u) => {
  try {
    return new URL(u).hostname.replace(/^www\./i, '').toLowerCase();
  } catch {
    return '';
  }
};

const hostsMatch = (urlA, urlB) => {
  if (!urlA || !urlB) return false;
  const hostA = hostnameOf(urlA);
  const hostB = hostnameOf(urlB);
  if (!hostA || !hostB) return false;
  if (hostA === hostB) return true;
  const rootA = hostA.split('.').slice(-2).join('.');
  const rootB = hostB.split('.').slice(-2).join('.');
  return rootA === rootB;
};

const validateUrl = (url, merchant) => {
  if (!url || !merchant?.url) return { valid: true };

  try {
    const inputHost = hostnameOf(url);
    const merchantHost = hostnameOf(merchant.url);

    if (!inputHost) return { valid: false, message: 'Invalid URL format' };
    if (!merchantHost) return { valid: true };

    const inputRoot = inputHost.split('.').slice(-2).join('.');
    const merchantRoot = merchantHost.split('.').slice(-2).join('.');

    if (inputRoot !== merchantRoot) {
      return {
        valid: false,
        message: `URL must be from ${merchant.name}'s domain`
      };
    }

    return { valid: true };
  } catch {
    return { valid: false, message: 'Invalid URL format' };
  }
};

export default function DeepLinkCreator({ selectedAdvertiser, onClearAdvertiser, advertisers = [] }) {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [urlValidation, setUrlValidation] = useState({ valid: true });
  const [sourceUrl, setSourceUrl] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/admin/profile');
        const data = await res.json();
        if (data.success && data.data) {
          const links = data.data.links || [];
          if (links.length > 0) {
            setSourceUrl(links[0]);
          }
        }
      } catch (e) {
        console.error('Failed to load profile links for compliance', e);
      }
    }
    fetchProfile();
  }, []);

  useEffect(() => {
    if (selectedAdvertiser?.merchant?.url) {
      setUrl(prev => prev || selectedAdvertiser.merchant.url);
    }
  }, [selectedAdvertiser]);

  const ensureUrlScheme = useCallback((value) => {
    const trimmed = (value || '').trim();
    if (!trimmed) return '';
    if (/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmed)) {
      return trimmed;
    }
    return `https://${trimmed}`;
  }, []);

  const matchedAdvertiser = useMemo(() => {
    if (selectedAdvertiser?.merchant?.id) return null;
    if (!url) return null;
    const normalizedInput = ensureUrlScheme(url);
    return (
      advertisers.find(
        (adv) => adv?.merchant?.url && hostsMatch(normalizedInput, adv.merchant.url)
      ) || null
    );
  }, [advertisers, selectedAdvertiser, url, ensureUrlScheme]);

  const activeAdvertiser = selectedAdvertiser ?? matchedAdvertiser;

  useEffect(() => {
    const normalizedForValidation = url ? ensureUrlScheme(url) : '';
    if (normalizedForValidation && activeAdvertiser?.merchant) {
      const validation = validateUrl(normalizedForValidation, activeAdvertiser.merchant);
      setUrlValidation(validation);
      if (!validation.valid && error !== validation.message) {
        setError('');
      }
    } else {
      setUrlValidation({ valid: true });
    }
  }, [url, activeAdvertiser, error, ensureUrlScheme]);



  const currentMid = activeAdvertiser?.merchant?.id ? String(activeAdvertiser.merchant.id) : '';
  const effectiveUrl = ensureUrlScheme(url || activeAdvertiser?.merchant?.url || '');

  const clearSelected = () => {
    onClearAdvertiser?.();
    setUrl('');
    setResult(null);
    setStatus(STATUS.IDLE);
    setError('');
    setUrlValidation({ valid: true });
  };

  const handleCopy = async () => {
    const linkToCopy = result?.cloakedUrl || result?.deepLinkUrl;
    if (!linkToCopy) return;
    try {
      await navigator.clipboard.writeText(linkToCopy);
      toast.success('Link copied to clipboard');
    } catch {
      toast.error('Copy failed');
    }
  };

  const handleTestLink = () => {
    const linkToOpen = result?.cloakedUrl || result?.deepLinkUrl;
    if (!linkToOpen) return;
    window.open(linkToOpen, '_blank', 'noopener,noreferrer');
  };

  const handleGenerate = async () => {
    if (status === STATUS.GENERATING) return;

    if (currentMid && !/^\d+$/.test(currentMid)) {
      setError('Invalid merchant identifier');
      setStatus(STATUS.ERROR);
      return;
    }

    const normalizedUrl = ensureUrlScheme(effectiveUrl);
    if (normalizedUrl !== effectiveUrl) {
      setUrl(normalizedUrl);
    }

    if (!normalizedUrl) {
      setError('Enter a destination URL');
      setStatus(STATUS.ERROR);
      return;
    }

    try {
      new URL(normalizedUrl);
    } catch {
      setError('Enter a valid URL');
      setStatus(STATUS.ERROR);
      return;
    }

    const validation = activeAdvertiser?.merchant
      ? validateUrl(normalizedUrl, activeAdvertiser.merchant)
      : { valid: true };
    if (!validation.valid) {
      setError(validation.message);
      setStatus(STATUS.ERROR);
      return;
    }

    setStatus(STATUS.GENERATING);
    setError('');
    setResult(null);

    try {
      const payload = { url: normalizedUrl };
      if (currentMid) {
        payload.merchantId = currentMid;
      }
      if (activeAdvertiser?.merchant?.network) {
        payload.network = activeAdvertiser.merchant.network;
      }
      if (sourceUrl) {
        payload.sourceUrl = sourceUrl;
      }
      const response = await fetch('/api/publisher/marketplace/deep-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        const errorMsg = data?.error || 'Generation failed';
        throw new Error(errorMsg);
      }

      setResult(data.data);
      setStatus(STATUS.SUCCESS);
      toast.success('Link generated successfully');
    } catch (e) {
      setStatus(STATUS.ERROR);
      setError(e instanceof Error ? e.message : 'Request failed');
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-[var(--color-secondary)] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--color-secondary)] rounded-lg backdrop-blur-sm">
              <Link2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[var(--color-accent)] font-unbounded">Deep Link Generator</h3>
              <p className="text-sm text-white/70 mt-0.5">
                Create affiliate tracking links
              </p>
            </div>
          </div>

          {selectedAdvertiser && (
            <button
              onClick={clearSelected}
              className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 group"
              title="Change merchant"
            >
              <XCircle className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Merchant Selection Status */}
        {activeAdvertiser ? (
          <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4">
            <div className="relative z-10 flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="p-3 bg-[var(--color-bg)] rounded-xl">
                  <Store className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate font-unbounded">
                  {activeAdvertiser.merchant.name}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-gray-500">MID: {currentMid}</span>
                  {!selectedAdvertiser && matchedAdvertiser && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                      <Zap className="h-3 w-3" />
                      Auto-matched
                    </span>
                  )}
                </div>
              </div>
              {activeAdvertiser.merchant.commission && (
                <div className="flex-shrink-0 px-3 py-1.5 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <span className="text-sm font-semibold text-gray-900">
                    {activeAdvertiser.merchant.commission}
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900">Merchant not locked in</p>
              <p className="text-sm text-amber-700 mt-0.5">
                Paste any approved advertiser URL and we will auto-detect the merchant.
              </p>
            </div>
          </div>
        )}

        {/* URL Input */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Destination URL
          </label>
          <div className="relative">
            <input
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError('');
              }}
              onBlur={() => setUrl((prev) => ensureUrlScheme(prev))}
              disabled={status === STATUS.GENERATING}
              placeholder="https://merchant.com/product/..."
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl bg-white focus:border-[var(--color-bg)] focus:ring-2 focus:ring-[var(--color-bg)]/10 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 outline-none"
            />
            {status === STATUS.GENERATING && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Loader2 className="h-5 w-5 text-[var(--color-bg)] animate-spin" />
              </div>
            )}
          </div>

          {url && !urlValidation.valid && (
            <div className="flex items-start gap-2 text-sm text-rose-700 bg-rose-50 px-3 py-2.5 rounded-lg border border-rose-200">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>{urlValidation.message}</span>
            </div>
          )}
        </div>

        {/* Source URL for Awin Compliance */}
        {activeAdvertiser?.merchant?.network === 'awin' && (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Source Website / Referral URL
            </label>
            <input
              type="url"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="https://yourwebsite.com"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl bg-white focus:border-[var(--color-bg)] focus:ring-2 focus:ring-[var(--color-bg)]/10 transition-all duration-200 outline-none"
            />
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={status === STATUS.GENERATING}
          className="w-full py-3.5 px-4 bg-[var(--color-secondary)] text-white text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-80 font-unbounded group"
        >
          {status === STATUS.GENERATING ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Generating Link...</span>
            </>
          ) : (
            <>
              <span>Generate Affiliate Link</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {/* Error Display */}
        {error && (
          <div className="flex items-start gap-2 text-sm text-rose-700 bg-rose-50 px-4 py-3 rounded-xl border border-rose-200">
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30">
            <div className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
              <div className="flex-shrink-0">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-500 mb-1">Affiliate Link Generated</p>
                <p className="text-xs text-gray-700 break-all font-mono leading-relaxed">
                  {result.cloakedUrl || result.deepLinkUrl}
                </p>
              </div>
              <button
                onClick={handleCopy}
                className="flex-shrink-0 p-2 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
                title="Copy link"
              >
                <Copy className="h-4 w-4 text-gray-600 group-hover:text-[var(--color-bg)] transition-colors" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
