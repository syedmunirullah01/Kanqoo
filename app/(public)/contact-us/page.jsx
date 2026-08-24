"use client";
import { useState } from 'react';
import {
  Mail, Phone, MapPin, Clock, Send, MessageCircle,
  Users, Zap, ArrowRight, Star, Shield, Globe, Sparkles, Check, HelpCircle,
  Facebook, Twitter, Instagram, Linkedin
} from 'lucide-react';
import Link from 'next/link';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
    }, 1800);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD] pt-32 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ═══════════════════════════════════════
            HEADER SECTION
        ═══════════════════════════════════════ */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center justify-center bg-blue-50 border border-blue-100 rounded-full px-6 py-2.5 text-xs md:text-sm font-extrabold uppercase tracking-[0.25em] text-[#2563EB] mb-4">
            GET IN TOUCH
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6.5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
            Contact our <span className="text-[#2563EB]">help desk</span> for<br />assistance
          </h1>
        </div>

        {/* ═══════════════════════════════════════
            THREE INFO CARDS
        ═══════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
          {/* Card 1: General */}
          <div className="bg-white border-2 border-slate-300 rounded-[20px] p-8 text-center hover:border-slate-400 hover:shadow-[0_12px_40px_rgb(0,0,0,0.04)] transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-5">
              <HelpCircle className="w-5 h-5 text-slate-500" />
            </div>
            <h3 className="text-slate-900 font-bold text-lg mb-1">General Inquiries</h3>
            <p className="text-slate-500 text-sm font-medium">info@kanqoo.com</p>
          </div>

          {/* Card 2: Publishers */}
          <div className="bg-white border-2 border-slate-300 rounded-[20px] p-8 text-center hover:border-slate-400 hover:shadow-[0_12px_40px_rgb(0,0,0,0.04)] transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-5">
              <Users className="w-5 h-5 text-slate-500" />
            </div>
            <h3 className="text-slate-900 font-bold text-lg mb-1">Publishers/Influencers</h3>
            <p className="text-slate-500 text-sm font-medium">publisher@kanqoo.com</p>
          </div>

          {/* Card 3: Advertisers */}
          <div className="bg-white border-2 border-slate-300 rounded-[20px] p-8 text-center hover:border-slate-400 hover:shadow-[0_12px_40px_rgb(0,0,0,0.04)] transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-5">
              <Globe className="w-5 h-5 text-slate-500" />
            </div>
            <h3 className="text-slate-900 font-bold text-lg mb-1">Advertisers</h3>
            <p className="text-slate-500 text-sm font-medium">advertiser@kanqoo.com</p>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            FORM SECTION
        ═══════════════════════════════════════ */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center justify-center bg-blue-50 border border-blue-100 rounded-full px-6 py-2.5 text-xs md:text-sm font-extrabold uppercase tracking-[0.25em] text-[#2563EB] mb-4">
            CONTACT
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Let us know how we can assist you
          </h2>
        </div>

        <div className="max-w-2xl mx-auto bg-white border border-slate-300 shadow-[0_12px_40px_rgb(0,0,0,0.02)] rounded-[24px] p-8 md:p-10 mb-24">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                <Check className="w-8 h-8 text-[#2563EB]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Message Sent!</h3>
              <p className="text-slate-500 text-sm max-w-sm">Thank you for getting in touch. We will reply to your inquiry shortly.</p>
              <button onClick={() => setSubmitted(false)} className="text-blue-600 text-sm font-semibold hover:underline mt-2">
                Send another message →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name & Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">Your Name *</label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full bg-[#FAFBFD] border-2 border-slate-300 hover:border-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none transition-all duration-200 text-sm font-medium"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">Your Email *</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange} required
                    className="w-full bg-[#FAFBFD] border-2 border-slate-300 hover:border-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none transition-all duration-200 text-sm font-medium"
                    placeholder="Email"
                  />
                </div>
              </div>

              {/* Row 2: Company & Subject */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">Company</label>
                  <input
                    type="text" name="company" value={formData.company} onChange={handleChange}
                    className="w-full bg-[#FAFBFD] border-2 border-slate-300 hover:border-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none transition-all duration-200 text-sm font-medium"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">Subject *</label>
                  <select
                    name="subject" value={formData.subject} onChange={handleChange} required
                    className="w-full bg-[#FAFBFD] border-2 border-slate-300 hover:border-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3.5 text-slate-900 focus:outline-none transition-all duration-200 text-sm font-medium"
                  >
                    <option value="">Select a subject</option>
                    <option value="partnership">Brand Partnership</option>
                    <option value="creator">Creator Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="general">General Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">Message *</label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange} required rows={6}
                  className="w-full bg-[#FAFBFD] border-2 border-slate-300 hover:border-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none transition-all duration-200 resize-none text-sm font-medium"
                  placeholder="Tell us about your project or inquiry..."
                />
              </div>

              {/* Center aligned submit button */}
              <div className="text-center pt-2">
                <button
                  type="submit" disabled={isSubmitting}
                  className="inline-flex items-center justify-center px-10 py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-350 hover:scale-105 active:scale-95 shadow-md text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Contact Now"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ═══════════════════════════════════════
            DETAILS SECTION (TWO COLUMNS)
        ═══════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto mb-24">
          {/* Left Column: Imprint Card */}
          <div className="lg:col-span-5 bg-white border-2 border-slate-300 shadow-[0_8px_30px_rgb(0,0,0,0.015)] rounded-[24px] p-8 space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-[#0F172A] mb-4">Imprint</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Technochy Pvt Ltd<br />
                <strong>Phone:</strong> +44 7460 708828<br />
                <strong>Address:</strong> 2nd Floor College House, 17 King Edwards Road, Ruislip, London, United Kingdom, HA4 7AE
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h4 className="font-bold text-slate-800 text-sm mb-2">Contact</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                <strong>Partners:</strong> partners@kanqoo.com<br />
                <strong>Support:</strong> support@kanqoo.com
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h4 className="font-bold text-slate-800 text-sm mb-2">Legal</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                legal@kanqoo.com<br />
                <em className="text-xs text-slate-400 block mt-1">Please contact on this email only for legal purposes.</em>
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h4 className="font-bold text-slate-800 text-sm mb-3">Socials</h4>
              <div className="flex items-center gap-3">
                {[
                  { icon: Facebook, href: "https://facebook.com" },
                  { icon: Twitter, href: "https://twitter.com" },
                  { icon: Instagram, href: "https://instagram.com" },
                  { icon: Linkedin, href: "https://linkedin.com" },
                  {
                    icon: (props) => (
                      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.17 2.565 7.747 6.22 9.25-.084-.77-.16-1.95.033-2.785.176-.757 1.135-4.815 1.135-4.815s-.29-.58-.29-1.438c0-1.346.78-2.35 1.752-2.35.825 0 1.224.62 1.224 1.363 0 .83-.528 2.07-.8 3.22-.228.962.482 1.747 1.43 1.747 1.716 0 3.036-1.81 3.036-4.42 0-2.312-1.66-3.93-4.035-3.93-2.75 0-4.364 2.062-4.364 4.195 0 .83.32 1.72.72 2.206a.3.3 0 01.07.284c-.078.324-.252 1.026-.286 1.168-.045.186-.148.225-.34.137-1.272-.59-2.066-2.45-2.066-3.937 0-3.208 2.33-6.155 6.72-6.155 3.53 0 6.275 2.516 6.275 5.88 0 3.506-2.21 6.326-5.28 6.326-1.03 0-2.003-.536-2.335-1.168l-.635 2.42c-.23.882-.852 1.986-1.27 2.665C9.742 21.84 10.846 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                      </svg>
                    ),
                    href: "https://pinterest.com"
                  }
                ].map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" className="group w-9 h-9 rounded-full bg-slate-50 hover:bg-blue-50 border border-slate-200/80 flex items-center justify-center text-slate-400 hover:text-[#2563EB] transition-all duration-200 hover:scale-110 shadow-sm hover:border-[#2563EB]/40">
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Legals and Terms Text */}
          <div className="lg:col-span-7 space-y-8 text-slate-500 text-[13.5px] leading-relaxed">
            <div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Responsible for Content & Technology</h4>
              <p>
                Kanqoo is responsible for the content and technological framework of this platform. We strive to ensure that all information, tools, and services provided are accurate, functional, and up to date. However, despite careful content management, we cannot guarantee absolute completeness or real-time accuracy of the information displayed.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Data Protection:</h4>
              <p>
                Kanqoo is committed to protecting your personal data in compliance with applicable data protection laws. We implement strict security measures to safeguard user information against unauthorized access, misuse, or disclosure. Data collected through our platform is processed only for legitimate business purposes, such as affiliate tracking, and service improvements. We do not share personal data with third parties without legal basis or user consent. For detailed information on how we handle user data, please refer to our Privacy Policy.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Liability for Content:</h4>
              <p>
                The content published on Kanqoo is created with the utmost care and is regularly reviewed. However, we do not assume liability for any inaccuracies, omissions, or outdated information. External contributors or advertisers may provide some content, and we do not verify or endorse third-party claims. If you believe any content violates legal provisions or industry standards, please notify us at **legal@kanqoo.com**.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Liability for Links:</h4>
              <p>
                Kanqoo may include links to external third-party websites for tracking purposes. However, we do not control, endorse, or take responsibility for the content, accuracy, or policies of external sites. The inclusion of such links does not imply a partnership or approval of the linked content. If you find any harmful or misleading links on our platform, please report them to **info@kanqoo.com**.
              </p>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            JOIN KANQOO NOW / BOTTOM CTA
        ═══════════════════════════════════════ */}
        <div className="border-t border-slate-200/80 pt-16 pb-12 flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#2563EB]">
              JOIN KANQOO NOW!
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Become a Top-Earning Partner.
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Generate more sales, monetize traffic, and earn commissions by joining Kanqoo partner network today!
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 shrink-0">
            <Link href="/register" className="inline-flex items-center justify-center px-10 py-4 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-md text-sm tracking-wide">
              Get Started Today
            </Link>
            <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400">
              <span>✓ Join Kanqoo for Free.</span>
              <span>✓ 24/7 Partner Support.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
