"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-[99] w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 hover:border-blue-500/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-center text-slate-650 hover:text-blue-600 transition-all duration-300 hover:scale-110 active:scale-95 group ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 stroke-[2.5]" />
    </button>
  );
}
