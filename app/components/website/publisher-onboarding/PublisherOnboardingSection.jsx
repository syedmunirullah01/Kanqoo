"use client";

import React from 'react';
import { UserPlus, ShieldCheck, Mail } from 'lucide-react';

const onboardingSections = [
  {
    title: 'Who Can Join',
    items: [
      'Content websites and bloggers.',
      'Coupon and deal platforms.',
      'Social media influencers.',
      'SEO-based traffic websites.',
      'Digital marketing professionals.'
    ]
  },
  {
    title: 'Requirements',
    items: [
      'Use legitimate and transparent traffic sources.',
      'Follow advertiser and network guidelines.',
      'Avoid misleading or fraudulent promotional methods.',
      'Comply with applicable policies and regulations.'
    ]
  },
  {
    title: 'Approval Process',
    items: [
      'Website or traffic source evaluation.',
      'Content quality assessment.',
      'Compliance verification.',
      'Approval based on campaign suitability and quality.'
    ]
  },
  {
    title: 'Getting Started After Approval',
    items: [
      'Access available affiliate campaigns.',
      'Generate tracking links.',
      'Start promoting offers.',
      'Monitor performance and earnings.'
    ]
  }
];

export default function PublisherOnboardingSection() {
  return (
    <div className="bg-[#FAFBFD] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Badge */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
            <UserPlus className="w-6 h-6" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Publisher Onboarding
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            How publishers, creators, and digital marketers join Kanqoo.
          </p>
        </div>

        {/* Cards Stack */}
        <div className="space-y-6 mb-12">
          {onboardingSections.map((card, idx) => (
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
                    <span className="w-2 h-2 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Disclaimer Banner */}
        <div className="bg-indigo-50/70 border border-indigo-100/80 rounded-[16px] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 shrink-0">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-xs sm:text-sm text-indigo-950 font-medium">
            Kanqoo reserves the right to approve or reject applications based on compliance standards and traffic quality. Support:{' '}
            <a href="mailto:support@kanqoo.com" className="text-indigo-600 underline font-semibold hover:text-indigo-800">
              support@kanqoo.com
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
