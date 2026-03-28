import type { BlogPost, BlogPostModule, BlogFrontmatter } from './types';

const modules = import.meta.glob<BlogPostModule>('/content/blog/**/*.mdx', { eager: true });

function slugFromPath(path: string) {
  const m = path.match(/\/content\/blog\/(.+)\.mdx$/);
  return m ? m[1] : path;
}

function normalizeFrontmatter(fm?: BlogFrontmatter): BlogFrontmatter {
  if (!fm) throw new Error('MDX post missing frontmatter');
  return {
    ...fm,
    tags: fm.tags || [],
    featured: fm.featured ?? false,
  };
}

export const allPosts: BlogPost[] = Object.entries(modules).map(([path, mod]) => {
  const fm = normalizeFrontmatter(mod.frontmatter || (mod as any).meta);
  return {
    ...fm,
    slug: slugFromPath(path),
    Component: mod.default,
  };
})
.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

export function getPostBySlug(slug: string) {
  return allPosts.find(p => p.slug === slug);
}

export const categories = Array.from(new Set(allPosts.map(p => p.category))).sort();
export const tags = Array.from(new Set(allPosts.flatMap(p => p.tags))).sort();
export const featuredPost = allPosts.find(p => p.featured);