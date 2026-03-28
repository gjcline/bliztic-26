export type BlogFrontmatter = {
  id?: string;                 // optional; slug is canonical
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;         // ISO "2025-08-18"
  readTime: string;            // "7 min read"
  category: string;
  tags: string[];
  image: string;               // URL or /public path
  featured?: boolean;
};

export type BlogPostModule = {
  default: React.ComponentType;      // MDX component
  frontmatter?: BlogFrontmatter;     // exported by MDX
  meta?: BlogFrontmatter;            // alias (either is fine)
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  Component: React.ComponentType;
};