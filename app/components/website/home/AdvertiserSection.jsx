"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, ShieldAlert, Sparkles, Award } from 'lucide-react';

export default function AdvertiserSection() {
  const [hoveredBar, setHoveredBar] = useState(null);

  const salesData = [
    { day: "M", sales: "$2,400", height: 40 },
    { day: "T", sales: "$3,800", height: 70 },
    { day: "W", sales: "$3,100", height: 55 },
    { day: "T", sales: "$4,900", height: 95 },
    { day: "F", sales: "$4,200", height: 80 },
    { day: "S", sales: "$5,800", height: 110 }
  ];

  const activeSales = hoveredBar !== null ? salesData[hoveredBar].sales : "$4,200";
  const activeDay = hoveredBar !== null ? salesData[hoveredBar].day : "Friday";

  const features = [
    {
      title: "Elite Publisher Network",
      desc: "Connect directly with pre-vetted creators, coupon distributors, and high-impact media partners."
    },
    {
      title: "Real-Time ROI & Conversion Tracking",
      desc: "Track every conversion, CPA, and ROAS with pixel-perfect precision on our custom dashboard."
    },
    {
      title: "AI Fraud Prevention Shield",
      desc: "Automatically filter out click spamming, cookie stuffing, and bots to ensure 100% genuine leads."
    }
  ];

  const topPublishers = [
    { handle: "@beckstammond", sales: "242 sales", rank: "Top 1" },
    { handle: "@megjacks", sales: "185 sales", rank: "Top 2" }
  ];

  return (
    <section className="bg-slate-100/50 py-24 sm:py-28 px-6 overflow-hidden border-t border-slate-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
        
        {/* Left Column: High-Converting Text Copy & Checks */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-indigo-50/80 rounded-full px-4.5 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 mb-6 ring-1 ring-indigo-100/50 font-sans">
            AFFILIATE NETWORK FOR ADVERTISERS
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-black text-[#0F172A] tracking-tight leading-[1.12] mb-6 font-sans">
            The Smart Choice for<br className="hidden sm:inline" /> <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent">High-Growth Brands</span>
          </h2>

          {/* Subheading */}
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl lg:max-w-none mb-8 font-sans font-medium">
            We are more than just an affiliate network—we are a performance-driven partner. Access elite publisher channels, combat attribution fraud with proprietary AI, and scale your brand's ROI with transparent tracking.
          </p>

          {/* Feature Checks List */}
          <div className="space-y-4 mb-10 text-left w-full max-w-md lg:max-w-none">
            {features.map((feat, i) => (
              <div key={i} className="flex items-start gap-3.5">
                <div className="flex-none w-6 h-6 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center mt-1">
                  <Check className="w-3.5 h-3.5 text-indigo-600 stroke-[3]" />
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
            Start as an Advertiser
          </Link>
        </div>

        {/* Right Column: Symmetrical Interactive Dashboard Mockup */}
        <div className="lg:col-span-6 flex justify-center relative scale-95 sm:scale-100 my-8 sm:my-12 order-1 lg:order-2">
          
          {/* Decorative background grid and shapes */}
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.06),transparent_65%)] blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.04),transparent_65%)] blur-2xl pointer-events-none" />
          
          {/* Concentric spinning line patterns in background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
            <div className="w-[340px] h-[340px] rounded-full border border-dashed border-slate-300 animate-spin [animation-duration:50s]" />
            <div className="w-[240px] h-[240px] absolute rounded-full border border-dashed border-slate-300 animate-spin [animation-duration:25s] [animation-direction:reverse]" />
          </div>

          {/* Card 1: Main Sales Bar Chart */}
          <div className="relative z-20 w-[380px] bg-white rounded-3xl border border-slate-150/80 shadow-[0_20px_50px_rgba(15,23,42,0.08)] p-6 select-none transition-all duration-300 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Sales Volume ({activeDay})
                </span>
                <span className="text-3xl font-black text-slate-800 tracking-tight transition-all duration-200">
                  {activeSales}
                </span>
              </div>
              <div className="flex items-center gap-1 bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
                <span>ROAS: 4.8x</span>
              </div>
            </div>

            {/* Interactive Bar Chart */}
            <div className="flex items-end justify-between h-[150px] mt-6 px-2">
              {salesData.map((data, i) => (
                <div 
                  key={i} 
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* Tooltip */}
                  <div className={`absolute -translate-y-16 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md pointer-events-none transition-opacity duration-150 ${hoveredBar === i ? 'opacity-100' : 'opacity-0'}`}>
                    {data.sales}
                  </div>
                  
                  {/* Bar */}
                  <div 
                    className={`w-8 rounded-t-lg transition-all duration-200 ${hoveredBar === i ? 'bg-gradient-to-t from-blue-600 to-indigo-500 shadow-md' : 'bg-slate-100'}`}
                    style={{ height: `${data.height}px` }}
                  />
                  
                  {/* X Label */}
                  <span className="text-[10px] font-bold text-slate-400 font-sans">{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Left Overlay - AI Fraud Shield Logs */}
          <div className="absolute top-20 -left-8 sm:-left-12 z-30 w-[180px] bg-white rounded-2xl border border-slate-100 shadow-[0_15px_30px_rgba(15,23,42,0.06)] p-4 transform hover:-translate-y-1 transition-all duration-300 select-none">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
              <span>Fraud Shield</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex flex-col gap-0.5 border-l-2 border-emerald-500 pl-2">
                <span className="text-[9px] font-bold text-slate-400 uppercase">11:24:02 AM</span>
                <span className="text-[10px] font-bold text-slate-800 tracking-tight leading-tight">Lead Verified</span>
              </div>
              <div className="flex flex-col gap-0.5 border-l-2 border-red-500 pl-2">
                <span className="text-[9px] font-bold text-slate-400 uppercase">11:22:15 AM</span>
                <span className="text-[10px] font-bold text-red-500 tracking-tight leading-tight">Spam Bot Blocked</span>
              </div>
            </div>
          </div>

          {/* Card 3: Right Overlay - Top Publishers Campaigns list */}
          <div className="absolute -bottom-8 -right-8 sm:-right-12 z-30 w-[160px] bg-white rounded-2xl border border-slate-100 shadow-[0_15px_30px_rgba(15,23,42,0.06)] p-4 transform hover:-translate-y-1 transition-all duration-300 select-none">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Top Partners</span>
            </div>
            
            <div className="space-y-2.5">
              {topPublishers.map((pub, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800 tracking-tight text-[11px]">{pub.handle}</span>
                    <span className="text-[9px] text-slate-400 font-semibold">{pub.sales}</span>
                  </div>
                  <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                    {pub.rank}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
