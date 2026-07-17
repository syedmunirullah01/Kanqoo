// components/website/for-creators/ModernBrandsMarquee.jsx
'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Marquee = () => {
    const sectionRef = useRef(null);
    const marqueeRef = useRef(null);
    const marqueeContentRef = useRef(null);

    const brands = [
        { name: 'Nike', logo: 'NIKE', color: 'from-red-500 to-red-600' },
        { name: 'Apple', logo: 'APPLE', color: 'from-gray-600 to-gray-800' },
        { name: 'Amazon', logo: 'AMZN', color: 'from-orange-400 to-orange-600' },
        { name: 'Adobe', logo: 'ADBE', color: 'from-red-500 to-pink-600' },
        { name: 'Spotify', logo: 'SPOT', color: 'from-green-500 to-green-600' },
        { name: 'Netflix', logo: 'NFLX', color: 'from-red-600 to-red-700' },
        { name: 'Google', logo: 'GOOGL', color: 'from-blue-500 to-green-500' },
        { name: 'Microsoft', logo: 'MSFT', color: 'from-blue-600 to-green-600' },
        { name: 'Samsung', logo: 'SMSNG', color: 'from-blue-400 to-blue-600' },
        { name: 'Tesla', logo: 'TSLA', color: 'from-red-500 to-red-700' }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Ultra-smooth background animations
            gsap.to('#marquee-grid', {
                x: 20,
                y: 20,
                duration: 40,
                repeat: -1,
                ease: 'none',
                yoyo: true
            });

            // Smooth floating orbs
            gsap.to('#marquee-orb-1', {
                y: '+=30',
                rotation: 5,
                duration: 8,
                repeat: -1,
                ease: 'sine.inOut',
                yoyo: true
            });

            gsap.to('#marquee-orb-2', {
                y: '+=20',
                rotation: -3,
                duration: 6,
                repeat: -1,
                ease: 'sine.inOut',
                yoyo: true,
                delay: 1
            });

            // Header animations
            const headerTL = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            headerTL
                .fromTo('#marquee-badge',
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
                )
                .fromTo('#marquee-heading',
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.2
                )
                .fromTo('#marquee-subtitle',
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 0.4
                );

            // Ultra-smooth infinite marquee animation
            const setupMarquee = () => {
                if (!marqueeContentRef.current) return;

                const content = marqueeContentRef.current;
                const contentWidth = content.scrollWidth;
                
                // Duplicate content for seamless loop
                content.innerHTML += content.innerHTML;
                
                // Smooth infinite scroll
                gsap.to(content, {
                    x: -contentWidth,
                    duration: 60, // Slower for smoother motion
                    ease: 'none',
                    repeat: -1,
                    modifiers: {
                        x: gsap.utils.unitize(x => parseFloat(x) % contentWidth)
                    }
                });
            };

            setupMarquee();

            // Larger brand cards animation
            const brandCards = gsap.utils.toArray('.brand-card');
            
            brandCards.forEach((card, index) => {
                // Smooth entrance
                gsap.fromTo(card,
                    {
                        y: 40,
                        opacity: 0,
                        scale: 0.9
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        delay: index * 0.05,
                        ease: 'power2.out'
                    }
                );

                // Subtle continuous floating
                gsap.to(card, {
                    y: -5,
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: index * 0.1
                });

                // Smooth hover effects
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        y: -10,
                        scale: 1.05,
                        duration: 0.3,
                        ease: 'power2.out'
                    });

                    gsap.to(card.querySelector('.brand-glow'), {
                        opacity: 0.6,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        y: -5,
                        scale: 1,
                        duration: 0.4,
                        ease: 'power2.out'
                    });

                    gsap.to(card.querySelector('.brand-glow'), {
                        opacity: 0.2,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            });

            // Edge blur effects
            gsap.to('.edge-blur', {
                opacity: 1,
                width: 100,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-20 overflow-hidden bg-gradient-to-b from-[#18182f] to-[#0a0a1a]"
        >
            {/* Smooth Background Elements */}
            <div className="absolute inset-0">
                <div
                    id="marquee-grid"
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                ></div>

                <div
                    id="marquee-orb-1"
                    className="absolute top-1/4 -left-16 w-48 h-48 bg-gradient-to-r from-primary/15 to-transparent rounded-full filter blur-3xl"
                ></div>
                <div
                    id="marquee-orb-2"
                    className="absolute bottom-1/3 -right-16 w-32 h-32 bg-gradient-to-r from-transparent to-secondary/10 rounded-full filter blur-3xl"
                ></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div
                        id="marquee-badge"
                        className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 mb-6"
                    >
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-secondary to-primary rounded-full"></div>
                        <span className="text-xs font-medium text-white/80">TRUSTED PARTNERSHIPS</span>
                    </div>

                    <h2
                        id="marquee-heading"
                        className="text-3xl md:text-5xl lg:text-6xl font-unbounded font-bold mb-4"
                    >
                        <span className="text-white">Trusted by </span>
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-gray-400">
                            Industry Leaders
                        </span>
                    </h2>

                    <p
                        id="marquee-subtitle"
                        className="text-lg text-gray-300 max-w-2xl mx-auto"
                    >
                        Partnering with world-class brands to bring you exclusive opportunities
                    </p>
                </div>

                {/* Ultra-smooth Marquee Container */}
                <div className="relative">
                    {/* Edge Blurs */}
                    <div className="edge-blur absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-[#0a0a1a] to-transparent z-20 opacity-0"></div>
                    <div className="edge-blur absolute right-0 top-0 h-full w-0 bg-gradient-to-l from-[#0a0a1a] to-transparent z-20 opacity-0"></div>

                    {/* Marquee */}
                    <div 
                        ref={marqueeRef}
                        className="flex overflow-hidden py-8"
                    >
                        <div
                            ref={marqueeContentRef}
                            className="flex gap-6 px-4"
                        >
                            {brands.map((brand, index) => (
                                <div
                                    key={index}
                                    className="brand-card group relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 flex-shrink-0 w-48 h-32 flex items-center justify-center"
                                >
                                    {/* Glow Effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} rounded-2xl opacity-20 brand-glow transition-opacity duration-300`}></div>

                                    {/* Content */}
                                    <div className="relative z-10 text-center">
                                        <div className="text-2xl font-unbounded font-bold text-white mb-2">
                                            {brand.logo}
                                        </div>
                                        <p className="text-white/60 text-sm font-medium">
                                            {brand.name}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex justify-center items-center gap-8 mt-12 flex-wrap">
                    <div className="flex items-center gap-3 text-white/80">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="font-semibold">$1.5M+</span>
                        <span className="text-sm">Paid to Creators</span>
                    </div>
                    <div className="w-px h-6 bg-white/20"></div>
                    <div className="flex items-center gap-3 text-white/80">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="font-semibold">97%</span>
                        <span className="text-sm">Success Rate</span>
                    </div>
                    <div className="w-px h-6 bg-white/20"></div>
                    <div className="flex items-center gap-3 text-white/80">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span className="font-semibold">24/7</span>
                        <span className="text-sm">Support</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Marquee;