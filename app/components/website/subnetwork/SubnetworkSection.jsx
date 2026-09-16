"use client";

import React from 'react';
import { Network, ShieldCheck, CheckCircle2 } from 'lucide-react';

const disclosureCards = [
  {
    title: 'Subnetwork Architecture',
    items: [
      'Kanqoo operates as a master affiliate subnetwork connecting advertisers and affiliate networks with vetted subpublishers and creators.',
      'We streamline contract management, link creation, tracking validation, and unified payout consolidation.',
      'All subpublishers operating under the Kanqoo network umbrella are bound by our unified Master Terms.'
    ]
  },
  {
    title: 'Publisher Vetting & Quality Assurance',
    items: [
      'Every subpublisher passes a manual or automated compliance evaluation before obtaining campaign tracking links.',
      'Kanqoo maintains real-time monitoring of subpublisher traffic channels to ensure brand safety.',
      'In the event of a subpublisher policy breach, Kanqoo takes immediate corrective action to protect advertiser integrity.'
    ]
  },
  {
    title: 'Attribution & Transparency',
    items: [
      'Server-side sub-ID tracking parameters accurately credit individual subpublisher sales.',
      'Advertisers receive aggregated and granular reporting on campaign performance and traffic sources.',
      'Full compliance with global network disclosure requirements and subnetwork reporting standards.'
    ]
  }
];

export default function SubnetworkSection() {
  return (
    <div className="bg-[#FAFBFD] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Badge */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
            <Network className="w-6 h-6" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Subnetwork Disclosure
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Transparency, operational structure, and subpublisher attribution on Kanqoo.
          </p>
        </div>

        {/* Cards Stack */}
        <div className="space-y-6 mb-12">
          {disclosureCards.map((card, idx) => (
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
        <div className="bg-indigo-50/70 border border-indigo-100/80 rounded-[16px] p-4 sm:p-5 flex items-center justify-center gap-3 text-center">
          <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
          <p className="text-xs sm:text-sm text-indigo-950 font-medium">
            For network partnership inquiries or subnetwork audits, contact{' '}
            <a href="mailto:partners@kanqoo.com" className="text-indigo-600 underline font-semibold hover:text-indigo-800">
              partners@kanqoo.com
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
