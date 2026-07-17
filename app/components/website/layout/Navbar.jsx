"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useSiteSettings } from '@/lib/useSiteSettings';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const siteSettings = useSiteSettings();
  const logoAlt = siteSettings.logoAlt || siteSettings.siteName;

  // Animation classes
  const fadeIn = "transition-all duration-300 ease-out";
  const scaleUp = "transform-gpu transition-transform duration-200";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-6 pb-2 bg-transparent">
      {/* Floating Pill Container */}
      <div className="max-w-7xl mx-auto bg-gradient-to-b from-white/95 via-slate-50/95 to-slate-100/95 backdrop-blur-md rounded-full border border-slate-200/80 px-6 py-2.5 shadow-[0_10px_30px_rgba(15,23,42,0.1),_0_10px_30px_rgba(37,99,235,0.06)] transition-all duration-300 flex items-center justify-between">

        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2.5 group">
          {siteSettings.logoUrl ? (
            <img
              src={siteSettings.logoUrl}
              alt={logoAlt}
              className="h-8 w-auto max-w-[150px] object-contain transition-transform duration-300 group-hover:scale-102"
            />
          ) : (
            <>
              <span className="text-xl md:text-2xl font-bold text-slate-800 font-unbounded tracking-tight transition-transform duration-300 group-hover:scale-102">
                {siteSettings.siteName || 'Kanqoo'}
              </span>
            </>
          )}
        </Link>

        {/* Center Links - Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">

          <Link
            href="/for-creators"
            className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-full text-[14px] font-semibold transition-colors duration-200 relative group"
          >
            Publishers
            <span className="absolute bottom-[3px] left-4 right-4 h-[2px] bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
          </Link>

          <Link
            href="/for-brands"
            className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-full text-[14px] font-semibold transition-colors duration-200 relative group"
          >
            Advertisers
            <span className="absolute bottom-[3px] left-4 right-4 h-[2px] bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
          </Link>

          <Link
            href="/blogs"
            className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-full text-[14px] font-semibold transition-colors duration-200 relative group"
          >
            Blog
            <span className="absolute bottom-[3px] left-4 right-4 h-[2px] bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
          </Link>

          <Link
            href="/about-us"
            className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-full text-[14px] font-semibold transition-colors duration-200 relative group"
          >
            About Us
            <span className="absolute bottom-[3px] left-4 right-4 h-[2px] bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
          </Link>

          <Link
            href="/contact-us"
            className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-full text-[14px] font-semibold transition-colors duration-200 relative group"
          >
            Contact
            <span className="absolute bottom-[3px] left-4 right-4 h-[2px] bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
          </Link>
        </div>

        {/* Right Buttons - Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-[14px] font-bold text-slate-700 hover:text-slate-900 transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-6 py-2.5 text-[14px] font-bold text-white rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 hover:from-blue-700 hover:via-blue-600 hover:to-indigo-600 shadow-[0_4px_18px_rgba(37,99,235,0.18),_0_2px_6px_rgba(15,23,42,0.08)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.25),_0_4px_10px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Get started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-full text-slate-700 hover:bg-slate-100 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown Card */}
      {isOpen && (
        <div className="md:hidden mt-3 mx-auto max-w-7xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-top-4">
          <div className="px-5 pt-5 pb-6 space-y-4">

            <Link
              href="/for-creators"
              onClick={() => setIsOpen(false)}
              className="block text-slate-800 px-4 py-3 rounded-2xl text-[15px] font-bold hover:bg-slate-50 transition-colors duration-200"
            >
              Publishers
            </Link>

            <Link
              href="/for-brands"
              onClick={() => setIsOpen(false)}
              className="block text-slate-800 px-4 py-3 rounded-2xl text-[15px] font-bold hover:bg-slate-50 transition-colors duration-200"
            >
              Advertisers
            </Link>

            <Link
              href="/blogs"
              onClick={() => setIsOpen(false)}
              className="block text-slate-800 px-4 py-3 rounded-2xl text-[15px] font-bold hover:bg-slate-50 transition-colors duration-200"
            >
              Blog
            </Link>

            <Link
              href="/about-us"
              onClick={() => setIsOpen(false)}
              className="block text-slate-800 px-4 py-3 rounded-2xl text-[15px] font-bold hover:bg-slate-50 transition-colors duration-200"
            >
              About Us
            </Link>

            <Link
              href="/contact-us"
              onClick={() => setIsOpen(false)}
              className="block text-slate-800 px-4 py-3 rounded-2xl text-[15px] font-bold hover:bg-slate-50 transition-colors duration-200"
            >
              Contact
            </Link>

            {/* Mobile Auth Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-3">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-center py-3 text-[14px] font-bold text-slate-700 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="text-center py-3 text-[14px] font-bold text-white rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 shadow-md hover:shadow-lg transition-colors duration-200"
              >
                Get started
              </Link>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

