"use client";

import React, { useState } from 'react';
import { Cookie, ShieldCheck, CheckCircle2, Lock, Eye, ArrowRight } from 'lucide-react';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'what-are-cookies', title: 'What Are Cookies' },
  { id: 'how-we-use', title: 'How We Use Cookies' },
  { id: 'cookie-types', title: 'Types of Cookies' },
  { id: 'managing-cookies', title: 'Managing Cookies' }
];

export default function CookiePolicySection() {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="bg-[#FAFBFD] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Badge */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
            <Cookie className="w-6 h-6" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Cookie Policy
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Understand how Kanqoo uses cookies and tracking technologies to optimize your experience.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar Nav */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[20px] p-4 border border-slate-200/80 shadow-xs sticky top-28 space-y-1">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
                Policy Navigation
              </h3>
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeSection === s.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[24px] p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8">
              
              {activeSection === 'overview' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-slate-900">Overview</h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    This Cookie Policy explains how Kanqoo ("we", "us", or "our") uses cookies and similar tracking technologies when you visit or interact with our platform and affiliate services.
                  </p>
                  <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-4 text-xs sm:text-sm text-indigo-950 font-medium">
                    By continuing to browse Kanqoo, you consent to our use of cookies in accordance with this policy and our Privacy Policy.
                  </div>
                </div>
              )}

              {activeSection === 'what-are-cookies' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-slate-900">What Are Cookies</h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    Cookies are small text files stored on your computer or mobile device when you visit a website. They allow the website to recognize your device, remember your preferences, and maintain session security.
                  </p>
                </div>
              )}

              {activeSection === 'how-we-use' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-slate-900">How We Use Cookies</h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    Kanqoo utilizes cookies to ensure platform functionality, track affiliate conversions accurately, prevent fraud, and analyze traffic performance.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-1 shrink-0" />
                      <span>Accurate attribution for affiliate tracking and publisher rewards.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-1 shrink-0" />
                      <span>Secure login authentication and account session management.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-1 shrink-0" />
                      <span>Performance monitoring and optimization.</span>
                    </li>
                  </ul>
                </div>
              )}

              {activeSection === 'cookie-types' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">Types of Cookies We Use</h2>
                  <div className="space-y-4">
                    <div className="border border-slate-200 rounded-xl p-4">
                      <h3 className="font-bold text-slate-900 text-sm mb-1">1. Essential Cookies</h3>
                      <p className="text-xs sm:text-sm text-slate-600">Required for basic platform navigation, secure login, and core network functionality.</p>
                    </div>
                    <div className="border border-slate-200 rounded-xl p-4">
                      <h3 className="font-bold text-slate-900 text-sm mb-1">2. Tracking & Attribution Cookies</h3>
                      <p className="text-xs sm:text-sm text-slate-600">Used to record affiliate link clicks and verify referral conversions between publishers and brands.</p>
                    </div>
                    <div className="border border-slate-200 rounded-xl p-4">
                      <h3 className="font-bold text-slate-900 text-sm mb-1">3. Performance & Analytics Cookies</h3>
                      <p className="text-xs sm:text-sm text-slate-600">Help us analyze visitor statistics and dashboard usage to continually improve platform speed and usability.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'managing-cookies' && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-slate-900">Managing Cookies</h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    Most web browsers allow you to control or delete cookies through browser settings. Please note that disabling essential or tracking cookies may impact affiliate link attribution and platform functionality.
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
