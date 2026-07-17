"use client";
import { Star, Zap, Rocket, Crown, Shield, CheckCircle, ArrowRight, Play, Users, TrendingUp } from 'lucide-react';

export default function CreatorFreedom() {
    const creatorFeatures = [
        {
            icon: Crown,
            title: "Complete Creative Freedom",
            description: "Promote only the brands you genuinely love and believe in",
            highlights: ["Choose your niche", "Authentic content only", "No forced promotions"],
            color: "border-l-[#4BA4B4]"
        },
        {
            icon: Zap,
            title: "Instant Brand Access",
            description: "Immediate entry to 100,000+ brands waiting for creators like you",
            highlights: ["No approval wait", "All categories", "Global brands"],
            color: "border-l-[#B45B4B]"
        },
        {
            icon: Rocket,
            title: "Start Earning Immediately",
            description: "Go from signup to earnings in less than 5 minutes",
            highlights: ["2-minute setup", "Same-day payments", "No minimum threshold"],
            color: "border-l-[#4BA4B4]"
        }
    ];

    const quickStats = [
        { icon: Users, value: "100,000+", label: "Brands Ready" },
        { icon: TrendingUp, value: "50,000+", label: "Active Creators" },
        { icon: Zap, value: "2 Minutes", label: "Average Setup" },
        { icon: Shield, value: "24/7", label: "Support" }
    ];

    return (
        <section className="relative bg-gradient-to-br from-[#0f0f1f] via-[#18182f] to-[#252545] py-20 px-4 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Geometric Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-full h-full"
                        style={{
                            backgroundImage: `radial-gradient(circle at 25% 25%, #4BA4B4 2px, transparent 2px)`,
                            backgroundSize: '50px 50px'
                        }}>
                    </div>
                </div>

                {/* Animated Orbs */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-[#4BA4B4]/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#B45B4B]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

                {/* Floating Shapes */}
                <div className="absolute top-40 right-40 w-8 h-8 border-2 border-[#4BA4B4]/30 rounded-lg animate-float"></div>
                <div className="absolute bottom-40 left-40 w-6 h-6 border-2 border-[#B45B4B]/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight unbounded-600">
                        Create Freely,
                        <span className="block bg-gradient-to-r from-[#4BA4B4] via-[#B45B4B] to-[#4BA4B4] bg-clip-text text-transparent">
                            Earn Consistently
                        </span>
                    </h2>

                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Your platform, your rules. Maintain complete creative control while building sustainable income
                        with brands that align with your values.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
                    {/* Left Side - Visual Emphasis */}
                    <div className="relative">
                        {/* Main Feature Card */}
                        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-[#4BA4B4] to-[#B45B4B] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <Crown className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-3 unbounded-600">
                                    Your Voice, Your Choice
                                </h3>
                                <p className="text-gray-300">
                                    Only promote what you genuinely believe in. No forced content, no compromises.
                                </p>
                            </div>

                            {/* Feature Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "Brand Selection", value: "100% You" },
                                    { label: "Content Style", value: "Authentic" },
                                    { label: "Posting Schedule", value: "Flexible" },
                                    { label: "Earning Potential", value: "Unlimited" }
                                ].map((item, index) => (
                                    <div key={index} className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                                        <div className="text-sm text-gray-400 mb-1">{item.label}</div>
                                        <div className="text-lg font-bold text-white">{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Floating Stats */}
                        <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-[#B45B4B] to-[#4BA4B4] rounded-2xl p-6 shadow-2xl">
                            <div className="text-center text-white">
                                <div className="text-2xl font-black mb-1 unbounded-600">5min</div>
                                <div className="text-sm opacity-90">Setup Time</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Features List */}
                    <div className="space-y-6">
                        {creatorFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className={`bg-white/5 backdrop-blur-md rounded-2xl p-6 border-l-4 ${feature.color} border border-white/10 hover:border-white/20 transition-all duration-500 group hover:translate-x-2`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                        <feature.icon className="w-6 h-6 text-[#4BA4B4]" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-2 unbounded-600">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-300 mb-3 leading-relaxed">
                                            {feature.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {feature.highlights.map((highlight, idx) => (
                                                <span
                                                    key={idx}
                                                    className="inline-flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full text-sm text-gray-300 border border-white/10"
                                                >
                                                    <CheckCircle className="w-3 h-3 text-[#B45B4B]" />
                                                    {highlight}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {quickStats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white/5 backdrop-blur-md rounded-2xl p-6 text-center border border-white/10 hover:border-[#4BA4B4]/30 transition-all duration-300 group"
                        >
                            <div className="flex justify-center mb-3">
                                <div className="p-2 bg-gradient-to-br from-[#4BA4B4] to-[#B45B4B] rounded-lg group-hover:scale-110 transition-transform duration-300">
                                    <stat.icon className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <div className="text-2xl font-black text-white mb-1 unbounded-600">
                                {stat.value}
                            </div>
                            <div className="text-gray-300 text-sm font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center">
                    <div className="bg-gradient-to-r from-[#4BA4B4]/10 to-[#B45B4B]/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4BA4B4] via-[#B45B4B] to-[#4BA4B4]"></div>

                        <h3 className="text-2xl md:text-4xl font-black text-white mb-4 unbounded-600">
                            Ready to Monetize Your Authenticity?
                        </h3>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                            Join creators who are building real income while staying true to their content and values.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button className="btn-gradient group text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3">
                                <Play className="w-5 h-5" />
                                Start Creating & Earning
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>

                            <button className="border-2 border-white/20 hover:border-white/30 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 backdrop-blur-sm hover:bg-white/5">
                                See Creator Stories
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap justify-center items-center gap-6 mt-8 pt-6 border-t border-white/10">
                            {[
                                "No content restrictions",
                                "Weekly payments",
                                "24/7 support",
                                "Free forever"
                            ].map((badge, index) => (
                                <div key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                                    <CheckCircle className="w-4 h-4 text-[#4BA4B4]" />
                                    {badge}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}