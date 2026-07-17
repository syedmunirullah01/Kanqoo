"use client";
import { Sparkles, Users, TrendingUp, BarChart3, Target, ShieldCheck, Zap, Activity } from 'lucide-react';

export default function WhyKanqoo() {
  
  const features = [
    {
      icon: Users,
      title: "Premium Publishers",
      description: "Connect with top-tier vetted influencers across Instagram, YouTube, TikTok, and Telegram.",
      color: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      icon: TrendingUp,
      title: "Increase Sales",
      description: "Boost conversions and acquire new customers using target native video integrations.",
      color: "text-indigo-600 bg-indigo-50 border-indigo-100"
    },
    {
      icon: BarChart3,
      title: "Actionable Insights",
      description: "Monitor real-time sales metrics, conversion status, and publisher ROI inside your dashboard.",
      color: "text-sky-600 bg-sky-50 border-sky-100"
    },
    {
      icon: Target,
      title: "Targeted Marketing",
      description: "Filter and match publishers precisely by category vertical, geographic location, and platform.",
      color: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      icon: ShieldCheck,
      title: "Fraud Protection",
      description: "Our proprietary verification shield detects and eliminates bot clicks, protecting your budget.",
      color: "text-indigo-600 bg-indigo-50 border-indigo-100"
    },
    {
      icon: Zap,
      title: "Brand Visibility",
      description: "Elevate your brand trust through high-relatability native reviews created by creators.",
      color: "text-sky-600 bg-sky-50 border-sky-100"
    }
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden border-t border-slate-100">
      
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-blue-50/20 blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100/55">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest">Platform Features</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-sans leading-tight">
            Features that help <br />
            brands <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">scale</span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto">
            A comprehensive suite of tools built to optimize, protect, and scale your publisher marketing campaigns.
          </p>
        </div>

        {/* Features 3x2 Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-50/50 border border-slate-200/60 rounded-3xl p-8 hover:bg-white hover:border-slate-300 hover:shadow-[0_15px_40px_rgba(37,99,235,0.03)] transition-all duration-300 group text-left space-y-5"
              >
                {/* Icon box */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${feat.color} group-hover:scale-105 transition-transform duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 font-sans tracking-tight">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}