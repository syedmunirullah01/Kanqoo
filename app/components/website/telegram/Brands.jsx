"use client";
import { useState } from 'react';
import { Target, Zap, Crown, MessageCircle, Users, CheckCircle, ArrowRight, Star } from 'lucide-react';

export default function Brands() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'All Brands', count: '100K+' },
        { id: 'tech', name: 'Technology', count: '25K+' },
        { id: 'fashion', name: 'Fashion', count: '18K+' },
        { id: 'lifestyle', name: 'Lifestyle', count: '32K+' }
    ];

    const brands = {
        featured: [
            { name: 'SONY', category: 'tech', commission: '15-25%', members: '2.4M', color: '#0066CC' },
            { name: 'MANGO', category: 'fashion', commission: '12-18%', members: '1.8M', color: '#E6007E' },
            { name: 'FARFETCH', category: 'fashion', commission: '10-20%', members: '950K', color: '#000000' }
        ],
        popular: [
            { name: 'NYX', category: 'lifestyle', commission: '8-15%', members: '3.2M', color: '#FF66CC' },
            { name: 'AliExpress', category: 'all', commission: '5-12%', members: '5.1M', color: '#FF6A00' },
            { name: 'Booking.com', category: 'lifestyle', commission: '6-14%', members: '2.1M', color: '#003580' }
        ]
    };

    const telegramStats = [
        { icon: Users, value: '700M+', label: 'Active Users' },
        { icon: MessageCircle, value: '50M+', label: 'Daily Messages' },
        { icon: Zap, value: 'Instant', label: 'Commission Tracking' }
    ];

    return (
        <section className="relative bg-gradient-to-br from-[#0f0f1f] via-[#141428] to-[#1e1e3a] py-20 px-4 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-[#0088cc]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4BA4B4]/10 rounded-full blur-3xl"></div>
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(#0088cc 1px, transparent 1px),
                                        linear-gradient(90deg, #0088cc 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 mb-6">
                        <Target className="w-5 h-5 text-[#B45B4B]" />
                        <span className="text-white font-semibold text-sm">Brand Partnerships</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 unbounded-600">
                        Brands in Your
                        <span className="block bg-gradient-to-r from-[#0088cc] to-[#4BA4B4] bg-clip-text text-transparent">
                            Telegram Network
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Access thousands of brands ready to partner with Telegram creators and channel owners.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left - Categories */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 sticky top-8">
                            <h3 className="text-xl font-black text-white mb-6 unbounded-600">Categories</h3>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                                            selectedCategory === category.id
                                                ? 'bg-[#0088cc] text-white'
                                                : 'bg-white/5 hover:bg-white/10 text-gray-300'
                                        }`}
                                    >
                                        <span className="font-semibold">{category.name}</span>
                                        <span className={`text-sm ${
                                            selectedCategory === category.id ? 'text-white' : 'text-gray-400'
                                        }`}>
                                            {category.count}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <h4 className="text-white font-semibold mb-4">Telegram Network</h4>
                                <div className="space-y-3">
                                    {telegramStats.map((stat, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="p-2 bg-white/10 rounded-lg">
                                                <stat.icon className="w-4 h-4 text-[#0088cc]" />
                                            </div>
                                            <div>
                                                <div className="text-white font-bold">{stat.value}</div>
                                                <div className="text-gray-400 text-xs">{stat.label}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Brands Grid */}
                    <div className="lg:col-span-2">
                        {/* Featured Brands */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-black text-white mb-6 unbounded-600 flex items-center gap-2">
                                <Crown className="w-6 h-6 text-[#B45B4B]" />
                                Featured Brands
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {brands.featured.map((brand, index) => (
                                    <div
                                        key={brand.name}
                                        className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-[#0088cc]/50 transition-all duration-500 group hover:scale-105"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <div 
                                                    className="text-2xl font-black text-white unbounded-600 mb-1"
                                                    style={{ color: brand.color }}
                                                >
                                                    {brand.name}
                                                </div>
                                                <div className="text-gray-400 text-sm">{brand.category}</div>
                                            </div>
                                            <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1">
                                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                                <span className="text-white text-sm font-semibold">Featured</span>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="text-center">
                                                <div className="text-lg font-black text-white">{brand.commission}</div>
                                                <div className="text-gray-400 text-xs">Commission</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-lg font-black text-white">{brand.members}</div>
                                                <div className="text-gray-400 text-xs">Telegram Members</div>
                                            </div>
                                        </div>

                                        <button className="w-full bg-white/10 hover:bg-[#0088cc] text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105">
                                            <MessageCircle className="w-4 h-4" />
                                            <span>Partner Now</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Popular Brands */}
                        <div>
                            <h3 className="text-2xl font-black text-white mb-6 unbounded-600">Popular Choices</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                {brands.popular.map((brand, index) => (
                                    <div
                                        key={brand.name}
                                        className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-[#4BA4B4]/50 transition-all duration-300 group"
                                    >
                                        <div className="text-center">
                                            <div 
                                                className="text-lg font-black text-white mb-1"
                                                style={{ color: brand.color }}
                                            >
                                                {brand.name}
                                            </div>
                                            <div className="text-gray-400 text-xs mb-2">{brand.category}</div>
                                            <div className="text-[#0088cc] font-bold text-sm">{brand.commission}</div>
                                            <div className="text-gray-400 text-xs">Commission</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="mt-8 bg-gradient-to-r from-[#0088cc]/20 to-[#4BA4B4]/20 rounded-2xl p-6 border border-white/10">
                            <div className="text-center">
                                <h4 className="text-xl font-black text-white mb-2 unbounded-600">
                                    Ready to Partner with Brands?
                                </h4>
                                <p className="text-gray-300 mb-4">
                                    Join thousands of Telegram creators already earning through brand partnerships
                                </p>
                                <a 
                                    href="#" 
                                    className="inline-flex items-center gap-2 text-white font-bold text-lg hover:text-[#0088cc] transition-all duration-300 group"
                                >
                                    <span>START EARNING</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}