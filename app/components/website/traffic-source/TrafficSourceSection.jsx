"use client";

import React from 'react';
import { Route, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const trafficCards = [
  {
    title: 'Approved Traffic Channels',
    items: [
      'Niche content websites, blogs, and product review platforms.',
      'Verified social media accounts (Instagram, TikTok, YouTube, Facebook, LinkedIn, Pinterest).',
      'Opt-in email newsletters with explicit subscriber consent.',
      'Deal, coupon, and cashback sites (where permitted by advertiser terms).',
      'Organic Search Engine Optimization (SEO) traffic.'
    ]
  },
  {
    title: 'Restricted Traffic (Requires Prior Approval)',
    items: [
      'Pay-Per-Click (PPC) and search engine marketing targeting brand names or trademarks.',
      'Paid social media ad campaigns driving direct traffic to affiliate links.',
      'Sub-networks or third-party broker traffic distribution.'
    ]
  },
  {
    title: 'Strictly Prohibited Traffic',
    items: [
      'Unsolicited bulk email spam, SMS spam, or unauthorized messaging.',
      'Malware, adware, browser toolbar injection, or typosquatting domains.',
      'Adult content, gambling platforms, hate speech, or illicit distribution channels.',
      'Incentivized traffic (cash-for-clicks) unless specifically allowed in campaign terms.'
    ]
  }
];

export default function TrafficSourceSection() {
  return (
    <div className="bg-[#FAFBFD] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Badge */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
            <Route className="w-6 h-6" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Traffic Source Policy
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Approved promotional channels, forbidden traffic types, and publisher traffic guidelines on Kanqoo.
          </p>
        </div>

        {/* Cards Stack */}
        <div className="space-y-6 mb-12">
          {trafficCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[20px] p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200"
            >
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
                {card.title}
              </h2>
              <ul className="space-y-3">
                {card.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                    <span className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-indigo-50/70 border border-indigo-100/80 rounded-[16px] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
          <AlertCircle className="w-5 h-5 text-indigo-600 shrink-0" />
          <p className="text-xs sm:text-sm text-indigo-950 font-medium">
            Publishers must register all promotional channels inside their Kanqoo dashboard prior to launching campaigns.
          </p>
        </div>

      </div>
    </div>
  );
}
