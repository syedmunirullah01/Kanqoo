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
  ArrowUpRight,
  Bell,
  Calendar,
  MousePointer,
  ShoppingCart,
  Clock,
  Trophy,
  HelpCircle,
  Wallet
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

            {/* Right Side - Interactive Live Dashboard Mockup (Image 2 design) */}
            <div className="lg:col-span-6 w-full relative">
              <div className="relative bg-[#f4f9f6] rounded-3xl border border-emerald-100/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 hover:shadow-[0_30px_70px_rgba(16,185,129,0.08)] flex flex-col h-[600px] w-full text-[10px] font-sans">
                
                {/* 1. Top Navigation Bar */}
                <div className="bg-white border-b border-emerald-100/60 px-4 py-2.5 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-extrabold text-slate-900 tracking-tight lowercase">KanQoo</span>
                    <nav className="flex items-center gap-4 text-[11px] font-medium text-slate-500">
                      <span className="text-emerald-600 font-bold border-b-2 border-emerald-500 pb-0.5 cursor-pointer">Dashboard</span>
                      <span className="hover:text-slate-800 cursor-pointer">Offers</span>
                      <span className="hover:text-slate-800 cursor-pointer">Reports</span>
                      <span className="hover:text-slate-800 cursor-pointer">Payouts</span>
                      <span className="hover:text-slate-800 cursor-pointer">Settings</span>
                    </nav>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 cursor-pointer">
                      <Bell className="w-3.5 h-3.5" />
                    </div>
                    <div className="w-6.5 h-6.5 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-[10px] shadow-sm">
                      P
                    </div>
                  </div>
                </div>

                {/* Scrollable Dashboard Body */}
                <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
                  
                  {/* 2. Welcome Banner & Active Pill */}
                  <div className="flex items-start justify-between bg-gradient-to-r from-emerald-50/80 via-white to-emerald-50/40 p-3 rounded-2xl border border-emerald-100/60">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Wallet className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-slate-900 leading-tight">Publisher Dashboard</h3>
                        <p className="text-[9px] text-slate-500 mt-0.5 max-w-sm">Welcome back, Publisher! Track your performance, view your earnings and grow your income with KanQoo.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100/80 text-emerald-700 font-bold text-[9px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        You're Active
                      </span>
                      <div className="flex items-center gap-1 bg-white border border-slate-200 px-2 py-1 rounded-lg text-[9px] text-slate-600 font-medium">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>Last 7 Days</span>
                        <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  {/* 3. Top 4 KPI Cards Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {/* Total Earnings */}
                    <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1.5">
                        <DollarSign className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Total Earnings</span>
                        <span className="text-sm font-extrabold text-slate-900 font-sans">$482.36</span>
                      </div>
                      <div className="text-[8px] font-semibold text-emerald-600 mt-1 flex items-center gap-0.5">
                        <span>▲ +24.5%</span>
                        <span className="text-slate-400 font-normal">vs. previous 7 days</span>
                      </div>
                    </div>

                    {/* Total Clicks */}
                    <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                      <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-1.5">
                        <MousePointer className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Total Clicks</span>
                        <span className="text-sm font-extrabold text-slate-900 font-sans">3,892</span>
                      </div>
                      <div className="text-[8px] font-semibold text-emerald-600 mt-1 flex items-center gap-0.5">
                        <span>▲ +18.2%</span>
                        <span className="text-slate-400 font-normal">vs. previous 7 days</span>
                      </div>
                    </div>

                    {/* Total Conversions */}
                    <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                      <div className="w-7 h-7 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mb-1.5">
                        <Target className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Total Conversions</span>
                        <span className="text-sm font-extrabold text-slate-900 font-sans">215</span>
                      </div>
                      <div className="text-[8px] font-semibold text-emerald-600 mt-1 flex items-center gap-0.5">
                        <span>▲ +27.9%</span>
                        <span className="text-slate-400 font-normal">vs. previous 7 days</span>
                      </div>
                    </div>

                    {/* Active Campaigns */}
                    <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-1.5">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Active Campaigns</span>
                        <span className="text-sm font-extrabold text-slate-900 font-sans">5</span>
                      </div>
                      <div className="text-[8px] font-semibold text-emerald-600 mt-1">
                        +2 new this week
                      </div>
                    </div>
                  </div>

                  {/* 4. Secondary Stat Row (2 Cards) */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Activity className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Conversion Rate</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xs font-bold text-slate-900">5.52%</span>
                          <span className="text-[8px] text-emerald-600 font-medium">▲ +0.8% vs. previous 7 days</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Wallet className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Available Balance</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs font-bold text-slate-900">$216.48</span>
                          <span className="text-[8px] text-slate-400 font-medium">Pending: $125.30</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5. Main 2-Column Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5">
                    
                    {/* Left 8 Columns */}
                    <div className="lg:col-span-8 space-y-2.5">
                      
                      {/* Earnings Overview Bar Chart Card */}
                      <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
                            <div>
                              <h4 className="text-xs font-bold text-slate-800 leading-none">Earnings Overview</h4>
                              <p className="text-[8px] text-slate-400 mt-0.5">Your earnings for the last 7 days</p>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold text-[8px]">
                            Total Earnings: $482.36
                          </span>
                        </div>

                        {/* Custom SVG Bar Chart matching Image 2 */}
                        <div className="h-32 w-full pt-2 pb-1 relative">
                          <div className="absolute left-0 top-0 bottom-6 w-6 flex flex-col justify-between text-[7px] text-slate-400">
                            <span>$200</span>
                            <span>$150</span>
                            <span>$100</span>
                            <span>$50</span>
                            <span>$0</span>
                          </div>
                          <div className="ml-7 h-full flex flex-col justify-between">
                            <div className="flex-1 flex items-end justify-between gap-2 border-b border-slate-100 pb-1">
                              {[
                                { day: 'Apr 25', val: 70, height: '40%' },
                                { day: 'Apr 26', val: 110, height: '60%' },
                                { day: 'Apr 27', val: 90, height: '50%' },
                                { day: 'Apr 28', val: 120, height: '65%' },
                                { day: 'Apr 29', val: 160, height: '85%' },
                                { day: 'Apr 30', val: 140, height: '75%' },
                                { day: 'May 1', val: 130, height: '70%' },
                              ].map((bar, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
                                  <div 
                                    className="w-full bg-emerald-400 hover:bg-emerald-500 rounded-t-md transition-all duration-200" 
                                    style={{ height: bar.height }}
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="flex items-center justify-between text-[7px] font-medium text-slate-400 pt-1">
                              <span>Apr 25</span>
                              <span>Apr 26</span>
                              <span>Apr 27</span>
                              <span>Apr 28</span>
                              <span>Apr 29</span>
                              <span>Apr 30</span>
                              <span>May 1</span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom 3 Pills */}
                        <div className="grid grid-cols-3 gap-1.5 mt-2 pt-2 border-t border-slate-100">
                          <div className="bg-purple-50/60 rounded-lg p-1.5 flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                              <DollarSign className="w-2.5 h-2.5" />
                            </div>
                            <div>
                              <div className="text-[9px] font-bold text-slate-800">$482.36</div>
                              <div className="text-[7px] text-slate-400 leading-none">Total Earnings</div>
                            </div>
                          </div>

                          <div className="bg-blue-50/60 rounded-lg p-1.5 flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                              <Target className="w-2.5 h-2.5" />
                            </div>
                            <div>
                              <div className="text-[9px] font-bold text-slate-800">215</div>
                              <div className="text-[7px] text-slate-400 leading-none">Conversions</div>
                            </div>
                          </div>

                          <div className="bg-emerald-50/60 rounded-lg p-1.5 flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                              <Activity className="w-2.5 h-2.5" />
                            </div>
                            <div>
                              <div className="text-[9px] font-bold text-slate-800">5.52%</div>
                              <div className="text-[7px] text-slate-400 leading-none">Conversion Rate</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recent Conversions Card */}
                      <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <ShoppingCart className="w-3.5 h-3.5 text-slate-500" />
                            <div>
                              <h4 className="text-xs font-bold text-slate-800 leading-none">Recent Conversions</h4>
                              <p className="text-[8px] text-slate-400 mt-0.5">Latest confirmed transactions</p>
                            </div>
                          </div>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-[8px]">
                            <thead>
                              <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                                <th className="pb-1.5 font-medium">Date</th>
                                <th className="pb-1.5 font-medium">Merchant</th>
                                <th className="pb-1.5 font-medium">Commission</th>
                                <th className="pb-1.5 font-medium text-right">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 text-slate-700">
                              {[
                                { date: 'May 1, 2025 14:32', merchant: 'Nike', comm: '$24.50' },
                                { date: 'May 1, 2025 12:17', merchant: 'Amazon', comm: '$18.32' },
                                { date: 'May 1, 2025 09:45', merchant: 'Shein', comm: '$12.80' },
                                { date: 'Apr 30, 2025 22:11', merchant: 'AliExpress', comm: '$9.40' },
                                { date: 'Apr 30, 2025 18:03', merchant: 'Banggood', comm: '$7.25' },
                              ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                                  <td className="py-1.5 text-slate-500">{row.date}</td>
                                  <td className="py-1.5 font-semibold text-slate-800">{row.merchant}</td>
                                  <td className="py-1.5 font-bold text-slate-900">{row.comm}</td>
                                  <td className="py-1.5 text-right">
                                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold text-[7px]">Confirmed</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="mt-2 pt-1.5 border-t border-slate-100">
                          <span className="text-[8px] font-bold text-emerald-600 hover:underline cursor-pointer flex items-center gap-1">
                            View All Conversions →
                          </span>
                        </div>
                      </div>

                      {/* Earnings History Card */}
                      <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            <div>
                              <h4 className="text-xs font-bold text-slate-800 leading-none">Earnings History</h4>
                              <p className="text-[8px] text-slate-400 mt-0.5">All your earnings transactions</p>
                            </div>
                          </div>
                          <span className="text-[8px] font-bold text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded hover:bg-slate-50 cursor-pointer">
                            View All →
                          </span>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-[8px]">
                            <thead>
                              <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                                <th className="pb-1.5 font-medium">Date</th>
                                <th className="pb-1.5 font-medium">Description</th>
                                <th className="pb-1.5 font-medium">Merchant</th>
                                <th className="pb-1.5 font-medium">Commission</th>
                                <th className="pb-1.5 font-medium text-right">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 text-slate-700">
                              {[
                                { date: 'May 1, 2025', desc: 'Sale Commission', merchant: 'Nike', comm: '$24.50' },
                                { date: 'Apr 30, 2025', desc: 'Sale Commission', merchant: 'Amazon', comm: '$18.32' },
                                { date: 'Apr 29, 2025', desc: 'Sale Commission', merchant: 'Shein', comm: '$12.80' },
                                { date: 'Apr 28, 2025', desc: 'Sale Commission', merchant: 'AliExpress', comm: '$9.40' },
                                { date: 'Apr 27, 2025', desc: 'Sale Commission', merchant: 'Banggood', comm: '$7.25' },
                              ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                                  <td className="py-1.5 text-slate-500">{row.date}</td>
                                  <td className="py-1.5 text-slate-600">{row.desc}</td>
                                  <td className="py-1.5 font-semibold text-slate-800">{row.merchant}</td>
                                  <td className="py-1.5 font-bold text-slate-900">{row.comm}</td>
                                  <td className="py-1.5 text-right">
                                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold text-[7px]">Confirmed</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>

                    {/* Right 4 Columns */}
                    <div className="lg:col-span-4 space-y-2.5">
                      
                      {/* Top Performing Merchants Card */}
                      <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <Trophy className="w-3.5 h-3.5 text-slate-500" />
                          <div>
                            <h4 className="text-xs font-bold text-slate-800 leading-none">Top Performing Merchants</h4>
                            <p className="text-[8px] text-slate-400 mt-0.5">Based on earnings (last 7 days)</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {[
                            { rank: 1, name: 'Nike', iconBg: 'bg-black text-white font-black', iconText: '✓', val: '$162.48', pct: '33.7%' },
                            { rank: 2, name: 'Amazon', iconBg: 'bg-amber-100 text-amber-900 font-bold', iconText: 'a', val: '$118.32', pct: '24.5%' },
                            { rank: 3, name: 'Shein', iconBg: 'bg-black text-white font-bold', iconText: 'S', val: '$74.20', pct: '15.4%' },
                            { rank: 4, name: 'AliExpress', iconBg: 'bg-red-500 text-white font-bold', iconText: 'Ali', val: '$56.18', pct: '11.6%' },
                            { rank: 5, name: 'Banggood', iconBg: 'bg-orange-500 text-white font-bold', iconText: 'BG', val: '$41.28', pct: '8.6%' },
                          ].map((m) => (
                            <div key={m.rank} className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50 transition-colors">
                              <div className="flex items-center gap-2">
                                <span className="text-[8px] font-bold text-slate-400 w-2.5">{m.rank}</span>
                                <div className={`w-5 h-5 rounded-md ${m.iconBg} flex items-center justify-center text-[7px] shrink-0`}>
                                  {m.iconText}
                                </div>
                                <span className="text-[9px] font-bold text-slate-800">{m.name}</span>
                              </div>
                              <div className="text-right">
                                <div className="text-[9px] font-bold text-slate-900">{m.val}</div>
                                <div className="text-[7px] text-emerald-600 font-semibold">{m.pct} ▲</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-slate-100">
                          <span className="text-[8px] font-bold text-slate-600 hover:text-emerald-600 cursor-pointer flex items-center gap-1">
                            View All Merchants →
                          </span>
                        </div>
                      </div>

                      {/* Need Help? Card */}
                      <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <HelpCircle className="w-3 h-3" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-800 leading-none">Need Help?</h4>
                            <p className="text-[8px] text-slate-400 mt-0.5">Have feedback?</p>
                          </div>
                        </div>

                        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-2 text-[8px] text-slate-600 leading-relaxed">
                          We're always improving the dashboard. Share a feature request, report an issue, or tell us what would make your workflow better.
                        </div>

                        <button className="w-full py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[8px] font-bold text-slate-700 flex items-center justify-center gap-1 transition-colors">
                          <Mail className="w-3 h-3 text-slate-400" />
                          Contact us
                        </button>
                      </div>

                      {/* Payout Schedule Card */}
                      <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm space-y-2.5">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <div>
                            <h4 className="text-xs font-bold text-slate-800 leading-none">Payout Schedule</h4>
                            <p className="text-[8px] text-slate-400 mt-0.5">Your upcoming payments</p>
                          </div>
                        </div>

                        <div className="bg-emerald-50/40 border border-emerald-100/80 rounded-xl p-2.5 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[8px] text-slate-500">Pending Balance</span>
                            <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-700 font-bold text-[7px]">Processing</span>
                          </div>
                          <div className="text-xs font-extrabold text-emerald-700">$125.30</div>
                          <p className="text-[7px] text-slate-400">Expected by May 5, 2025</p>
                        </div>

                        <div className="bg-amber-50/40 border border-amber-100/80 rounded-xl p-2.5 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[8px] text-slate-500">Next Payout</span>
                            <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold text-[7px]">Scheduled</span>
                          </div>
                          <div className="text-xs font-extrabold text-amber-700">$216.48</div>
                          <p className="text-[7px] text-slate-400">May 12, 2025</p>
                        </div>

                        <div className="pt-1 border-t border-slate-100">
                          <span className="text-[8px] font-bold text-slate-600 hover:text-emerald-600 cursor-pointer flex items-center gap-1">
                            View Payouts →
                          </span>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Brand Logos Infinite Marquee Ticker (Same as Home Page) */}
      <section className="py-12 border-y border-slate-200 bg-white/60 overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center mb-6">
          <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest">
            Trusted by 30K+ brands and 1M+ partners worldwide
          </p>
        </div>
        <div className="relative w-full overflow-hidden flex py-1">
          <div className="flex animate-marquee-loop w-max shrink-0 text-slate-600 font-extrabold text-lg sm:text-xl uppercase tracking-widest select-none">
            {/* Set 1 */}
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Aviya Mattress</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Hume Health</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Jackery</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Sol De Janeiro</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Tymo Beauty</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Ape Born Fitness</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Red Magic</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Pulsetto</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Laifen</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Anta</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Foxy Locks</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Ulike</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Tenways</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Ugreen</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Bluetti</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Ritfit</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Pooch and Mutt</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Xlaserlab</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Aidous</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Akko</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Lit Farms</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Ihoverboard</span>

            {/* Set 2 (Duplicated for seamless loop) */}
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Aviya Mattress</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Hume Health</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Jackery</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Sol De Janeiro</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Tymo Beauty</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Ape Born Fitness</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Red Magic</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Pulsetto</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Laifen</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Anta</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Foxy Locks</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Ulike</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Tenways</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Ugreen</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Bluetti</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Ritfit</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Pooch and Mutt</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Xlaserlab</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Aidous</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Akko</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Lit Farms</span>
            <span className="flex items-center gap-2 hover:text-[#3b82f6] transition-colors duration-300 cursor-pointer pr-16 shrink-0"><span className="text-blue-600/40">✦</span> Ihoverboard</span>
          </div>
        </div>
        <style jsx>{`
          .animate-marquee-loop {
            display: flex;
            width: max-content;
            animation: marquee 45s linear infinite;
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