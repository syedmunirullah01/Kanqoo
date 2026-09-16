"use client";

import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';

const steps = [
  {
    step: 'Step 1: Publisher Onboarding',
    description: 'Publishers register and are reviewed based on traffic quality and promotional methods. Approved publishers get campaign access.'
  },
  {
    step: 'Step 2: Campaign Access',
    description: 'Publishers browse offers matching their audience. Each campaign includes guidelines, tracking rules, and promotional requirements.'
  },
  {
    step: 'Step 3: Promotion',
    description: 'Offers are promoted through approved methods like content sites, social media, SEO, consent-based email, and coupon platforms.'
  },
  {
    step: 'Step 4: Tracking System',
    description: 'Our tracking records clicks, conversions, traffic sources, and publisher attribution using unique tracking parameters.'
  },
  {
    step: 'Step 5: Earnings and Reporting',
    description: 'After network validation, commissions are attributed to publishers. Performance is visible in reporting dashboards.'
  }
];

const ourRoleItems = [
  'Connect publishers with affiliate programs.',
  'Manage tracking and attribution.',
  'Ensure policy compliance.',
  'Support performance monitoring.'
];

export default function HowItWorksSection() {
  return (
    <div className="bg-[#FAFBFD] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Badge */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            How Kanqoo Works
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Kanqoo is a subnetwork platform connecting publishers with affiliate opportunities from advertisers and networks.
          </p>
        </div>

        {/* Steps Stack */}
        <div className="space-y-6 mb-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[20px] p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200"
            >
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">
                {item.step}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Our Role Card */}
        <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 mb-12">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
            Our Role
          </h2>
          <ul className="space-y-3">
            {ourRoleItems.map((role, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-slate-400 mt-2 shrink-0" />
                <span className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                  {role}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Disclaimer Banner */}
        <div className="bg-indigo-50/70 border border-indigo-100/80 rounded-[16px] p-4 sm:p-5 flex items-center justify-center gap-3 text-center">
          <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
          <p className="text-xs sm:text-sm text-indigo-950 font-medium">
            The platform is designed for transparent, accurate reporting across all publisher activity.
          </p>
        </div>

      </div>
    </div>
  );
}
