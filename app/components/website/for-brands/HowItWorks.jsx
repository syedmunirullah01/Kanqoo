"use client";
import { Check, Target, TrendingUp, Users, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function HowItWorks() {
  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden border-t border-slate-100 space-y-32">
      
      {/* Soft Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-blue-100/30 blur-[100px]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-indigo-100/20 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        
        {/* Section 1: A Global Solution */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: UI Mockup */}
          <div className="relative order-2 lg:order-1 flex justify-center">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-blue-100/30 rounded-[32px] blur-2xl -z-10 animate-pulse"></div>

            {/* Dashboard Mockup Panel */}
            <div className="w-full max-w-[440px] bg-white border border-slate-200/80 shadow-[0_20px_50px_rgba(37,99,235,0.04)] rounded-3xl p-6 text-left space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Campaigns Overview</span>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Active</span>
              </div>

              {/* Creator Match Card list */}
              <div className="space-y-3">
                {[
                  { name: 'YouTube Tech Review', tag: 'Tech', status: 'Matched', pct: '98%', logo: FaYoutube, color: 'text-red-500 bg-red-50' },
                  { name: 'Instagram Summer Fashion', tag: 'Fashion', status: 'Live', pct: '95%', logo: FaInstagram, color: 'text-pink-500 bg-pink-50' },
                  { name: 'TikTok Gadget Unboxing', tag: 'Gadgets', status: 'Review', pct: '92%', logo: FaTiktok, color: 'text-slate-800 bg-slate-100' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                        <item.logo className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">{item.name}</div>
                        <div className="text-[9px] text-slate-400 font-semibold">{item.tag} • {item.status}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-100/60 px-2 py-0.5 rounded-full">{item.pct} Match</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Metric Bar */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>ROI Attained</span>
                  <span className="text-slate-900 font-sans font-black">5.2x Avg</span>
                </div>
                <div className="w-full h-2 bg-slate-200/60 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Copywriting */}
          <div className="space-y-6 text-left order-1 lg:order-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest">
              Global Platform
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 font-sans leading-snug">
              A Global Solution for <br />
              Your Brand
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              We provide the technology, tracking infrastructure, and vetted creator relationships needed to coordinate, deploy, and verify influencer campaigns at massive global scale.
            </p>

            {/* Checklist */}
            <div className="space-y-3.5 pt-2">
              {[
                { title: "Vetted Content Creators", desc: "Access verified publishers matching your niche." },
                { title: "Performance Analytics", desc: "Monitor views, conversion tracking, and ROI live." },
                { title: "Optimized CPA Payouts", desc: "Pay only for authentic customer acquisitions." }
              ].map((bullet, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans">{bullet.title}</h4>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">{bullet.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Section 2: Increase Your Sales with Kanqoo */}
        <div className="grid lg:grid-cols-2 gap-16 items-center pt-12">
          
          {/* Left Column: Copywriting */}
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest">
              Performance Driven
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 font-sans leading-snug">
              Increase Your Sales <br />
              with Kanqoo.
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Say goodbye to upfront campaign expenses and wasted brand impressions. Scale your business leveraging creators who are rewarded specifically when they deliver sales.
            </p>

            {/* Checklist */}
            <div className="space-y-3.5 pt-2">
              {[
                { title: "Zero Setup Cost", desc: "Create campaigns and publish briefings at no charge." },
                { title: "Pay-On-Results model", desc: "You are billed only for successful verified actions." },
                { title: "Scale Worldwide", desc: "Deploy campaigns in multiple countries instantly." }
              ].map((bullet, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans">{bullet.title}</h4>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">{bullet.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4.5 rounded-full text-xs transition-all duration-300 shadow-md hover:-translate-y-0.5 uppercase tracking-widest flex items-center gap-2">
                <span>Become an Advertiser</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Photo + Floating Widgets */}
          <div className="relative flex justify-center">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-indigo-100/30 rounded-[32px] blur-2xl -z-10 animate-pulse"></div>

            {/* Photo Container */}
            <div className="w-[300px] aspect-[3/4] rounded-[36px] bg-slate-200 overflow-hidden relative border border-slate-200 shadow-xl">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
            </div>

            {/* Floating Card: Earnings widget */}
            <div className="absolute bottom-6 -left-6 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl text-left min-w-[160px] space-y-2">
              <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Acquisition Sales</div>
              <div className="text-base font-black text-slate-900 font-sans">$9,250.00</div>
              <div className="flex items-center gap-2 border-t border-slate-100 pt-2 text-[9px] text-slate-500 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Visa *4821</span>
              </div>
            </div>

            {/* Floating Card: Stats widget */}
            <div className="absolute top-1/4 -right-6 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl text-left min-w-[150px] space-y-1">
              <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Conversions</div>
              <div className="text-sm font-black text-emerald-600 font-sans">+128%</div>
              <div className="text-[9px] text-slate-400 font-semibold">12 Active Publishers</div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}