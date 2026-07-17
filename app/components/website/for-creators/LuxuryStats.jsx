// components/website/for-creators/LuxuryStatsSection.jsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LuxuryStats = () => {
    const statsRef = useRef(null);
    const numbersRef = useRef([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const stats = [
        { value: 50000, suffix: '', label: 'Active Creators' },
        { value: 250, suffix: 'M+', label: 'Monthly Revenue' },
        { value: 98, suffix: '%', label: 'Satisfaction Rate' },
        { value: 24, suffix: '/7', label: 'Support Available' }
    ];

    useEffect(() => {
        const masterTL = gsap.timeline({
            scrollTrigger: {
                trigger: statsRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
            }
        });

        // Text animations
        masterTL
            .fromTo('#premium-badge',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.3
            )
            .fromTo('#stats-heading',
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.5
            )
            .fromTo('#stats-subheading',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 0.7
            );

        // Enhanced stats cards animations
        const cards = gsap.utils.toArray('.stats-card');
        cards.forEach((card, index) => {
            const cardTL = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                }
            });

            cardTL
                .fromTo(card,
                    { y: 80, opacity: 0, scale: 0.9 },
                    { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out', delay: index * 0.1 }
                )
                .fromTo(card.querySelector('.stat-number'),
                    { textContent: 0 },
                    {
                        textContent: stats[index].value,
                        duration: 2.5,
                        ease: 'power2.out',
                        snap: { textContent: 1 },
                        onUpdate: function () {
                            const element = card.querySelector('.stat-number');
                            if (element) {
                                const value = Math.ceil(Number(this.targets()[0].textContent));
                                element.textContent = value.toLocaleString();
                            }
                        }
                    },
                    '-=0.8'
                );
        });

        // Enhanced mouse tracking
        const handleMouseMove = (e) => {
            if (statsRef.current) {
                const rect = statsRef.current.getBoundingClientRect();
                setMousePosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                });
            }
        };

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);

        // Event listeners
        if (statsRef.current) {
            statsRef.current.addEventListener('mousemove', handleMouseMove);
            statsRef.current.addEventListener('mouseenter', handleMouseEnter);
            statsRef.current.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            if (statsRef.current) {
                statsRef.current.removeEventListener('mousemove', handleMouseMove);
                statsRef.current.removeEventListener('mouseenter', handleMouseEnter);
                statsRef.current.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [isHovered]);

    return (
        <section
            ref={statsRef}
            className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0f0f23] via-[#18182f] to-[#1a1a35]"
        >
            <div className="container mx-auto px-4 relative z-10">
                {/* Your existing content... */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 mb-6" id="premium-badge">
                        <span className="text-xs font-medium text-white/60">TRUSTED BY THOUSANDS</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-unbounded font-bold mb-6" id="stats-heading">
                        <span className="text-white">Numbers That</span>
                        <br />
                        <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-gray-400">
                            Speak Volumes
                        </span>
                    </h2>

                    <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed" id="stats-subheading">
                        We've built the most creator-friendly platform with tools designed to maximize your earnings
                        and simplify your workflow. Here's why creators choose us.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="stats-card group relative bg-white/3 rounded-2xl p-8 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/2 rounded-2xl opacity-0 glass-overlay"></div>

                            <div className="absolute inset-0 rounded-2xl overflow-hidden">
                                <div className="absolute -inset-full top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 shine opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            <div className="relative z-10 text-center">
                                <div className="mb-3">
                                    <div
                                        ref={el => numbersRef.current[index] = el}
                                        data-value={stat.value}
                                        className="text-4xl md:text-5xl font-light stat-number text-gray-100"
                                    >
                                        0
                                    </div>
                                    {stat.suffix && (
                                        <span className="text-xl text-white/60 font-light ml-1">
                                            {stat.suffix}
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-base font-normal text-white/80 tracking-wide">
                                    {stat.label}
                                </h3>

                                <div className="w-12 h-px bg-white/20 mx-auto mt-4 group-hover:w-16 group-hover:bg-white/40 transition-all duration-300"></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12" id="stats-cta">
                    <div className="inline-flex items-center gap-8 text-white/60 text-sm">
                        <div className="flex items-center gap-2 feature-item">
                            <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                            <span>Real-time Analytics</span>
                        </div>
                        <div className="w-px h-4 bg-white/20"></div>
                        <div className="flex items-center gap-2 feature-item">
                            <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                            <span>Instant Payouts</span>
                        </div>
                        <div className="w-px h-4 bg-white/20"></div>
                        <div className="flex items-center gap-2 feature-item">
                            <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                            <span>24/7 Support</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LuxuryStats;