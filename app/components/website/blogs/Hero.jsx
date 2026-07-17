"use client";
import { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, User, ArrowRight, TrendingUp, Eye, BookOpen, Sparkles, Zap, Target } from 'lucide-react';

export default function Hero() {
  const [currentFeatured, setCurrentFeatured] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef(null);

  const featuredArticles = [
    {
      id: 1,
      title: "The Future of Influencer Marketing: AI-Powered Creator Partnerships",
      excerpt: "Discover how artificial intelligence is revolutionizing the way brands connect with creators and measure campaign success in 2024.",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
      category: "Industry Trends",
      readTime: "8 min read",
      author: "Sarah Chen",
      date: "Dec 15, 2024",
      views: "2.4K",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      title: "Maximizing ROI: How Top Brands Are Leveraging Micro-Influencers",
      excerpt: "Learn why micro-influencers are delivering 5x higher engagement rates and how to build effective micro-influencer campaigns.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
      category: "Strategy",
      readTime: "6 min read",
      author: "Mike Rodriguez",
      date: "Dec 12, 2024",
      views: "1.8K",
      gradient: "from-indigo-500 to-blue-600"
    },
    {
      id: 3,
      title: "TikTok vs Instagram Reels: Which Platform Delivers Better Results?",
      excerpt: "A comprehensive comparison of TikTok and Instagram Reels for brand marketing, including audience demographics and engagement metrics.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
      category: "Platform Analysis",
      readTime: "10 min read",
      author: "Emma Thompson",
      date: "Dec 10, 2024",
      views: "3.1K",
      gradient: "from-blue-600 to-indigo-600"
    }
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentFeatured((prev) => (prev + 1) % featuredArticles.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const currentArticle = featuredArticles[currentFeatured];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#05070F] via-[#0A1128] to-[#12224A] overflow-hidden py-20"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Text Elements */}
        <div className="absolute top-20 left-10 text-8xl font-black text-white/5 unbounded-600 rotate-12 animate-float">
          BLOG
        </div>
        <div className="absolute bottom-20 right-10 text-6xl font-black text-white/5 unbounded-600 -rotate-12 animate-float" style={{ animationDelay: '2s' }}>
          INSIGHTS
        </div>
        
        {/* Animated Geometric Shapes */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-blue-500/20 rounded-lg animate-spin-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-12 h-12 border-2 border-indigo-500/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-blue-500/10 rounded-md animate-bounce"></div>

        {/* Connection Lines */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg width="100%" height="100%" className="animate-pulse">
            <line x1="20%" y1="0" x2="80%" y2="100%" stroke="rgba(37,99,235,0.2)" strokeWidth="1" />
            <line x1="80%" y1="0" x2="20%" y2="100%" stroke="rgba(99,102,241,0.2)" strokeWidth="1" />
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(37,99,235,0.2)" strokeWidth="1" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Side - Featured Article (Span 7 columns) */}
          <div className="lg:col-span-7 relative">
            {/* Main Featured Card with Asymmetric Design */}
            <div 
              className="relative group cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Background Glow */}
              <div className={`absolute -inset-4 bg-gradient-to-br ${currentArticle.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
              
              {/* Main Card */}
              <div className="relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
                {/* Image with Overlay */}
                <div className="relative h-80 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                    style={{ backgroundImage: `url(${currentArticle.image})` }}
                  ></div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Floating Category Badge */}
                  <div className="absolute top-6 left-6">
                    <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30">
                      <span className="text-white font-semibold text-sm flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        {currentArticle.category}
                      </span>
                    </div>
                  </div>

                  {/* Progress Indicators */}
                  <div className="absolute top-6 right-6 flex gap-1">
                    {featuredArticles.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-500 ${
                          index === currentFeatured ? 'bg-white scale-125' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4 unbounded-600 leading-tight">
                    {currentArticle.title}
                  </h2>

                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {currentArticle.excerpt}
                  </p>

                  {/* Meta Information Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-400">
                      <User className="w-5 h-5 text-blue-400" />
                      <span className="text-sm">{currentArticle.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <span className="text-sm">{currentArticle.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-5 h-5 text-blue-400" />
                      <span className="text-sm">{currentArticle.readTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Eye className="w-5 h-5 text-blue-400" />
                      <span className="text-sm">{currentArticle.views} views</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="group relative bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 w-full justify-center shadow-lg shadow-blue-500/20">
                    <BookOpen className="w-5 h-5" />
                    <span>Read Featured Article</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500 rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-indigo-500 rounded-bl-2xl"></div>
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 shadow-2xl z-20">
              <div className="text-center text-white">
                <div className="text-2xl font-black unbounded-600 mb-1">50+</div>
                <div className="text-xs">Articles Published</div>
              </div>
            </div>
          </div>

          {/* Right Side - Additional Content (Span 5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header Section */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 mb-6">
                <Zap className="w-5 h-5 text-indigo-400" />
                <span className="text-white font-semibold text-sm">Latest Insights</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-white mb-4 unbounded-600">
                Kanqoo
                <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                  Blogs
                </span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed">
                Where innovation meets influence. Dive into expert analysis, trends, and strategies shaping the future of creator marketing.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-white font-bold text-lg">150K+</div>
                <div className="text-gray-400 text-xs">Monthly Readers</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <TrendingUp className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                <div className="text-white font-bold text-lg">89%</div>
                <div className="text-gray-400 text-xs">Engagement Rate</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-white font-bold text-lg">20+</div>
                <div className="text-gray-400 text-xs">Expert Writers</div>
              </div>
            </div>


            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-bold text-lg mb-3">Stay Updated</h3>
              <p className="text-gray-300 text-sm mb-4">
                Get the latest articles delivered to your inbox
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300"
                />
                <button className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

       
      </div>

      {/* Bottom Gradient Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 opacity-60"></div>
    </section>
  );
}