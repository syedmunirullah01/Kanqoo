"use client";
import { useState } from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, Zap, Globe, DollarSign } from 'lucide-react';

export default function Experience() {
  const [activeTab, setActiveTab] = useState('publishers');

  const tabContents = {
    publishers: {
      title: "Vetted Creator Network",
      desc: "Connect directly with publishers matching your brand guidelines.",
      bullets: [
        "Direct access to 150K+ vetted publishers globally",
        "Target creators by location, vertical, and channel size",
        "Publish briefings and get automated video submissions"
      ]
    },
    campaigns: {
      title: "Real-time Campaigns",
      desc: "Deploy, track, and optimize influencer video campaigns live.",
      bullets: [
        "Go live with automated tracking links in under 10 minutes",
        "Track views, clicks, and conversions in real-time",
        "Centralized brief management and asset approval workflows"
      ]
    },
    verification: {
      title: "Anti-Fraud Safeguards",
      desc: "Our shield ensures you pay only for genuine customer interest.",
      bullets: [
        "Detect and eliminate bot clicks and simulator traffic",
        "100% verified human traffic on your landing pages",
        "IP signature matching and duplicate action filtering"
      ]
    },
    payouts: {
      title: "Performance Payments",
      desc: "Zero budget leakage. Pay specifically on verified conversions.",
      bullets: [
        "100% risk-free CPA payout structure",
        "Automatic invoice generation based on verified conversions",
        "Detailed performance payouts breakdown per publisher"
      ]
    }
  };

  const currentTab = tabContents[activeTab];

  return (
    <section id="explore-benefits" className="relative py-24 bg-white overflow-hidden border-t border-slate-100">
      
      {/* Background Soft Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-[-10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-blue-50/20 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        
        {/* Top Header & Big Stats Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-20">
          <div className="space-y-4 text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest">B2B Performance</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-sans leading-snug">
              Trusted by Brands, <br />
              Driven by Performance
            </h2>
          </div>

          {/* Large Stat Indicators */}
          <div className="flex gap-6 flex-wrap">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 min-w-[140px] text-left">
              <div className="text-3xl font-black text-blue-600 font-sans">98%</div>
              <div className="text-[9px] font-bold text-slate-505 uppercase tracking-wider mt-1">Customer Engagement</div>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 min-w-[140px] text-left">
              <div className="text-3xl font-black text-blue-600 font-sans">25%+</div>
              <div className="text-[9px] font-bold text-slate-505 uppercase tracking-wider mt-1">Sales Increase</div>
            </div>
          </div>
        </div>

        {/* Dynamic Benefits Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Image with Thumbs Up style */}
          <div className="relative flex justify-center">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-blue-100/30 rounded-[32px] blur-2xl -z-10 animate-pulse"></div>

            {/* Photo box */}
            <div className="w-full max-w-[340px] aspect-[4/5] rounded-[36px] bg-slate-100 overflow-hidden relative border border-slate-200 shadow-xl">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
            </div>

            {/* Small floating badge */}
            <div className="absolute -bottom-6 -right-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl text-left flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-[9px] font-bold text-slate-400 uppercase">Payout System</div>
                <div className="text-xs font-black text-slate-800 font-sans">Verified ROI</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Tabs and Checklist */}
          <div className="space-y-6 text-left">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Benefits with Kanqoo</div>
            
            {/* Tab Bar */}
            <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3">
              {['publishers', 'campaigns', 'verification', 'payouts'].map((tabKey) => (
                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className={`py-2 px-4 rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${
                    activeTab === tabKey
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-50 border border-slate-200/60 text-slate-505 hover:bg-slate-100'
                  }`}
                >
                  {tabKey}
                </button>
              ))}
            </div>

            {/* Dynamic Content */}
            <div className="space-y-4 transition-all duration-300">
              <div>
                <h4 className="text-lg font-bold text-slate-900 font-sans">{currentTab.title}</h4>
                <p className="text-xs text-slate-500 mt-1 font-medium">{currentTab.desc}</p>
              </div>

              {/* Bullet Points */}
              <div className="space-y-3 pt-2">
                {currentTab.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-xs text-slate-600 font-semibold leading-relaxed">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Strategy Session link */}
            <div className="pt-4 flex items-center gap-4">
              <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4.5 rounded-full text-xs transition-all duration-300 shadow-md uppercase tracking-widest flex items-center gap-2">
                <span>Book Free Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}