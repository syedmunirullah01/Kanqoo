import React, { useState } from 'react';

const GetStartedSection = () => {
  const [globeRotation, setGlobeRotation] = useState(0);

  // Map each region to a rotation angle (degrees) for a single globe image
  const locationAngles = [0, 120, 220, 300];

  const moveToRegion = (index) => {
    const angle = locationAngles[index % locationAngles.length] ?? 0;
    // add a bit of tilt for a more 3D look
    setGlobeRotation(angle);
  };

  const steps = [
    {
      title: "Build your campaign in 2 mins",
      description: "Write or upload a brief that captures the story you want to tell - whether it's a product launch, sales activation, or brand-building moment.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      title: "Set your parameters",
      description: "Choose your CPC, set your budget, and define your campaign timeframe. You stay in control of spend and scale.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Select your publishers",
      description: "Choose who you'd like to partner with from our network of 250+ publishers and newsletter creators. Once they opt in, content can go live in as little as 48 hours.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  const regions = ["United States", "United Kingdom", "Europe", "Australia"];

  // Reference-like pastel StepCard matching the provided visual
  const StepCard = ({ title, description, icon, index }) => (
    <div className="h-full">
      <div
        className="group relative rounded-2xl overflow-hidden p-8 shadow-xl hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2"
        style={{ background: 'linear-gradient(180deg,#fde8f7,#f7d9ef)' }}
      >
        {/* large illustrative icon */}
        <div className="mb-6">
          <div className="w-20 h-20 rounded-2xl bg-transparent flex items-center justify-center">
            <div className="w-20 h-20 transform-gpu" aria-hidden>
              {icon}
            </div>
          </div>
        </div>

        <div className="text-left">
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">{title}</h3>
          <p className="text-base text-slate-700 max-w-xl">{description}</p>
        </div>

        {/* subtle bottom area for number or CTA spacing */}
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-slate-600 font-medium">Step {index + 1}</div>
          <div />
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-left mb-12">
          <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 unbounded-600">
            <span>Get started in </span>
            <span
              className="italic font-unbounded font-semibold"
              style={{
                background: 'linear-gradient(90deg,#ff61a6,#b45b4b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent'
              }}
            >
              3 easy steps
            </span>
          </h2>
        </div>

        {/* Steps grid - animated, modern pro cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {steps.map((step, index) => (
            <StepCard key={index} title={step.title} description={step.description} icon={step.icon} index={index} />
          ))}
        </div>

        {/* Globe + Regions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-10">
          <div className="col-span-1 lg:col-span-2 flex justify-center">
            {/* Globe image — place an image at /public/globe.png for a real globe; falls back to gradient */}
            <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full shadow-2xl overflow-hidden relative">
              <div
                className="w-full h-full rounded-full transition-transform duration-1000 ease-in-out"
                style={{
                  transform: `rotateY(${globeRotation}deg) rotateX(12deg)`,
                  backgroundImage: `url('/globe.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: 'radial-gradient(circle at 30% 30%, rgba(180,91,75,0.12), transparent 30%), rgba(24,24,47,0.95)'
                }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 pointer-events-none mix-blend-overlay" />
            </div>
          </div>

          <div className="col-span-1 flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">Available Regions</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {regions.map((region, index) => (
                <button
                  key={index}
                  onClick={() => moveToRegion(index)}
                  className={`px-5 py-2 rounded-full border border-slate-100 bg-white shadow-sm text-slate-700 transform transition-all duration-300 hover:-translate-y-1 ${globeRotation === locationAngles[index] ? 'ring-2 ring-[color:var(--color-primary)]' : ''}`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CTA centered */}
        <div className="text-center">
          <button className="relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg shadow-lg overflow-hidden focus:outline-none" aria-label="Start now with Kanqoo">
            <span className="relative z-10">START NOW</span>
            <span className="cta-sheen absolute left-0 top-0 h-full w-2/3 transform translate-x-[120%] rotate-12 bg-white/10" aria-hidden="true" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatIcon {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }

        .animate-floatIcon {
          animation: floatIcon 3.5s ease-in-out infinite;
        }

        @keyframes chipPop {
          from { opacity: 0; transform: scale(0.9) translateY(4px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .cta-sheen { transition: transform 650ms cubic-bezier(.2,.9,.2,1); }
        button:hover .cta-sheen { transform: translateX(-40%) rotate(12deg); }

        /* subtle card shadow style */
        .shadow-card { box-shadow: 0 10px 30px rgba(2,6,23,0.06); }

  /* modern card styles */
  .card-modern { background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.85)); }
  .card-modern .icon-tile { box-shadow: 0 8px 20px rgba(2,6,23,0.06); }
  .cta-pill { overflow: hidden; }
  .cta-pill .sheen { transition: transform 520ms cubic-bezier(.2,.9,.2,1); }
  .cta-pill:hover .sheen { transform: translateX(-60%) rotate(6deg); }
      `}</style>
    </section>
  );
};

export default GetStartedSection;