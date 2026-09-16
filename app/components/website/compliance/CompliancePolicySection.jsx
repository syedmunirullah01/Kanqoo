"use client";

import React from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, Mail } from 'lucide-react';

const complianceCards = [
  {
    title: 'Overview & Scope',
    items: [
      'Applies to all publishers, creators, agencies, and brand advertisers operating on Kanqoo.',
      'Designed to maintain network integrity, prevent deceptive practices, and safeguard brand equity.',
      'Requires strict adherence to international digital marketing standards and local advertising laws.'
    ]
  },
  {
    title: 'Publisher & Advertiser Conduct',
    items: [
      'Publishers must present clear, non-misleading promotion terms and disclosures.',
      'Advertisers must honor verified commission structures and campaign conditions.',
      'Prohibits any unauthorized use of trademarked terms, deceptive landing pages, or forced redirects.'
    ]
  },
  {
    title: 'Regulatory Adherence',
    items: [
      'Full compliance with FTC endorsement guides (clear disclosure of affiliate links).',
      'Adherence to ASA, GDPR, and global consumer protection standards.',
      'Mandatory disclosure on sponsored social media content (#ad, #affiliate, #sponsored).'
    ]
  },
  {
    title: 'Monitoring & Enforcement',
    items: [
      'Continuous automated audit of traffic channels, landing pages, and promotional methods.',
      'Immediate suspension of non-compliant campaigns or publisher accounts upon detection.',
      'Forfeiture of earnings generated through prohibited or non-compliant marketing activities.'
    ]
  }
];

export default function CompliancePolicySection() {
  return (
    <div className="bg-[#FAFBFD] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Badge */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Compliance Policy
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Ensuring network integrity, brand safety, and regulatory compliance across all affiliate operations on Kanqoo.
          </p>
        </div>

        {/* Cards Stack */}
        <div className="space-y-6 mb-12">
          {complianceCards.map((card, idx) => (
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

        {/* Bottom Contact Banner */}
        <div className="bg-indigo-50/70 border border-indigo-100/80 rounded-[16px] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
          <ShieldAlert className="w-5 h-5 text-indigo-600 shrink-0" />
          <p className="text-xs sm:text-sm text-indigo-950 font-medium">
            To report compliance concerns or policy violations, contact our compliance team at{' '}
            <a href="mailto:compliance@kanqoo.com" className="text-indigo-600 underline font-semibold hover:text-indigo-800">
              compliance@kanqoo.com
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
