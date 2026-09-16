"use client";

import React from 'react';
import { BookOpen, ShieldCheck, CheckCircle2 } from 'lucide-react';

const guidelineCards = [
  {
    title: 'General Responsibilities',
    items: [
      'Promote offers honestly and transparently.',
      'Ensure accuracy in promotional content.',
      'Follow advertiser-specific campaign instructions.',
      'Respect advertiser brand guidelines.',
      'Use approved marketing methods only.'
    ]
  },
  {
    title: 'Acceptable Promotional Methods',
    items: [
      'Content websites and blogs.',
      'Coupon and deal sharing platforms.',
      'Social media pages and communities.',
      'Influencer and creator channels.',
      'SEO traffic.',
      'Email marketing with user consent.'
    ]
  },
  {
    title: 'Content Standards',
    items: [
      'Clearly represent promoted offers.',
      'Avoid misleading or exaggerated claims.',
      'Use up-to-date offer information.',
      'Respect intellectual property rights.',
      'Follow advertiser branding requirements.'
    ]
  },
  {
    title: 'Tracking Usage',
    items: [
      'Use affiliate links correctly.',
      'Place links transparently and user-friendly.',
      'Do not alter or misuse tracking parameters.',
      'Follow campaign-specific tracking instructions.'
    ]
  },
  {
    title: 'Best Practices',
    items: [
      'Focus on high-quality, relevant traffic.',
      'Update expired or inactive offers regularly.',
      'Keep promotional content clear and organized.',
      'Follow each advertiser\'s campaign requirements.'
    ]
  }
];

export default function PublisherGuidelinesSection() {
  return (
    <div className="bg-[#FAFBFD] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Badge */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Publisher Guidelines
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Expected behavior and best practices for all publishers and subpublishers using Kanqoo.
          </p>
        </div>

        {/* Guidelines Cards Stack */}
        <div className="space-y-6 mb-12">
          {guidelineCards.map((card, idx) => (
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
        <div className="bg-indigo-50/70 border border-indigo-100/80 rounded-[16px] p-4 sm:p-5 flex items-center justify-center gap-3 text-center">
          <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
          <p className="text-xs sm:text-sm text-indigo-950 font-medium">
            Kanqoo may update these guidelines periodically. Publishers are responsible for reviewing updates.
          </p>
        </div>

      </div>
    </div>
  );
}
