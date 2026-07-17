"use client";
import { useEffect, useState } from 'react';
import { Target, ArrowRight, Sparkles, TrendingUp, Users, ShieldCheck, Zap, Activity, DollarSign } from 'lucide-react';
import { FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function Hero() {
  const [counters, setCounters] = useState({ roi: 1.0, reach: 50, conversions: 1000 });

  // Counting numbers on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setCounters({
        roi: parseFloat((1.0 + (4.2 * step / steps)).toFixed(1)),
        reach: Math.round(50 + (250 * step / steps)),
        conversions: Math.round(1000 + (17294 * step / steps))
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-slate-50 overflow-hidden pt-28 pb-16 flex flex-col justify-between">
      
      {/* Background Soft Glow Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-blue-200/30 to-indigo-100/10 blur-[100px] animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tr from-sky-100/40 to-transparent blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full flex-1 flex items-center">
        <div className="grid lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Column: Heading & Buttons */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            {/* Vetted badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-sm animate-fade-in">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Advertiser Network</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.15] font-sans tracking-tight">
                Boost <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">SALES</span> <br />
                with Top-Performing <br />
                Publishers.
              </h1>
              <p className="text-base md:text-lg text-slate-500 font-medium max-w-lg leading-relaxed">
                Connect with verified content creators who drive real results. Scale your advertiser campaigns with a <span className="text-slate-900 font-bold">100% risk-free performance model</span>.
              </p>
            </div>

            {/* Pill CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4.5 rounded-full text-xs transition-all duration-300 shadow-[0_10px_25px_rgba(15,23,42,0.15)] hover:shadow-[0_15px_30px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 flex items-center justify-center gap-2 uppercase tracking-widest">
                <span>Book Strategy Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a href="#explore-benefits" className="px-6 py-4.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs text-center transition-all duration-300 uppercase tracking-widest">
                Explore Benefits
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap md:flex-nowrap items-center gap-6 md:gap-8 pt-6 border-t border-slate-200/60 max-w-xl">
              <div className="flex-1 min-w-[100px]">
                <div className="text-2xl md:text-3xl font-black text-slate-900 font-sans tracking-tight leading-none">{counters.roi}x</div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2 leading-none">Average ROI</div>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden md:block"></div>
              <div className="flex-1 min-w-[110px]">
                <div className="text-2xl md:text-3xl font-black text-slate-900 font-sans tracking-tight leading-none">{counters.reach}M+</div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2 leading-none">Global Reach</div>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden md:block"></div>
              <div className="flex-1 min-w-[120px]">
                <div className="text-2xl md:text-3xl font-black text-slate-900 font-sans tracking-tight leading-none">{counters.conversions.toLocaleString()}</div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2 leading-none">Conversions</div>
              </div>
            </div>

          </div>

          {/* Right Column: Phone Mockup & Float Widgets */}
          <div className="lg:col-span-6 relative flex justify-center">
            {/* Background Glow Ring */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/5 rounded-[48px] blur-3xl -z-10 animate-pulse"></div>

            {/* Device Container */}
            <div className="w-[300px] bg-white border border-slate-200 shadow-[0_25px_60px_rgba(37,99,235,0.06)] rounded-[44px] p-6 relative overflow-hidden">
              
              {/* Camera Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-slate-900 rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800 ml-auto mr-3"></div>
              </div>

              {/* Mockup Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 pt-4 mb-4">
                <div>
                  <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Dashboard</div>
                  <div className="text-sm font-black text-slate-900 font-sans">Kanqoo App</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <Activity className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                </div>
              </div>

              {/* Chart Section */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-left">
                <div className="flex justify-between items-center text-[8px] font-bold text-slate-400 uppercase">
                  <span>Conversions Rate</span>
                  <span className="text-blue-600">+18%</span>
                </div>
                <div className="text-lg font-black text-slate-900 font-sans mt-0.5">$18,294</div>

                {/* Graph bars */}
                <div className="h-14 flex items-end gap-1.5 pt-3">
                  {[20, 35, 25, 45, 30, 60, 40, 75, 55, 90].map((val, idx) => (
                    <div key={idx} className="flex-1 bg-blue-100 rounded-t-sm h-full flex flex-col justify-end">
                      <div 
                        className={`w-full rounded-t-sm bg-gradient-to-t ${idx === 9 ? 'from-blue-600 to-indigo-500' : 'from-blue-500 to-sky-400'}`} 
                        style={{ height: `${val}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* List of Matched Sales */}
              <div className="space-y-2 mt-4 text-left">
                <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Matched Conversions</div>
                
                {[
                  { name: '@outfitreport', amount: '+$42.50', time: 'Just now', logo: 'from-pink-500 to-purple-600', p: FaInstagram },
                  { name: '@beauty_sarah', amount: '+$28.00', time: '2m ago', logo: 'from-purple-500 to-fuchsia-600', p: FaInstagram },
                  { name: '@tech_tom', amount: '+$85.00', time: '5m ago', logo: 'from-black to-slate-800', p: FaTiktok }
                ].map((act, aIdx) => {
                  const PlatIcon = act.p;
                  return (
                    <div key={aIdx} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${act.logo} flex items-center justify-center text-[10px] text-white font-black font-sans relative`}>
                          {act.name.charAt(1).toUpperCase()}
                          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-white rounded-full flex items-center justify-center border border-slate-50">
                            <PlatIcon className="w-1.5 h-1.5 text-slate-600" />
                          </span>
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-slate-800">{act.name}</div>
                          <div className="text-[8px] text-slate-400">{act.time}</div>
                        </div>
                      </div>
                      <div className="text-right text-[10px] font-black text-blue-600 font-sans">
                        {act.amount}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Floating Trust badge on the side */}
            <div className="absolute top-1/4 -right-6 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-left">
                <div className="text-[9px] font-bold text-slate-400 uppercase">Traffic Verified</div>
                <div className="text-xs font-black text-slate-800 font-sans">100% Genuine</div>
              </div>
            </div>
            
            {/* Floating ROI badge on the side */}
            <div className="absolute bottom-1/4 -left-6 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <Zap className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="text-[9px] font-bold text-slate-400 uppercase">Acquisition</div>
                <div className="text-xs font-black text-slate-800 font-sans">Risk-Free CPA</div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Brand Logos showcasing strip */}
      <div className="w-full bg-white border-t border-slate-200/60 py-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 max-w-5xl mx-auto">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trusted by thousands of leading brands</span>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-65 grayscale hover:grayscale-0 transition-all">
              {/* Brand 1: NordVPN */}
              <div className="flex items-center gap-1.5 font-bold text-slate-800 text-sm font-sans tracking-tighter">
                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[9px] font-black">N</div>
                <span>NordVPN</span>
              </div>
              {/* Brand 2: TARGET */}
              <div className="flex items-center gap-1.5 font-black text-rose-600 text-sm tracking-tight font-sans">
                <div className="w-5 h-5 rounded-full border-[4px] border-rose-600 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-rose-600"></div></div>
                <span>TARGET</span>
              </div>
              {/* Brand 3: SEPHORA */}
              <div className="font-serif text-slate-900 tracking-[0.2em] font-black text-sm">
                SEPHORA
              </div>
              {/* Brand 4: Hostinger */}
              <div className="flex items-center gap-1 font-bold text-slate-700 text-sm font-sans">
                <span className="text-purple-600 font-black">H</span>ostinger
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}