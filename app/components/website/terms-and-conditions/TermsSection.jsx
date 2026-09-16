"use client";

import React, { useState } from 'react';
import { Scale, CheckCircle2, AlertCircle, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

const sections = [
  { id: 'acceptance', title: 'Acceptance of Terms' },
  { id: 'accounts', title: 'Account Terms' },
  { id: 'services', title: 'Services Description' },
  { id: 'payments', title: 'Payment Terms' },
  { id: 'intellectual-property', title: 'Intellectual Property' },
  { id: 'liability', title: 'Limitation of Liability' },
  { id: 'governing-law', title: 'Governing Law' }
];

export default function TermsSection() {
  const [activeSection, setActiveSection] = useState('acceptance');

  return (
    <div className="bg-[#FAFBFD] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Badge */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
            <Scale className="w-6 h-6" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed mb-3">
            Please read these terms carefully before using Kanqoo. These terms govern your access to and use of our platform.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-slate-500">
            <span>Effective Date: Dec 15, 2026</span>
            <span>•</span>
            <span>Last Updated: Dec 15, 2026</span>
            <span>•</span>
            <span className="text-indigo-600">Binding Agreement</span>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[20px] p-4 border border-slate-200/80 shadow-xs sticky top-28 space-y-1">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
                Terms Navigation
              </h3>
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeSection === s.id
                      ? 'bg-[#2E28AC] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Card */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[24px] p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8">
              
              {/* Acceptance of Terms */}
              {activeSection === 'acceptance' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">Acceptance of Terms</h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    By accessing or using the Kanqoo platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                  </p>

                  <div className="bg-indigo-50/70 border border-indigo-100 rounded-[16px] p-5 space-y-3">
                    <h4 className="text-sm font-bold text-indigo-950 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                      Key Agreements
                    </h4>
                    <ul className="text-xs sm:text-sm text-indigo-900/90 space-y-2 font-medium">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                        <span>You are at least 18 years old or have authorized legal capacity.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                        <span>You will provide accurate, truthful, and complete registration information.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                        <span>You will comply with all applicable laws, advertiser instructions, and subnetwork policies.</span>
                      </li>
                    </ul>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">Modifications</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Kanqoo reserves the right to modify these terms at any time. Notice of material changes will be posted on our website or sent via email. Continued use of Kanqoo following changes constitutes acceptance.
                  </p>
                </div>
              )}

              {/* Account Terms */}
              {activeSection === 'accounts' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">Account Terms</h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    To access features of Kanqoo as a publisher or advertiser, you must create and maintain a verified account.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="border border-slate-200 rounded-[16px] p-5 bg-slate-50/50">
                      <h4 className="font-bold text-slate-900 text-sm mb-2">Account Creation</h4>
                      <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>Provide accurate and current information.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>Maintain active contact details.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="border border-slate-200 rounded-[16px] p-5 bg-slate-50/50">
                      <h4 className="font-bold text-slate-900 text-sm mb-2">Account Security</h4>
                      <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>You are responsible for all activity under your credentials.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>Notify us immediately of unauthorized access.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Services Description */}
              {activeSection === 'services' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">Services Description</h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    Kanqoo acts as an affiliate subnetwork platform providing tracking, attribution, campaign discovery, and payment facilitation between brands and publishers.
                  </p>
                </div>
              )}

              {/* Payment Terms */}
              {activeSection === 'payments' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">Payment Terms</h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    All payouts and commissions processed through Kanqoo are subject to advertiser verification, campaign validation, and network anti-fraud reviews.
                  </p>
                </div>
              )}

              {/* Intellectual Property */}
              {activeSection === 'intellectual-property' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">Intellectual Property</h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    All trademarks, platform logos, code, and content provided by Kanqoo remain the exclusive property of Kanqoo. Users retain ownership of their original promo content.
                  </p>
                </div>
              )}

              {/* Liability */}
              {activeSection === 'liability' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">Limitation of Liability</h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    Kanqoo will not be liable for indirect, incidental, or consequential damages resulting from platform downtime or campaign changes by external merchants.
                  </p>
                </div>
              )}

              {/* Governing Law */}
              {activeSection === 'governing-law' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">Governing Law</h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    These terms are governed by and construed in accordance with applicable UK and international business laws.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
