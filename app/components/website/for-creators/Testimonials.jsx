// components/website/for-creators/ModernTestimonialsSection.jsx
'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
    const sectionRef = useRef(null);
    const testimonialsRef = useRef([]);
    const cardsRef = useRef([]);

    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Lifestyle Influencer',
            content: 'ConvertSocial helped me triple my affiliate earnings in just 3 months. The dashboard is incredibly intuitive and the support team is phenomenal!',
            avatar: 'SJ',
            earnings: '+$12,450',
            gradient: 'from-purple-500 to-pink-500',
            stats: { followers: '250K', growth: '+42%', engagement: '8.2%' }
        },
        {
            name: 'Marcus Chen',
            role: 'Tech Reviewer',
            content: 'The tracking accuracy is unmatched. I finally have full visibility into what content drives the most revenue. Game-changing platform!',
            avatar: 'MC',
            earnings: '+$8,720',
            gradient: 'from-blue-500 to-cyan-500',
            stats: { followers: '180K', growth: '+28%', engagement: '6.8%' }
        },
        {
            name: 'Elena Rodriguez',
            role: 'Fashion Blogger',
            content: 'My dedicated account manager helped me secure premium brand deals I never thought possible. The earning potential is incredible!',
            avatar: 'ER',
            earnings: '+$15,230',
            gradient: 'from-orange-500 to-red-500',
            stats: { followers: '320K', growth: '+65%', engagement: '9.1%' }
        },
        {
            name: 'Alex Thompson',
            role: 'Travel Creator',
            content: 'From zero to $5k/month in just 6 months! The brand partnerships and analytics tools are worth their weight in gold.',
            avatar: 'AT',
            earnings: '+$21,800',
            gradient: 'from-green-500 to-emerald-500',
            stats: { followers: '150K', growth: '+85%', engagement: '7.5%' }
        },
        {
            name: 'Maya Patel',
            role: 'Beauty Influencer',
            content: 'The real-time analytics helped me optimize my content strategy. My conversion rates improved by 300% almost instantly.',
            avatar: 'MP',
            earnings: '+$18,950',
            gradient: 'from-indigo-500 to-purple-500',
            stats: { followers: '420K', growth: '+55%', engagement: '8.9%' }
        },
        {
            name: 'David Kim',
            role: 'Fitness Coach',
            content: 'Finally a platform that understands creators. The payout system is seamless and the community support is incredible.',
            avatar: 'DK',
            earnings: '+$14,320',
            gradient: 'from-teal-500 to-blue-500',
            stats: { followers: '190K', growth: '+38%', engagement: '6.2%' }
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background animations
            gsap.to('#testimonials-grid', {
                x: 30,
                y: 30,
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            // Floating elements
            gsap.to('#testimonials-orb-1', {
                y: '+=40',
                rotation: 15,
                duration: 6,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            gsap.to('#testimonials-orb-2', {
                y: '+=30',
                rotation: -10,
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
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
                .fromTo('#testimonials-badge',
                    { y: 50, opacity: 0, scale: 0.8 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
                )
                .fromTo('#testimonials-heading',
                    { y: 80, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.2
                )
                .fromTo('#testimonials-subtitle',
                    { y: 60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 0.4
                );

            // Testimonials grid animation
            testimonialsRef.current.forEach((testimonial, index) => {
                if (!testimonial) return;

                const testimonialTL = gsap.timeline({
                    scrollTrigger: {
                        trigger: testimonial,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                });

                testimonialTL
                    .fromTo(testimonial,
                        {
                            y: 100,
                            opacity: 0,
                            scale: 0.9,
                            rotationX: -10
                        },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            rotationX: 0,
                            duration: 1,
                            ease: 'power2.out',
                            delay: index * 0.15
                        }
                    )
                    .fromTo(testimonial.querySelector('.testimonial-avatar'),
                        { scale: 0, rotation: -180 },
                        { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)' },
                        0.3
                    )
                    .fromTo(testimonial.querySelector('.testimonial-content'),
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
                        0.5
                    )
                    .fromTo(testimonial.querySelector('.testimonial-stats'),
                        { y: 20, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
                        0.7
                    );

                // Enhanced hover animations
                testimonial.addEventListener('mouseenter', () => {
                    gsap.to(testimonial, {
                        y: -10,
                        scale: 1.02,
                        duration: 0.4,
                        ease: 'power2.out'
                    });

                    gsap.to(testimonial.querySelector('.testimonial-glow'), {
                        opacity: 0.6,
                        duration: 0.3,
                        ease: 'power2.out'
                    });

                    gsap.to(testimonial.querySelector('.testimonial-avatar'), {
                        scale: 1.1,
                        rotation: 5,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                testimonial.addEventListener('mouseleave', () => {
                    gsap.to(testimonial, {
                        y: 0,
                        scale: 1,
                        duration: 0.4,
                        ease: 'power2.out'
                    });

                    gsap.to(testimonial.querySelector('.testimonial-glow'), {
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });

                    gsap.to(testimonial.querySelector('.testimonial-avatar'), {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            });

            // Cards floating animation
            cardsRef.current.forEach((card, index) => {
                gsap.to(card, {
                    y: -10,
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: index * 0.5
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
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
                        backgroundSize: '50px 50px'
                    }}
                    id="testimonials-grid"
                ></div>

                {/* Floating Gradient Orbs */}
                <div
                    id="testimonials-orb-1"
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/20 to-secondary/15 rounded-full filter blur-3xl"
                ></div>
                <div
                    id="testimonials-orb-2"
                    className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-to-r from-secondary/15 to-primary/20 rounded-full filter blur-3xl"
                ></div>

                {/* Particle Background */}
                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full opacity-10 testimonial-particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Enhanced Header Section */}
                <div className="text-center mb-20">
                    <div
                        id="testimonials-badge"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 mb-8"
                    >
                        <div className="w-2 h-2 bg-gradient-to-r from-secondary to-primary rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-white/80 tracking-wide">SUCCESS STORIES</span>
                    </div>

                    <h2
                        id="testimonials-heading"
                        className="text-4xl md:text-6xl lg:text-7xl font-unbounded font-bold mb-6 leading-tight"
                    >
                        <span className="text-white">What Creators</span>
                        <br />
                        <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                            Are Saying
                        </span>
                    </h2>

                    <p
                        id="testimonials-subtitle"
                        className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        Join thousands of successful creators who have transformed their earning potential with ConvertSocial.
                        Real stories, real results.
                    </p>
                </div>

                {/* Enhanced Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            ref={el => testimonialsRef.current[index] = el}
                            className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden"
                            style={{ perspective: '1000px' }}
                        >
                            {/* Glow Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} rounded-3xl opacity-0 testimonial-glow transition-opacity duration-300`}></div>

                            {/* Shine Effect */}
                            <div className="absolute inset-0 rounded-3xl overflow-hidden">
                                <div className="absolute -inset-full top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            </div>

                            {/* Quote Icon */}
                            <div className="absolute top-6 right-6 w-8 h-8 bg-gradient-to-br from-white/10 to-white/5 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.57-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                                </svg>
                            </div>

                            {/* Content Container */}
                            <div className="relative z-10">
                                {/* Avatar & Header */}
                                <div className="flex items-center mb-6">
                                    <div className={`testimonial-avatar w-14 h-14 bg-gradient-to-br ${testimonial.gradient} rounded-2xl flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg`}>
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <h3 className="font-unbounded font-bold text-white text-lg">{testimonial.name}</h3>
                                        <p className="text-white/60 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>

                                {/* Testimonial Content */}
                                <div className="testimonial-content mb-6">
                                    <p className="text-gray-300 leading-relaxed italic text-lg">
                                        "{testimonial.content}"
                                    </p>
                                </div>

                                {/* Earnings Badge */}
                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full px-4 py-2 mb-4">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-white font-semibold text-sm">{testimonial.earnings} earned</span>
                                </div>

                                {/* Stats Grid */}
                                <div className="testimonial-stats grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                                    <div className="text-center">
                                        <div className="text-white font-bold text-sm">{testimonial.stats.followers}</div>
                                        <div className="text-white/40 text-xs">Followers</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-green-400 font-bold text-sm">{testimonial.stats.growth}</div>
                                        <div className="text-white/40 text-xs">Growth</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-cyan-400 font-bold text-sm">{testimonial.stats.engagement}</div>
                                        <div className="text-white/40 text-xs">Engagement</div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute bottom-4 right-4">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        ref={el => cardsRef.current[index * 3 + i] = el}
                                        className="absolute w-2 h-2 bg-white rounded-full opacity-30"
                                        style={{
                                            right: `${i * 6}px`,
                                            bottom: `${i * 6}px`,
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Enhanced Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="inline-flex items-center gap-8 text-white/60 text-sm mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span>Verified Results</span>
                        </div>
                        <div className="w-px h-4 bg-white/20"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse animation-delay-2000"></div>
                            <span>Real Creators</span>
                        </div>
                        <div className="w-px h-4 bg-white/20"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-4000"></div>
                            <span>Proven Success</span>
                        </div>
                    </div>

                    <button className="group relative bg-gradient-to-r from-primary to-secondary text-white font-semibold py-4 px-8 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="relative z-10 flex items-center justify-center gap-3">
                            <span className="text-lg">Read More Success Stories</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;