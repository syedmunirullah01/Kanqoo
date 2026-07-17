// "use client";
// import React, { useState, useEffect } from 'react';
// import { Users, Store, Wallet, Heart } from 'lucide-react';

// const ContentCreationStats = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [counters, setCounters] = useState({
//     bloggers: 0,
//     stores: 0,
//     payout: 0,
//     reactions: 0
//   });

//   const finalValues = {
//     bloggers: 150000,
//     stores: 50000,
//     payout: 10,
//     reactions: 1
//   };

//   // Intersection Observer for animations
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.3 }
//     );

//     const section = document.getElementById('stats-section');
//     if (section) observer.observe(section);

//     return () => observer.disconnect();
//   }, []);

//   // Counter animation
//   useEffect(() => {
//     if (isVisible) {
//       const duration = 2000; // 2 seconds
//       const steps = 60;
//       const stepDuration = duration / steps;

//       let step = 0;
//       const timer = setInterval(() => {
//         step++;
//         const progress = step / steps;
//         const easeOut = 1 - Math.pow(1 - progress, 3);

//         setCounters({
//           bloggers: Math.floor(finalValues.bloggers * easeOut),
//           stores: Math.floor(finalValues.stores * easeOut),
//           payout: Math.floor(finalValues.payout * easeOut),
//           reactions: Math.floor(finalValues.reactions * easeOut)
//         });

//         if (step >= steps) {
//           clearInterval(timer);
//           setCounters(finalValues);
//         }
//       }, stepDuration);

//       return () => clearInterval(timer);
//     }
//   }, [isVisible]);

//   const stats = [
//     {
//       number: `${counters.bloggers.toLocaleString()}+`,
//       label: "Bloggers and influencers",
//       Icon: Users,
//       gradient: "from-violet-500 to-fuchsia-500",
//       bgGradient: "from-violet-100 to-fuchsia-100",
//       iconColor: "violet-500",
//       glowColor: "violet"
//     },
//     {
//       number: `${counters.stores.toLocaleString()}+`,
//       label: "Stores and multi brands",
//       Icon: Store,
//       gradient: "from-blue-500 to-cyan-500",
//       bgGradient: "from-blue-100 to-cyan-100",
//       iconColor: "blue-500",
//       glowColor: "blue"
//     },
//     {
//       number: `$${counters.payout} million+`,
//       label: "Paid out since 2020",
//       Icon: Wallet,
//       gradient: "from-emerald-500 to-teal-500",
//       bgGradient: "from-emerald-100 to-teal-100",
//       iconColor: "emerald-500",
//       glowColor: "emerald"
//     },
//     {
//       number: `${counters.reactions} billion+`,
//       label: "Reactions under our campaigns' posts",
//       Icon: Heart,
//       gradient: "from-rose-500 to-pink-500",
//       bgGradient: "from-rose-100 to-pink-100",
//       iconColor: "rose-500",
//       glowColor: "rose"
//     }
//   ];

//   return (
//     <section id="stats-section" className="relative py-24 px-4 bg-slate-900 text-slate-100 overflow-hidden">
//       {/* Background Glow */}
//       <div className="absolute inset-0 -z-10">
//         <div className="absolute top-0 left-0 w-1/2 h-full bg-[radial-gradient(circle_at_100%_50%,_rgba(124,58,237,0.15)_0%,_rgba(124,58,237,0)_50%)]"></div>
//         <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_0%_50%,_rgba(37,99,235,0.15)_0%,_rgba(37,99,235,0)_50%)]"></div>
//       </div>

//       <div className="relative max-w-7xl mx-auto">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">
//           {/* Left Content */}
//           <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
//             <div className="space-y-6">
//               <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
//                 <span className="block text-slate-100 unbounded-600">
//                   You focus on creating.
//                 </span>
//                 <span className="block mt-2 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent unbounded-600">
//                   Kanqoo handles everything else.
//                 </span>
//               </h2>

//               <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl">
//                 No big following? No problem. Earn based on real actions. Just choose a brand your audience vibes with, create content, and post, zero moderation, zero delays.
//               </p>
//             </div>

//             {/* CTA Button */}
//             <div className="pt-6">
//               <button className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-violet-600 rounded-xl hover:bg-violet-700 hover:scale-105 focus:ring-4 focus:ring-violet-500/50">
//                 <span className="relative flex items-center">
//                   Get Started Free
//                   <svg
//                     className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
//                   </svg>
//                 </span>
//               </button>
//             </div>
//           </div>

//           {/* Right Stats Grid */}
//           <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
//             {stats.map((stat, index) => (
//               <div
//                 key={index}
//                 className={`group relative transform transition-all duration-500 hover:-translate-y-1 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
//                 style={{ transitionDelay: `${400 + index * 150}ms` }}
//               >
//                 <div className="absolute -inset-px bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl blur-md opacity-20 group-hover:opacity-50 transition duration-400"></div>
//                 <div className="relative bg-slate-800/90 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-8 h-full">
//                   <div className="flex items-center space-x-4">
//                     <div className="flex-shrink-0">
//                       <stat.Icon className={`w-8 h-8 text-${stat.iconColor}`} />
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-4xl font-bold text-white">
//                         {stat.number}
//                       </h3>
//                       <p className="mt-2 text-slate-400">
//                         {stat.label}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContentCreationStats;