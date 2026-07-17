"use client";
import { Sparkles, Users, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function WorldwideCreators() {
  const steps = [
    {
      step: "1",
      title: "Join us as Advertiser",
      desc: "Complete our seamless signup, define your campaign verticals, and set your CPA target."
    },
    {
      step: "2",
      title: "Connect with Publishers",
      desc: "Our automated matcher connects your briefs with verified niche publishers."
    },
    {
      step: "3",
      title: "Watch your sales scale",
      desc: "Native integration videos go live. Pay only for conversions verified by our shield."
    }
  ];

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden border-t border-slate-100">
      
      {/* Soft Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-blue-50/20 blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100/50">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest">Simple Setup</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-sans leading-tight">
            Easy steps, <br />
            endless <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">possibilities</span>
          </h2>
          <p className="text-sm md:text-base text-slate-505 max-w-xl mx-auto">
            Get your campaigns up and running in minutes, and pay only when customers convert.
          </p>
        </div>

        {/* 3 Steps Timeline Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24">
          {steps.map((st, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 hover:border-slate-300 hover:shadow-[0_15px_40px_rgba(37,99,235,0.03)] transition-all duration-300 group text-left space-y-6"
            >
              {/* Step number marker */}
              <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-black font-sans text-sm">
                {st.step}
              </div>

              {/* Title & Desc */}
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 font-sans tracking-tight">
                  {st.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Global Strategy Booking CTA Panel - Pre-Footer */}
        <div className="text-center max-w-5xl mx-auto">
          <div className="bg-[#0B0F19] rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            
            {/* Ambient Background Light inside Card */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="space-y-3 max-w-xl z-10">
              <h3 className="text-2xl md:text-3xl font-black text-white font-sans leading-snug">
                Become a Top-Performing <br />
                Advertiser Partner.
              </h3>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                Connect with thousands of publishers, safeguard your advertising budget with our anti-fraud checks, and only pay on conversion results.
              </p>
            </div>

            <div className="flex-shrink-0 z-10">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4.5 rounded-full text-xs transition-all duration-300 shadow-md hover:-translate-y-0.5 uppercase tracking-widest flex items-center gap-2">
                <span>Get Started Today</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
