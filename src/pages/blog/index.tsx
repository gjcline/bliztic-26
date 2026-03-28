import { useState } from 'react';
import { Search } from 'lucide-react';
import { allPosts, categories as allCategories, featuredPost } from '@/lib/blog/posts';
import PostCard from '@/components/blog/PostCard';
import CTA from '@/components/CTA';
import { cn } from '@/lib/utils';

const categories = ['All', ...allCategories];

export default function BlogIndex() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = allPosts.filter(p => {
    const inCat = category === 'All' || p.category === category;
    const q = search.toLowerCase();
    const inSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q));
    return inCat && inSearch;
  });

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-[#030303]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80">
            Insights & Resources
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Expert perspectives on automation, growth strategies, and operational efficiency to help your business thrive.
          </p>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="py-8 bg-[#040404]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-6 items-center">
          <div className="relative flex-1 max-w-md">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className={cn(
                "w-full p-3 pl-12 pr-4 rounded-lg",
                "bg-white/5 border border-white/10",
                "text-white placeholder-white/40",
                "focus:outline-none focus:ring-2 focus:ring-white/20"
              )}
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-white/40" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button 
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  category === c 
                    ? "bg-white text-[#030303]" 
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      {featuredPost && (
        <section className="py-12 bg-[#040404]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-white mb-6">Featured Article</h2>
            <div className="max-w-2xl">
              <PostCard post={featuredPost} />
            </div>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="py-16 bg-[#030303]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-8">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.filter(p => !p.featured).map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          {filtered.filter(p => !p.featured).length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/40">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}