"use client";
import { useState } from 'react';
import { CheckCircle, ArrowRight, Users, Link2, BarChart3, CreditCard, Zap, Shield } from 'lucide-react';

export default function SocialProcess() {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            number: "01",
            title: "Register on ConvertSocial",
            description: "Create your account in under 2 minutes",
            icon: Users,
            color: "from-[#4BA4B4] to-[#4BA4B4]/80"
        },
        {
            number: "02",
            title: "Add Your Social Profiles",
            description: "Connect your YouTube, Instagram, and other platforms",
            icon: Link2,
            color: "from-[#B45B4B] to-[#B45B4B]/80"
        },
        {
            number: "03",
            title: "Generate Referral Links",
            description: "Select products and get your unique tracking links",
            icon: Zap,
            color: "from-[#4BA4B4] to-[#B45B4B]"
        },
        {
            number: "04",
            title: "Share with Your Audience",
            description: "Post recommendations with your custom links",
            icon: BarChart3,
            color: "from-[#B45B4B] to-[#4BA4B4]"
        },
        {
            number: "05",
            title: "Track Real-time Results",
            description: "Monitor clicks, conversions, and earnings instantly",
            icon: BarChart3,
            color: "from-[#4BA4B4] to-[#4BA4B4]/80"
        },
        {
            number: "06",
            title: "Withdraw Your Earnings",
            description: "Get paid directly to your preferred payment method",
            icon: CreditCard,
            color: "from-[#B45B4B] to-[#B45B4B]/80"
        }
    ];

    return (
        <section className="relative bg-gradient-to-br from-[#18182f] via-[#1a1a35] to-[#2d2d5a] py-20 px-4 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 right-10 w-80 h-80 bg-[#4BA4B4]/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#B45B4B]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight unbounded-600">
                        ConvertSocial is
                        <span className="block bg-gradient-to-r from-[#4BA4B4] to-[#B45B4B] bg-clip-text text-transparent">
                            Few Clicks Away
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Start earning from your social media influence in just 6 simple steps
                    </p>
                </div>

                {/* Process Steps */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10 hover:border-[#4BA4B4]/30 transition-all duration-500 hover:shadow-xl"
                            onMouseEnter={() => setActiveStep(index)}
                        >
                            {/* Step Number */}
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                    <span className="text-white font-bold text-lg unbounded-600">{step.number}</span>
                                </div>
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <step.icon className="w-6 h-6 text-[#4BA4B4]" />
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-white mb-3 unbounded-600">
                                {step.title}
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                {step.description}
                            </p>

                            {/* Progress Line */}
                            {index < steps.length - 1 && (
                                <div className="absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#4BA4B4] to-[#B45B4B] opacity-30 group-hover:opacity-100 transition-opacity duration-300 hidden xl:block"></div>
                            )}

                            {/* Hover Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#4BA4B4]/5 to-[#B45B4B]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10">
                        <CheckCircle className="w-6 h-6 text-[#4BA4B4]" />
                        <span className="text-white font-semibold">No upfront costs • Instant approval • 24/7 support</span>
                    </div>
                    
                    <button className="btn-gradient group mt-8 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3 mx-auto">
                        <span>Start Your Journey Now</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </div>
            </div>
        </section>
    );
}