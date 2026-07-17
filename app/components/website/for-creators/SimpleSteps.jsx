// components/website/for-creators/ModernHowItWorksSection.jsx
'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SimpleSteps
 = () => {
    const sectionRef = useRef(null);
    const stepsRef = useRef([]);
    const lineRef = useRef(null);

    const steps = [
        {
            number: '01',
            title: 'Sign Up & Get Approved',
            description: 'Create your free account and get verified in under 24 hours. No complicated forms or waiting periods.',
            icon: '📝',
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-500/20 to-cyan-500/10',
            delay: 0
        },
        {
            number: '02',
            title: 'Choose Brands & Get Links',
            description: 'Browse our brand marketplace and generate your tracking links. Filter by niche, commission rates, and more.',
            icon: '🔗',
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-500/20 to-pink-500/10',
            delay: 0.2
        },
        {
            number: '03',
            title: 'Promote & Earn Commissions',
            description: 'Share your links and watch your earnings grow with real-time tracking. Get paid weekly with no delays.',
            icon: '💰',
            gradient: 'from-green-500 to-emerald-500',
            bgGradient: 'from-green-500/20 to-emerald-500/10',
            delay: 0.4
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background animations (continuous, not scroll-triggered)
            gsap.to('#how-it-works-grid', {
                x: 40,
                y: 40,
                duration: 25,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            gsap.to('#how-it-works-orb-1', {
                x: 60,
                y: -40,
                rotation: 360,
                duration: 30,
                repeat: -1,
                ease: 'none'
            });

            gsap.to('#how-it-works-orb-2', {
                x: -50,
                y: 50,
                rotation: -360,
                duration: 35,
                repeat: -1,
                ease: 'none'
            });

            // Shimmer effect
            gsap.to('#how-it-works-shimmer', {
                x: '300%',
                duration: 4,
                repeat: -1,
                ease: 'power2.inOut',
                delay: 1
            });

            // Header animations - FIXED: Remove reverse action
            const headerTL = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none' // FIXED: No reverse
                }
            });

            headerTL
                .fromTo('#how-it-works-badge',
                    { y: 50, opacity: 0, scale: 0.8 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
                )
                .fromTo('#how-it-works-heading',
                    { y: 80, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.2
                )
                .fromTo('#how-it-works-subtitle',
                    { y: 60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 0.4
                );

            // Connecting line animation - FIXED: Remove reverse action
            if (lineRef.current) {
                gsap.fromTo(lineRef.current,
                    { scaleY: 0, transformOrigin: 'top center' },
                    {
                        scaleY: 1,
                        duration: 1.5,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: lineRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none' // FIXED: No reverse
                        }
                    }
                );

                // Line glow animation (continuous)
                gsap.to(lineRef.current, {
                    boxShadow: '0 0 20px rgba(75, 164, 180, 0.5)',
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }

            // Enhanced step animations - FIXED: Remove reverse action
            stepsRef.current.forEach((step, index) => {
                if (!step) return;

                const stepTL = gsap.timeline({
                    scrollTrigger: {
                        trigger: step,
                        start: 'top 85%',
                        toggleActions: 'play none none none' // FIXED: No reverse
                    }
                });

                // Main step container
                stepTL
                    .fromTo(step,
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
                            duration: 1.2,
                            ease: 'power2.out',
                            delay: index * 0.2
                        }
                    );

                // Step number animation
                stepTL
                    .fromTo(step.querySelector('.step-number'),
                        { scale: 0, rotation: -180 },
                        {
                            scale: 1,
                            rotation: 0,
                            duration: 0.8,
                            ease: 'back.out(1.7)'
                        },
                        0.3
                    );

                // Icon animation
                stepTL
                    .fromTo(step.querySelector('.step-icon'),
                        { scale: 0, y: -20 },
                        {
                            scale: 1,
                            y: 0,
                            duration: 0.6,
                            ease: 'bounce.out'
                        },
                        0.5
                    );

                // Content animation
                stepTL
                    .fromTo(step.querySelector('.step-content'),
                        { y: 30, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            ease: 'power2.out'
                        },
                        0.6
                    );

                // Progress bar animation
                stepTL
                    .fromTo(step.querySelector('.step-progress'),
                        { scaleX: 0 },
                        {
                            scaleX: 1,
                            duration: 0.6,
                            ease: 'power2.out'
                        },
                        0.8
                    );

                // Enhanced hover animations
                step.addEventListener('mouseenter', () => {
                    gsap.to(step, {
                        y: -15,
                        scale: 1.05,
                        duration: 0.4,
                        ease: 'power2.out'
                    });

                    gsap.to(step.querySelector('.step-glow'), {
                        opacity: 0.8,
                        scale: 1.1,
                        duration: 0.4,
                        ease: 'power2.out'
                    });

                    gsap.to(step.querySelector('.step-number'), {
                        scale: 1.2,
                        rotation: 10,
                        duration: 0.3,
                        ease: 'power2.out'
                    });

                    gsap.to(step.querySelector('.step-icon'), {
                        scale: 1.3,
                        rotation: 5,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                step.addEventListener('mouseleave', () => {
                    gsap.to(step, {
                        y: 0,
                        scale: 1,
                        duration: 0.4,
                        ease: 'power2.out'
                    });

                    gsap.to(step.querySelector('.step-glow'), {
                        opacity: 0,
                        scale: 1,
                        duration: 0.4,
                        ease: 'power2.out'
                    });

                    gsap.to(step.querySelector('.step-number'), {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });

                    gsap.to(step.querySelector('.step-icon'), {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            });

        }, sectionRef);

        return () => ctx.revert();

    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0f0f23] via-[#18182f] to-[#1a1a35]"
        >
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0">
                {/* Animated Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(75,164,180,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(75,164,180,0.3) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                    id="how-it-works-grid"
                ></div>

                {/* Floating Gradient Orbs */}
                <div
                    className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-primary/10 to-secondary/5 rounded-full filter blur-3xl"
                    id="how-it-works-orb-1"
                ></div>
                <div
                    className="absolute bottom-1/3 -right-32 w-48 h-48 bg-gradient-to-r from-secondary/10 to-primary/5 rounded-full filter blur-3xl"
                    id="how-it-works-orb-2"
                ></div>

                {/* Enhanced Shimmer Effect */}
                <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 -translate-x-full"
                    id="how-it-works-shimmer"
                ></div>

                {/* Radial Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white/50"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Enhanced Header Section */}
                <div className="text-center mb-20">
                    <div
                        className="inline-flex items-center gap-3 bg-primary/10 backdrop-blur-md border border-primary/20 rounded-full px-6 py-3 mb-8"
                        id="how-it-works-badge"
                    >
                        <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-primary tracking-wide">SIMPLE PROCESS</span>
                    </div>

                    <h2
                        className="text-4xl md:text-6xl lg:text-7xl font-unbounded font-bold mb-6 leading-tight"
                        id="how-it-works-heading"
                    >
                        <span className="text-primary">Start Earning in</span>
                        <br />
                        <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-gray-400">
                            3 Simple Steps
                        </span>
                    </h2>

                    <p
                        className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                        id="how-it-works-subtitle"
                    >
                        Our streamlined process gets you from signup to earning in minutes, not days.
                        Start your creator journey with zero barriers to entry.
                    </p>
                </div>

                {/* Enhanced Steps Container */}
                <div className="max-w-6xl mx-auto">
                    <div className="relative">
                        {/* Enhanced Connecting Line */}
                        <div
                            ref={lineRef}
                            className="absolute top-24 left-1/2 transform -translate-x-1/2 w-1 h-80 bg-gradient-to-b from-primary via-secondary to-primary rounded-full md:block hidden shadow-lg"
                            style={{
                                background: 'linear-gradient(180deg, rgb(75, 164, 180) 0%, rgb(180, 91, 75) 50%, rgb(75, 164, 180) 100%)'
                            }}
                        ></div>

                        {/* Steps Grid */}
                        <div className="grid md:grid-cols-3 gap-12 relative z-10">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    ref={el => stepsRef.current[index] = el}
                                    className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 hover:border-primary/30 transition-all duration-500 shadow-xl hover:shadow-2xl overflow-hidden"
                                    style={{ perspective: '1000px' }}
                                >
                                    {/* Step Glow Effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} rounded-3xl opacity-0 step-glow`}></div>

                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 rounded-3xl overflow-hidden">
                                        <div className="absolute -inset-full top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    </div>

                                    {/* Content Container */}
                                    <div className="relative z-10 text-center">
                                        {/* Enhanced Step Number */}
                                        <div className="relative mb-8">
                                            <div className={`step-number w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center text-white text-lg font-unbounded font-bold mx-auto shadow-lg`}>
                                                {step.number}
                                            </div>
                                            <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl animate-pulse opacity-50"></div>
                                        </div>

                                        {/* Enhanced Icon */}
                                        <div className="mb-6">
                                            <div className="step-icon w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto shadow-md">
                                                <span className="text-3xl filter drop-shadow-sm">{step.icon}</span>
                                            </div>
                                        </div>

                                        {/* Step Content */}
                                        <div className="step-content">
                                            <h3 className="text-xl font-unbounded font-bold text-primary mb-4 group-hover:text-secondary transition-colors duration-300">
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                                                {step.description}
                                            </p>
                                        </div>

                                        {/* Enhanced Progress Line */}
                                        <div className="mt-8">
                                            <div className={`h-1.5 bg-gradient-to-r ${step.gradient} rounded-full step-progress origin-left transform scale-x-0 shadow-sm`}></div>
                                        </div>
                                    </div>

                                    {/* Corner Accent */}
                                    <div className="absolute top-6 right-6 w-4 h-4 bg-gradient-to-br from-primary/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SimpleSteps;