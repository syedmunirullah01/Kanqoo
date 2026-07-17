"use client";
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
  Target, Globe, Zap, Shield, ArrowRight, Check,
  TrendingUp, Users, DollarSign, Award, Sparkles
} from 'lucide-react';
import Link from 'next/link';

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#FAFBFD] pt-28 pb-16">

      {/* ─── Hero Section (Dark Card) ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative bg-gradient-to-br from-[#05070F] via-[#0A1128] to-[#12224A] rounded-[32px] p-8 md:p-20 text-center text-white overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB] font-sans flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-[#2563EB]/50" />
              ABOUT KANQOO
              <span className="w-8 h-px bg-[#2563EB]/50" />
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-sans leading-[1.15] tracking-tight">
              Where Brands Scale and Publishers <span className="text-[#2563EB]">Earn More</span> — Every Single Day
            </h1>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-medium">
              Kanqoo is the affiliate intelligence platform built for serious growth. We eliminate fraud, automate compliance, and connect the right publishers with the right brands — so every click counts and every commission is earned honestly.
            </p>
          </div>
        </div>
      </div>

      {/* ─── Four Pillars ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-[24px] p-8 border border-slate-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-300">
            <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider block mb-3 font-sans">Review</span>
            <h3 className="text-xl font-bold text-slate-900 mb-3 font-sans">Only Quality Publishers</h3>
            <p className="text-sm font-normal leading-relaxed" style={{color:'#475569'}}>
              Every publisher goes through a rigorous vetting process. No bots, no fakes — just real audiences that convert.
            </p>
          </div>
          <div className="bg-white rounded-[24px] p-8 border border-slate-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-300">
            <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider block mb-3 font-sans">Identify</span>
            <h3 className="text-xl font-bold text-slate-900 mb-3 font-sans">Every Click Has a Source</h3>
            <p className="text-sm font-normal leading-relaxed" style={{color:'#475569'}}>
              We trace every traffic source down to its origin. You always know where your conversions are coming from — no surprises.
            </p>
          </div>
          <div className="bg-white rounded-[24px] p-8 border border-slate-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-300">
            <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider block mb-3 font-sans">Control</span>
            <h3 className="text-xl font-bold text-slate-900 mb-3 font-sans">You Decide Who Promotes</h3>
            <p className="text-sm font-normal leading-relaxed" style={{color:'#475569'}}>
              Brands stay in control. Approve or block publishers instantly — your campaigns run only with partners you trust.
            </p>
          </div>
          <div className="bg-white rounded-[24px] p-8 border border-slate-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-300">
            <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider block mb-3 font-sans">Validate</span>
            <h3 className="text-xl font-bold text-slate-900 mb-3 font-sans">Commissions You Can Trust</h3>
            <p className="text-sm font-normal leading-relaxed" style={{color:'#475569'}}>
              Every conversion is verified before payout. Publishers earn what they deserve — no more, no less.
            </p>
          </div>
        </div>
      </div>

      {/* ─── Why Kanqoo (Two Columns) ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid lg:grid-cols-12 gap-12 items-start py-8">
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-2 block font-sans">WHY KANQOO</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-[1.2] font-sans">
              Stop Guessing. Start Growing with Affiliates You Can Actually Trust.
            </h2>
            <div className="w-12 h-1 bg-[#2563EB] rounded-full mt-4" />
          </div>
          <div className="lg:col-span-7 space-y-6 font-sans text-base leading-relaxed font-normal" style={{color:'#334155'}}>
            <p style={{color:'#334155'}}>
              Most affiliate networks are black boxes — brands don't know who's promoting them, and publishers don't know why they're getting rejected. Kanqoo changes that. We built a platform where every decision is transparent, every partner is verified, and every rupee is accounted for.
            </p>
            <p style={{color:'#334155'}}>
              Publishers on Kanqoo get clear campaign briefs, instant tracking links, real-time dashboards, and on-time payouts. No waiting. No confusion. Just results. Advertisers get the peace of mind that their brand is in safe hands — promoted only by creators and media that meet their standards.
            </p>
            <p style={{color:'#334155'}}>
              Whether you're a brand looking to scale or a creator ready to monetize — Kanqoo gives you the infrastructure, the intelligence, and the partnerships to grow faster than you thought possible.
            </p>
          </div>
        </div>
      </div>

      {/* ─── Values Section (Dark Card) ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="relative bg-gradient-to-br from-[#05070F] via-[#0A1128] to-[#12224A] rounded-[32px] p-8 md:p-20 text-white overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB] font-sans flex items-center justify-center gap-2">
                <span className="w-8 h-px bg-[#2563EB]/50" />
                OUR VALUES
                <span className="w-8 h-px bg-[#2563EB]/50" />
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white font-sans">
                Built on Values That Make Every Partnership Unbreakable
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium">
                We don't just connect brands and publishers — we hold both sides accountable. These are the non-negotiables that make Kanqoo a network you can stake your reputation on.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Shield, color: '#2563EB', title: 'Zero Tolerance for Fraud', desc: 'We block bots, fake clicks, and bad actors before they ever touch your campaigns. Your budget is protected — always.' },
                { icon: Globe, color: '#2563EB', title: 'Radical Transparency', desc: 'No hidden fees, no mystery traffic. Every publisher, every click, every conversion is visible to you in real time.' },
                { icon: Zap, color: '#2563EB', title: 'Speed That Scales With You', desc: '99.9% uptime. Real-time tracking. Instant link generation. Our infrastructure is built for volume — so you never miss a conversion.' },
                { icon: Target, color: '#2563EB', title: 'Publishers Paid on Time, Every Time', desc: 'Verified conversions, automated payouts, zero disputes. We make sure creators get paid what they\'ve earned — no exceptions.' },
              ].map((v, i) => {
                const Icon = v.icon;
                return (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#2563EB] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2 font-sans">{v.title}</h4>
                      <p className="text-sm text-slate-300 leading-relaxed font-medium">{v.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Departments ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB] font-sans flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-[#2563EB]/30" />
            THE TEAM BEHIND THE PLATFORM
            <span className="w-8 h-px bg-[#2563EB]/30" />
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-sans">Real People. Real Support. Real Results.</h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium font-sans">
            Behind every great partnership is a dedicated team working around the clock to make Kanqoo the most trusted affiliate network in the market.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { badge: 'PO', title: 'Publisher Success', sub: 'Onboarding & Growth', desc: 'We guide every publisher from signup to first commission — with hands-on support and optimization tips that actually work.' },
            { badge: 'CR', title: 'Brand Protection', sub: 'Quality & Safety', desc: 'Our compliance team reviews every campaign, publisher, and traffic source 24/7. Your brand reputation is never at risk.' },
            { badge: 'PA', title: 'Smart Matchmaking', sub: 'Brand–Publisher Fit', desc: 'We don\'t just connect brands with publishers — we find the perfect fit. Higher relevance means higher conversions.' },
            { badge: 'PS', title: 'Always-On Tech', sub: 'Reliability & Speed', desc: 'From tracking infrastructure to payout automation — our tech team ensures zero downtime so campaigns never stop.' },
          ].map((d, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-md transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xl font-bold mb-6 shadow-md font-sans">
                {d.badge}
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-1 font-sans">{d.title}</h4>
              <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider mb-3 block font-sans">{d.sub}</span>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          🎁 GIFT SECTION — Live Stats + Premium CTA
      ════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Users, value: 12000, suffix: '+', label: 'Active Publishers', color: '#2563EB' },
            { icon: Award, value: 580, suffix: '+', label: 'Partner Brands', color: '#2563EB' },
            { icon: DollarSign, value: 50, prefix: '$', suffix: 'M+', label: 'Commissions Paid', color: '#2563EB' },
            { icon: TrendingUp, value: 4, suffix: 'M+', label: 'Conversions Tracked', color: '#2563EB' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-[20px] p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <Icon className="w-5 h-5 mx-auto mb-3 text-[#2563EB] opacity-70" />
                <div className="text-3xl font-black text-slate-900 font-sans tracking-tight">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix || ''} />
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1 font-sans">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Premium CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-gradient-to-br from-[#05070F] via-[#0A1128] to-[#12224A] rounded-[32px] overflow-hidden shadow-2xl"
        >
          {/* Animated grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
          {/* Glow blobs */}
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-blue-600/15 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-600/10 blur-[60px] rounded-full pointer-events-none" />
          {/* Spinning ring */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-blue-500/10 animate-spin [animation-duration:25s] pointer-events-none hidden md:block" />
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-52 h-52 rounded-full border border-blue-500/5 animate-spin [animation-duration:15s] [animation-direction:reverse] pointer-events-none hidden md:block" />

          <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
            {/* Left text */}
            <div className="flex-1 space-y-6 text-white">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400 font-sans">
                <Sparkles className="w-3.5 h-3.5" />
                Limited Invitations Available
              </div>
              <h2 className="text-3xl md:text-5xl font-black font-sans leading-tight">
                Ready to Earn More<br />and Scale Faster?
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium max-w-xl">
                Join thousands of publishers and brands already growing on Kanqoo. Verified campaigns. Transparent payouts. Zero guesswork. Your next big win starts here.
              </p>
              {/* Trust bullets */}
              <div className="flex flex-wrap gap-4 pt-2">
                {['No Upfront Cost', 'Instant Access', 'Performance-Based Earnings', '24/7 Support'].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-300 text-sm font-semibold font-sans">
                    <div className="w-5 h-5 rounded-full border border-blue-500/30 flex items-center justify-center bg-blue-500/10">
                      <Check className="w-3 h-3 text-blue-400 stroke-[3]" />
                    </div>
                    {f}
                  </div>
                ))}
              </div>
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95 text-sm font-sans"
                >
                  Get Your Invitation Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-1 text-slate-400 hover:text-white text-sm font-semibold font-sans transition-colors duration-200"
                >
                  Talk to our team →
                </Link>
              </div>
            </div>

            {/* Right visual: live metrics card */}
            <div className="shrink-0 w-full md:w-72 space-y-3">
              {/* Mini dashboard card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-sans">Live Network Stats</span>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                </div>
                {[
                  { label: 'Publishers Online', value: '3,841', bar: 82 },
                  { label: 'Campaigns Active', value: '214', bar: 65 },
                  { label: 'Conversions Today', value: '18,920', bar: 91 },
                ].map((row, i) => (
                  <div key={i} className="mb-3 last:mb-0">
                    <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5 font-sans">
                      <span>{row.label}</span>
                      <span className="text-white">{row.value}</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.bar}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Payout notification */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3 backdrop-blur-sm"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white font-sans">Payout Sent ✓</p>
                  <p className="text-[11px] text-slate-400 font-sans">@publisher_pro earned $2,840</p>
                </div>
                <span className="text-[10px] text-slate-500 font-sans ml-auto shrink-0">just now</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
