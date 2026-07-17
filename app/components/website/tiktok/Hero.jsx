"use client";
import { useEffect, useRef, useState } from 'react';
import { Music, Play, TrendingUp, Users, Zap, ArrowRight, CheckCircle, Sparkles, Heart } from 'lucide-react';

export default function Hero() {
    const [activeVideo, setActiveVideo] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const videoContainerRef = useRef(null);

    const videoFeatures = [
        {
            views: "2.4M",
            likes: "450K",
            earnings: "$3,200",
            product: "SONY Headphones"
        },
        {
            views: "1.8M",
            likes: "320K",
            earnings: "$2,100",
            product: "MANGO Fashion"
        },
        {
            views: "3.1M",
            likes: "680K",
            earnings: "$4,500",
            product: "NYX Cosmetics"
        }
    ];

    const stats = [
        { number: "1B+", label: "Active Users" },
        { number: "$1K+", label: "Avg Monthly" },
        { number: "24/7", label: "Support" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            if (isPlaying) {
                setActiveVideo((prev) => (prev + 1) % videoFeatures.length);
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18182f] via-[#1a1a35] to-[#2d2d5a] overflow-hidden py-20">
            {/* TikTok-themed Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Animated Gradient Orbs */}
                <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-[#ff0050] to-[#00f2ea] rounded-full blur-3xl opacity-10 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#00f2ea] to-[#ff0050] rounded-full blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
                
                {/* Floating TikTok Icons */}
                <div className="absolute top-20 right-20 w-8 h-8 opacity-30 animate-bounce">
                    <Music className="w-full h-full text-[#ff0050]" />
                </div>
                <div className="absolute bottom-40 left-20 w-6 h-6 opacity-40 animate-bounce" style={{animationDelay: '1s'}}>
                    <Heart className="w-full h-full text-[#00f2ea]" />
                </div>
                <div className="absolute top-1/3 left-1/4 w-10 h-10 opacity-20 animate-bounce" style={{animationDelay: '0.5s'}}>
                    <TrendingUp className="w-full h-full text-[#ff0050]" />
                </div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(#ff0050 1px, transparent 1px),
                                        linear-gradient(90deg, #ff0050 1px, transparent 1px)`,
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
                                <div className="p-2 bg-gradient-to-br from-[#ff0050] to-[#00f2ea] rounded-lg">
                                    <Play className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <div className="text-white font-bold text-sm">TikTok Creators</div>
                                    <div className="text-gray-400 text-xs">Turn Views into Revenue</div>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight unbounded-600">
                                Go Viral,
                                <span className="block bg-gradient-to-r from-[#ff0050] via-[#00f2ea] to-[#ff0050] bg-clip-text text-transparent">
                                    Get Paid
                                </span>
                            </h1>

                            <p className="text-xl text-gray-300 leading-relaxed">
                                Monetize your TikTok content with brand partnerships. 
                                <span className="font-semibold text-white"> Earn commissions on every viral video.</span>
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

                        {/* Features */}
                        <div className="space-y-3">
                            {[
                                "Product links in your bio",
                                "Shoppable video features",
                                "Real-time earnings tracking",
                                "Instant brand approvals"
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-gradient-to-br from-[#ff0050] to-[#00f2ea] rounded-full flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-gray-300">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-gradient-to-r from-[#ff0050] to-[#00f2ea] hover:from-[#ff1a66] hover:to-[#1affff] text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3 group">
                                <Play className="w-5 h-5" />
                                <span>Start Creating</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>

                            <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 border border-white/20 hover:border-white/30 flex items-center justify-center gap-3">
                                <TrendingUp className="w-5 h-5 text-[#00f2ea]" />
                                <span>View Success</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Content - TikTok Video Mockup */}
                    <div className="relative">
                        <div 
                            ref={videoContainerRef}
                            className="bg-[#0f0f1f] rounded-3xl p-1 border-2 border-[#ff0050] shadow-2xl relative overflow-hidden"
                            onMouseEnter={() => setIsPlaying(false)}
                            onMouseLeave={() => setIsPlaying(true)}
                        >
                            {/* Video Container */}
                            <div className="bg-gradient-to-br from-[#1a1a2f] to-[#2d2d4a] rounded-2xl h-96 relative overflow-hidden">
                                {/* Video Progress */}
                                <div className="absolute top-4 left-4 right-4">
                                    <div className="flex gap-1">
                                        {videoFeatures.map((_, index) => (
                                            <div
                                                key={index}
                                                className={`h-1 flex-1 rounded-full transition-all duration-1000 ${
                                                    index === activeVideo 
                                                        ? 'bg-white scale-110' 
                                                        : index < activeVideo 
                                                            ? 'bg-white/50' 
                                                            : 'bg-white/20'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Video Content */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-4xl font-black text-white mb-4 unbounded-600">
                                            {videoFeatures[activeVideo].product}
                                        </div>
                                        <div className="text-gray-300 text-lg">Featured in Viral Video</div>
                                    </div>
                                </div>

                                {/* Video Stats */}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <div className="text-white font-bold text-lg">{videoFeatures[activeVideo].views}</div>
                                            <div className="text-gray-400 text-xs">Views</div>
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-lg">{videoFeatures[activeVideo].likes}</div>
                                            <div className="text-gray-400 text-xs">Likes</div>
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-lg">{videoFeatures[activeVideo].earnings}</div>
                                            <div className="text-gray-400 text-xs">Earned</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Play/Pause Overlay */}
                                {!isPlaying && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                            <Play className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* TikTok UI Elements */}
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-4">
                                {[
                                    { icon: Heart, count: videoFeatures[activeVideo].likes, color: '#ff0050' },
                                    { icon: Music, count: "12.5K", color: '#00f2ea' },
                                    { icon: Sparkles, count: "Share", color: '#ffffff' }
                                ].map((item, index) => (
                                    <div key={index} className="text-center">
                                        <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                                            <item.icon className="w-6 h-6" style={{ color: item.color }} />
                                        </div>
                                        <div className="text-white text-xs mt-1">{item.count}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Floating Earnings Badge */}
                        <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-[#ff0050] to-[#00f2ea] rounded-2xl p-4 shadow-2xl">
                            <div className="text-center text-white">
                                <div className="text-lg font-black unbounded-600">$1K+</div>
                                <div className="text-xs">Avg Monthly</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}