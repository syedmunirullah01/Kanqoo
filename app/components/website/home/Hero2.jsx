"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

export default function Hero2() {
    const words = ["Affiliates.", "Creators.", "Brands.", "Publishers.", "Referrals."];
    const [index, setIndex] = useState(0);

    // Headline rotation cycle
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3200);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-[#05070F] via-[#0A1128] to-[#12224A] text-white flex flex-col items-center justify-center pt-36 pb-40 lg:pt-44 lg:pb-48">

            {/* Grid overlay for a professional technical texture */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] pointer-events-none"
            />

            {/* Subtle ambient glows centered around text area */}
            <div className="absolute top-[10%] left-[20%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_60%)] blur-3xl pointer-events-none" />
            <div className="absolute bottom-[15%] right-[20%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_60%)] blur-3xl pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full z-10 flex flex-col items-center text-center">

                {/* Upper tag statement */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-400 mb-6 font-sans bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20"
                >
                    The Unified Partnership Economy
                </motion.div>

                {/* Title with rotating animation */}
                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl sm:text-7xl lg:text-[80px] font-black text-white leading-[1.08] tracking-tight font-sans max-w-6xl"
                >
                    The leading partnership platform to track, automate, and scale your{" "}
                    <span className="text-[#3b82f6] inline-block relative text-left min-w-[260px] sm:min-w-[430px] h-[1.15em] align-bottom">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={words[index]}
                                initial={{ y: 25, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -25, opacity: 0 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                                className="absolute left-0 text-[#3b82f6] font-extrabold w-full"
                            >
                                {words[index]}
                            </motion.span>
                        </AnimatePresence>
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-8 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-medium"
                >
                    Connect leading brands with high-performance creators, affiliates, and publishers. Drive enterprise-grade growth, automate recruiter workflows, and run seamless global payouts on a single integrated ecosystem.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center w-full sm:w-auto"
                >
                    <Link
                        href="/register?type=demo"
                        className="w-full sm:w-auto px-10 py-4 bg-[#0C0B14]/80 hover:bg-black text-white font-bold rounded-full shadow-lg border border-white/10 transition-all duration-300 hover:shadow-black/25 transform hover:-translate-y-0.5 text-sm text-center"
                    >
                        Request a demo
                    </Link>
                    <Link
                        href="/register"
                        className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 hover:from-blue-700 hover:via-blue-600 hover:to-indigo-600 text-white font-bold rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 text-sm text-center"
                    >
                        Get started now
                    </Link>
                </motion.div>

            </div>

            {/* Brand Logo Infinite Marquee Ticker */}
            <div className="absolute bottom-0 left-0 w-full border-t border-white/5 bg-slate-950/40 py-8 overflow-hidden z-10">
                <div className="max-w-7xl mx-auto px-6 text-center mb-6">
                    <p className="text-xs sm:text-sm lg:text-[20px] font-bold text-slate-300 uppercase tracking-widest">
                        Trusted by 30K+ brands and 1M+ partners worldwide
                    </p>
                </div>

                <div className="relative w-full overflow-hidden flex py-2">
                    <div className="flex animate-marquee-loop w-max shrink-0 text-slate-400 font-black text-2xl sm:text-4xl lg:text-[25px] uppercase tracking-widest">

                        {/* Set 1 */}
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Aviya Mattress</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Hume Health</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Jackery</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Sol De Janeiro</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Tymo Beauty</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Ape Born Fitness</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Red Magic</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Pulsetto</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Laifen</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Anta</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Foxy Locks</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Ulike</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Tenways</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Ugreen</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Bluetti</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Ritfit</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Pooch and Mutt</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Xlaserlab</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Aidous</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Akko</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Lit Farms</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Ihoverboard</span>

                        {/* Set 2 (Duplicated for seamless loop) */}
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Aviya Mattress</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Hume Health</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Jackery</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Sol De Janeiro</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Tymo Beauty</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Ape Born Fitness</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Red Magic</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Pulsetto</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Laifen</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Anta</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Foxy Locks</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Ulike</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Tenways</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Ugreen</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Bluetti</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Ritfit</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Pooch and Mutt</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Xlaserlab</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Aidous</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Akko</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Lit Farms</span>
                        <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-24 shrink-0"><span className="text-[#3b82f6]/40">✦</span> Ihoverboard</span>

                    </div>
                </div>

                <style jsx>{`
                    .animate-marquee-loop {
                        display: flex;
                        width: max-content;
                        animation: marquee 45s linear infinite;
                    }
                    @keyframes marquee {
                        0% { transform: translate3d(0, 0, 0); }
                        100% { transform: translate3d(-50%, 0, 0); }
                    }
                `}</style>
            </div>
        </section>
    );
}
