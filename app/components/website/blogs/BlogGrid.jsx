"use client";
import { useState } from 'react';
import { Calendar, Clock, User, ArrowRight, Eye, BookOpen, Search, Filter } from 'lucide-react';

export default function BlogGrid() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: "The Psychology Behind Viral Content: What Makes People Share?",
      excerpt: "Explore the psychological triggers that make content go viral and how to incorporate them into your marketing strategy.",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
      category: "Psychology",
      readTime: "7 min read",
      author: "Dr. Lisa Park",
      date: "Dec 8, 2024",
      views: "1.2K"
    },
    {
      id: 2,
      title: "Building Brand Authenticity Through Creator Partnerships",
      excerpt: "Learn how authentic creator collaborations can build trust and credibility for your brand in crowded markets.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
      category: "Brand Strategy",
      readTime: "5 min read",
      author: "James Wilson",
      date: "Dec 5, 2024",
      views: "890"
    },
    {
      id: 3,
      title: "The Rise of Nano-Influencers: Why Smaller Audiences Deliver Big Results",
      excerpt: "Discover why nano-influencers with 1K-10K followers are becoming the secret weapon for savvy marketers.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
      category: "Trends",
      readTime: "6 min read",
      author: "Maria Gonzalez",
      date: "Dec 3, 2024",
      views: "1.5K"
    },
    {
      id: 4,
      title: "Measuring Influencer Campaign Success: Beyond Likes and Comments",
      excerpt: "A comprehensive guide to tracking meaningful metrics that actually impact your business goals.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
      category: "Analytics",
      readTime: "9 min read",
      author: "David Kim",
      date: "Nov 28, 2024",
      views: "2.1K"
    },
    {
      id: 5,
      title: "Content Creation Tools Every Influencer Should Master in 2024",
      excerpt: "Essential tools and software that can help creators produce professional-quality content efficiently.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80",
      category: "Tools",
      readTime: "8 min read",
      author: "Sophie Martinez",
      date: "Nov 25, 2024",
      views: "3.4K"
    },
    {
      id: 6,
      title: "The Future of YouTube Shorts: Opportunities for Brands and Creators",
      excerpt: "How YouTube Shorts is changing the content landscape and what it means for your video strategy.",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
      category: "Platform Analysis",
      readTime: "11 min read",
      author: "Alex Thompson",
      date: "Nov 20, 2024",
      views: "1.7K"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Articles', count: blogPosts.length },
    { id: 'trends', name: 'Trends', count: 1 },
    { id: 'strategy', name: 'Strategy', count: 1 },
    { id: 'analytics', name: 'Analytics', count: 1 },
    { id: 'tools', name: 'Tools', count: 1 },
    { id: 'psychology', name: 'Psychology', count: 1 }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category.toLowerCase() === selectedCategory);

  return (
    <section className="py-24 bg-[#FAFBFD]">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Latest <span className="text-[#2563EB]">Articles</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Dive deeper into influencer marketing strategies, trends, and insights
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center mb-12">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 border text-sm ${
                  selectedCategory === category.id
                    ? 'bg-[#2563EB] text-white border-transparent shadow-md shadow-blue-500/10'
                    : 'bg-white border-slate-200/80 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {category.name}
                <span className={`ml-2 text-xs font-bold ${
                  selectedCategory === category.id ? 'text-white/80' : 'text-slate-400'
                }`}>
                  ({category.count})
                </span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="bg-white border border-slate-200/80 rounded-2xl pl-12 pr-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all duration-300 w-80 text-sm font-medium"
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-3xl border border-slate-200/60 hover:border-blue-200 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <div 
                  className="w-full h-48 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${post.image})` }}
                ></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-indigo-50 border border-indigo-100 text-indigo-600 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-extrabold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-slate-500 leading-relaxed mb-4 line-clamp-2 text-sm font-medium">
                  {post.excerpt}
                </p>

                {/* Author and Views */}
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wide border-t border-slate-100 pt-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>{post.views}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <button className="w-full mt-6 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-bold py-3 rounded-xl transition-all duration-300 border border-slate-200/80 hover:border-blue-200 flex items-center justify-center gap-2 text-sm">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 px-12 rounded-full text-base transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-3 mx-auto">
            <BookOpen className="w-5 h-5" />
            <span>Load More Articles</span>
          </button>
        </div>
      </div>
    </section>
  );
}