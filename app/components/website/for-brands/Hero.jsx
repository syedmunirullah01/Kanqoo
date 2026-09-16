"use client";
import { useEffect, useState } from 'react';
import { 
  Target, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Zap, 
  Activity, 
  DollarSign,
  Megaphone,
  Bell,
  MousePointer,
  BarChart3,
  Percent,
  Trophy,
  Headphones,
  PieChart,
  Wallet,
  Calendar,
  ChevronDown,
  ChevronRight,
  Mail,
  Grid,
  Plus,
  Search
} from 'lucide-react';
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

          {/* Right Column: Advertiser Dashboard Live Mockup (Image 2 design) */}
          <div className="lg:col-span-6 w-full relative">
            <div className="relative bg-[#f4f9f6] rounded-3xl border border-emerald-100/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 hover:shadow-[0_30px_70px_rgba(16,185,129,0.08)] flex flex-col h-[600px] w-full text-[10px] font-sans">
              
              {/* 1. Top Navigation Bar */}
              <div className="bg-white border-b border-emerald-100/60 px-4 py-2.5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-6">
                  <span className="text-sm font-extrabold text-slate-900 tracking-tight lowercase">KanQoo</span>
                  <nav className="flex items-center gap-4 text-[11px] font-medium text-slate-500">
                    <span className="text-emerald-600 font-bold border-b-2 border-emerald-500 pb-0.5 cursor-pointer">Dashboard</span>
                    <span className="hover:text-slate-800 cursor-pointer">Campaigns</span>
                    <span className="hover:text-slate-800 cursor-pointer">Partners</span>
                    <span className="hover:text-slate-800 cursor-pointer">Analytics</span>
                    <span className="hover:text-slate-800 cursor-pointer">Payouts</span>
                    <span className="hover:text-slate-800 cursor-pointer">Settings</span>
                  </nav>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 cursor-pointer">
                    <Bell className="w-3.5 h-3.5" />
                  </div>
                  <div className="w-6.5 h-6.5 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-[10px] shadow-sm">
                    A
                  </div>
                </div>
              </div>

              {/* Scrollable Dashboard Body */}
              <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
                
                {/* 2. Welcome Banner & Active Pill */}
                <div className="flex items-start justify-between bg-gradient-to-r from-emerald-50/80 via-white to-emerald-50/40 p-3 rounded-2xl border border-emerald-100/60">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Megaphone className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 leading-tight">Advertiser Dashboard</h3>
                      <p className="text-[9px] text-slate-500 mt-0.5 max-w-sm">Track your campaigns, monitor performance, manage partners and grow your business with KanQoo.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100/80 text-emerald-700 font-bold text-[9px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Campaigns Active
                    </span>
                    <div className="flex items-center gap-1 bg-white border border-slate-200 px-2 py-1 rounded-lg text-[9px] text-slate-600 font-medium">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>Last 7 Days</span>
                      <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
                    </div>
                  </div>
                </div>

                {/* 3. Top 4 Primary KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {/* Total Spend */}
                  <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1.5">
                      <DollarSign className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Total Spend</span>
                      <span className="text-sm font-extrabold text-slate-900 font-sans">$4,892.35</span>
                    </div>
                    <div className="text-[8px] font-semibold text-emerald-600 mt-1 flex items-center gap-0.5">
                      <span>▲ +12.4%</span>
                      <span className="text-slate-400 font-normal">vs. previous 7 days</span>
                    </div>
                  </div>

                  {/* Total Conversions */}
                  <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-1.5">
                      <MousePointer className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Total Conversions</span>
                      <span className="text-sm font-extrabold text-slate-900 font-sans">1,248</span>
                    </div>
                    <div className="text-[8px] font-semibold text-emerald-600 mt-1 flex items-center gap-0.5">
                      <span>▲ +18.7%</span>
                      <span className="text-slate-400 font-normal">vs. previous 7 days</span>
                    </div>
                  </div>

                  {/* Revenue Generated */}
                  <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className="w-7 h-7 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mb-1.5">
                      <BarChart3 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Revenue Generated</span>
                      <span className="text-sm font-extrabold text-slate-900 font-sans">$12,430.76</span>
                    </div>
                    <div className="text-[8px] font-semibold text-emerald-600 mt-1 flex items-center gap-0.5">
                      <span>▲ +22.1%</span>
                      <span className="text-slate-400 font-normal">vs. previous 7 days</span>
                    </div>
                  </div>

                  {/* ROAS */}
                  <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-1.5">
                      <Percent className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">ROAS</span>
                      <span className="text-sm font-extrabold text-slate-900 font-sans">2.54x</span>
                    </div>
                    <div className="text-[8px] font-semibold text-emerald-600 mt-1 flex items-center gap-0.5">
                      <span>▲ +16.3%</span>
                      <span className="text-slate-400 font-normal">vs. previous 7 days</span>
                    </div>
                  </div>
                </div>

                {/* 4. Secondary 2 Stat Cards */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Active Partners</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs font-bold text-slate-900">48</span>
                        <span className="text-[8px] text-emerald-600 font-medium">+6 new this week</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Fraud Protection</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-bold text-slate-900">100%</span>
                        <span className="text-[8px] text-slate-400 font-medium">Clean traffic. No fraud detected.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Main 2-Column Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5">
                  
                  {/* Left 8 Columns */}
                  <div className="lg:col-span-8 space-y-2.5">
                    
                    {/* Performance Overview Chart Card */}
                    <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
                          <div>
                            <h4 className="text-xs font-bold text-slate-800 leading-none">Performance Overview</h4>
                            <p className="text-[8px] text-slate-400 mt-0.5">Your campaign performance over the last 7 days</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[8px] font-semibold">
                          <span className="px-2 py-0.5 rounded bg-white text-emerald-700 shadow-sm cursor-pointer">Spend</span>
                          <span className="px-2 py-0.5 text-slate-500 cursor-pointer">Conversions</span>
                          <span className="px-2 py-0.5 text-slate-500 cursor-pointer">Revenue</span>
                        </div>
                      </div>

                      {/* Custom SVG Bar & Spline Overlay Chart */}
                      <div className="h-32 w-full pt-2 pb-1 relative">
                        <div className="absolute left-0 top-0 bottom-6 w-6 flex flex-col justify-between text-[7px] text-slate-400">
                          <span>$2.5K</span>
                          <span>$2.0K</span>
                          <span>$1.5K</span>
                          <span>$1.0K</span>
                          <span>$500</span>
                          <span>$0</span>
                        </div>
                        <div className="ml-7 h-full flex flex-col justify-between relative">
                          
                          {/* SVG Spline Line for Conversions */}
                          <svg className="absolute inset-0 w-full h-[80%] z-10 pointer-events-none" viewBox="0 0 100 40" preserveAspectRatio="none">
                            <path 
                              d="M 5 25 Q 20 22 35 27 T 65 10 T 95 18" 
                              fill="transparent" 
                              stroke="#8b5cf6" 
                              strokeWidth="1.5" 
                              strokeLinecap="round"
                            />
                            {/* Dots on line */}
                            {[
                              { cx: 7, cy: 23 },
                              { cx: 21, cy: 24 },
                              { cx: 35, cy: 27 },
                              { cx: 50, cy: 19 },
                              { cx: 64, cy: 11 },
                              { cx: 79, cy: 15 },
                              { cx: 93, cy: 18 },
                            ].map((pt, pIdx) => (
                              <circle key={pIdx} cx={pt.cx} cy={pt.cy} r="1.5" fill="#8b5cf6" stroke="#ffffff" strokeWidth="0.5" />
                            ))}
                          </svg>

                          {/* Bars */}
                          <div className="flex-1 flex items-end justify-between gap-2 border-b border-slate-100 pb-1 z-0">
                            {[
                              { day: 'Apr 25', height: '45%' },
                              { day: 'Apr 26', height: '55%' },
                              { day: 'Apr 27', height: '40%' },
                              { day: 'Apr 28', height: '60%' },
                              { day: 'Apr 29', height: '85%' },
                              { day: 'Apr 30', height: '70%' },
                              { day: 'May 1', height: '65%' },
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

                      {/* Legend */}
                      <div className="flex items-center justify-center gap-4 mt-1.5 pt-1.5 text-[8px] font-bold text-slate-500 border-t border-slate-100">
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span>Spend</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-purple-500" />
                          <span>Conversions</span>
                        </div>
                      </div>

                      {/* Bottom 4 Mini Metric Cards */}
                      <div className="grid grid-cols-4 gap-1.5 mt-2">
                        <div className="bg-emerald-50/50 rounded-lg p-1.5">
                          <div className="text-[7px] text-slate-400 font-semibold">Cost per Conversion</div>
                          <div className="text-[10px] font-bold text-slate-900 mt-0.5">$3.92</div>
                          <div className="text-[7px] text-emerald-600 font-medium">▼ -14.2% vs. 7d</div>
                        </div>
                        <div className="bg-purple-50/50 rounded-lg p-1.5">
                          <div className="text-[7px] text-slate-400 font-semibold">Click Through Rate</div>
                          <div className="text-[10px] font-bold text-slate-900 mt-0.5">3.24%</div>
                          <div className="text-[7px] text-emerald-600 font-medium">▲ +9.8% vs. 7d</div>
                        </div>
                        <div className="bg-blue-50/50 rounded-lg p-1.5">
                          <div className="text-[7px] text-slate-400 font-semibold">Active Partners</div>
                          <div className="text-[10px] font-bold text-slate-900 mt-0.5">48</div>
                          <div className="text-[7px] text-emerald-600 font-medium">+6 vs. 7d</div>
                        </div>
                        <div className="bg-pink-50/50 rounded-lg p-1.5">
                          <div className="text-[7px] text-slate-400 font-semibold">Total Orders</div>
                          <div className="text-[10px] font-bold text-slate-900 mt-0.5">1,248</div>
                          <div className="text-[7px] text-emerald-600 font-medium">▲ +18.7% vs. 7d</div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Campaigns Card */}
                    <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Target className="w-3.5 h-3.5 text-slate-500" />
                          <div>
                            <h4 className="text-xs font-bold text-slate-800 leading-none">Recent Campaigns</h4>
                            <p className="text-[8px] text-slate-400 mt-0.5">Your latest campaigns and their performance</p>
                          </div>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-[8px]">
                          <thead>
                            <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                              <th className="pb-1.5 font-medium">Campaign Name</th>
                              <th className="pb-1.5 font-medium">Status</th>
                              <th className="pb-1.5 font-medium">Spend</th>
                              <th className="pb-1.5 font-medium">Conversions</th>
                              <th className="pb-1.5 font-medium">Revenue</th>
                              <th className="pb-1.5 font-medium">ROAS</th>
                              <th className="pb-1.5 font-medium text-right"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50 text-slate-700">
                            {[
                              { name: 'Summer Collection 2025', status: 'Active', spend: '$1,240.00', conv: '362', rev: '$3,156.40', roas: '2.55x' },
                              { name: 'Fitness Gear Launch', status: 'Active', spend: '$980.00', conv: '248', rev: '$2,412.30', roas: '2.46x' },
                              { name: 'Beauty Essentials', status: 'Active', spend: '$760.50', conv: '196', rev: '$1,892.17', roas: '2.49x' },
                              { name: 'Tech Accessories', status: 'Paused', spend: '$540.00', conv: '128', rev: '$1,204.30', roas: '2.23x' },
                              { name: 'Back to School', status: 'Active', spend: '$420.75', conv: '114', rev: '$1,023.18', roas: '2.43x' },
                            ].map((row, idx) => (
                              <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                                <td className="py-1.5 font-semibold text-slate-800">{row.name}</td>
                                <td className="py-1.5">
                                  <span className={`px-1.5 py-0.5 rounded font-bold text-[7px] ${row.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'}`}>
                                    {row.status}
                                  </span>
                                </td>
                                <td className="py-1.5 text-slate-600">{row.spend}</td>
                                <td className="py-1.5 font-semibold text-slate-800">{row.conv}</td>
                                <td className="py-1.5 font-bold text-slate-900">{row.rev}</td>
                                <td className="py-1.5 font-semibold text-slate-800">{row.roas}</td>
                                <td className="py-1.5 text-right text-slate-400">
                                  <ChevronRight className="w-3 h-3 inline" />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-2 pt-1.5 border-t border-slate-100">
                        <span className="text-[8px] font-bold text-emerald-600 hover:underline cursor-pointer flex items-center gap-1">
                          View All Campaigns →
                        </span>
                      </div>
                    </div>

                    {/* Recent Earnings Card */}
                    <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Wallet className="w-3.5 h-3.5 text-slate-500" />
                          <div>
                            <h4 className="text-xs font-bold text-slate-800 leading-none">Recent Earnings</h4>
                            <p className="text-[8px] text-slate-400 mt-0.5">Latest payouts from your campaigns</p>
                          </div>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-[8px]">
                          <thead>
                            <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                              <th className="pb-1.5 font-medium">Date</th>
                              <th className="pb-1.5 font-medium">Campaign</th>
                              <th className="pb-1.5 font-medium">Partner</th>
                              <th className="pb-1.5 font-medium">Amount</th>
                              <th className="pb-1.5 font-medium text-right">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50 text-slate-700">
                            {[
                              { date: 'May 1, 2025', camp: 'Summer Collection 2025', partner: 'TechWave Media', amt: '$682.40' },
                              { date: 'May 1, 2025', camp: 'Fitness Gear Launch', partner: 'LifestyleBlog', amt: '$524.10' },
                              { date: 'Apr 30, 2025', camp: 'Beauty Essentials', partner: 'DealsDaily', amt: '$438.75' },
                              { date: 'Apr 30, 2025', camp: 'Tech Accessories', partner: 'CreatorSpot', amt: '$356.20' },
                            ].map((row, idx) => (
                              <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                                <td className="py-1.5 text-slate-500">{row.date}</td>
                                <td className="py-1.5 font-medium text-slate-800">{row.camp}</td>
                                <td className="py-1.5 text-slate-600">{row.partner}</td>
                                <td className="py-1.5 font-bold text-slate-900">{row.amt}</td>
                                <td className="py-1.5 text-right">
                                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold text-[7px]">Paid</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-2 pt-1.5 border-t border-slate-100">
                        <span className="text-[8px] font-bold text-emerald-600 hover:underline cursor-pointer flex items-center gap-1">
                          View All Earnings →
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Right 4 Columns */}
                  <div className="lg:col-span-4 space-y-2.5">
                    
                    {/* Top Performing Partners Card */}
                    <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <Trophy className="w-3.5 h-3.5 text-slate-500" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 leading-none">Top Performing Partners</h4>
                          <p className="text-[8px] text-slate-400 mt-0.5">Based on conversions (last 7 days)</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {[
                          { rank: 1, name: 'TechWave Media', iconBg: 'bg-black text-white font-black', iconText: 'T', conv: '342', rev: '$3,148.20', pct: '32.4%' },
                          { rank: 2, name: 'LifestyleBlog', iconBg: 'bg-emerald-100 text-emerald-800 font-bold', iconText: '🌱', conv: '216', rev: '$2,124.56', pct: '24.1%' },
                          { rank: 3, name: 'DealsDaily', iconBg: 'bg-blue-600 text-white font-bold', iconText: 'D', conv: '178', rev: '$1,763.40', pct: '19.6%' },
                          { rank: 4, name: 'CreatorSpot', iconBg: 'bg-teal-500 text-white font-bold', iconText: 'C', conv: '142', rev: '$1,456.32', pct: '18.0%' },
                          { rank: 5, name: 'SocialBoost', iconBg: 'bg-purple-600 text-white font-bold', iconText: 'S', conv: '98', rev: '$982.17', pct: '12.3%' },
                        ].map((m) => (
                          <div key={m.rank} className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-2">
                              <span className="text-[8px] font-bold text-slate-400 w-2.5">{m.rank}</span>
                              <div className={`w-5 h-5 rounded-md ${m.iconBg} flex items-center justify-center text-[7px] shrink-0`}>
                                {m.iconText}
                              </div>
                              <div>
                                <span className="text-[9px] font-bold text-slate-800 block leading-tight">{m.name}</span>
                                <span className="text-[7px] text-slate-400 leading-none">{m.conv} conv.</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-[9px] font-bold text-slate-900">{m.rev}</div>
                              <div className="text-[7px] text-emerald-600 font-semibold">{m.pct} ▲</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-slate-100">
                        <span className="text-[8px] font-bold text-slate-600 hover:text-emerald-600 cursor-pointer flex items-center gap-1">
                          View All Partners →
                        </span>
                      </div>
                    </div>

                    {/* Need Help? Card */}
                    <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <Headphones className="w-3 h-3" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 leading-none">Need Help?</h4>
                          <p className="text-[8px] text-slate-400 mt-0.5">Have questions or need assistance?</p>
                        </div>
                      </div>

                      <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-2 text-[8px] text-slate-600 leading-relaxed">
                        Our team is here to help you set up campaigns, find the right partners and achieve your goals.
                      </div>

                      <button className="w-full py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[8px] font-bold text-slate-700 flex items-center justify-center gap-1 transition-colors">
                        <Mail className="w-3 h-3 text-slate-400" />
                        Contact Support
                      </button>
                    </div>

                    {/* Campaign Performance Donut Card */}
                    <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <PieChart className="w-3.5 h-3.5 text-slate-500" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 leading-none">Campaign Performance</h4>
                          <p className="text-[8px] text-slate-400 mt-0.5">KPI breakdown for selected period</p>
                        </div>
                      </div>

                      {/* Donut Graphic */}
                      <div className="relative w-24 h-24 mx-auto flex items-center justify-center my-2">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" strokeWidth="3.5" strokeDasharray="42 100" strokeDashoffset="0" />
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#6366f1" strokeWidth="3.5" strokeDasharray="29 100" strokeDashoffset="-42" />
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#14b8a6" strokeWidth="3.5" strokeDasharray="19 100" strokeDashoffset="-71" />
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#a855f7" strokeWidth="3.5" strokeDasharray="10 100" strokeDashoffset="-90" />
                        </svg>
                        <div className="absolute flex flex-col items-center text-center">
                          <span className="text-[8px] font-bold text-slate-900">$12,430.76</span>
                          <span className="text-[6px] text-slate-400">Total Revenue</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 text-[7px] font-medium text-slate-600">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <span>Influencers</span>
                          </div>
                          <span className="font-bold text-slate-800">42.3%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            <span>Affiliates</span>
                          </div>
                          <span className="font-bold text-slate-800">28.7%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                            <span>Publishers</span>
                          </div>
                          <span className="font-bold text-slate-800">18.6%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                            <span>Creators</span>
                          </div>
                          <span className="font-bold text-slate-800">10.4%</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions Grid */}
                    <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <Grid className="w-3.5 h-3.5 text-slate-500" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 leading-none">Quick Actions</h4>
                          <p className="text-[8px] text-slate-400 mt-0.5">Get started or manage your campaigns</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-100 rounded-xl p-2 cursor-pointer transition-colors">
                          <div className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center mb-1">
                            <Plus className="w-2.5 h-2.5" />
                          </div>
                          <div className="text-[8px] font-bold text-emerald-900">Create Campaign</div>
                          <p className="text-[6.5px] text-slate-500 leading-none mt-0.5">Launch in minutes</p>
                        </div>

                        <div className="bg-purple-50/70 hover:bg-purple-100/70 border border-purple-100 rounded-xl p-2 cursor-pointer transition-colors">
                          <div className="w-4 h-4 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center mb-1">
                            <Users className="w-2.5 h-2.5" />
                          </div>
                          <div className="text-[8px] font-bold text-purple-900">Find Partners</div>
                          <p className="text-[6.5px] text-slate-500 leading-none mt-0.5">Discover creators</p>
                        </div>

                        <div className="bg-blue-50/70 hover:bg-blue-100/70 border border-blue-100 rounded-xl p-2 cursor-pointer transition-colors">
                          <div className="w-4 h-4 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center mb-1">
                            <BarChart3 className="w-2.5 h-2.5" />
                          </div>
                          <div className="text-[8px] font-bold text-blue-900">View Reports</div>
                          <p className="text-[6.5px] text-slate-500 leading-none mt-0.5">Access insights</p>
                        </div>

                        <div className="bg-amber-50/70 hover:bg-amber-100/70 border border-amber-100 rounded-xl p-2 cursor-pointer transition-colors">
                          <div className="w-4 h-4 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center mb-1">
                            <Wallet className="w-2.5 h-2.5" />
                          </div>
                          <div className="text-[8px] font-bold text-amber-900">Manage Payouts</div>
                          <p className="text-[6.5px] text-slate-500 leading-none mt-0.5">View payments</p>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

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