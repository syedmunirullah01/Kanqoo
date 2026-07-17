"use client";
import { useEffect, useRef } from 'react';
import { Play, Star, Users, Image, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import YouTubeCarousel from "../../common/Carousel";

export default function YouTubeHero() {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const statsRef = useRef(null);

    useEffect(() => {
        const animateElements = () => {
            const elements = [
                { ref: titleRef, delay: 0.2 },
                { ref: subtitleRef, delay: 0.4 },
                { ref: ctaRef, delay: 0.6 },
                { ref: statsRef, delay: 0.8 }
            ];

            elements.forEach(({ ref, delay }) => {
                if (ref.current) {
                    ref.current.style.opacity = '0';
                    ref.current.style.transform = 'translateY(30px)';

                    setTimeout(() => {
                        ref.current.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                        ref.current.style.opacity = '1';
                        ref.current.style.transform = 'translateY(0)';
                    }, delay * 1000);
                }
            });
        };

        animateElements();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18182f] via-[#1a1a35] to-[#2d2d5a] overflow-hidden pt-20"
        >
            {/* Background Elements - Using your color scheme */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Orbs */}
                <div className="absolute top-10 right-10 w-80 h-80 bg-[#4BA4B4]/20 rounded-full blur-3xl animate-float opacity-70"></div>
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#B45B4B]/20 rounded-full blur-3xl animate-float opacity-70" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#4BA4B4]/10 to-[#B45B4B]/10 rounded-full blur-3xl animate-pulse opacity-50"></div>

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `linear-gradient(#4BA4B4 1px, transparent 1px),
                                        linear-gradient(90deg, #4BA4B4 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                ></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-20 w-6 h-6 bg-[#4BA4B4] rounded-full animate-float opacity-60"></div>
            <div className="absolute bottom-40 right-32 w-4 h-4 bg-[#B45B4B] rounded-full animate-float opacity-60" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-40 right-40 w-8 h-8 bg-[#4BA4B4] rounded-full animate-float opacity-40" style={{ animationDelay: '0.5s' }}></div>

            <div className="container mx-auto px-6 z-10">
                <div className="text-center max-w-6xl mx-auto">
                    {/* Premium Badge */}
                    <div
                        ref={titleRef}
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8 shadow-lg"
                    >
                        <Sparkles className="w-4 h-4 text-[#4BA4B4]" />
                        <span className="text-sm font-semibold text-white">Trusted by 10,000+ YouTube Creators</span>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-3 h-3 text-[#B45B4B] fill-current" />
                            ))}
                        </div>
                    </div>

                    {/* Main Headline */}
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 tracking-tight unbounded-600">
                            <span className="block">Your Videos Deserve</span>
                            <span className="block bg-gradient-to-r from-[#4BA4B4] to-[#B45B4B] bg-clip-text text-transparent">
                                Maximum Impact
                            </span>
                        </h1>
                    </div>

                    {/* Subtitle */}
                    <p
                        ref={subtitleRef}
                        className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto font-light"
                    >
                        Custom-designed thumbnails that make viewers{' '}
                        <span className="font-semibold text-white">click, watch, and subscribe</span>
                    </p>

                    {/* CTA Buttons */}
                    <div
                        ref={ctaRef}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
                    >
                        <button className="btn-gradient group relative text-white font-bold py-4 px-10 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg flex items-center gap-3 overflow-hidden">
                            <span>Get Professional Thumbnails</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>

                        <button className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 border-2 border-white/20 hover:border-white/30 hover:shadow-xl flex items-center gap-3">
                            <Play className="w-5 h-5 text-[#4BA4B4] group-hover:scale-110 transition-transform duration-300" />
                            <span>Watch Showcase</span>
                        </button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-[#4BA4B4]" />
                            <span>24-hour delivery</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-[#4BA4B4]" />
                            <span>Unlimited revisions</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-[#4BA4B4]" />
                            <span>Money-back guarantee</span>
                        </div>
                    </div>

                    {/* Enhanced Stats Section */}
                    <div
                        ref={statsRef}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
                    >
                        {[
                            {
                                icon: Users,
                                value: "300M+",
                                label: "Audiences Reached",
                                sublabel: "and growing",
                                color: "text-[#4BA4B4]"
                            },
                            {
                                icon: Star,
                                value: "5/5",
                                label: "Rated by Creators",
                                sublabel: "Excellent",
                                color: "text-[#B45B4B]"
                            },
                            {
                                icon: Image,
                                value: "2400+",
                                label: "Thumbnails Delivered",
                                sublabel: "and counting",
                                color: "text-[#4BA4B4]"
                            }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-white/10 hover:border-[#4BA4B4]/30"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#4BA4B4]/10 to-[#B45B4B]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-center gap-3 mb-4">
                                        <div className="p-3 rounded-xl bg-white/5 shadow-inner">
                                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                        </div>
                                        <span className="text-4xl font-bold text-white">{stat.value}</span>
                                    </div>
                                    <div className="text-gray-300 font-medium">{stat.label}</div>
                                    <div className="text-[#4BA4B4] text-sm font-semibold mt-1">{stat.sublabel}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4BA4B4] via-[#B45B4B] to-[#4BA4B4]"></div>
        </section>
    );
}