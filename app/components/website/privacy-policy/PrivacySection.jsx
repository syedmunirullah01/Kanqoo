"use client";

import React, { useState } from 'react';
import { ShieldCheck, Lock, Eye, User, FileText, CheckCircle2 } from 'lucide-react';

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'data-collection', title: 'Data Collection' },
  { id: 'data-usage', title: 'Data Usage' },
  { id: 'data-sharing', title: 'Data Sharing' },
  { id: 'user-rights', title: 'Your Rights' },
  { id: 'security', title: 'Data Security' },
  { id: 'contact', title: 'Contact Us' }
];

export default function PrivacySection() {
  const [activeSection, setActiveSection] = useState('introduction');

  return (
    <div className="bg-[#FAFBFD] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Badge */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed mb-3">
            Your privacy is our priority. Learn how Kanqoo collects, uses, and protects your personal information.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-slate-500">
            <span>Last Updated: Dec 15, 2026</span>
            <span>•</span>
            <span className="text-indigo-600">Transparent & Secure</span>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[20px] p-4 border border-slate-200/80 shadow-xs sticky top-28 space-y-1">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
                Policy Navigation
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
              
              {/* Introduction */}
              {activeSection === 'introduction' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">Introduction</h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    Welcome to Kanqoo. We are committed to protecting your privacy and ensuring transparency in how we handle personal data across our affiliate marketing and tracking platform.
                  </p>

                  <div className="bg-indigo-50/70 border border-indigo-100 rounded-[16px] p-5 space-y-3">
                    <h4 className="text-sm font-bold text-indigo-950 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                      Our Privacy Principles
                    </h4>
                    <ul className="text-xs sm:text-sm text-indigo-900/90 space-y-2 font-medium">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                        <span>We only collect data necessary to provide and secure our affiliate platform.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                        <span>We never sell or rent your personal information to third parties.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                        <span>You maintain control and access over your stored data.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Data Collection */}
              {activeSection === 'data-collection' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">Data Collection</h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    We collect personal information when you register an account, connect promotional channels, generate tracking links, or contact support.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="border border-slate-200 rounded-[16px] p-5 bg-slate-50/50">
                      <h4 className="font-bold text-slate-900 text-sm mb-2">Information You Provide</h4>
                      <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                        <li>• Account name, email & password</li>
                        <li>• Payment payout details</li>
                        <li>• Promotional channel links & social profiles</li>
                      </ul>
                    </div>
                    <div className="border border-slate-200 rounded-[16px] p-5 bg-slate-50/50">
                      <h4 className="font-bold text-slate-900 text-sm mb-2">Automated Technical Data</h4>
                      <ul className="text-xs sm:text-sm text-slate-600 space-y-1">
                        <li>• IP address & device browser details</li>
                        <li>• Referral click timestamps & tracking IDs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Usage */}
              {activeSection === 'data-usage' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">How We Use Your Data</h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    Your data is used strictly to operate the Kanqoo platform, calculate referral commissions, prevent click fraud, and process payouts.
                  </p>
                </div>
              )}

              {/* Data Sharing */}
              {activeSection === 'data-sharing' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">Data Sharing</h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    We share relevant conversion parameters with brand advertisers solely for verifying campaign leads and sales attribution.
                  </p>
                </div>
              )}

              {/* Your Rights */}
              {activeSection === 'user-rights' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">Your Rights</h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    You have the right to request access to your personal data, request correction of inaccurate details, or request account deletion by contacting our privacy team.
                  </p>
                </div>
              )}

              {/* Security */}
              {activeSection === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">Data Security</h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    Kanqoo uses industry-standard SSL/TLS encryption, secure cloud infrastructure, and restricted database access to safeguard your information.
                  </p>
                </div>
              )}

              {/* Contact */}
              {activeSection === 'contact' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-slate-900">Contact Us</h2>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    If you have any questions or requests regarding this Privacy Policy, please reach out to us:
                  </p>
                  <p className="text-sm font-semibold text-indigo-600">
                    Email:{' '}
                    <a href="mailto:privacy@kanqoo.com" className="underline hover:text-indigo-800">
                      privacy@kanqoo.com
                    </a>
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
