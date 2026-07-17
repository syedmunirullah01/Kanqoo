"use client";

import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

export default function PartnershipCTA() {
  const features = [
    "No Upfront Cost",
    "Instant Access",
    "Performance-Based Earnings"
  ];

  return (
    <section className="relative py-28 sm:py-32 px-6 bg-gradient-to-r from-[#05070F] via-[#0A1128] to-[#12224A] text-white overflow-hidden border-t border-white/5 flex flex-col items-center justify-center">
      
      {/* 3D Perspective Grid Background (Dark theme variant) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            perspective: '300px',
            perspectiveOrigin: '50% 0%',
          }}
        >
          <div 
            className="w-[200%] h-[200%] absolute left-1/2 top-0 origin-top"
            style={{
              transform: 'translateX(-50%) rotateX(75deg)',
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        {/* Radial gradient mask to fade the grid edges */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0A1128_85%)]" />
      </div>

      {/* Subtle ambient glows */}
      <div className="absolute top-[10%] left-[20%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_60%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-[15%] right-[20%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.04),transparent_60%)] blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl lg:text-[54px] font-black text-white tracking-tight leading-[1.12] mb-6 font-sans">
          Supercharge Your Partnerships.<br />Scale Without Limits.
        </h2>

        {/* Sub-text */}
        <p className="text-slate-300 text-base md:text-[17.5px] leading-relaxed max-w-2xl mx-auto mb-10 font-sans font-medium text-gray-200/95">
          Unlock the ultimate ecosystem where elite brands and top creators collaborate to automate conversions, maximize ROI, and scale revenue on auto-pilot.
        </p>

        {/* Button */}
        <Link
          href="/register"
          className="px-10 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 hover:from-blue-700 hover:via-blue-600 hover:to-indigo-600 text-white font-bold rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95 text-sm text-center tracking-wide mb-14"
        >
          Get Started Today
        </Link>

        {/* Bullet points */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 w-full">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm font-semibold text-slate-200">
              <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center bg-white/5 shadow-sm">
                <Check className="w-3 h-3 text-blue-400 stroke-[3]" />
              </div>
              <span className="font-sans">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
