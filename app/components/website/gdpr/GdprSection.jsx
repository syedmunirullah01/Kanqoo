"use client";

import React from 'react';
import { Lock, FileCheck, CheckCircle2, Shield } from 'lucide-react';

const gdprCards = [
  {
    title: 'GDPR Compliance Framework',
    items: [
      'Kanqoo adheres fully to the European Union General Data Protection Regulation (GDPR) and UK GDPR standards.',
      'We process personal data lawfully, fairly, and in a transparent manner for specified affiliate tracking purposes.',
      'Data collected is strictly limited to what is necessary for contract fulfillment and platform operation.'
    ]
  },
  {
    title: 'Your Individual Rights',
    items: [
      'Right to Access: Request a copy of all personal data stored in your Kanqoo account.',
      'Right to Rectification: Correct incomplete or inaccurate profile and billing information.',
      'Right to Erasure ("Right to be Forgotten"): Request permanent deletion of personal data subject to legal retention obligations.',
      'Right to Data Portability: Export your earnings, campaign statistics, and profile data in machine-readable format.'
    ]
  },
  {
    title: 'Data Security & Storage',
    items: [
      'End-to-end TLS 1.3 encryption for data in transit and AES-256 encryption for data at rest.',
      'Data processing agreements (DPAs) executed with all sub-processors and cloud service providers.',
      'Regular vulnerability assessments and automated data retention purging schedules.'
    ]
  }
];

export default function GdprSection() {
  return (
    <div className="bg-[#FAFBFD] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Badge */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            GDPR & Data Transparency
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Data protection rights, EU GDPR compliance, and user data controls on Kanqoo.
          </p>
        </div>

        {/* Cards Stack */}
        <div className="space-y-6 mb-12">
          {gdprCards.map((card, idx) => (
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
          <Shield className="w-5 h-5 text-indigo-600 shrink-0" />
          <p className="text-xs sm:text-sm text-indigo-950 font-medium">
            To submit a Data Subject Access Request (DSAR) or contact our Data Protection Officer, email{' '}
            <a href="mailto:dpo@kanqoo.com" className="text-indigo-600 underline font-semibold hover:text-indigo-800">
              dpo@kanqoo.com
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
