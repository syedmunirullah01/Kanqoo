"use client";

import React from 'react';
import { ShieldX, AlertCircle, CheckCircle2, Lock } from 'lucide-react';

const antiFraudCards = [
  {
    title: 'Zero-Tolerance Policy',
    items: [
      'Kanqoo enforces a strict zero-tolerance policy against fraudulent traffic, click spamming, and deceptive conversions.',
      'Our primary goal is to ensure valid ROI for brand advertisers and fair rewards for legitimate publishers.',
      'Any publisher attempting to generate fake activity will be permanently banned from the network.'
    ]
  },
  {
    title: 'Prohibited Practices',
    items: [
      'Automated bot traffic, click farms, or incentivized conversions without advertiser permission.',
      'Cookie stuffing, forced pop-unders, or hidden iframe tracking triggers.',
      'Misrepresenting product offers, fake lead forms, or using stolen payment credentials.'
    ]
  },
  {
    title: 'Detection & Monitoring',
    items: [
      'Proprietary machine learning filters analyzing IP reputation, conversion speed, and click-to-conversion rates.',
      'Server-side validation and multi-point device fingerprinting for referral attribution.',
      'Manual reviews conducted prior to monthly payout distributions.'
    ]
  },
  {
    title: 'Enforcement & Legal Action',
    items: [
      'Immediate freezing of suspicious accounts and clawback of illegally generated commissions.',
      'Permanent blacklisting of associated domain names, IP subnets, and payment details.',
      'Referral of severe fraud cases to law enforcement agencies and civil litigation where appropriate.'
    ]
  }
];

export default function AntiFraudSection() {
  return (
    <div className="bg-[#FAFBFD] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Badge */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
            <ShieldX className="w-6 h-6" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Anti-Fraud Policy
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Zero-tolerance fraud protection, traffic validation, and security protocols on Kanqoo.
          </p>
        </div>

        {/* Cards Stack */}
        <div className="space-y-6 mb-12">
          {antiFraudCards.map((card, idx) => (
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
          <Lock className="w-5 h-5 text-indigo-600 shrink-0" />
          <p className="text-xs sm:text-sm text-indigo-950 font-medium">
            Report suspicious fraud or traffic anomalies to{' '}
            <a href="mailto:security@kanqoo.com" className="text-indigo-600 underline font-semibold hover:text-indigo-800">
              security@kanqoo.com
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
