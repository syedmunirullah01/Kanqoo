"use client";
import { useState } from 'react';
import { TrendingUp, Users, Zap, Play, Music, Heart, ArrowRight, CheckCircle, Star, Target } from 'lucide-react';

export default function Brands() {
    const [activeTrend, setActiveTrend] = useState(0);

    const trendingBrands = [
        {
            category: "Beauty & Cosmetics",
            brands: [
                { name: 'NYX', trend: 'Viral', videos: '45K', engagement: '12.4%', color: '#FF66CC' },
                { name: 'Sephora', trend: 'Growing', videos: '28K', engagement: '9.8%', color: '#FF0066' }
            ],
            hashtag: '#BeautyTok'
        },
        {
            category: "Fashion",
            brands: [
                { name: 'MANGO', trend: 'Hot', videos: '32K', engagement: '14.2%', color: '#E6007E' },
                { name: 'FARFETCH', trend: 'Elite', videos: '18K', engagement: '16.8%', color: '#000000' }
            ],
            hashtag: '#FashionTok'
        },
        {
            category: "Electronics",
            brands: [
                { name: 'SONY', trend: 'Trending', videos: '56K', engagement: '11.3%', color: '#0066CC' },
                { name: 'Apple', trend: 'Always', videos: '89K', engagement: '15.7%', color: '#A2AAAD' }
            ],
            hashtag: '#TechTok'
        }
    ];

    const platformStats = [
        { icon: Users, value: '1B+', label: 'Monthly Users' },
        { icon: Play, value: '167M', label: 'Daily Videos' },
        { icon: TrendingUp, value: '89%', label: 'Engagement Rate' }
    ];

    return (
        <section className="relative bg-gradient-to-br from-[#18182f] via-[#1a1a35] to-[#2d2d5a] py-20 px-4 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Animated Hashtags */}
                <div className="absolute top-20 left-10 opacity-10">
                    <div className="text-6xl font-black text-white rotate-12">#TikTokMadeMeBuyIt</div>
                </div>
                <div className="absolute bottom-32 right-10 opacity-10">
                    <div className="text-5xl font-black text-white -rotate-6">#Viral</div>
                </div>

                {/* Gradient Orbs */}
                <div className="absolute top-10 right-1/4 w-64 h-64 bg-[#ff0050]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-[#00f2ea]/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 mb-6">
                        <Target className="w-5 h-5 text-[#00f2ea]" />
                        <span className="text-white font-semibold text-sm">TikTok Brand Partnerships</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 unbounded-600">
                        Brands Going
                        <span className="block bg-gradient-to-r from-[#ff0050] to-[#00f2ea] bg-clip-text text-transparent">
                            Viral on TikTok
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Partner with brands that understand TikTok culture and know how to go viral.
                    </p>
                </div>

                <div className="grid lg:grid-cols-4 gap-8 mb-12">
                    {/* Stats Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 sticky top-8">
                            <h3 className="text-xl font-black text-white mb-6 unbounded-600">TikTok Stats</h3>
                            <div className="space-y-6">
                                {platformStats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="p-3 bg-gradient-to-br from-[#ff0050] to-[#00f2ea] rounded-xl inline-block mb-3">
                                            <stat.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-2xl font-black text-white unbounded-600">{stat.value}</div>
                                        <div className="text-gray-400 text-sm">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Trend Indicator */}
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <div className="flex items-center gap-2 mb-3">
                                    <TrendingUp className="w-5 h-5 text-[#ff0050]" />
                                    <span className="text-white font-semibold">Currently Trending</span>
                                </div>
                                <div className="bg-gradient-to-r from-[#ff0050] to-[#00f2ea] rounded-full px-4 py-2 text-center">
                                    <span className="text-white font-bold text-sm">{trendingBrands[activeTrend].hashtag}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content - Trending Categories */}
                    <div className="lg:col-span-3">
                        {/* Category Navigation */}
                        <div className="flex overflow-x-auto gap-4 mb-8 pb-4 scrollbar-hide">
                            {trendingBrands.map((category, index) => (
                                <button
                                    key={category.category}
                                    onClick={() => setActiveTrend(index)}
                                    className={`flex-shrink-0 px-6 py-3 rounded-2xl transition-all duration-300 ${
                                        activeTrend === index
                                            ? 'bg-gradient-to-r from-[#ff0050] to-[#00f2ea] text-white'
                                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                    }`}
                                >
                                    <span className="font-semibold">{category.category}</span>
                                </button>
                            ))}
                        </div>

                        {/* Active Category Brands */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            {trendingBrands[activeTrend].brands.map((brand, index) => (
                                <div
                                    key={brand.name}
                                    className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-[#ff0050]/50 transition-all duration-500 group"
                                >
                                    {/* Brand Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div 
                                                className="text-2xl font-black text-white unbounded-600 mb-1"
                                                style={{ color: brand.color }}
                                            >
                                                {brand.name}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                    brand.trend === 'Viral' ? 'bg-[#ff0050] text-white' :
                                                    brand.trend === 'Hot' ? 'bg-orange-500 text-white' :
                                                    brand.trend === 'Trending' ? 'bg-[#00f2ea] text-black' :
                                                    'bg-purple-500 text-white'
                                                }`}>
                                                    {brand.trend}
                                                </div>
                                                <span className="text-gray-400 text-sm">{trendingBrands[activeTrend].hashtag}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1">
                                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                            <span className="text-white text-sm font-semibold">4.8</span>
                                        </div>
                                    </div>

                                    {/* Brand Stats */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="text-center">
                                            <div className="text-lg font-black text-white">{brand.videos}</div>
                                            <div className="text-gray-400 text-xs">TikTok Videos</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg font-black text-white">{brand.engagement}</div>
                                            <div className="text-gray-400 text-xs">Engagement Rate</div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <button className="flex-1 bg-white/10 hover:bg-[#ff0050] text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                                            <Play className="w-4 h-4" />
                                            <span>Create Video</span>
                                        </button>
                                        <button className="flex-1 bg-white/10 hover:bg-[#00f2ea] text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                                            <Music className="w-4 h-4" />
                                            <span>Use Sound</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Additional Brands Grid */}
                        <div>
                            <h3 className="text-2xl font-black text-white mb-6 unbounded-600">More Viral Brands</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { name: 'Nike', trend: '🔥', color: '#FF0000' },
                                    { name: 'Sephora', trend: '💄', color: '#FF0066' },
                                    { name: 'Lululemon', trend: '🧘', color: '#000000' },
                                    { name: 'Dyson', trend: '⚡', color: '#0066CC' }
                                ].map((brand, index) => (
                                    <div
                                        key={brand.name}
                                        className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-[#00f2ea]/50 transition-all duration-300 group text-center"
                                    >
                                        <div 
                                            className="text-lg font-black text-white mb-1"
                                            style={{ color: brand.color }}
                                        >
                                            {brand.name}
                                        </div>
                                        <div className="text-gray-400 text-xs mb-2">{brand.trend}</div>
                                        <div className="text-[#ff0050] font-bold text-sm">8-15%</div>
                                        <div className="text-gray-400 text-xs">Commission</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="mt-8 bg-gradient-to-r from-[#ff0050]/20 to-[#00f2ea]/20 rounded-2xl p-8 border border-white/10 text-center">
                            <h4 className="text-2xl font-black text-white mb-4 unbounded-600">
                                Ready to Go Viral with Brands?
                            </h4>
                            <p className="text-gray-300 mb-6">
                                Join TikTok creators who are turning their content into consistent income
                            </p>
                            <a 
                                href="#" 
                                className="inline-flex items-center gap-2 text-white font-bold text-lg hover:text-[#00f2ea] transition-all duration-300 group"
                            >
                                <span>START CREATING VIRAL CONTENT</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}