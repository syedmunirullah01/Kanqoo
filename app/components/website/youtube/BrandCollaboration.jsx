"use client";
import { useState } from 'react';
import { Play, DollarSign, Users, TrendingUp, Shield, Zap, CheckCircle, Youtube, BarChart3, Rocket, ArrowRight, Star } from 'lucide-react';

export default function BrandCollaboration() {
    const [activeTab, setActiveTab] = useState('creators');

    const featuredBrands = [
        { name: 'SONY', type: 'Tech', budget: 'High', category: 'premium', commission: '15-25%' },
        { name: 'FARFETCH', type: 'Fashion', budget: 'Premium', category: 'premium', commission: '12-20%' },
        { name: 'MANGO', type: 'Fashion', budget: 'Medium', category: 'premium', commission: '10-18%' },
        { name: 'NYX', type: 'Beauty', budget: 'High', category: 'popular', commission: '8-15%' },
        { name: 'AliExpress', type: 'E-commerce', budget: 'Flexible', category: 'popular', commission: '5-12%' },
        { name: 'SHEIN', type: 'Fashion', budget: 'High', category: 'popular', commission: '7-14%' }
    ];

    const creatorBenefits = [
        {
            icon: DollarSign,
            title: "Earn Commissions",
            description: "Get paid for every sale through your unique tracking links",
            gradient: "from-[#4BA4B4] to-[#B45B4B]"
        },
        {
            icon: BarChart3,
            title: "Real-time Analytics",
            description: "Track clicks, conversions, and earnings in your dashboard",
            gradient: "from-[#B45B4B] to-[#4BA4B4]"
        },
        {
            icon: Shield,
            title: "Secure Payments",
            description: "Weekly payouts directly to your bank account",
            gradient: "from-[#4BA4B4] to-[#B45B4B]"
        },
        {
            icon: Zap,
            title: "Instant Access",
            description: "Start promoting brands immediately after approval",
            gradient: "from-[#B45B4B] to-[#4BA4B4]"
        }
    ];

    const platformStats = [
        { value: "50K+", label: "YouTube Creators", icon: Users },
        { value: "$10M+", label: "Paid to Creators", icon: DollarSign },
        { value: "100K+", label: "Brands Available", icon: Star },
        { value: "24/7", label: "Creator Support", icon: Shield }
    ];

    const howItWorks = [
        {
            step: "01",
            title: "Sign Up & Connect",
            description: "Register and connect your YouTube channel in minutes",
            icon: Users
        },
        {
            step: "02",
            title: "Choose Brands",
            description: "Browse 100,000+ brands and select partnerships",
            icon: Star
        },
        {
            step: "03",
            title: "Get Tracking Links",
            description: "Receive unique tracking links for each campaign",
            icon: Zap
        },
        {
            step: "04",
            title: "Earn & Grow",
            description: "Add links to your videos and start earning commissions",
            icon: TrendingUp
        }
    ];

    return (
        <section className="relative bg-gradient-to-br from-[#18182f] via-[#1a1a35] to-[#2d2d5a] py-20 px-4 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-72 h-72 bg-[#4BA4B4]/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B45B4B]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#4BA4B4]/5 to-[#B45B4B]/5 rounded-full blur-2xl animate-pulse"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-20">
                    {/* Trust Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8 shadow-lg">
                        <Youtube className="w-4 h-4 text-[#4BA4B4]" />
                        <span className="text-sm font-semibold text-white">Trusted by 50,000+ YouTube Creators</span>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-3 h-3 text-[#B45B4B] fill-current" />
                            ))}
                        </div>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight unbounded-600">
                        Turn Your
                        <span className="block bg-gradient-to-r from-[#4BA4B4] to-[#B45B4B] bg-clip-text text-transparent">
                            YouTube Channel
                        </span>
                        Into Revenue
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Partner with global brands and earn commissions through your video content.
                        <span className="font-semibold text-white"> No extra work required.</span>
                    </p>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
                    {platformStats.map((stat, index) => (
                        <div 
                            key={stat.label} 
                            className="text-center bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10 hover:border-[#4BA4B4]/30 transition-all duration-300 group"
                        >
                            <div className="flex justify-center mb-3">
                                <div className="p-2 bg-gradient-to-br from-[#4BA4B4] to-[#B45B4B] rounded-lg">
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="text-2xl md:text-3xl font-black text-white mb-2">{stat.value}</div>
                            <div className="text-gray-300 font-medium text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Brands Showcase */}
                <div className="mb-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 unbounded-600">
                            Partner with <span className="text-[#4BA4B4]">World-Class Brands</span>
                        </h2>
                        <p className="text-gray-300 text-lg">Brands actively seeking YouTube creators</p>
                    </div>

                    {/* Premium Brands */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {featuredBrands.filter(brand => brand.category === 'premium').map((brand) => (
                            <div
                                key={brand.name}
                                className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/10 hover:border-[#4BA4B4]/30 transition-all duration-500 hover:shadow-xl"
                            >
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white mb-3 unbounded-600">{brand.name}</div>
                                    <div className="flex justify-center items-center gap-4 text-sm text-gray-300 mb-3">
                                        <span>{brand.type}</span>
                                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                        <span className="font-semibold text-[#B45B4B]">{brand.budget} Budget</span>
                                    </div>
                                    <div className="text-lg font-bold text-[#4BA4B4] mb-2">
                                        {brand.commission} Commission
                                    </div>
                                    <div className="text-xs text-[#4BA4B4] font-semibold uppercase tracking-wide">
                                        High Conversion Rates
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Popular Brands Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {featuredBrands.filter(brand => brand.category === 'popular').map((brand) => (
                            <div
                                key={brand.name}
                                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/10 hover:border-[#B45B4B]/30 hover:shadow-xl transition-all duration-300 group text-center"
                            >
                                <div className="text-lg font-semibold text-white mb-2">{brand.name}</div>
                                <div className="text-xs text-gray-300 mb-1">{brand.type}</div>
                                <div className="text-sm text-[#B45B4B] font-semibold">{brand.commission}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* How It Works */}
                <div className="mb-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 unbounded-600">
                            Start Earning in <span className="text-[#B45B4B]">4 Simple Steps</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {howItWorks.map((step, index) => (
                            <div
                                key={step.step}
                                className="relative bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/10 hover:border-[#4BA4B4]/30 hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-[#4BA4B4] to-[#B45B4B] text-white rounded-full flex items-center justify-center text-sm font-bold unbounded-600 shadow-lg">
                                    {step.step}
                                </div>
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 bg-white/10 rounded-xl">
                                        <step.icon className="w-8 h-8 text-[#4BA4B4]" />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-white mb-3 unbounded-600">{step.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Benefits & CTA Section */}
                <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
                    {/* Benefits */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 unbounded-600">
                                Why YouTube Creators <span className="text-[#4BA4B4]">Love Us</span>
                            </h2>
                            <p className="text-gray-300 text-lg mb-8">
                                Everything you need to monetize your content effectively and grow your channel.
                            </p>
                        </div>
                        
                        <div className="space-y-6">
                            {creatorBenefits.map((benefit, index) => (
                                <div
                                    key={benefit.title}
                                    className="flex items-start gap-6 bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10 hover:border-[#4BA4B4]/30 hover:shadow-xl transition-all duration-300 group"
                                >
                                    <div className={`p-3 bg-gradient-to-br ${benefit.gradient} rounded-xl shadow-lg`}>
                                        <benefit.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-2 unbounded-600">{benefit.title}</h3>
                                        <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Card */}
                    <div className="bg-gradient-to-br from-[#4BA4B4] to-[#B45B4B] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                        
                        <div className="text-center mb-6 relative z-10">
                            <Rocket className="w-16 h-16 mx-auto mb-4" />
                            <h3 className="text-2xl md:text-4xl font-black mb-4 unbounded-600">
                                Ready to Monetize Your Content?
                            </h3>
                            <p className="text-white/80 text-lg mb-6">
                                Join thousands of YouTube creators already earning with brand partnerships
                            </p>
                        </div>

                        <div className="space-y-4 relative z-10">
                            <button className="btn-gradient w-full bg-white text-[#18182f] hover:text-[#4BA4B4] font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3 group">
                                <Youtube className="w-5 h-5" />
                                Connect Your YouTube Channel
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                            
                            <div className="text-center">
                                <div className="text-white/80 text-sm flex items-center justify-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Free to join • No hidden fees • Instant approval
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="text-center bg-white/5 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4BA4B4]/10 to-[#B45B4B]/10 opacity-50"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 unbounded-600">
                            Your Audience is Valuable. <span className="text-[#B45B4B]">Get Paid for It.</span>
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                            Every view, every subscriber, every click - turn your YouTube influence into sustainable income.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="btn-gradient group text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3">
                                <Play className="w-5 h-5" />
                                Start Earning Today
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                            <button className="border-2 border-white/20 hover:border-white/30 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 backdrop-blur-sm">
                                View Creator Success Stories
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}