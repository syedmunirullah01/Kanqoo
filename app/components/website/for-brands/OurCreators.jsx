"use client";
import { Sparkles, Shirt, ShoppingCart, Laptop, BadgeDollarSign, PlaneTakeoff, Home, ArrowRight } from 'lucide-react';

export default function OurCreators() {
  const sectors = [
    {
      icon: Shirt,
      title: "Fashion & Apparel",
      desc: "Promoted by style bloggers and wardrobe curators. High conversion native lookbooks.",
      roi: "4.8x ROI",
      color: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      icon: ShoppingCart,
      title: "Retail & E-commerce",
      desc: "Multi-category catalog promotions, product unboxings, and direct checkout conversions.",
      roi: "5.2x ROI",
      color: "text-indigo-600 bg-indigo-50 border-indigo-100"
    },
    {
      icon: Laptop,
      title: "Tech & Gadgets",
      desc: "Detailed consumer hardware tests, setup guides, and software installation reviews.",
      roi: "6.2x ROI",
      color: "text-sky-600 bg-sky-50 border-sky-100"
    },
    {
      icon: BadgeDollarSign,
      title: "Finance & Services",
      desc: "App installations, credit card signups, banking setups, and premium trading tutorials.",
      roi: "5.8x ROI",
      color: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      icon: PlaneTakeoff,
      title: "Travel & Hospitality",
      desc: "Resort walkthroughs, baggage reviews, local tour guides, and airline booking integrations.",
      roi: "5.0x ROI",
      color: "text-indigo-600 bg-indigo-50 border-indigo-100"
    },
    {
      icon: Home,
      title: "Home & Decor",
      desc: "Interior architecture vloggers, smart appliance reviews, and kitchen setup recommendations.",
      roi: "4.4x ROI",
      color: "text-sky-600 bg-sky-50 border-sky-100"
    }
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden border-t border-slate-100">
      
      {/* Soft Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-indigo-50/20 blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100/50">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest">Campaign Verticals</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-sans leading-tight">
            Top-Performing Sectors <br />
            on <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Kanqoo</span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto">
            Discover the verticals where our content publishers drive the highest conversion volume and brand engagement.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {sectors.map((sec, idx) => {
            const SectorIcon = sec.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-slate-200/80 rounded-3xl p-6.5 hover:border-slate-300 hover:shadow-[0_15px_40px_rgba(37,99,235,0.04)] transition-all duration-300 group text-left flex flex-col justify-between min-h-[220px]"
              >
                <div className="space-y-4">
                  {/* Icon Box */}
                  <div className="flex justify-between items-center">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${sec.color} group-hover:scale-105 transition-transform duration-300`}>
                      <SectorIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-blue-600 font-sans bg-blue-50 px-2 py-0.5 rounded-full">
                      {sec.roi}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900 font-sans tracking-tight">
                      {sec.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      {sec.desc}
                    </p>
                  </div>
                </div>

                {/* Footer link */}
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors uppercase tracking-widest pt-4 border-t border-slate-100/60 mt-4 cursor-pointer">
                  <span>Explore Creators</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}