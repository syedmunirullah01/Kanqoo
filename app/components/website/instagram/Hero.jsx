"use client";
import { useEffect, useRef, useState } from 'react';
import { Instagram, Sparkles, Heart, MessageCircle, Camera, PlayCircle, Zap, Users, TrendingUp, ArrowRight, CheckCircle, Star } from 'lucide-react';

export default function Hero() {
    const heroRef = useRef(null);
    const [activeStory, setActiveStory] = useState(0);

    const stories = [
        { icon: MessageCircle, color: '#405DE6', label: 'DMs' },
        { icon: Camera, color: '#E1306C', label: 'Reels' },
        { icon: Heart, color: '#FD1D1D', label: 'Posts' },
        { icon: PlayCircle, color: '#F77737', label: 'Stories' }
    ];

    const successMetrics = [
        { metric: '15-25%', label: 'Average Commission Rate' },
        { metric: '48h', label: 'First Payout' },
        { metric: '2.3x', label: 'Higher Engagement' }
    ];

    const platformFeatures = [
        { text: 'Swipe-up Links in Stories', active: true },
        { text: 'Product Tags in Posts', active: true },
        { text: 'Affiliate Reels', active: true }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStory((prev) => (prev + 1) % stories.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f0f23] via-[#18182f] to-[#2a2a4a] py-20"
        >
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Animated Gradient Circles */}
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-[#405DE6] to-[#5851DB] rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#E1306C] to-[#C13584] rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-[#F77737] to-[#F56040] rounded-full opacity-5 animate-pulse" style={{ animationDelay: '2s' }}></div>

                {/* Floating Instagram Story Dots */}
                <div className="absolute top-20 right-20">
                    {stories.map((story, index) => (
                        <div
                            key={index}
                            className={`absolute w-3 h-3 rounded-full transition-all duration-500 ${index === activeStory ? 'scale-150 opacity-100' : 'scale-100 opacity-30'
                                }`}
                            style={{
                                background: story.color,
                                top: `${index * 24}px`,
                                left: '0',
                            }}
                        />
                    ))}
                </div>

                {/* Grid Pattern with Instagram Colors */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `
                            linear-gradient(45deg, #405DE6 1px, transparent 1px),
                            linear-gradient(-45deg, #E1306C 1px, transparent 1px),
                            linear-gradient(45deg, #F77737 1px, transparent 1px)
                        `,
                        backgroundSize: '100px 100px, 80px 80px, 60px 60px'
                    }}
                />
            </div>

            <div className="container mx-auto px-6 z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Left Content - Instagram Story Style */}
                    <div className="relative">
                        {/* Main Instagram Story Card */}
                        <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden">
                            {/* Story Progress Bar */}
                            <div className="flex gap-1 mb-8">
                                {stories.map((story, index) => (
                                    <div
                                        key={index}
                                        className={`h-1 flex-1 rounded-full transition-all duration-1000 ${index === activeStory
                                                ? 'bg-white scale-110'
                                                : index < activeStory
                                                    ? 'bg-white/50'
                                                    : 'bg-white/20'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Active Story Content */}
                            <div className="text-center mb-8">
                                <div
                                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl transition-all duration-500"
                                    style={{ background: stories[activeStory].color }}
                                >
                                    {/* FIX: Use dynamic component properly */}
                                    {(() => {
                                        const IconComponent = stories[activeStory].icon;
                                        return <IconComponent className="w-10 h-10 text-white" />;
                                    })()}
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2 unbounded-600">
                                    Monetize Your {stories[activeStory].label}
                                </h3>
                                <p className="text-gray-300">
                                    Turn your {stories[activeStory].label.toLowerCase()} into revenue streams
                                </p>
                            </div>

                            {/* Success Metrics */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                {successMetrics.map((item, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-lg font-black text-white unbounded-600">{item.metric}</div>
                                        <div className="text-xs text-gray-400">{item.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Feature Dots */}
                            <div className="flex justify-center gap-2">
                                {platformFeatures.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${feature.active ? 'bg-[#4BA4B4]' : 'bg-white/20'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Gradient Border Effect */}
                            <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-[#405DE6] via-[#E1306C] to-[#F77737] opacity-30 -z-10">
                                <div className="w-full h-full bg-[#0f0f23] rounded-3xl"></div>
                            </div>
                        </div>

                        {/* Floating Creator Avatars */}
                        <div className="absolute -bottom-4 -right-4 flex">
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="w-10 h-10 bg-gradient-to-br from-[#405DE6] to-[#E1306C] rounded-full border-2 border-[#18182f] -ml-3 shadow-lg"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Content - Main Content */}
                    <div className="space-y-8">
                        {/* Header with Instagram Badge */}
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20">
                                <div className="p-2 bg-gradient-to-br from-[#405DE6] via-[#E1306C] to-[#F77737] rounded-lg">
                                    <Instagram className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-white font-bold text-sm">Instagram Creators</div>
                                    <div className="text-gray-400 text-xs">2M+ already earning</div>
                                </div>
                                <div className="flex items-center gap-1 ml-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="w-3 h-3 text-[#B45B4B] fill-current" />
                                    ))}
                                </div>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight unbounded-600">
                                Your Instagram,
                                <span className="block bg-gradient-to-r from-[#405DE6] via-[#E1306C] to-[#F77737] bg-clip-text text-transparent">
                                    Your Income
                                </span>
                            </h1>

                            <p className="text-xl text-gray-300 leading-relaxed">
                                Transform your Instagram presence into a sustainable business.
                                <span className="font-semibold text-white"> Get paid for every like, share, and sale.</span>
                            </p>
                        </div>

                        {/* Interactive Feature Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Zap, label: 'Instant Setup', value: '2 min' },
                                { icon: Users, label: 'Brands Ready', value: '150K+' },
                                { icon: TrendingUp, label: 'Avg. Earnings', value: '$500/mo' },
                                { icon: Sparkles, label: 'Success Rate', value: '98%' }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 group hover:scale-105"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                            <item.icon className="w-4 h-4 text-[#4BA4B4]" />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-lg">{item.value}</div>
                                            <div className="text-gray-400 text-xs">{item.label}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Section */}
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    className="group flex-1 bg-gradient-to-r from-[#405DE6] to-[#E1306C] hover:from-[#4A66F0] hover:to-[#F1357C] text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3"
                                >
                                    <Instagram className="w-5 h-5" />
                                    <span>Connect Instagram</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>

                                <button className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 border-2 border-white/20 hover:border-white/30 flex items-center justify-center gap-3">
                                    <PlayCircle className="w-5 h-5 text-[#4BA4B4]" />
                                    <span>See Examples</span>
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-[#4BA4B4]" />
                                    <span>No follower minimum</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-[#4BA4B4]" />
                                    <span>Free forever</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-[#4BA4B4]" />
                                    <span>Instant approval</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
                </div>
            </div>
        </section>
    );
}