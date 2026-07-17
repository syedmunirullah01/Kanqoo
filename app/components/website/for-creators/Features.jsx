// components/website/for-creators/ModernFeaturesSection.jsx
'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
    const featuresRef = useRef(null);
    const cardsRef = useRef([]);

    const features = [
        {
            icon: '🔗',
            title: 'Smart Tracking Links',
            description: 'Advanced analytics to track clicks, conversions, and earnings in real-time with precision.',
            gradient: 'from-blue-500/20 to-cyan-500/20',
            iconBg: 'from-blue-500 to-cyan-500'
        },
        {
            icon: '💸',
            title: 'Highest Payout Rates',
            description: 'Industry-leading commission rates with transparent payout structure and no hidden fees.',
            gradient: 'from-green-500/20 to-emerald-500/20',
            iconBg: 'from-green-500 to-emerald-500'
        },
        {
            icon: '📊',
            title: 'Performance Dashboard',
            description: 'Detailed insights to optimize your content strategy and maximize earnings potential.',
            gradient: 'from-purple-500/20 to-pink-500/20',
            iconBg: 'from-purple-500 to-pink-500'
        },
        {
            icon: '🚀',
            title: 'Brand Partnerships',
            description: 'Access exclusive partnerships with premium brands in your niche and beyond.',
            gradient: 'from-orange-500/20 to-red-500/20',
            iconBg: 'from-orange-500 to-red-500'
        },
        {
            icon: '💳',
            title: 'Flexible Payouts',
            description: 'Withdraw earnings via PayPal, bank transfer, or crypto with lightning-fast processing.',
            gradient: 'from-indigo-500/20 to-blue-500/20',
            iconBg: 'from-indigo-500 to-blue-500'
        },
        {
            icon: '🤝',
            title: 'Dedicated Support',
            description: 'Personal account manager to help you grow and optimize your campaigns 24/7.',
            gradient: 'from-teal-500/20 to-cyan-500/20',
            iconBg: 'from-teal-500 to-cyan-500'
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background animations (continuous, not scroll-triggered)
            gsap.to('#features-grid-pattern', {
                x: 30,
                y: 30,
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            gsap.to('#features-orb-1', {
                x: 50,
                y: -30,
                rotation: 360,
                duration: 25,
                repeat: -1,
                ease: 'none'
            });

            gsap.to('#features-orb-2', {
                x: -40,
                y: 40,
                rotation: -360,
                duration: 30,
                repeat: -1,
                ease: 'none'
            });

            // Shimmer effect
            gsap.to('#features-shimmer', {
                x: '200%',
                duration: 3,
                repeat: -1,
                ease: 'power2.inOut',
                delay: 2
            });

            // Header animations - FIXED: Remove reverse action
            const headerTL = gsap.timeline({
                scrollTrigger: {
                    trigger: featuresRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none' // FIXED: No reverse
                }
            });

            headerTL
                .fromTo('#features-badge',
                    { y: 50, opacity: 0, scale: 0.8 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
                )
                .fromTo('#features-heading',
                    { y: 60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 0.2
                )
                .fromTo('#features-subtitle',
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.4
                );

            // Enhanced card animations - FIXED: Remove reverse action
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                const cardTL = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none' // FIXED: No reverse
                    }
                });

                cardTL
                    .fromTo(card,
                        {
                            y: 100,
                            opacity: 0,
                            scale: 0.8,
                            rotationY: -15
                        },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            rotationY: 0,
                            duration: 1,
                            ease: 'power2.out',
                            delay: index * 0.1
                        }
                    )
                    .fromTo(card.querySelector('.feature-icon'),
                        { scale: 0, rotation: -180 },
                        { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)' },
                        0.3
                    )
                    .fromTo(card.querySelector('.feature-content'),
                        { y: 20, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
                        0.5
                    )
                    .fromTo(card.querySelector('.feature-line'),
                        { scaleX: 0 },
                        { scaleX: 1, duration: 0.4, ease: 'power2.out' },
                        0.7
                    );

                // Enhanced hover animations
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        y: -10,
                        scale: 1.05,
                        duration: 0.3,
                        ease: 'power2.out'
                    });

                    gsap.to(card.querySelector('.feature-icon'), {
                        scale: 1.2,
                        rotation: 5,
                        duration: 0.3,
                        ease: 'power2.out'
                    });

                    gsap.to(card.querySelector('.feature-glow'), {
                        opacity: 0.6,
                        scale: 1.1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        y: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });

                    gsap.to(card.querySelector('.feature-icon'), {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });

                    gsap.to(card.querySelector('.feature-glow'), {
                        opacity: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            });

        }, featuresRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={featuresRef}
            className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#0f0f23] to-[#18182f]"
        >
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0">
                {/* Animated Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                    id="features-grid-pattern"
                ></div>

                {/* Floating Gradient Orbs */}
                <div
                    className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-primary/20 to-secondary/15 rounded-full filter blur-3xl"
                    id="features-orb-1"
                ></div>
                <div
                    className="absolute bottom-1/3 -right-32 w-48 h-48 bg-gradient-to-r from-secondary/15 to-primary/20 rounded-full filter blur-3xl"
                    id="features-orb-2"
                ></div>

                {/* Enhanced Shimmer Effect */}
                <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 -translate-x-full"
                    id="features-shimmer"
                ></div>

                {/* Radial Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Enhanced Header Section */}
                <div className="text-center mb-20">
                    <div
                        className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 mb-8"
                        id="features-badge"
                    >
                        <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-white/80 tracking-wide">POWERFUL FEATURES</span>
                    </div>

                    <h2
                        className="text-4xl md:text-6xl lg:text-7xl font-unbounded font-bold mb-6 leading-tight"
                        id="features-heading"
                    >
                        <span className="text-white">Everything You Need</span>
                        <br />
                        <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                            To Succeed
                        </span>
                    </h2>

                    <p
                        className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                        id="features-subtitle"
                    >
                        Powerful tools and features designed to help you focus on creating great content
                        while we handle the business complexities behind the scenes.
                    </p>
                </div>

                {/* Enhanced Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
                            style={{ perspective: '1000px' }}
                        >
                            {/* Card Glow Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl opacity-0 feature-glow`}></div>

                            {/* Shine Effect */}
                            <div className="absolute inset-0 rounded-3xl overflow-hidden">
                                <div className="absolute -inset-full top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            </div>

                            {/* Content Container */}
                            <div className="relative z-10">
                                {/* Enhanced Icon */}
                                <div className="mb-6">
                                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.iconBg} rounded-2xl flex items-center justify-center feature-icon shadow-lg`}>
                                        <span className="text-2xl filter drop-shadow-lg">{feature.icon}</span>
                                    </div>
                                </div>

                                {/* Feature Content */}
                                <div className="feature-content">
                                    <h3 className="text-xl font-unbounded font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Enhanced Progress Line */}
                                <div className="mt-6">
                                    <div className={`h-1 bg-gradient-to-r ${feature.iconBg} rounded-full feature-line origin-left transform scale-x-0`}></div>
                                </div>
                            </div>

                            {/* Corner Accent */}
                            <div className="absolute top-6 right-6 w-3 h-3 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;