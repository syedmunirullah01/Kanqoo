// "use client";
// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { TrendingUp, Star, Zap, ArrowRight } from 'lucide-react';

// const brands = [
//   {
//     category: "LIFESTYLE",
//     name: "Amazon",
//     logo: "📦",
//     avgOrder: "$45.67",
//     avgReward: "$2.28",
//     commission: "5%",
//     gradient: "from-orange-500 to-yellow-500",
//     glow: "rgba(249,115,22,0.3)",
//     color: "#f97316",
//     tag: "🔥 Top Earner",
//   },
//   {
//     category: "BEAUTY",
//     name: "iHerb",
//     logo: "🌿",
//     avgOrder: "$61.09",
//     avgReward: "$1.10",
//     commission: "8%",
//     gradient: "from-emerald-500 to-green-400",
//     glow: "rgba(16,185,129,0.3)",
//     color: "#10b981",
//     tag: "✨ Trending",
//   },
//   {
//     category: "BEAUTY",
//     name: "NYX",
//     logo: "💄",
//     avgOrder: "$12.52",
//     avgReward: "$0.97",
//     commission: "7%",
//     gradient: "from-pink-500 to-rose-500",
//     glow: "rgba(236,72,153,0.3)",
//     color: "#ec4899",
//     tag: "💎 Premium",
//   },
//   {
//     category: "TRAVEL",
//     name: "Booking.com",
//     logo: "✈️",
//     avgOrder: "$293.95",
//     avgReward: "$11.38",
//     commission: "4%",
//     gradient: "from-blue-500 to-indigo-500",
//     glow: "rgba(59,130,246,0.3)",
//     color: "#3b82f6",
//     tag: "🌍 Global",
//   },
//   {
//     category: "FASHION",
//     name: "Macy's",
//     logo: "⭐",
//     avgOrder: "$75.58",
//     avgReward: "$1.75",
//     commission: "6%",
//     gradient: "from-red-500 to-red-600",
//     glow: "rgba(239,68,68,0.3)",
//     color: "#ef4444",
//     tag: "👑 Exclusive",
//   },
//   {
//     category: "TECH",
//     name: "Apple",
//     logo: "🍎",
//     avgOrder: "$299.99",
//     avgReward: "$8.99",
//     commission: "3%",
//     gradient: "from-slate-400 to-slate-600",
//     glow: "rgba(148,163,184,0.3)",
//     color: "#94a3b8",
//     tag: "💻 High Ticket",
//   },
// ];

// const stats = [
//   { label: "Active Brands", value: "50,000+", icon: <Star className="w-4 h-4" /> },
//   { label: "Avg. Monthly Earnings", value: "$3,200", icon: <TrendingUp className="w-4 h-4" /> },
//   { label: "Payouts Processed", value: "$250M+", icon: <Zap className="w-4 h-4" /> },
// ];

// export default function BrandsShowcase() {
//   const [activeIdx, setActiveIdx] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     if (isHovered) return;
//     const iv = setInterval(() => {
//       setActiveIdx((p) => (p + 1) % brands.length);
//     }, 3200);
//     return () => clearInterval(iv);
//   }, [isHovered]);

//   const getVisible = () => {
//     const result = [];
//     for (let i = -1; i <= 3; i++) {
//       const idx = (activeIdx + i + brands.length) % brands.length;
//       result.push({ ...brands[idx], pos: i });
//     }
//     return result;
//   };

//   return (
//     <section className="relative py-28 px-4 overflow-hidden bg-gradient-to-r from-[#05070F] via-[#0A1128] to-[#12224A] border-t border-white/5">

//       {/* Grid overlay */}
//       <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] pointer-events-none" />

//       {/* Ambient glows */}
//       <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_60%)] blur-3xl pointer-events-none" />
//       <div className="absolute bottom-[15%] right-[20%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_60%)] blur-3xl pointer-events-none" />

//       <div className="relative max-w-6xl mx-auto z-10">

//         {/* ── Header ── */}
//         <div className="text-center mb-16">
//           <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6">
//             Brand Marketplace
//           </span>
//           <h2 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-white leading-[1.08] tracking-tight mb-5">
//             Team up with top brands<br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
//               worldwide and earn
//             </span>
//           </h2>
//           <p className="text-slate-400 text-base sm:text-lg font-medium max-w-xl mx-auto">
//             Join 50,000+ creators already earning with the world's biggest brands — one link at a time.
//           </p>
//         </div>

//         {/* ── Mini Stats Bar ── */}
//         <div className="flex justify-center gap-4 sm:gap-10 mb-16 flex-wrap">
//           {stats.map((s, i) => (
//             <div key={i} className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 backdrop-blur-sm">
//               <span className="text-blue-400">{s.icon}</span>
//               <div>
//                 <p className="text-white font-black text-sm sm:text-base leading-none">{s.value}</p>
//                 <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider mt-0.5">{s.label}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ── Cards Coverflow ── */}
//         <div
//           className="relative h-[360px] mb-10 overflow-hidden"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           <div className="absolute inset-0 flex items-center justify-center">
//             <AnimatePresence mode="popLayout">
//               {getVisible().map(({ pos, ...brand }) => {
//                 const isCenter = pos === 0 || pos === 1;
//                 const x = pos * 240;
//                 const scale = isCenter ? 1 : 0.82;
//                 const opacity = Math.abs(pos) > 2 ? 0 : isCenter ? 1 : 0.45;
//                 const zIndex = isCenter ? 30 : 10 - Math.abs(pos);
//                 const rotateY = pos * -6;

//                 return (
//                   <motion.div
//                     key={brand.name + pos}
//                     initial={{ opacity: 0, scale: 0.7, x: x + 100 }}
//                     animate={{ opacity, scale, x, rotateY, zIndex }}
//                     exit={{ opacity: 0, scale: 0.7, x: x - 100 }}
//                     transition={{ type: "spring", stiffness: 180, damping: 22 }}
//                     onClick={() => setActiveIdx((brands.findIndex(b => b.name === brand.name) + brands.length) % brands.length)}
//                     className="absolute cursor-pointer"
//                     style={{ perspective: "1000px" }}
//                   >
//                     {/* Glowing ring behind card */}
//                     {isCenter && (
//                       <div
//                         className="absolute -inset-3 rounded-[32px] blur-xl opacity-60 pointer-events-none"
//                         style={{ background: `radial-gradient(circle, ${brand.glow}, transparent 70%)` }}
//                       />
//                     )}

//                     {/* Card */}
//                     <div
//                       className={`relative w-[220px] sm:w-[240px] rounded-[28px] p-6 flex flex-col gap-4 border transition-all duration-500 ${
//                         isCenter
//                           ? "bg-[#0D1220] border-white/20 shadow-2xl"
//                           : "bg-[#090C18] border-white/8"
//                       }`}
//                     >
//                       {/* Gradient top edge bar */}
//                       <div className={`absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r ${brand.gradient} ${isCenter ? "opacity-100" : "opacity-30"}`} />

//                       {/* Category badge */}
//                       <div className="flex justify-between items-start">
//                         <span
//                           className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
//                           style={{ background: `${brand.glow}`, color: brand.color }}
//                         >
//                           {brand.category}
//                         </span>
//                         <span className="text-[9px] text-slate-400 font-bold">{brand.tag}</span>
//                       </div>

//                       {/* Logo + Name */}
//                       <div className="flex flex-col items-center py-2 gap-3">
//                         <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${brand.gradient} flex items-center justify-center text-3xl shadow-xl`}
//                           style={{ boxShadow: `0 8px 30px ${brand.glow}` }}
//                         >
//                           {brand.logo}
//                         </div>
//                         <h3 className="text-white font-black text-lg tracking-tight">{brand.name}</h3>
//                       </div>

//                       {/* Divider */}
//                       <div className="h-px bg-white/8" />

//                       {/* Stats */}
//                       <div className="flex justify-between text-center">
//                         <div>
//                           <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Avg Order</p>
//                           <p className="text-white font-black text-base">{brand.avgOrder}</p>
//                         </div>
//                         <div className="w-px bg-white/8" />
//                         <div>
//                           <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Commission</p>
//                           <p className="font-black text-base" style={{ color: brand.color }}>{brand.commission}</p>
//                         </div>
//                         <div className="w-px bg-white/8" />
//                         <div>
//                           <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Avg Reward</p>
//                           <p className="text-emerald-400 font-black text-base">{brand.avgReward}</p>
//                         </div>
//                       </div>

//                       {/* CTA only on center card */}
//                       {isCenter && (
//                         <motion.button
//                           initial={{ opacity: 0, y: 6 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-white bg-gradient-to-r ${brand.gradient} hover:scale-105 active:scale-95 transition-transform duration-150`}
//                           style={{ boxShadow: `0 4px 18px ${brand.glow}` }}
//                         >
//                           Apply Now →
//                         </motion.button>
//                       )}
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </AnimatePresence>
//           </div>
//         </div>

//         {/* ── Dot Indicators ── */}
//         <div className="flex justify-center gap-2 mb-14">
//           {brands.map((b, i) => (
//             <button
//               key={i}
//               onClick={() => setActiveIdx(i)}
//               className={`transition-all duration-300 rounded-full ${
//                 i === activeIdx ? "w-7 h-2.5 bg-blue-500" : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
//               }`}
//             />
//           ))}
//         </div>

//         {/* ── Bottom CTA ── */}
//         <div className="text-center">
//           <a
//             href="#"
//             className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_4px_24px_rgba(59,130,246,0.4)] hover:shadow-[0_6px_32px_rgba(59,130,246,0.55)] hover:scale-105 active:scale-100 transition-all duration-200"
//           >
//             View All 50,000+ Brands
//             <ArrowRight className="w-4 h-4" />
//           </a>
//         </div>

//       </div>
//     </section>
//   );
// }