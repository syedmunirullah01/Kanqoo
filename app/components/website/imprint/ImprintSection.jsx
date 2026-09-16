"use client";

import React from 'react';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';

export default function ImprintSection() {
  return (
    <div className="bg-[#FAFBFD] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Badge */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Imprint
          </h1>
          <p className="text-base text-slate-500 font-medium">
            Legal notice and official company disclosure for Kanqoo
          </p>
        </div>

        {/* Imprint Card */}
        <div className="bg-white rounded-[24px] p-8 sm:p-10 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 max-w-xl mx-auto space-y-8">
          
          {/* Company Details */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Imprint
            </h2>
            <div className="space-y-2 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              <p className="font-semibold text-slate-800 text-base">Technochy Pvt Ltd</p>
              <p>
                <span className="font-bold text-slate-900">Phone:</span> +44 7460 708828
              </p>
              <p>
                <span className="font-bold text-slate-900">Address:</span> 2nd Floor College House, 17 King Edwards Road, Ruislip, London, United Kingdom, HA4 7AE
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* Contact Details */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3">
              Contact
            </h3>
            <div className="space-y-2 text-sm sm:text-base text-slate-600 font-medium">
              <p>
                <span className="font-bold text-slate-900">Partners:</span>{' '}
                <a href="mailto:partners@kanqoo.com" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                  partners@kanqoo.com
                </a>
              </p>
              <p>
                <span className="font-bold text-slate-900">Support:</span>{' '}
                <a href="mailto:support@kanqoo.com" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                  support@kanqoo.com
                </a>
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* Socials */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-4">
              Socials
            </h3>
            <div className="flex items-center gap-3">
              {[
                { icon: FaFacebookF, href: '#' },
                { icon: FaTwitter, href: '#' },
                { icon: FaInstagram, href: '#' },
                { icon: FaLinkedinIn, href: '#' },
                { icon: FaPinterestP, href: '#' },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    className="w-10 h-10 rounded-full border border-slate-200/80 bg-slate-50/50 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all duration-200"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
