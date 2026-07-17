// components/website/for-creators/ModernFAQSection.jsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FAQs = () => {
    const sectionRef = useRef(null);
    const faqItemsRef = useRef([]);
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: 'How quickly can I start earning?',
            answer: 'You can start earning immediately after registration. Once approved, you\'ll get access to your tracking links and can begin promoting right away. Most creators see their first earnings within 24-48 hours.',
            icon: '⚡',
            gradient: 'from-yellow-500 to-orange-500'
        },
        {
            question: 'What are the payment thresholds?',
            answer: 'We offer flexible payment options with a minimum threshold of just $50. Payouts are processed weekly for all earnings above this amount. No hidden fees or unexpected charges.',
            icon: '💳',
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            question: 'Is there any cost to join?',
            answer: 'No, joining ConvertSocial is completely free for creators. We only make money when you make money through our performance-based model. Zero upfront costs.',
            icon: '🎯',
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            question: 'What types of content are supported?',
            answer: 'We support all content formats including blogs, social media, videos, podcasts, and newsletters. Our tracking works across all platforms and devices seamlessly.',
            icon: '📱',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            question: 'How do I track my performance?',
            answer: 'Our real-time dashboard shows clicks, conversions, earnings, and ROI metrics. You can also export detailed reports for deeper analysis and optimization.',
            icon: '📊',
            gradient: 'from-indigo-500 to-blue-500'
        },
        {
            question: 'Can I work with multiple brands?',
            answer: 'Absolutely! You can partner with unlimited brands simultaneously and manage all campaigns from a single dashboard. Diversify your income streams effortlessly.',
            icon: '🤝',
            gradient: 'from-red-500 to-pink-500'
        },
        {
            question: 'What makes your platform different?',
            answer: 'We offer higher commission rates, advanced AI-powered analytics, dedicated account managers, and a creator-first approach that puts your success above all else.',
            icon: '🚀',
            gradient: 'from-teal-500 to-green-500'
        },
        {
            question: 'Is there long-term support?',
            answer: 'Yes! We provide 24/7 support, regular strategy sessions, educational resources, and a thriving community to ensure your long-term growth and success.',
            icon: '🛡️',
            gradient: 'from-gray-500 to-blue-500'
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background animations
            gsap.to('#faq-grid', {
                x: 25,
                y: 25,
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            // Floating orbs
            gsap.to('#faq-orb-1', {
                y: '+=30',
                rotation: 10,
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            gsap.to('#faq-orb-2', {
                y: '+=20',
                rotation: -15,
                duration: 6,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 2
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
                .fromTo('#faq-badge',
                    { y: 50, opacity: 0, scale: 0.8 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
                )
                .fromTo('#faq-heading',
                    { y: 80, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.2
                )
                .fromTo('#faq-subtitle',
                    { y: 60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 0.4
                );

            // FAQ items animation
            faqItemsRef.current.forEach((item, index) => {
                if (!item) return;

                const itemTL = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                });

                itemTL
                    .fromTo(item,
                        {
                            y: 60,
                            opacity: 0,
                            scale: 0.95,
                            rotationX: -5
                        },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            rotationX: 0,
                            duration: 0.8,
                            ease: 'power2.out',
                            delay: index * 0.1
                        }
                    )
                    .fromTo(item.querySelector('.faq-icon'),
                        { scale: 0, rotation: -180 },
                        { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)' },
                        0.3
                    )
                    .fromTo(item.querySelector('.faq-question'),
                        { x: -20, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
                        0.5
                    );

                // Hover animations
                item.addEventListener('mouseenter', () => {
                    gsap.to(item, {
                        y: -5,
                        scale: 1.02,
                        duration: 0.3,
                        ease: 'power2.out'
                    });

                    gsap.to(item.querySelector('.faq-glow'), {
                        opacity: 0.4,
                        duration: 0.3,
                        ease: 'power2.out'
                    });

                    gsap.to(item.querySelector('.faq-icon'), {
                        scale: 1.1,
                        rotation: 5,
                        duration: 0.2,
                        ease: 'power2.out'
                    });
                });

                item.addEventListener('mouseleave', () => {
                    if (activeIndex !== index) {
                        gsap.to(item, {
                            y: 0,
                            scale: 1,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }

                    gsap.to(item.querySelector('.faq-glow'), {
                        opacity: 0.1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });

                    if (activeIndex !== index) {
                        gsap.to(item.querySelector('.faq-icon'), {
                            scale: 1,
                            rotation: 0,
                            duration: 0.2,
                            ease: 'power2.out'
                        });
                    }
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Animate FAQ answers when opening/closing
    useEffect(() => {
        faqItemsRef.current.forEach((item, index) => {
            if (!item) return;

            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');

            if (activeIndex === index) {
                // Open animation
                gsap.to(item, {
                    y: -8,
                    scale: 1.03,
                    duration: 0.4,
                    ease: 'power2.out'
                });

                gsap.to(answer, {
                    height: 'auto',
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });

                gsap.to(icon, {
                    rotation: 45,
                    scale: 1.2,
                    duration: 0.3,
                    ease: 'power2.out'
                });

                gsap.to(item.querySelector('.faq-glow'), {
                    opacity: 0.6,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else {
                // Close animation
                gsap.to(item, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });

                gsap.to(answer, {
                    height: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });

                gsap.to(icon, {
                    rotation: 0,
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out'
                });

                gsap.to(item.querySelector('.faq-glow'), {
                    opacity: 0.1,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            }
        });
    }, [activeIndex]);

    return (
        <section
            ref={sectionRef}
            className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#0f0f23] to-[#18182f]"
        >
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0">
                {/* Animated Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                    id="faq-grid"
                ></div>

                {/* Floating Gradient Orbs */}
                <div
                    id="faq-orb-1"
                    className="absolute top-1/4 -left-20 w-48 h-48 bg-gradient-to-r from-primary/15 to-transparent rounded-full filter blur-3xl"
                ></div>
                <div
                    id="faq-orb-2"
                    className="absolute bottom-1/3 -right-20 w-32 h-32 bg-gradient-to-r from-transparent to-secondary/10 rounded-full filter blur-3xl"
                ></div>

                {/* Particle Background */}
                <div className="absolute inset-0">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full opacity-5 faq-particle"
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
                <div className="text-center mb-16">
                    <div
                        id="faq-badge"
                        className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 mb-8"
                    >
                        <div className="w-2 h-2 bg-gradient-to-r from-secondary to-primary rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-white/80 tracking-wide">GET ANSWERS</span>
                    </div>

                    <h2
                        id="faq-heading"
                        className="text-4xl md:text-6xl lg:text-7xl font-unbounded font-bold mb-6 leading-tight"
                    >
                        <span className="text-white">Frequently Asked</span>
                        <br />
                        <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                            Questions
                        </span>
                    </h2>

                    <p
                        id="faq-subtitle"
                        className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        Everything you need to know about getting started with ConvertSocial.
                        Clear answers to help you make informed decisions.
                    </p>
                </div>

                {/* Enhanced FAQ Grid */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-6">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                ref={el => faqItemsRef.current[index] = el}
                                className={`group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 cursor-pointer overflow-hidden ${activeIndex === index
                                    ? 'border-primary/50 shadow-2xl'
                                    : 'border-white/10 hover:border-white/30'
                                    }`}
                                onClick={() => toggleFAQ(index)}
                                style={{ perspective: '1000px' }}
                            >
                                {/* Glow Effect */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${faq.gradient} rounded-2xl opacity-10 faq-glow transition-opacity duration-300`}></div>

                                {/* Content Container */}
                                <div className="relative z-10">
                                    {/* Question Row */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-start space-x-4 flex-1">
                                            {/* Icon */}
                                            <div className={`faq-icon w-12 h-12 bg-gradient-to-br ${faq.gradient} rounded-xl flex items-center justify-center text-white text-lg mt-1 flex-shrink-0 transition-all duration-300`}>
                                                {faq.icon}
                                            </div>

                                            {/* Question */}
                                            <h3 className="faq-question text-lg font-unbounded font-semibold text-white pr-8 leading-tight">
                                                {faq.question}
                                            </h3>
                                        </div>

                                        {/* Animated Chevron */}
                                        <div className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''
                                            }`}>
                                            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Answer */}
                                    <div className="faq-answer overflow-hidden" style={{ height: '0px', opacity: 0 }}>
                                        <p className="text-gray-300 leading-relaxed pl-16">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>

                                {/* Hover Indicator */}
                                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${faq.gradient} rounded-full transform origin-left transition-transform duration-300 ${activeIndex === index ? 'scale-x-100' : 'scale-x-0'
                                    }`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQs;