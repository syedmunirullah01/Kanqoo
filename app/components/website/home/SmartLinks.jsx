"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Megaphone, 
  Laptop, 
  Tag, 
  Video, 
  Star, 
  Share2 
} from 'lucide-react';

export default function SmartLinks() {
  const leftChannels = [
    {
      id: "influencers",
      label: "Influencers",
      icon: Megaphone,
      x: 40,
      y: 30,
      iconBg: "bg-blue-50/50 text-blue-500",
    },
    {
      id: "bloggers",
      label: "Bloggers",
      icon: Laptop,
      x: 60,
      y: 190,
      iconBg: "bg-purple-50/50 text-purple-500",
    },
    {
      id: "coupons",
      label: "Coupon Distributors",
      icon: Tag,
      x: 40,
      y: 350,
      iconBg: "bg-emerald-50/50 text-emerald-500",
    }
  ];

  const rightChannels = [
    {
      id: "creators",
      label: "Content Creators",
      icon: Video,
      x: 940,
      y: 30,
      iconBg: "bg-pink-50/50 text-pink-500",
    },
    {
      id: "reviewers",
      label: "Brand Reviewers",
      icon: Star,
      x: 920,
      y: 190,
      iconBg: "bg-amber-50/50 text-amber-500",
    },
    {
      id: "marketers",
      label: "Social Marketers",
      icon: Share2,
      x: 940,
      y: 350,
      iconBg: "bg-indigo-50/50 text-indigo-500",
    }
  ];

  const allChannels = [...leftChannels, ...rightChannels];

  return (
    <section className="bg-white py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12 max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-blue-50/80 rounded-full px-4.5 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 mb-5 ring-1 ring-blue-100/50 font-sans">
            THE PARTNERSHIP ENGINE
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#0F172A] tracking-tight leading-[1.12] mb-6 font-sans">
            One Unified Network. <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Infinite Scale.</span>
          </h2>
          <p className="text-slate-600 text-lg sm:text-[20px] leading-relaxed font-medium font-sans max-w-3xl mx-auto">
            We bridge the gap between premium brands and the world's most diverse publisher channels. From viral influencers to elite review sites, Kanqoo is the central engine that drives high-converting partnerships.
          </p>
        </div>

        {/* Action Button */}
        <Link
          href="/register"
          className="px-10 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 hover:from-blue-700 hover:via-blue-600 hover:to-indigo-600 text-white font-bold rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95 text-sm tracking-wide mb-16"
        >
          Get Started Now
        </Link>

        {/* Interactive Visual Network Diagram (Desktop) */}
        <div className="hidden lg:block relative w-[1100px] h-[460px] mx-auto select-none">
          
          {/* SVG Connecting Paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            {/* Background static lines (Darker Slate color for high visibility) */}
            {/* Left paths */}
            <path d="M 478 230 H 350 V 70 H 140" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="4 4" className="opacity-40" />
            <path d="M 478 230 H 160" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="4 4" className="opacity-40" />
            <path d="M 478 230 H 350 V 390 H 140" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="4 4" className="opacity-40" />

            {/* Right paths */}
            <path d="M 622 230 H 750 V 70 H 960" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="4 4" className="opacity-40" />
            <path d="M 622 230 H 940" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="4 4" className="opacity-40" />
            <path d="M 622 230 H 750 V 390 H 960" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="4 4" className="opacity-40" />

            {/* Glowing Flowing overlay lines (flowing from Center to circles) */}
            {/* Left flows */}
            <path d="M 478 230 H 350 V 70 H 140" fill="none" stroke="url(#blue-gradient)" strokeWidth="3" className="animate-svg-flow-left" strokeLinecap="round" />
            <path d="M 478 230 H 160" fill="none" stroke="url(#blue-gradient)" strokeWidth="3" className="animate-svg-flow-left" strokeLinecap="round" />
            <path d="M 478 230 H 350 V 390 H 140" fill="none" stroke="url(#blue-gradient)" strokeWidth="3" className="animate-svg-flow-left" strokeLinecap="round" />

            {/* Right flows */}
            <path d="M 622 230 H 750 V 70 H 960" fill="none" stroke="url(#blue-gradient)" strokeWidth="3" className="animate-svg-flow-right" strokeLinecap="round" />
            <path d="M 622 230 H 940" fill="none" stroke="url(#blue-gradient)" strokeWidth="3" className="animate-svg-flow-right" strokeLinecap="round" />
            <path d="M 622 230 H 750 V 390 H 960" fill="none" stroke="url(#blue-gradient)" strokeWidth="3" className="animate-svg-flow-right" strokeLinecap="round" />

            {/* Gradients */}
            <defs>
              <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Glowing Hub/Junction Dots */}
          {/* Left Hubs */}
          <div className="absolute left-[346px] top-[66px] w-2 h-2 bg-[#2563EB] rounded-full shadow-[0_0_8px_#3b82f6] animate-pulse" />
          <div className="absolute left-[346px] top-[386px] w-2 h-2 bg-[#2563EB] rounded-full shadow-[0_0_8px_#3b82f6] animate-pulse" />
          <div className="absolute left-[346px] top-[226px] w-2 h-2 bg-[#2563EB] rounded-full shadow-[0_0_8px_#3b82f6] animate-pulse" />

          {/* Right Hubs */}
          <div className="absolute left-[746px] top-[66px] w-2 h-2 bg-[#2563EB] rounded-full shadow-[0_0_8px_#3b82f6] animate-pulse" />
          <div className="absolute left-[746px] top-[386px] w-2 h-2 bg-[#2563EB] rounded-full shadow-[0_0_8px_#3b82f6] animate-pulse" />
          <div className="absolute left-[746px] top-[226px] w-2 h-2 bg-[#2563EB] rounded-full shadow-[0_0_8px_#3b82f6] animate-pulse" />

          {/* Center Hub */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
            {/* Outer breathing glow */}
            <div className="absolute w-44 h-44 rounded-full bg-blue-100/20 border border-blue-200/50 animate-ping [animation-duration:3s]" />
            {/* Inner styled hub */}
            <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-200/80 shadow-[0_0_30px_rgba(37,99,235,0.12)] flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-[#2563EB] font-sans tracking-tight">
                kanqoo
              </span>
            </div>
          </div>

          {/* Left Column Nodes */}
          {leftChannels.map((node) => {
            const Icon = node.icon;
            return (
              <div 
                key={node.id} 
                className="absolute flex flex-col items-center gap-2 group cursor-pointer"
                style={{ left: `${node.x}px`, top: `${node.y}px`, width: "120px" }}
              >
                <div className="relative w-20 h-20 rounded-full border border-dashed border-slate-400 hover:border-blue-500 flex items-center justify-center transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-white shadow-[0_8px_25px_rgba(15,23,42,0.06)] border border-slate-200 flex items-center justify-center text-slate-700 group-hover:scale-105 transition-all duration-300">
                    <div className={`w-12 h-12 rounded-full ${node.iconBg} flex items-center justify-center`}>
                      <Icon className="w-5.5 h-5.5 stroke-[1.8]" />
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#5e6b7e] font-sans tracking-wide text-center">
                  {node.label}
                </span>
              </div>
            );
          })}

          {/* Right Column Nodes */}
          {rightChannels.map((node) => {
            const Icon = node.icon;
            return (
              <div 
                key={node.id} 
                className="absolute flex flex-col items-center gap-2 group cursor-pointer"
                style={{ left: `${node.x}px`, top: `${node.y}px`, width: "120px" }}
              >
                <div className="relative w-20 h-20 rounded-full border border-dashed border-slate-400 hover:border-blue-500 flex items-center justify-center transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-white shadow-[0_8px_25px_rgba(15,23,42,0.06)] border border-slate-200 flex items-center justify-center text-slate-700 group-hover:scale-105 transition-all duration-300">
                    <div className={`w-12 h-12 rounded-full ${node.iconBg} flex items-center justify-center`}>
                      <Icon className="w-5.5 h-5.5 stroke-[1.8]" />
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#5e6b7e] font-sans tracking-wide text-center">
                  {node.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden w-full flex flex-col items-center gap-8">
          {/* Center Hub */}
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-200/80 shadow-[0_0_20px_rgba(37,99,235,0.12)] flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold text-[#2563EB] font-sans tracking-tight">
              kanqoo
            </span>
          </div>

          {/* Grid Layout of Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full max-w-md sm:max-w-2xl px-4">
            {allChannels.map((node) => {
              const Icon = node.icon;
              return (
                <div key={node.id} className="flex flex-col items-center gap-2 bg-slate-50/50 border border-slate-100 rounded-2xl p-4 text-center">
                  <div className={`w-12 h-12 rounded-full ${node.iconBg} flex items-center justify-center mb-2`}>
                    <Icon className="w-5.5 h-5.5 stroke-[1.8]" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 font-sans tracking-wide">
                    {node.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Global CSS for Network Flows */}
      <style jsx>{`
        @keyframes flowLeft {
          from {
            stroke-dashoffset: -80;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes flowRight {
          from {
            stroke-dashoffset: 80;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-svg-flow-left {
          stroke-dasharray: 12 36;
          animation: flowLeft 2s linear infinite;
        }
        .animate-svg-flow-right {
          stroke-dasharray: 12 36;
          animation: flowRight 2s linear infinite;
        }
      `}</style>
    </section>
  );
}