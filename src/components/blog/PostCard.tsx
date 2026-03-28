import { Calendar, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { BlogPost } from '@/lib/blog/types';

export default function PostCard({ post }: { post: BlogPost }) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl",
        "bg-[#0a0a0a]/40 backdrop-blur-sm border border-white/5",
        "transition-all duration-500 hover:bg-[#0a0a0a]/60 hover:border-white/10 hover:scale-[1.03]"
      )}
    >
      <div className="relative overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/60 via-transparent to-transparent" />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-3">
          <Tag className="h-4 w-4 text-indigo-400 mr-2" />
          <span className="text-indigo-400 text-sm font-medium">{post.category}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-white/90">
          {post.title}
        </h3>
        <p className="text-white/60 mb-4 leading-relaxed">{post.excerpt}</p>
        <div className="flex items-center text-white/40 text-sm mb-4">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="mr-4">{new Date(post.publishDate).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>{post.readTime}</span>
        </div>
        <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-white/80 font-medium text-sm group-hover:text-white">
          Read More
          <svg className="ml-2 h-3 w-3" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2"/></svg>
        </Link>
      </div>
    </article>
  );
}