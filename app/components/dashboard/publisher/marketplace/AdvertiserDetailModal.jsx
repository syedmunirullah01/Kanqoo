import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Separator } from '@/app/components/ui/separator';
import {
    Zap,
    Clock,
    ExternalLink,
    CheckCircle,
    Globe,
    X,
    Loader2,
    Copy,
    Link2,
    Sparkles,
    Shield,
    TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

export default function AdvertiserDetailModal({
    advertiser,
    isOpen,
    onClose,
    onApply,
    onGetLink,
    isGeneratingLink = false,
    generatedLink = null
}) {
    if (!advertiser) return null;

    const { merchant, partnershipStatus } = advertiser;
    const [isAnimating, setIsAnimating] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [pulseEffect, setPulseEffect] = useState(false);

    useEffect(() => {
        if (generatedLink && partnershipStatus === 'approved') {
            setIsAnimating(true);
            setShowSuccess(true);
            setPulseEffect(true);

            const successTimer = setTimeout(() => {
                setIsAnimating(false);
                setPulseEffect(false);
            }, 3000);

            const pulseTimer = setTimeout(() => {
                setPulseEffect(false);
            }, 1000);

            return () => {
                clearTimeout(successTimer);
                clearTimeout(pulseTimer);
            };
        }
    }, [generatedLink, partnershipStatus]);

    const hasExternalLink = Boolean(merchant.url);
    const externalHref = hasExternalLink
        ? (merchant.url.startsWith('http') ? merchant.url : `https://${merchant.url}`)
        : '#';
    const statusLabel =
        merchant.partnershipType === 'manual'
            ? 'Active'
            : merchant.partnershipType
                ? merchant.partnershipType.replace('-', ' ')
                : 'Pending';
    const isAwin = String(merchant.network || '').toLowerCase() === 'awin';
    const paymentTimingLabel = isAwin ? 'Average Payment Time' : 'Return Days';
    const returnDaysLabel =
        !merchant.returnDays || merchant.returnDays === 'N/A'
            ? 'N/A'
            : `${merchant.returnDays} days`;
    const paymentTimingValue = isAwin
        ? (merchant.averagePaymentTime ? `${merchant.averagePaymentTime} days` : 'N/A')
        : returnDaysLabel;
    const displayLink = generatedLink?.cloakedUrl || generatedLink?.deepLinkUrl || '';

    const handleCopyLink = async () => {
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

    const handleCopyMerchantUrl = async () => {
        if (!hasExternalLink || !externalHref || externalHref === '#') return;

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

    const handleApply = () => {
        onApply(merchant.id);
        onClose();
    };

    const handlePrimaryAction = () => {
        if (isApproved) {
            if (displayLink) {
                handleCopyLink();
                return;
            }
            if (!isGeneratingLink && onGetLink) {
                setIsAnimating(true);
                onGetLink(advertiser);
            }
            return;
        }

        handleApply();
    };

    const isApproved = partnershipStatus === 'approved';
    const isPending = partnershipStatus === 'pending';
    const buttonVariant = isPending ? 'outline' : 'default';
    const buttonDisabled = isApproved ? isGeneratingLink : isPending;

    const buttonClassName = isApproved
        ? `bg-[var(--color-secondary)] hover:bg-[var(--color-primary)]/90 text-white relative overflow-hidden transition-all duration-500 ${isAnimating ? 'scale-105 shadow-lg' : ''
        }`
        : isPending
            ? 'border-emerald-200 text-emerald-700 bg-emerald-50'
            : 'bg-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/90 text-white';

    const buttonLabel = isApproved
        ? displayLink
            ? 'Copy Link'
            : isGeneratingLink
                ? 'Generating Link...'
                : 'Get Affiliate Link'
        : isPending
            ? 'Application Pending'
            : merchant.partnershipType === 'auto-approve'
                ? 'Join Program Instantly'
                : 'Apply to Program';

    const ButtonIcon = isApproved
        ? (isGeneratingLink ? Loader2 : displayLink ? Copy : Link2)
        : isPending
            ? Clock
            : Zap;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 via-transparent to-[var(--color-secondary)]/5 rounded-lg" />

                <DialogHeader className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200/50 p-6 rounded-t-lg">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="flex items-center gap-4">
                            <div className="relative">
                                <Avatar className="h-16 w-16 border-2 border-white shadow-lg transition-all duration-300 hover:scale-105">
                                    <AvatarImage src={merchant.logoUrl} />
                                    <AvatarFallback className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold text-lg">
                                        {merchant.name.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                {/* Status indicator */}
                                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${isApproved ? 'bg-emerald-500' :
                                    isPending ? 'bg-amber-500' : 'bg-[var(--color-secondary)]'
                                    }`}>
                                    {isApproved && <CheckCircle className="w-3 h-3 text-white" />}
                                    {isPending && <Clock className="w-3 h-3 text-white" />}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-2xl font-bold text-slate-900">{merchant.name}</div>
                                {hasExternalLink ? (
                                <button
                                    type="button"
                                    onClick={handleCopyMerchantUrl}
                                    className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 flex items-center gap-2 transition-all duration-300 hover:gap-3 group"
                                >
                                    <span className="font-medium">
                                        {merchant.url.replace(/^https?:\/\//, '')}
                                    </span>
                                    <Copy className="w-4 h-4 transition-transform group-hover:scale-110" />
                                </button>
                                ) : (
                                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Landing page unavailable
                                    </span>
                                )}
                            </div>
                        </DialogTitle>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="rounded-full hover:bg-slate-100 transition-all duration-300 hover:scale-110"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </DialogHeader>

                <div className="relative z-10 space-y-6 p-6">
                    {/* Enhanced Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-2xl border border-slate-200/50 shadow-sm">
                        <div className="text-center space-y-2">
                            <div className="flex items-center justify-center gap-2">
                                <TrendingUp className="w-5 h-5 text-green-600" />
                                <div className="text-2xl font-bold text-green-600">{merchant.commission}</div>
                            </div>
                            <div className="text-sm font-medium text-slate-600">Commission</div>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="flex items-center justify-center gap-2">
                                <Clock className="w-5 h-5 text-blue-600" />
                                <div className="text-2xl font-bold text-blue-600">{paymentTimingValue}</div>
                            </div>
                            <div className="text-sm font-medium text-slate-600">{paymentTimingLabel}</div>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="flex items-center justify-center gap-2">
                                <Shield className="w-5 h-5 text-purple-600" />
                                <div className="text-2xl font-bold text-purple-600 capitalize">
                                    {statusLabel}
                                </div>
                            </div>
                            <div className="text-sm font-medium text-slate-600">Status</div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-slate-900 text-lg flex items-center gap-2">
                            <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full" />
                            About {merchant.name}
                        </h3>
                        <p className="text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-200/50">
                            {merchant.description || 'Description not available for this program.'}
                        </p>
                    </div>

                    <Separator className="bg-slate-200/50" />

                    {/* Categories */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-slate-900 text-lg">Categories</h3>
                        <div className="flex flex-wrap gap-2">
                            {merchant.categories.length > 0 ? (
                                merchant.categories.map((category, index) => (
                                    <Badge
                                        key={index}
                                        className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20 hover:bg-[var(--color-primary)]/20 transition-all duration-300 hover:scale-105 cursor-default"
                                    >
                                        {category}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-sm text-slate-500">No categories listed.</span>
                            )}
                        </div>
                    </div>

                    {/* Target Countries */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-slate-900 text-lg flex items-center gap-2">
                            <Globe className="w-5 h-5 text-[var(--color-primary)]" />
                            Ships To
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {merchant.shipsTo.length > 0 ? (
                                merchant.shipsTo.map((country, index) => (
                                    <Badge
                                        key={index}
                                        variant="outline"
                                        className="bg-white text-slate-700 border-slate-300 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-300 hover:scale-105 cursor-default"
                                    >
                                        {country}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-sm text-slate-500">Shipping regions not specified.</span>
                            )}
                        </div>
                    </div>

                    {/* Enhanced CTA Section */}
                    <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm pt-6 border-t border-slate-200/50 -mx-6 px-6 pb-6">
                        <div className="space-y-4">
                            <Button
                                onClick={handlePrimaryAction}
                                variant={buttonVariant}
                                disabled={buttonDisabled}
                                className={`w-full font-semibold text-lg py-4 flex items-center justify-center gap-3 transition-all duration-500 relative overflow-hidden ${buttonClassName}`}
                                size="lg"
                            >
                                {/* Shimmer effect for generating state */}
                                {isGeneratingLink && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1.5s_infinite]" />
                                )}

                                {/* Pulse ring for generating state */}
                                {isGeneratingLink && (
                                    <div className="absolute inset-0 rounded-xl border-2 border-white/40 animate-pulse" />
                                )}

                                <div className="relative z-10 flex items-center gap-3">
                                    <ButtonIcon className={`w-5 h-5 transition-transform duration-300 ${isGeneratingLink ? 'animate-spin' :
                                        showSuccess ? 'scale-110' : ''
                                        }`} />
                                    <span className={`transition-all duration-300 ${isGeneratingLink ? 'animate-pulse' : ''
                                        }`}>
                                        {buttonLabel}
                                    </span>
                                </div>

                                {/* Success sparkle */}
                                {showSuccess && (
                                    <Sparkles className="absolute right-4 w-5 h-5 text-white animate-pulse" />
                                )}
                            </Button>

                            {/* Enhanced Generated Link Display */}
                            {displayLink && (
                                <div className={cn(
                                    "rounded-2xl border bg-gradient-to-r p-4 shadow-lg transition-all duration-500 overflow-hidden",
                                    showSuccess
                                        ? "border-[var(--color-primary)] from-[var(--color-primary)]/5 to-[var(--color-primary)]/10 scale-105"
                                        : "border-slate-200 from-slate-50 to-blue-50/30"
                                )}>
                                    {/* Success animation overlay */}
                                    {showSuccess && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/10 to-transparent animate-pulse" />
                                    )}

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Link2 className={cn(
                                                "w-4 h-4 transition-colors duration-300",
                                                showSuccess ? "text-[var(--color-primary)]" : "text-slate-500"
                                            )} />
                                            <span className={cn(
                                                "text-sm font-semibold transition-colors duration-300",
                                                showSuccess ? "text-[var(--color-primary)]" : "text-slate-600"
                                            )}>
                                                Your Generated Link
                                            </span>
                                            {showSuccess && (
                                                <Sparkles className="w-4 h-4 text-[var(--color-primary)] animate-pulse" />
                                            )}
                                        </div>

                                        <div className="flex items-start justify-between gap-4">
                                            <p className={cn(
                                                "flex-1 break-words font-medium transition-colors duration-300",
                                                showSuccess ? "text-[var(--color-primary)]" : "text-slate-700"
                                            )}>
                                                {displayLink}
                                            </p>
                                            <button
                                                type="button"
                                                onClick={handleCopyLink}
                                                className={cn(
                                                    "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110",
                                                    showSuccess
                                                        ? "border-[var(--color-primary)] bg-white text-[var(--color-primary)] shadow-md"
                                                        : "border-slate-200 bg-white text-slate-600 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                                                )}
                                                title="Copy link"
                                            >
                                                <Copy className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Floating success particles */}
                                    {showSuccess && pulseEffect && (
                                        <div className="absolute inset-0 overflow-hidden rounded-2xl">
                                            {[...Array(5)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="absolute w-1 h-1 bg-[var(--color-primary)] rounded-full animate-float"
                                                    style={{
                                                        left: `${10 + i * 20}%`,
                                                        animationDelay: `${i * 0.3}s`,
                                                        animationDuration: '2s'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Background floating elements */}
                {isGeneratingLink && (
                    <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-2 h-2 bg-[var(--color-primary)]/20 rounded-full animate-float-slow"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${i * 0.5}s`,
                                    animationDuration: '4s'
                                }}
                            />
                        ))}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

// Add missing cn utility if not already available
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
