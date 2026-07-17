"use client";

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const faqs = [
  {
    question: "What is Kanqoo and how does it work?",
    answer:
      "Kanqoo is an all-in-one affiliate and partnership platform that connects brands with creators, influencers, and publishers. Brands create campaigns and set commission structures, while creators apply to join, share unique tracking links, and earn payouts automatically based on verified conversions — all managed from a single dashboard."
  },
  {
    question: "Do I need a large following to join Kanqoo as a creator?",
    answer:
      "Not at all! Kanqoo welcomes creators of all sizes. Whether you have 500 or 500,000 followers, what matters most is your engagement and the relevance of your audience to the brands you promote. Many of our top earners are micro-influencers with highly loyal communities."
  },
  {
    question: "How and when do I get paid?",
    answer:
      "Kanqoo processes payouts automatically on a weekly or monthly basis depending on your selected payout schedule. We support 135+ global currencies via bank transfer, PayPal, and select crypto methods. Minimum payout threshold is $20, and all earnings are tracked in real-time on your dashboard."
  },
  {
    question: "Is Kanqoo free to join for creators?",
    answer:
      "Yes — joining Kanqoo as a creator is completely free. There are no subscription fees, no setup costs, and no hidden charges. You simply apply to brand campaigns you're interested in, get approved, and start earning commissions immediately."
  },
  {
    question: "How do brands benefit from using Kanqoo?",
    answer:
      "Brands on Kanqoo get access to a curated network of 50,000+ verified creators and affiliates. They can set performance-based commissions (so they only pay for real results), get real-time analytics on clicks, conversions, and ROI, automate creator contracts, and manage all partnerships from one powerful dashboard."
  },
  {
    question: "How does Kanqoo track affiliate sales and conversions?",
    answer:
      "Kanqoo uses enterprise-grade tracking technology including server-side tracking, pixel-based attribution, and cookieless tracking to ensure every click and conversion is accurately recorded. Our system maintains 99.9% uptime with real-time data syncing to protect your earnings and campaign integrity."
  },
  {
    question: "Can I join multiple brand campaigns at once?",
    answer:
      "Absolutely. As a creator on Kanqoo, you can partner with multiple brands simultaneously. There are no restrictions on how many campaigns you join — more partnerships simply mean more earning opportunities, all managed from your single Kanqoo creator dashboard."
  },
  {
    question: "What kind of support does Kanqoo offer?",
    answer:
      "We offer 24/7 dedicated support via live chat and email for all users. Enterprise brand accounts are assigned a dedicated account manager. Our knowledge base and onboarding guides are available at any time to help you get the most out of the platform."
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (i) => setActiveIndex(activeIndex === i ? null : i);

  return (
    <section className="relative bg-[#F8F9FC] py-24 px-6 overflow-hidden border-t border-slate-200/70">

      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.012)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"
      />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-black tracking-tight leading-[1.1] text-[#0F172A] mb-3">
            Frequently asked questions
          </h2>
          <p className="text-slate-500 text-base sm:text-lg font-medium">
            Everything you need to know about Kanqoo
          </p>
        </div>

        {/* Accordion rows */}
        <div className="divide-y divide-slate-200">
          {faqs.map((faq, i) => {
            const isOpen = activeIndex === i;
            return (
              <div key={i} className="group">
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-6 py-5 text-left transition-colors duration-150"
                  aria-expanded={isOpen}
                  id={`faq-btn-${i}`}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className={`text-base sm:text-[17px] font-semibold leading-snug transition-colors duration-200 ${
                    isOpen ? "text-blue-600" : "text-[#0F172A] group-hover:text-blue-600"
                  }`}>
                    {faq.question}
                  </span>

                  {/* +/× icon */}
                  <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 ${
                    isOpen
                      ? "bg-blue-600 border-blue-600 text-white rotate-90"
                      : "bg-white border-slate-200 text-slate-400 group-hover:border-blue-400 group-hover:text-blue-500"
                  }`}>
                    {isOpen ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>

                {/* Animated answer panel */}
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed pr-12">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-slate-500 text-sm sm:text-base mb-5 font-medium">
            Still have questions? We're happy to help.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_4px_20px_rgba(59,130,246,0.35)] hover:shadow-[0_6px_28px_rgba(59,130,246,0.45)] hover:scale-105 active:scale-100 transition-all duration-200"
          >
            Contact Support
            <span className="text-base">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
