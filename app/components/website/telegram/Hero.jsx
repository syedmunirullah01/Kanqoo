"use client";
import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Zap, Users, Rocket, ArrowRight, CheckCircle, Play, Shield, Send } from 'lucide-react';

export default function Hero() {
    const [activeFeature, setActiveFeature] = useState(0);
    const messageRef = useRef(null);

    const features = [
        {
            icon: Send,
            title: "Direct Message Integration",
            description: "Seamlessly share affiliate links in your private and group chats"
        },
        {
            icon: Users,
            title: "Channel Partnerships",
            description: "Monetize your Telegram channels with brand collaborations"
        },
        {
            icon: Shield,
            title: "Secure & Private",
            description: "End-to-end encrypted earnings with complete privacy"
        }
    ];

    const stats = [
        { number: "700M+", label: "Active Users" },
        { number: "$500+", label: "Avg Monthly Earnings" },
        { number: "Instant", label: "Payouts" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0933] via-[#18182f] to-[#2a1b45] overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Telegram-themed Gradients */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#0088cc]/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#0088cc]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

                {/* Floating Message Bubbles */}
                <div className="absolute top-20 right-20 w-16 h-12 bg-[#0088cc]/30 rounded-2xl rounded-tr-sm transform rotate-12 animate-float"></div>
                <div className="absolute bottom-40 left-20 w-20 h-14 bg-[#0088cc]/20 rounded-2xl rounded-tl-sm transform -rotate-6 animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/3 left-1/4 w-12 h-10 bg-[#4BA4B4]/30 rounded-2xl rounded-br-sm transform rotate-45 animate-float" style={{ animationDelay: '1.5s' }}></div>

                {/* Network Lines */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 20% 35%, #0088cc 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}></div>
                </div>
            </div>

            <div className="container mx-auto px-6 z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        {/* Header */}
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20">
                                <MessageCircle className="w-6 h-6 text-[#0088cc]" />
                                <div>
                                    <div className="text-white font-bold text-sm">Telegram Creators</div>
                                    <div className="text-gray-400 text-xs">Monetize Your Messages</div>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight unbounded-600">
                                Turn Your
                                <span className="block bg-gradient-to-r from-[#0088cc] to-[#4BA4B4] bg-clip-text text-transparent">
                                    Telegram Presence
                                </span>
                                Into Profit
                            </h1>

                            <p className="text-xl text-gray-300 leading-relaxed">
                                Monetize your channels, groups, and private messages with affiliate partnerships.
                                <span className="font-semibold text-white"> Earn while you chat.</span>
                            </p>
                        </div>

                        {/* Animated Feature Carousel */}
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex gap-1">
                                    {features.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`w-2 h-2 rounded-full transition-all duration-500 ${index === activeFeature ? 'bg-[#0088cc] scale-125' : 'bg-white/30'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <div className="text-white font-semibold text-sm">
                                    {features[activeFeature].title}
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm">
                                {features[activeFeature].description}
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center bg-white/5 rounded-xl p-4 border border-white/10">
                                    <div className="text-lg md:text-xl font-black text-white unbounded-600">{stat.number}</div>
                                    <div className="text-gray-400 text-xs">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-[#0088cc] hover:bg-[#0077bb] text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3 group">
                                <MessageCircle className="w-5 h-5" />
                                <span>Connect Telegram</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>

                            <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 border border-white/20 hover:border-white/30 flex items-center justify-center gap-3">
                                <Play className="w-5 h-5 text-[#4BA4B4]" />
                                <span>See Examples</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Content - Telegram Interface Mockup */}
                    <div className="relative">
                        <div className="bg-[#182533] rounded-3xl p-6 border-2 border-[#0088cc]/30 shadow-2xl">
                            {/* Chat Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-[#0088cc] rounded-full flex items-center justify-center">
                                    <MessageCircle className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-white font-bold">Brand Partnerships</div>
                                    <div className="text-gray-400 text-sm">Online • 100K+ members</div>
                                </div>
                            </div>

                            {/* Chat Messages */}
                            <div className="space-y-4">
                                {/* Incoming Message */}
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                                    <div className="bg-[#2b5278] rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                                        <p className="text-white text-sm">Just earned $250 from the SONY affiliate program! 🎉</p>
                                        <div className="text-gray-400 text-xs mt-1">15:32</div>
                                    </div>
                                </div>

                                {/* Outgoing Message */}
                                <div className="flex gap-3 justify-end">
                                    <div className="bg-[#0088cc] rounded-2xl rounded-tr-none p-4 max-w-[80%]">
                                        <p className="text-white text-sm">Check out this amazing deal from MANGO! Use my link 👇</p>
                                        <div className="text-blue-100 text-xs mt-1">https://convert.so/mango-special</div>
                                        <div className="text-white/70 text-xs mt-1">15:33 • $45 earned</div>
                                    </div>
                                    <div className="w-8 h-8 bg-[#0088cc] rounded-full"></div>
                                </div>

                                {/* System Message */}
                                <div className="text-center">
                                    <div className="inline-block bg-white/10 rounded-full px-4 py-2">
                                        <div className="text-gray-400 text-sm">🎯 You earned a new commission: $45</div>
                                    </div>
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="mt-6 flex gap-3">
                                <div className="flex-1 bg-[#2b5278] rounded-2xl px-4 py-3">
                                    <div className="text-gray-400 text-sm">Type your message with affiliate links...</div>
                                </div>
                                <button className="w-12 h-12 bg-[#0088cc] rounded-2xl flex items-center justify-center">
                                    <Send className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Floating Earnings Badge */}
                        <div className="absolute -top-4 -right-4 bg-gradient-to-br from-[#4BA4B4] to-[#B45B4B] rounded-2xl p-4 shadow-2xl">
                            <div className="text-center text-white">
                                <div className="text-lg font-black">$500+</div>
                                <div className="text-xs">Avg Monthly</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}