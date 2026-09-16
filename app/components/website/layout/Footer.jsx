'use client';

import React from 'react';
import { Globe, Mail, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { FaYoutube, FaInstagram, FaTiktok, FaFacebook, FaLinkedin, FaPinterest } from 'react-icons/fa';
import { useSiteSettings } from '@/lib/useSiteSettings';

export default function Footer() {
    const siteSettings = useSiteSettings();
    const siteName = siteSettings.siteName || 'Kanqoo';
    const email = siteSettings.email || 'hello@kanqoo.com';



    return (
        <footer className="relative bg-gradient-to-b from-[#0c1228] via-[#090d1f] to-[#04060f] text-slate-400 overflow-hidden border-t border-slate-800/60 pt-20 pb-12 text-left">

            {/* Subtle grid in background of this section */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-50 z-0" />

            {/* Subtle background glow */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[130px]" />
                <div className="absolute bottom-0 right-1/4 w-[35vw] h-[35vw] rounded-full bg-blue-950/20 blur-[120px]" />
            </div>

            {/* 1. Big branding title background (Watermark) */}
            <div className="w-full text-center select-none pointer-events-none mb-12 relative z-10 overflow-hidden px-4">
                <h2 className="text-[12vw] font-black uppercase tracking-[0.08em] leading-none font-sans inline-block whitespace-nowrap text-white/[0.03]">
                    {siteName}
                </h2>
            </div>

            {/* 2. Social Links Pills Row (Centered horizontally under watermark) */}
            <div className="w-full flex flex-wrap justify-center items-center gap-3 mb-16 border-b border-white/5 pb-12 px-6 relative z-10">
                {[
                    { name: 'Facebook', href: '#', icon: FaFacebook },
                    { name: 'Instagram', href: '#', icon: FaInstagram },
                    { name: 'Tiktok', href: '#', icon: FaTiktok },
                    { name: 'Youtube', href: '#', icon: FaYoutube },
                    { name: 'LinkedIn', href: '#', icon: FaLinkedin },
                    { name: 'Pinterest', href: '#', icon: FaPinterest }
                ].map((s, idx) => {
                    const SocIcon = s.icon;
                    return (
                        <a
                            key={idx}
                            href={s.href}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.02] border border-white/5 hover:border-blue-500/50 hover:bg-[#1A2542] hover:text-white transition-all duration-300 text-xs font-bold text-slate-400 uppercase tracking-wider scale-100 active:scale-95"
                        >
                            <SocIcon className="w-4 h-4" />
                            <span>{s.name}</span>
                        </a>
                    );
                })}
            </div>

            <div className="relative z-10 container mx-auto px-6 max-w-6xl">

                {/* 4 Columns Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 items-stretch mb-16">
                    
                    {/* Column 1: FOR PUBLISHERS */}
                    <div className="lg:col-span-3 space-y-4">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-unbounded">FOR PUBLISHERS</h4>
                        <ul className="space-y-2.5 text-xs font-semibold">
                            <li>
                                <a href="/faqs" className="hover:text-white hover:underline transition-all">
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a href="/creator-tips" className="hover:text-white hover:underline transition-all">
                                    Creator Tips
                                </a>
                            </li>
                            <li>
                                <a href="/publisher-guidelines" className="hover:text-white hover:underline transition-all">
                                    Publisher Guidelines
                                </a>
                            </li>
                            <li>
                                <a href="/publisher-onboarding" className="hover:text-white hover:underline transition-all">
                                    Publisher Onboarding
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: COMPANY */}
                    <div className="lg:col-span-3 space-y-4">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-unbounded">COMPANY</h4>
                        <ul className="space-y-2.5 text-xs font-semibold">
                            <li>
                                <a href="/about-us" className="hover:text-white hover:underline transition-all">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/how-it-works" className="hover:text-white hover:underline transition-all">
                                    How Kanqoo Works
                                </a>
                            </li>
                            <li>
                                <a href="/contact-us" className="hover:text-white hover:underline transition-all">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="/terms-and-conditions" className="hover:text-white hover:underline transition-all">
                                    Terms & Conditions
                                </a>
                            </li>
                            <li>
                                <a href="/privacy-policy" className="hover:text-white hover:underline transition-all">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="/cookie-policy" className="hover:text-white hover:underline transition-all">
                                    Cookie Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: RESOURCES */}
                    <div className="lg:col-span-3 space-y-4">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-unbounded">RESOURCES</h4>
                        <ul className="space-y-2.5 text-xs font-semibold">
                            <li>
                                <a href="/blogs" className="hover:text-white hover:underline transition-all">
                                    Blogs
                                </a>
                            </li>
                            <li>
                                <a href="/imprint" className="hover:text-white hover:underline transition-all">
                                    Imprint
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: COMPLIANCE */}
                    <div className="lg:col-span-3 space-y-4">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-unbounded">COMPLIANCE</h4>
                        <ul className="space-y-2.5 text-xs font-semibold">
                            <li>
                                <a href="/compliance-policy" className="hover:text-white hover:underline transition-all">
                                    Compliance Policy
                                </a>
                            </li>
                            <li>
                                <a href="/anti-fraud-policy" className="hover:text-white hover:underline transition-all">
                                    Anti-Fraud Policy
                                </a>
                            </li>
                            <li>
                                <a href="/traffic-source-policy" className="hover:text-white hover:underline transition-all">
                                    Traffic Source Policy
                                </a>
                            </li>
                            <li>
                                <a href="/subnetwork-disclosure" className="hover:text-white hover:underline transition-all">
                                    Subnetwork Disclosure
                                </a>
                            </li>
                            <li>
                                <a href="/gdpr-data-transparency" className="hover:text-white hover:underline transition-all">
                                    GDPR & Data Transparency
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>



                {/* Bottom Bar Legal Disclaimer Text */}
                <div className="mt-8 text-[10px] text-slate-600 leading-relaxed max-w-5xl font-medium border-t border-white/5 pt-6">
                    © {new Date().getFullYear()}, {siteName} AG. All rights reserved. {siteName} is part of {siteName} Group. No part of this publication may be reproduced, translated, stored in a retrieval system, or transmitted in any form or by any means, electronic, mechanical, photocopying, recording or otherwise, without the prior permission of the copyright owner.
                </div>

            </div>

        </footer>
    );
}
