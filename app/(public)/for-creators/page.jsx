"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  ArrowRight, 
  Zap, 
  Target, 
  CreditCard, 
  ChevronDown, 
  Activity, 
  Globe, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Award, 
  Layers, 
  ShieldCheck, 
  Mail, 
  Percent, 
  BookOpen, 
  ArrowUpRight 
} from 'lucide-react';

export default function ForInfluencers() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const partners = [
    {
      id: "influencers",
      tag: "Social Traffic",
      title: "Influencers",
      description: "Monetize your social media presence on Instagram, YouTube, TikTok, and Telegram with custom brand deals and promo codes.",
      benefits: [
        "Direct access to premium brand campaigns",
        "Unique tracking promo codes for offline & video promotion",
        "Transparent real-time engagement and sales metrics"
      ]
    },
    {
      id: "media-partners",
      tag: "High Volume",
      title: "Media Partners",
      description: "Scale your revenue through banner networks, native integrations, and specialized content portals with high-converting offers.",
      benefits: [
        "High-performance API feeds and product catalogs",
        "Dedicated sub-ID tracking for granular analytics",
        "Custom display banners and smart native widgets"
      ]
    },
    {
      id: "social-networks",
      tag: "Community Traffic",
      title: "Social Media Networks",
      description: "Monetize communities, large public pages, groups, and Telegram channels with automated links and relevant campaigns.",
      benefits: [
        "Telegram bot integrations for automated link wrapping",
        "Mass campaigns for community-driven conversions",
        "Bulk deep-link creation tools for easy campaign management"
      ]
    },
    {
      id: "comparison-sites",
      tag: "High Intent",
      title: "Comparison & Review Sites",
      description: "Leverage comparison tables, review portals, and user-intent traffic with up-to-date product database integrations.",
      benefits: [
        "Automated XML and CSV product feed integration",
        "Exclusive coupons and promo codes for high conversions",
        "Reliable cookie tracking matching purchase intent"
      ]
    },
    {
      id: "content-publishers",
      tag: "SEO Traffic",
      title: "Content Publishers & Bloggers",
      description: "Convert organic search and newsletter traffic into conversions using editorial reviews and context-relevant recommendations.",
      benefits: [
        "In-depth tracking for editorial contextual links",
        "Dynamic widget integration within articles",
        "High-paying CPC and CPS referral programs"
      ]
    },
    {
      id: "brand-advertisers",
      tag: "B2B Traffic",
      title: "Brand Advertisers & Partners",
      description: "Cross-promote and run co-branded marketing campaigns using shared referral structures and high-intent customer networks.",
      benefits: [
        "Custom contracts and flexible commission models",
        "White-label affiliate dashboard options",
        "Strategic account manager support for custom deals"
      ]
    }
  ];

  const stats = [
    { value: '100K+', label: 'Active Partners' },
    { value: '30M+', label: 'Conversions Paid' },
    { value: '99.9%', label: 'Tracking Accuracy' },
    { value: '24/7', label: 'Dedicated Support' }
  ];

  const features = [
    {
      icon: <Activity className="w-6 h-6 text-blue-600" />,
      title: "Real-time Tracking",
      description: "Track every impression, click, conversion, and commission instantly with absolute tracking precision."
    },
    {
      icon: <Layers className="w-6 h-6 text-blue-600" />,
      title: "Postback & API Integrations",
      description: "Pass conversion data directly to your tracker or CRM using our robust postbacks and developers API."
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Multi-tier Referrals",
      description: "Invite other influencers and publishers and earn up to 5% lifetime commission on their referral payouts."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: "Secure Payouts",
      description: "Withdraw your earnings weekly via wire transfer, PayPal, or multiple digital wallet configurations."
    }
  ];

  const faqs = [
    {
      question: 'How quickly can I start earning?',
      answer: 'You can start earning immediately after registration. Once your account is approved, you can grab your unique tracking links and begin promoting products right away.'
    },
    {
      question: 'What is the payment threshold and frequency?',
      answer: 'We offer weekly payouts for all partners who meet the minimum withdrawal threshold of $50. All payments are processed automatically with zero hidden fees.'
    },
    {
      question: 'Is it completely free to join Kanqoo?',
      answer: 'Yes! Joining our platform is 100% free for both influencers and publishers. There are no registration costs, monthly fees, or setup charges.'
    },
    {
      question: 'What kind of support will I receive?',
      answer: 'Every publisher and influencer gets access to our support team, while high-volume partners are assigned a dedicated account manager to assist with campaign optimization.'
    },
    {
      question: 'Can I track conversions from social media platforms?',
      answer: 'Yes, our tracking links work across all major platforms including Instagram, TikTok, YouTube, Telegram, blogs, and newsletters.'
    },
    {
      question: 'Do you offer custom integrations for larger websites?',
      answer: 'Absolutely. We provide full developer API support, custom Postbacks, and automated XML/CSV product feeds to fit any high-traffic layout.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 relative overflow-hidden font-sans">
      
      {/* Ambient Grid overlay for subtle high-end texture */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] pointer-events-none z-0" 
      />

      {/* Decorative Orbs */}
      <div className="absolute top-[8%] left-[10%] w-[350px] h-[350px] rounded-full bg-blue-400/10 blur-3xl pointer-events-none z-0" />
      <div className="absolute top-[25%] right-[5%] w-[450px] h-[450px] rounded-full bg-indigo-300/10 blur-3xl pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/60 rounded-full px-4.5 py-1.5 mb-6.5 shadow-sm">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-blue-700 tracking-wide uppercase">Join 18,000+ Top Partners</span>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                Become a Partner with <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  Unlimited Growth
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                The leading performance platform built for modern influencers, content publishers, and media networks. Scale your brand partnerships, track conversions in real-time, and secure weekly payouts.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                  href="/register"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-[0_4px_18px_rgba(37,99,235,0.22)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.32)] transition-all duration-300 hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 group"
                >
                  Register Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#how-it-works"
                  className="px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-full transition-all duration-200 text-center shadow-sm"
                >
                  See How It Works
                </a>
              </div>
            </div>

            {/* Right Side - Interactive Live Dashboard Mockup (trackit. style with kanqoo branding) */}
            <div className="lg:col-span-6 w-full relative">
              <div className="relative bg-[#f8fafc] rounded-3xl border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 hover:shadow-[0_30px_70px_rgba(0,0,0,0.08)] flex flex-row h-[550px] w-full text-[11px] font-sans">
                
                {/* 1. Left Sidebar Mockup */}
                <div className="w-44 bg-slate-50 border-r border-slate-200/60 p-4 flex flex-col justify-between shrink-0 hidden md:flex">
                  <div>
                    {/* Logo Section */}
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-sm font-bold text-slate-800 font-unbounded tracking-tight lowercase">
                        kanqoo
                      </span>
                    </div>

                    {/* Search Mockup */}
                    <div className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 mb-4 flex items-center justify-between text-slate-400 text-[10px]">
                      <span>Search...</span>
                      <span className="text-[9px] border border-slate-200 px-1 py-0.2 rounded bg-slate-50">⌘K</span>
                    </div>

                    {/* Navigation Links */}
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">Dashboard</span>
                    <nav className="space-y-1">
                      <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-lg px-2.5 py-1.5 text-xs font-semibold cursor-pointer">
                        <Activity className="w-3.5 h-3.5 shrink-0" />
                        <span>Dashboard</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 hover:bg-slate-100 rounded-lg px-2.5 py-1.5 text-xs cursor-pointer transition-colors">
                        <Globe className="w-3.5 h-3.5 shrink-0" />
                        <span>Marketplace</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 hover:bg-slate-100 rounded-lg px-2.5 py-1.5 text-xs cursor-pointer transition-colors">
                        <Users className="w-3.5 h-3.5 shrink-0" />
                        <span>Affiliates</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 hover:bg-slate-100 rounded-lg px-2.5 py-1.5 text-xs cursor-pointer transition-colors">
                        <Target className="w-3.5 h-3.5 shrink-0" />
                        <span>Campaigns</span>
                      </div>
                    </nav>

                    {/* Settings Links */}
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mt-5 mb-2 px-1">Settings</span>
                    <nav className="space-y-1">
                      <div className="flex items-center gap-2 text-slate-600 hover:bg-slate-100 rounded-lg px-2.5 py-1.5 text-xs cursor-pointer transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                        <span>Integrations</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 hover:bg-slate-100 rounded-lg px-2.5 py-1.5 text-xs cursor-pointer transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                        <span>Postbacks</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 hover:bg-slate-100 rounded-lg px-2.5 py-1.5 text-xs cursor-pointer transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                        <span>API Keys</span>
                      </div>
                    </nav>
                  </div>

                  {/* Bottom Premium Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-3 text-center">
                    <span className="text-[9px] font-bold text-blue-700 uppercase tracking-wider block">Upgrade to Pro</span>
                    <p className="text-[9px] text-slate-500 mt-1 leading-normal">Access custom analytics and postbacks</p>
                    <button className="w-full mt-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[9px] font-bold shadow-sm transition-colors">
                      Upgrade Plan
                    </button>
                  </div>
                </div>

                {/* 2. Right Main Dashboard Content */}
                <div className="flex-1 bg-white p-4 flex flex-col justify-between overflow-y-auto min-w-0">
                  
                  {/* Top Header Mockup */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 shrink-0">
                    {/* User profile identifier */}
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700">OO</div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-800 leading-tight">OO Campaign</p>
                        <p className="text-[8px] text-slate-400 leading-none">Distributor/Admin</p>
                      </div>
                    </div>
                    {/* Header action controls */}
                    <div className="flex items-center gap-2">
                      {/* Dark/light toggles */}
                      <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200/60">
                        <span className="w-4 h-4 rounded bg-white flex items-center justify-center shadow-sm text-[9px]">☀️</span>
                        <span className="text-[9px] px-1 opacity-40">🌙</span>
                      </div>
                      <button className="px-2.5 py-1.5 bg-blue-600 text-white font-bold rounded-lg text-[9px] hover:bg-blue-700 transition-colors shadow-sm">
                        + Start Campaign
                      </button>
                    </div>
                  </div>

                  {/* Reports Heading */}
                  <div className="mb-4 shrink-0">
                    <h2 className="text-sm font-bold text-slate-800 tracking-tight leading-tight">Reports/Analytics</h2>
                    <p className="text-[9px] text-slate-400 mt-0.5">Get a clear snapshot of your affiliate program performance.</p>
                  </div>

                  {/* Middle Section - Two Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3 shrink-0">
                    
                    {/* Large Performance Chart Card (Left 2 cols) */}
                    <div className="lg:col-span-2 bg-slate-50/50 border border-slate-200/60 rounded-2xl p-3 flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-3 shrink-0">
                        <div>
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wide">Performance Overview</span>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="text-sm font-bold text-slate-850 font-sans">$48,703.00</span>
                            <span className="text-[8px] font-bold text-green-600 bg-green-50 border border-green-100 rounded px-1 py-0.2">+22.57%</span>
                          </div>
                        </div>
                        <div className="border border-slate-200 rounded px-1.5 py-0.5 text-[8px] text-slate-500 bg-white">
                          Last 28 Days
                        </div>
                      </div>
                      
                      {/* Spline line chart SVG */}
                      <div className="h-28 w-full relative">
                        <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
                              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          {/* Grid lines */}
                          <line x1="0" y1="10" x2="100" y2="10" stroke="#f1f5f9" strokeWidth="0.5" />
                          <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="0.5" />
                          <line x1="0" y1="30" x2="100" y2="30" stroke="#f1f5f9" strokeWidth="0.5" />
                          
                          {/* Shading */}
                          <path 
                            d="M 0 30 Q 12 10 25 24 T 50 8 T 75 28 T 100 15 L 100 40 L 0 40 Z" 
                            fill="url(#purpleGradient)" 
                          />
                          
                          {/* Line */}
                          <path 
                            d="M 0 30 Q 12 10 25 24 T 50 8 T 75 28 T 100 15" 
                            fill="transparent" 
                            stroke="#8b5cf6" 
                            strokeWidth="1.5" 
                            strokeLinecap="round"
                          />
                        </svg>
                        
                        {/* Interactive Tooltip Overlay */}
                        <div className="absolute top-2 left-[50%] bg-slate-900 text-white rounded px-1.5 py-0.5 text-[7px] shadow border border-slate-800 flex flex-col pointer-events-none">
                          <span className="opacity-60 text-[5px]">84:27</span>
                          <span className="font-bold">$4,850.00</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[7px] font-bold text-slate-400 mt-2 shrink-0">
                        <span>05/12</span>
                        <span>18/21</span>
                        <span>25/27</span>
                        <span>30/04</span>
                        <span>03/13</span>
                      </div>
                    </div>

                    {/* Donut Chart Card (Right 1 col) */}
                    <div className="bg-slate-50/50 border border-slate-200/60 rounded-2xl p-3 flex flex-col justify-between items-center text-center">
                      <div className="w-full text-left mb-2 shrink-0">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wide">Discount Campaign</span>
                        <p className="text-sm font-bold text-slate-800 font-sans mt-0.5">$8,045.00</p>
                      </div>

                      {/* Donut Graphic */}
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="2.8" />
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" strokeWidth="3.2" strokeDasharray="50 100" strokeDashoffset="0" />
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#a855f7" strokeWidth="3.2" strokeDasharray="34 100" strokeDashoffset="-50" />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="text-[10px] font-bold text-slate-855">84%</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 w-full mt-2 text-[7px] text-slate-500 font-bold shrink-0">
                        <div className="flex items-center gap-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          <span>Direct</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                          <span>Referral</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Row - 4 Mini Stats Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 shrink-0">
                    {/* Card 1 */}
                    <div className="bg-slate-50/50 border border-slate-200/40 rounded-xl p-2 flex flex-col justify-between">
                      <div>
                        <span className="text-[7px] font-bold text-slate-400 uppercase tracking-wide">Registrations</span>
                        <p className="text-xs font-bold text-slate-800 mt-0.5">$29.9K</p>
                      </div>
                      <div className="h-4 w-full mt-1.5">
                        <svg className="w-full h-full" viewBox="0 0 30 10" preserveAspectRatio="none">
                          <path d="M 0 8 Q 5 2 10 7 T 20 4 T 30 1" fill="transparent" stroke="#10b981" strokeWidth="0.8" />
                        </svg>
                      </div>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-slate-50/50 border border-slate-200/40 rounded-xl p-2 flex flex-col justify-between">
                      <div>
                        <span className="text-[7px] font-bold text-slate-400 uppercase tracking-wide">Partners</span>
                        <p className="text-xs font-bold text-slate-800 mt-0.5">7,834</p>
                      </div>
                      <div className="h-4 w-full mt-1.5">
                        <svg className="w-full h-full" viewBox="0 0 30 10" preserveAspectRatio="none">
                          <path d="M 0 5 Q 5 9 10 3 T 20 7 T 30 3" fill="transparent" stroke="#ef4444" strokeWidth="0.8" />
                        </svg>
                      </div>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-slate-50/50 border border-slate-200/40 rounded-xl p-2 flex flex-col justify-between">
                      <div>
                        <span className="text-[7px] font-bold text-slate-400 uppercase tracking-wide">Payouts</span>
                        <p className="text-xs font-bold text-slate-800 mt-0.5">$82,802</p>
                      </div>
                      <div className="h-4 w-full mt-1.5">
                        <svg className="w-full h-full" viewBox="0 0 30 10" preserveAspectRatio="none">
                          <path d="M 0 9 Q 8 1 15 6 T 30 2" fill="transparent" stroke="#3b82f6" strokeWidth="0.8" />
                        </svg>
                      </div>
                    </div>
                    {/* Card 4 */}
                    <div className="bg-slate-50/50 border border-slate-200/40 rounded-xl p-2 flex flex-col justify-between">
                      <div>
                        <span className="text-[7px] font-bold text-slate-400 uppercase tracking-wide">Conversions</span>
                        <p className="text-xs font-bold text-slate-800 mt-0.5">$89.9K</p>
                      </div>
                      <div className="h-4 w-full mt-1.5">
                        <svg className="w-full h-full" viewBox="0 0 30 10" preserveAspectRatio="none">
                          <path d="M 0 3 Q 10 9 20 2 T 30 8" fill="transparent" stroke="#8b5cf6" strokeWidth="0.8" />
                        </svg>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Brand Logos Infinite Marquee */}
      <section className="py-12 border-y border-slate-200 bg-white/40 overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center mb-6">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Trusted by top global publishers and brands worldwide
          </p>
        </div>
        <div className="relative w-full overflow-hidden flex py-1">
          <div className="flex animate-marquee-loop w-max shrink-0 text-slate-400 font-extrabold text-lg sm:text-xl uppercase tracking-widest select-none">
            {/* Set 1 */}
            <span className="flex items-center gap-2 pr-20 shrink-0"><span className="text-blue-600/40">✦</span> Apple Store</span>
            <span className="flex items-center gap-2 pr-20 shrink-0"><span className="text-blue-600/40">✦</span> Nike Direct</span>
            <span className="flex items-center gap-2 pr-20 shrink-0"><span className="text-blue-600/40">✦</span> Spotify Premium</span>
            <span className="flex items-center gap-2 pr-20 shrink-0"><span className="text-blue-600/40">✦</span> Adobe Cloud</span>
            <span className="flex items-center gap-2 pr-20 shrink-0"><span className="text-blue-600/40">✦</span> Amazon Affiliate</span>
            <span className="flex items-center gap-2 pr-20 shrink-0"><span className="text-blue-600/40">✦</span> Sephora Brands</span>
            <span className="flex items-center gap-2 pr-20 shrink-0"><span className="text-blue-600/40">✦</span> Samsung Electronics</span>
            
            {/* Set 2 */}
            <span className="flex items-center gap-2 pr-20 shrink-0"><span className="text-blue-600/40">✦</span> Apple Store</span>
            <span className="flex items-center gap-2 pr-20 shrink-0"><span className="text-blue-600/40">✦</span> Nike Direct</span>
            <span className="flex items-center gap-2 pr-20 shrink-0"><span className="text-blue-600/40">✦</span> Spotify Premium</span>
            <span className="flex items-center gap-2 pr-20 shrink-0"><span className="text-blue-600/40">✦</span> Adobe Cloud</span>
            <span className="flex items-center gap-2 pr-20 shrink-0"><span className="text-blue-600/40">✦</span> Amazon Affiliate</span>
            <span className="flex items-center gap-2 pr-20 shrink-0"><span className="text-blue-600/40">✦</span> Sephora Brands</span>
            <span className="flex items-center gap-2 pr-20 shrink-0"><span className="text-blue-600/40">✦</span> Samsung Electronics</span>
          </div>
        </div>
        <style jsx>{`
          .animate-marquee-loop {
            display: flex;
            width: max-content;
            animation: marquee 35s linear infinite;
          }
          @keyframes marquee {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
        `}</style>
      </section>

      {/* Pillars of Success (3 Features) */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Main Pillars</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-3 mb-5">Built to Maximize Earnings</h2>
            <p className="text-slate-600">We provide state-of-the-art tools and resources to help you focus entirely on promoting campaigns, leaving technical and financial operations to us.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Direct Brand Deals</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Gain immediate access to premium brand campaigns, high-converting retail deals, and exclusive contracts tailored directly to your traffic profile.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Smart Tracking Links</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Our redirect technology instantly matches user intent, redirects to local geo-stores, and ensures zero lost clicks across all browsers.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center mb-6">
                <CreditCard className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Weekly Payout Cycle</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Get paid weekly with a low minimum payout of only $50. Choose from bank wires, PayPal, and digital wallet options for secure withdrawals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 3-Step Success Timeline */}
      <section id="how-it-works" className="py-24 bg-white/50 border-y border-slate-200/60 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Simplifying Monetization</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-3 mb-5">3 Steps to Success</h2>
            <p className="text-slate-600">Monetizing your audience is straightforward and simple on the Kanqoo ecosystem.</p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-blue-200 transform -translate-y-1/2 z-0" />

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {/* Step 1 */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mb-5 shadow-sm text-sm">1</div>
                <h3 className="text-base font-bold text-slate-800 mb-2">Register as a Partner</h3>
                <p className="text-slate-500 text-xs leading-relaxed max-w-xs">Create your profile inside our dashboard. Integration takes less than 5 minutes.</p>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center mb-5 shadow-sm text-sm">2</div>
                <h3 className="text-base font-bold text-slate-800 mb-2">Promote Campaigns</h3>
                <p className="text-slate-500 text-xs leading-relaxed max-w-xs">Select top-tier brands and campaigns. Share tracking links or promo codes with your audience.</p>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mb-5 shadow-sm text-sm">3</div>
                <h3 className="text-base font-bold text-slate-800 mb-2">Enjoy Weekly Payouts</h3>
                <p className="text-slate-500 text-xs leading-relaxed max-w-xs">Track real-time commissions as they flow into your dashboard, and enjoy automated weekly payouts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliation for All Types of Partners (6-Grid Section) */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Versatile Monetization</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-4 mb-6 leading-tight">
              Partnership Models for Every Channel
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Whether you are a social influencer, a media network, or a blogger, we have custom tools built to suit your traffic style.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <div 
                key={partner.id} 
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_45px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Tag */}
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 border border-blue-100 rounded-full px-3 py-1">
                    {partner.tag}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-800 mt-5 mb-3">
                    {partner.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {partner.description}
                  </p>
                </div>

                {/* Benefits checklist */}
                <div className="border-t border-slate-100 pt-6 mt-4">
                  <ul className="space-y-3">
                    {partner.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-xs text-slate-500 leading-normal">
                        <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smarter Insights Feature Grid */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Enterprise Architecture</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-3 mb-5">Smarter Insights, Stronger Performance</h2>
            <p className="text-slate-600">Enjoy tools built to optimize campaigns, track conversion paths, and ensure your traffic is yielding maximum payout value.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-start hover:-translate-y-1 transition-all duration-300">
                <div className="p-3 bg-blue-50 rounded-xl mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="py-24 bg-white/55 border-t border-slate-200/60 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-sans">Any Questions?</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-slate-800 hover:text-blue-600 transition-colors duration-200"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  
                  {/* Collapsible Panel */}
                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-40 border-t border-slate-100' : 'max-h-0'
                    } overflow-hidden`}
                  >
                    <div className="p-6 text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative bg-[#0b0c10] rounded-[2.5rem] p-8 md:p-14 border border-slate-850 shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Subtle background ambient lighting glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Left Column: Text */}
            <div className="flex-1 text-left relative z-10 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
                Become a Top-Performing <br className="hidden sm:block" />
                Partner.
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Join our platform and connect with thousands of active brands seeking high-quality publishers and influencers. Setting up takes minutes.
              </p>
            </div>

            {/* Right Column: Button */}
            <div className="shrink-0 relative z-10">
              <Link
                href="/register"
                className="px-8 py-4.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-[0_4px_18px_rgba(37,99,235,0.25)] transition-all duration-300 hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 group text-xs uppercase tracking-wider"
              >
                Get Started Today
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}