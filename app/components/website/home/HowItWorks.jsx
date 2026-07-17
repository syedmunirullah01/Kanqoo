"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
    TrendingUp, 
    Coins, 
    ShieldCheck, 
    Globe, 
    Sparkles, 
    Sliders 
} from 'lucide-react';

export default function HowItWorks() {
    const features = [
        {
            icon: TrendingUp,
            title: "Real-Time Tracking",
            description: "Monitor and analyze performance, clicks, conversions, and earnings instantly using our advanced tracking system for precise insights and data-driven growth.",
        },
        {
            icon: Coins,
            title: "Smart Payments",
            description: "Get fast, secure, and automated payouts with multiple withdrawal options, ensuring hassle-free transactions and reliable payments for your earnings.",
        },
        {
            icon: ShieldCheck,
            title: "Brand Protection",
            description: "Ensures only verified, high-intent traffic by preventing fraud, blocking bot activity, and eliminating low-quality leads to protect advertiser investments.",
        },
        {
            icon: Globe,
            title: "Global Reach",
            description: "Expand your business by connecting with premium advertisers and high-quality publishers worldwide using our advanced Partner Finder for growth.",
        },
        {
            icon: Sparkles,
            title: "AI-Powered Reporting",
            description: "Leverage AI-driven analytics to gain deep insights, enhance decision-making, and optimize campaigns for higher efficiency and improved performance.",
        },
        {
            icon: Sliders,
            title: "Manage Seamlessly",
            description: "Effortlessly onboard, communicate, and optimize partnerships with powerful tools for collaboration, reporting, and automated management.",
        }
    ];

    return (
        <section className="relative py-24 sm:py-32 px-6 bg-[#FAFBFD] overflow-hidden border-t border-slate-100">
            
            {/* Technical grid overlay */}
            <div 
                aria-hidden="true" 
                className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.012)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_85%,transparent_100%)] pointer-events-none"
            />

            {/* Subtle ambient glows */}
            <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.02),transparent_70%)] blur-3xl pointer-events-none" />
            <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(75,164,180,0.03),transparent_70%)] blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-16 sm:mb-20 max-w-3xl text-left">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#5e6b7e] block font-sans">
                        KEY FEATURES
                    </span>
                    <div className="w-12 h-1 bg-[#4BA4B4] rounded-full mt-2 mb-4" />
                    <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#0F172A] tracking-tight leading-[1.12] font-sans">
                        Powerful features to scale your Success.
                    </h2>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                whileHover={{ 
                                    y: -6, 
                                    scale: 1.01,
                                    transition: { duration: 0.2, ease: "easeOut" }
                                }}
                                className="group relative bg-white border border-dashed border-slate-300 rounded-[28px] p-8 sm:p-9 flex flex-col justify-between overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:border-slate-400 hover:shadow-[0_20px_50px_rgba(15,23,42,0.04)] cursor-pointer transition-all duration-300"
                            >
                                {/* Light green/yellow glow inside card on hover */}
                                <div className="absolute -bottom-24 -right-24 w-52 h-52 bg-gradient-to-br from-emerald-100/10 via-yellow-100/10 to-teal-100/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                
                                <div>
                                    {/* Icon Container */}
                                    <div className="w-12 h-12 rounded-[16px] bg-slate-50 border border-slate-100/80 flex items-center justify-center text-slate-800 group-hover:text-blue-600 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all duration-300 mb-6">
                                        <Icon className="w-5 h-5 stroke-[1.8]" />
                                    </div>

                                    {/* Feature Title */}
                                    <h3 className="text-xl sm:text-[22px] font-bold text-[#0F172A] tracking-tight mb-3 transition-colors duration-300 group-hover:text-blue-600 font-sans">
                                        {feature.title}
                                    </h3>

                                    {/* Feature Description */}
                                    <p className="text-slate-500 text-[14.5px] sm:text-base leading-relaxed font-medium font-sans">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}