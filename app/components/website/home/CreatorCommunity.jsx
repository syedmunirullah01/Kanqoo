"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';

export default function CreatorCommunity() {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  
  const chartPoints = [
    { label: "Mon", value: "$1,240", x: 40, y: 130 },
    { label: "Tue", value: "$1,850", x: 100, y: 90 },
    { label: "Wed", value: "$1,520", x: 160, y: 110 },
    { label: "Thu", value: "$2,450", x: 220, y: 50 },
    { label: "Fri", value: "$2,100", x: 280, y: 75 },
    { label: "Sat", value: "$2,900", x: 340, y: 30 }
  ];

  const activeValue = hoveredPoint !== null ? chartPoints[hoveredPoint].value : "$2,100";
  const activeLabel = hoveredPoint !== null ? chartPoints[hoveredPoint].label : "Friday";

  const features = [
    {
      title: "Direct Access to Premium Brands",
      desc: "Partner directly with world-class retailers and premium brands across every major vertical."
    },
    {
      title: "Real-Time Tracking & Attribution",
      desc: "Monitor click-throughs, conversions, and attribution in real-time with pixel-perfect reporting."
    },
    {
      title: "Automated & Flexible Payouts",
      desc: "Receive your earnings on autopilot via PayPal, wire transfer, or local bank accounts with low thresholds."
    }
  ];

  const brandCampaigns = [
    { name: "Nike Store", commission: "8% CPS", logo: "N", bg: "bg-black text-white" },
    { name: "Apple UK", commission: "5% CPS", logo: "A", bg: "bg-slate-100 text-slate-800" },
    { name: "Amazon Network", commission: "Up to 10%", logo: "Z", bg: "bg-amber-100 text-amber-800" }
  ];

  return (
    <section className="bg-white py-24 sm:py-28 px-6 overflow-hidden border-t border-slate-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
        
        {/* Left Column: Interactive Dashboard Mockup */}
        <div className="lg:col-span-6 flex justify-center relative scale-95 sm:scale-100 my-8 sm:my-12">
          
          {/* Decorative background grid and shapes */}
          <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_65%)] blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.04),transparent_65%)] blur-2xl pointer-events-none" />
          
          {/* Concentric spinning line patterns in background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
            <div className="w-[340px] h-[340px] rounded-full border border-dashed border-slate-300 animate-spin [animation-duration:60s]" />
            <div className="w-[240px] h-[240px] absolute rounded-full border border-dashed border-slate-300 animate-spin [animation-duration:30s] [animation-direction:reverse]" />
          </div>

          {/* Card 1: Main Earnings Line Chart */}
          <div className="relative z-20 w-[380px] bg-white rounded-3xl border border-slate-150/80 shadow-[0_20px_50px_rgba(15,23,42,0.08)] p-6 select-none transition-all duration-300 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Revenue ({activeLabel})
                </span>
                <span className="text-3xl font-black text-slate-800 tracking-tight transition-all duration-200">
                  {activeValue}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+24.5%</span>
              </div>
            </div>

            {/* SVG Interactive Line Chart */}
            <div className="relative w-full h-[160px] mt-4">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* SVG Gradients */}
                <defs>
                  <linearGradient id="chart-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#818CF8" />
                  </linearGradient>
                  <linearGradient id="chart-fill-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(37,99,235,0.15)" />
                    <stop offset="100%" stopColor="rgba(37,99,235,0.0)" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                <line x1="0" y1="30" x2="380" y2="30" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="75" x2="380" y2="75" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="120" x2="380" y2="120" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />

                {/* Gradient area under the line */}
                <path d="M 40 130 L 100 90 L 160 110 L 220 50 L 280 75 L 340 30 V 160 H 40 Z" fill="url(#chart-fill-gradient)" />

                {/* Main line path */}
                <path d="M 40 130 L 100 90 L 160 110 L 220 50 L 280 75 L 340 30" fill="none" stroke="url(#chart-line-gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* Interactive Points */}
                {chartPoints.map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredPoint === i ? "6" : "4"}
                    className="cursor-pointer transition-all duration-150"
                    fill={hoveredPoint === i ? "#2563EB" : "#FFFFFF"}
                    stroke="#2563EB"
                    strokeWidth={hoveredPoint === i ? "3" : "2"}
                    onMouseEnter={() => setHoveredPoint(i)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                ))}
              </svg>
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between px-2 mt-2 text-[10px] font-bold text-slate-400 uppercase font-sans">
              {chartPoints.map((pt, i) => (
                <span key={i} className="w-8 text-center">{pt.label}</span>
              ))}
            </div>
          </div>

          {/* Card 2: Left Overlay - Active Campaigns */}
          <div className="absolute -bottom-12 -left-8 sm:-left-12 z-30 w-[190px] bg-white rounded-2xl border border-slate-100 shadow-[0_15px_30px_rgba(15,23,42,0.06)] p-4 transform hover:-translate-y-1 transition-all duration-300 select-none">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Top Offers</span>
            </div>
            
            <div className="space-y-2.5">
              {brandCampaigns.map((camp, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-md ${camp.bg} flex items-center justify-center text-[10px] font-bold`}>
                      {camp.logo}
                    </div>
                    <span className="font-semibold text-slate-800 tracking-tight">{camp.name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#2563EB] bg-blue-50 px-1.5 py-0.5 rounded">
                    {camp.commission}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Right Overlay - Payment Status Circular Progress */}
          <div className="absolute top-24 -right-8 sm:-right-12 z-30 w-[150px] bg-white rounded-2xl border border-slate-100 shadow-[0_15px_30px_rgba(15,23,42,0.06)] p-4 text-center transform hover:-translate-y-1 transition-all duration-300 select-none">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Verification</span>
            </div>
            
            {/* Circular Progress Gauge */}
            <div className="relative w-16 h-16 mx-auto mb-2 flex items-center justify-center">
              <svg className="w-full h-full rotate-[-90deg]">
                <circle cx="32" cy="32" r="26" stroke="#F1F5F9" strokeWidth="4.5" fill="transparent" />
                <circle cx="32" cy="32" r="26" stroke="#22C55E" strokeWidth="4.5" fill="transparent" strokeDasharray="163" strokeDashoffset="24.5" strokeLinecap="round" />
              </svg>
              <span className="absolute text-xs font-black text-slate-800">85%</span>
            </div>
            
            <span className="text-[10px] font-bold text-slate-400 uppercase block leading-none">
              Account Ready
            </span>
          </div>
        </div>

        {/* Right Column: High-Converting Text Copy & Checks */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-50/80 rounded-full px-4.5 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 mb-6 ring-1 ring-blue-100/50 font-sans">
            MONETIZATION PLATFORM FOR PUBLISHERS
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-black text-[#0F172A] tracking-tight leading-[1.12] mb-6 font-sans">
            Monetize Your Audience.<br className="hidden sm:inline" /> <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Scale Without Limits.</span>
          </h2>

          {/* Subheading */}
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl lg:max-w-none mb-8 font-sans font-medium">
            Unlock sustainable revenue streams by connecting your traffic, community, or media channels with premium global brands. Leverage high-converting offers, instant deep-link creation, and transparent analytics on an all-in-one monetization suite designed for growth.
          </p>

          {/* Feature Checks List */}
          <div className="space-y-4 mb-10 text-left w-full max-w-md lg:max-w-none">
            {features.map((feat, i) => (
              <div key={i} className="flex items-start gap-3.5">
                <div className="flex-none w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mt-1">
                  <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#0F172A] tracking-tight mb-0.5 font-sans">
                    {feat.title}
                  </h4>
                  <p className="text-sm text-slate-500 font-medium font-sans leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <Link
            href="/register"
            className="px-10 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 hover:from-blue-700 hover:via-blue-600 hover:to-indigo-600 text-white font-bold rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95 text-sm tracking-wide text-center"
          >
            Start as a Publisher
          </Link>
        </div>
      </div>
    </section>
  );
}