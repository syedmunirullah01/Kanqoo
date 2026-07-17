"use client";
import { useState, useEffect } from 'react';
import { Instagram, Target, Zap, Crown, Sparkles, ArrowRight, Play, Users, CheckCircle } from 'lucide-react';

export default function Brands() {
    const [activeRing, setActiveRing] = useState(0);
    const [rotation, setRotation] = useState(0);

    const brandRings = [
        {
            ring: "Premium",
            brands: [
                { name: 'SONY', category: 'Electronics', tier: 'Elite', color: '#0066CC' },
                { name: 'FARFETCH', category: 'Luxury', tier: 'Premium', color: '#000000' }
            ],
            radius: '120px',
            color: 'from-[#405DE6] to-[#5851DB]'
        },
        {
            ring: "Featured",
            brands: [
                { name: 'MANGO', category: 'Fashion', tier: 'Trending', color: '#E6007E' },
                { name: 'NYX', category: 'Beauty', tier: 'Popular', color: '#FF66CC' },
                { name: 'AliExpress', category: 'E-commerce', tier: 'Global', color: '#FF6A00' }
            ],
            radius: '80px',
            color: 'from-[#E1306C] to-[#C13584]'
        }
    ];

    const brandStats = [
        { number: '100K+', label: 'Brands Ready', icon: Target },
        { number: '48h', label: 'Fast Approval', icon: Zap },
        { number: '98%', label: 'Success Rate', icon: Crown }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setRotation(prev => (prev + 1) % 360);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative bg-gradient-to-br from-[#0a0a18] via-[#141428] to-[#1e1e3a] py-24 px-4 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Rotating Geometric Pattern */}
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5"
                    style={{
                        backgroundImage: `conic-gradient(from ${rotation}deg, #405DE6, #E1306C, #F77737, #405DE6)`,
                        borderRadius: '50%'
                    }}
                />

                {/* Floating Brand Orbs */}
                <div className="absolute top-20 left-20 w-6 h-6 bg-[#405DE6] rounded-full animate-float opacity-60"></div>
                <div className="absolute top-40 right-32 w-8 h-8 bg-[#E1306C] rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-32 left-40 w-4 h-4 bg-[#F77737] rounded-full animate-float opacity-60" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-20 right-20 w-10 h-10 bg-[#4BA4B4] rounded-full animate-float opacity-30" style={{ animationDelay: '1.5s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 mb-6">
                        <Sparkles className="w-5 h-5 text-[#B45B4B]" />
                        <span className="text-white font-semibold text-sm">Brand Partnerships</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 unbounded-600">
                        Your Audience,
                        <span className="block bg-gradient-to-r from-[#405DE6] via-[#E1306C] to-[#F77737] bg-clip-text text-transparent">
                            Their Products
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Connect with brands that match your style and values. Earn commissions on every sale made through your unique links.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Left - Circular Brand Display */}
                    <div className="relative flex justify-center items-center min-h-[500px]">
                        {/* Outer Ring */}
                        <div
                            className={`absolute w-80 h-80 rounded-full border-2 transition-all duration-1000 ${activeRing === 0 ? 'border-[#405DE6] scale-110' : 'border-white/20 scale-100'
                                }`}
                            onMouseEnter={() => setActiveRing(0)}
                        >
                            {/* Premium Brands */}
                            {brandRings[0].brands.map((brand, index) => {
                                const angle = (index * 180) + rotation;
                                const x = Math.cos(angle * Math.PI / 180) * 160;
                                const y = Math.sin(angle * Math.PI / 180) * 160;

                                return (
                                    <div
                                        key={brand.name}
                                        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                                        style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                                    >
                                        <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-4 border-2 transition-all duration-300 ${activeRing === 0 ? 'border-[#405DE6] scale-110' : 'border-white/10 scale-100'
                                            }`}>
                                            <div className="text-center">
                                                <div className="text-lg font-black text-white unbounded-600">{brand.name}</div>
                                                <div className="text-gray-400 text-xs">{brand.category}</div>
                                                <div className="text-[#405DE6] text-xs font-semibold">{brand.tier}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Inner Ring */}
                        <div
                            className={`absolute w-48 h-48 rounded-full border-2 transition-all duration-1000 ${activeRing === 1 ? 'border-[#E1306C] scale-110' : 'border-white/20 scale-100'
                                }`}
                            onMouseEnter={() => setActiveRing(1)}
                        >
                            {/* Featured Brands */}
                            {brandRings[1].brands.map((brand, index) => {
                                const angle = (index * 120) + rotation * 1.5;
                                const x = Math.cos(angle * Math.PI / 180) * 100;
                                const y = Math.sin(angle * Math.PI / 180) * 100;

                                return (
                                    <div
                                        key={brand.name}
                                        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                                        style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                                    >
                                        <div className={`bg-white/10 backdrop-blur-md rounded-xl p-3 border-2 transition-all duration-300 ${activeRing === 1 ? 'border-[#E1306C] scale-110' : 'border-white/10 scale-100'
                                            }`}>
                                            <div className="text-center">
                                                <div className="text-sm font-bold text-white">{brand.name}</div>
                                                <div className="text-gray-400 text-xs">{brand.tier}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Center Hub */}
                        <div className="absolute bg-gradient-to-br from-[#405DE6] to-[#E1306C] rounded-full w-24 h-24 flex items-center justify-center shadow-2xl">
                            <Instagram className="w-8 h-8 text-white" />
                        </div>

                        {/* Ring Labels */}
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                            <span className="text-white text-sm font-semibold">Premium Tier</span>
                        </div>
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                            <span className="text-white text-sm font-semibold">Featured Brands</span>
                        </div>
                    </div>

                    {/* Right - Content */}
                    <div className="space-y-8">
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {brandStats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 mb-2 inline-block">
                                        <stat.icon className="w-6 h-6 text-[#4BA4B4]" />
                                    </div>
                                    <div className="text-2xl font-black text-white unbounded-600">{stat.number}</div>
                                    <div className="text-gray-400 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Main Content */}
                        <div className="space-y-6">
                            <h3 className="text-3xl font-black text-white unbounded-600">
                                Few Clicks to Start <span className="text-[#B45B4B]">Earning</span>
                            </h3>

                            <p className="text-lg text-gray-300 leading-relaxed">
                                Share authentic content with your audience and earn commissions on every order.
                                ConvertSocial brands are eager to partner with creators who share their values.
                            </p>

                            <div className="space-y-4">
                                {[
                                    "Instant access to 100,000+ brands",
                                    "Get paid for every purchase through your links",
                                    "Free tutorial by top Instagram creators",
                                    "Weekly payments & detailed analytics"
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-gradient-to-br from-[#4BA4B4] to-[#B45B4B] rounded-full flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-gray-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>

                </div>
                {/* CTA Section - Updated to match reference image */}
                <div className="space-y-6 pt-20">
                    {/* Free Tutorial Offer */}
                    <div className="bg-gradient-to-r from-[#405DE6]/20 to-[#E1306C]/20 rounded-2xl p-6 border border-white/10">
                        <div className="text-center">
                            <h4 className="text-lg font-bold text-white mb-2">
                                Join ConvertSocial and receive a free tutorial
                            </h4>
                            <p className="text-gray-300 text-sm">
                                Designed with other Instagram creators on how to monetize your platform
                            </p>
                        </div>
                    </div>

                    {/* JOIN NOW Text Link */}
                    <div className="text-center">
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 text-white font-bold text-lg hover:text-[#4BA4B4] transition-all duration-300 group"
                        >
                            <span>JOIN NOW</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </a>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-[#4BA4B4]" />
                            <span>2M+ Creators</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Play className="w-4 h-4 text-[#B45B4B]" />
                            <span>Free Tutorial</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-[#405DE6]" />
                            <span>Instant Setup</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}