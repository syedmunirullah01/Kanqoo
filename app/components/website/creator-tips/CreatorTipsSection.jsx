"use client";

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  FileText, 
  BarChart3, 
  RefreshCw, 
  MessageSquare, 
  Tag, 
  HelpCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

const categories = [
  { id: 'all', label: 'All Tips' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'content', label: 'Content' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'optimization', label: 'Optimization' },
  { id: 'engagement', label: 'Engagement' },
  { id: 'promotion', label: 'Promotion' },
  { id: 'support', label: 'Support' }
];

const tips = [
  {
    id: 1,
    category: 'strategy',
    icon: Target,
    title: 'Strategy',
    description: "Set clear goals: decide if you want to grow followers, drive clicks, or boost sales. Choose your niche and stay consistent – it builds trust with your audience. Plan your content calendar so you always know what's coming next."
  },
  {
    id: 2,
    category: 'content',
    icon: FileText,
    title: 'Content',
    description: "Focus on high-quality, useful, and authentic content. Show products in real-life use, not just stock images. Use clear and honest language – always disclose ads or affiliate links."
  },
  {
    id: 3,
    category: 'analytics',
    icon: BarChart3,
    title: 'Analytics',
    description: "Track clicks, sales, and revenue inside the Kanqoo dashboard. Identify which posts or platforms bring the best results. Use data to understand your audience's behavior and preferences."
  },
  {
    id: 4,
    category: 'optimization',
    icon: RefreshCw,
    title: 'Optimisation',
    description: "Improve weak-performing content by testing new formats (e.g. video vs. image). Try different posting times and captions to see what works best. Update old content with fresh links or improved descriptions."
  },
  {
    id: 5,
    category: 'engagement',
    icon: MessageSquare,
    title: 'Engagement',
    description: "Reply to comments and messages quickly – it builds community trust. Ask questions or run polls to involve your audience. Share personal stories or behind-the-scenes content to connect with followers."
  },
  {
    id: 6,
    category: 'promotion',
    icon: Tag,
    title: 'Promotion',
    description: "Share your affiliate links across multiple channels (social, blog, newsletter). Collaborate with other creators for cross-promotion. Use hashtags and trending topics to increase visibility."
  },
  {
    id: 7,
    category: 'support',
    icon: HelpCircle,
    title: 'Support',
    description: "Stay updated with Kanqoo's resources, guides, and compliance rules. Reach out to our support team if you face any tracking or campaign issues. Learn from others – join discussions, webinars, and industry groups."
  }
];

export default function CreatorTipsSection() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTips = activeCategory === 'all' 
    ? tips 
    : tips.filter(tip => tip.category === activeCategory);

  return (
    <div className="bg-[#FAFBFD] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Badge */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Top Creator Tips
          </h1>
          <p className="text-base sm:text-lg font-semibold text-slate-600 mb-3">
            Maximize your earnings with these powerful strategies
          </p>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Whether you're just starting out or already growing your influence, these tips will help you make the most of Kanqoo and increase your affiliate earnings.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-4xl mx-auto">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#3A30C8] text-white shadow-md shadow-indigo-500/20 scale-[1.02]'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredTips.map((tip) => {
            const Icon = tip.icon;
            return (
              <div
                key={tip.id}
                className="bg-white rounded-[20px] p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {tip.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Blue CTA Banner */}
        <div className="relative overflow-hidden rounded-[24px] bg-[#2E28AC] text-white p-8 sm:p-12 text-center shadow-xl mb-16">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-400/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-600/30 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
              Your influence is powerful
            </h2>
            <p className="text-indigo-100 text-sm sm:text-base font-medium mb-2">
              When combined with Kanqoo's tools, it becomes unstoppable.
            </p>
            <p className="text-indigo-200/80 text-xs sm:text-sm mb-8">
              Keep learning, stay authentic, and your earnings will grow.
            </p>

            <Link
              href="/for-creators"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold bg-white text-[#2E28AC] hover:bg-slate-100 transition-all duration-200 shadow-lg hover:scale-105"
            >
              Start Applying These Tips
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Bottom Support Section */}
        <div className="text-center py-6">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
            Need personalized advice?
          </h3>
          <p className="text-slate-500 text-sm sm:text-base mb-4 font-medium">
            Our creator success team is ready to help you implement these strategies.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Contact Creator Support
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
