import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import { resolve } from 'path';
import { copyFileSync, existsSync, mkdirSync } from 'fs';

// Copy _redirects file to dist after build
const copyRedirects = () => {
  return {
    name: 'copy-redirects',
    closeBundle() {
      try {
        if (existsSync('public/_redirects')) {
          mkdirSync('dist', { recursive: true });
          copyFileSync('public/_redirects', 'dist/_redirects');
        }
      } catch (err) {
        console.warn('Could not copy _redirects file:', err);
      }
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter],
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
    }),
    react(),
    copyRedirects(),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});