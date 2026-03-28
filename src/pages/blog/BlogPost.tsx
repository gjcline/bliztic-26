import { useParams, Navigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getPostBySlug } from '@/lib/blog/posts';
import { Calendar, Clock, Tag, User, ArrowLeft } from 'lucide-react';
import { MDXProvider } from '@/components/blog/MDXProvider';
import CTA from '@/components/CTA';

export default function BlogPostPage() {
  const { slug = '' } = useParams();
  const post = getPostBySlug(slug);
  
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Bliztic`;
      
      // Set meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.excerpt);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = post.excerpt;
        document.head.appendChild(meta);
      }
    }
    
    return () => {
      document.title = 'Bliztic - Automation & Market Growth';
    };
  }, [post]);
  
  if (!post) return <Navigate to="/blog" replace />;

  const { Component } = post;

  return (
    <>
      <article className="bg-[#030303] min-h-screen">
        <header className="relative h-72 overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent" />
        </header>

        <section className="max-w-4xl mx-auto px-6 -mt-24 relative">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
            <div className="mb-6">
              <Link 
                to="/blog" 
                className="inline-flex items-center text-white/60 hover:text-white text-sm mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </div>
            
            <div className="flex items-center mb-2">
              <Tag className="h-4 w-4 text-indigo-400 mr-2" />
              <span className="text-indigo-400 text-sm font-medium">{post.category}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
            
            <div className="flex items-center text-white/40 text-sm mb-6">
              <User className="h-4 w-4 mr-2" />
              <span className="mr-4">{post.author}</span>
              <Calendar className="h-4 w-4 mr-2" />
              <span className="mr-4">
                {new Date(post.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <Clock className="h-4 w-4 mr-2" />
              <span>{post.readTime}</span>
            </div>

            <div className="prose prose-invert max-w-none">
              <MDXProvider>
                <Component />
              </MDXProvider>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2">
              {post.tags.map(t => (
                <span 
                  key={t} 
                  className="px-3 py-1 text-sm bg-white/5 text-white/60 rounded-full border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>
      </article>

      <CTA />
    </>
  );
}