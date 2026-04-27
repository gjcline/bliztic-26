// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import mdx from "file:///home/project/node_modules/@mdx-js/rollup/index.js";
import remarkGfm from "file:///home/project/node_modules/remark-gfm/index.js";
import remarkFrontmatter from "file:///home/project/node_modules/remark-frontmatter/index.js";
import rehypeSlug from "file:///home/project/node_modules/rehype-slug/index.js";
import rehypeAutolinkHeadings from "file:///home/project/node_modules/rehype-autolink-headings/index.js";
import { resolve } from "path";
import { copyFileSync, existsSync, mkdirSync } from "fs";
var __vite_injected_original_dirname = "/home/project";
var copyRedirects = () => {
  return {
    name: "copy-redirects",
    closeBundle() {
      try {
        if (existsSync("public/_redirects")) {
          mkdirSync("dist", { recursive: true });
          copyFileSync("public/_redirects", "dist/_redirects");
        }
      } catch (err) {
        console.warn("Could not copy _redirects file:", err);
      }
    }
  };
};
var vite_config_default = defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter],
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]]
    }),
    react(),
    copyRedirects()
  ],
  optimizeDeps: {
    exclude: ["lucide-react"]
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgbWR4IGZyb20gJ0BtZHgtanMvcm9sbHVwJztcbmltcG9ydCByZW1hcmtHZm0gZnJvbSAncmVtYXJrLWdmbSc7XG5pbXBvcnQgcmVtYXJrRnJvbnRtYXR0ZXIgZnJvbSAncmVtYXJrLWZyb250bWF0dGVyJztcbmltcG9ydCByZWh5cGVTbHVnIGZyb20gJ3JlaHlwZS1zbHVnJztcbmltcG9ydCByZWh5cGVBdXRvbGlua0hlYWRpbmdzIGZyb20gJ3JlaHlwZS1hdXRvbGluay1oZWFkaW5ncyc7XG5pbXBvcnQgcmVoeXBlUmF3IGZyb20gJ3JlaHlwZS1yYXcnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgY29weUZpbGVTeW5jLCBleGlzdHNTeW5jLCBta2RpclN5bmMgfSBmcm9tICdmcyc7XG5cbi8vIENvcHkgX3JlZGlyZWN0cyBmaWxlIHRvIGRpc3QgYWZ0ZXIgYnVpbGRcbmNvbnN0IGNvcHlSZWRpcmVjdHMgPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ2NvcHktcmVkaXJlY3RzJyxcbiAgICBjbG9zZUJ1bmRsZSgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChleGlzdHNTeW5jKCdwdWJsaWMvX3JlZGlyZWN0cycpKSB7XG4gICAgICAgICAgbWtkaXJTeW5jKCdkaXN0JywgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICAgICAgY29weUZpbGVTeW5jKCdwdWJsaWMvX3JlZGlyZWN0cycsICdkaXN0L19yZWRpcmVjdHMnKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignQ291bGQgbm90IGNvcHkgX3JlZGlyZWN0cyBmaWxlOicsIGVycik7XG4gICAgICB9XG4gICAgfVxuICB9O1xufTtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICBtZHgoe1xuICAgICAgcmVtYXJrUGx1Z2luczogW3JlbWFya0dmbSwgcmVtYXJrRnJvbnRtYXR0ZXJdLFxuICAgICAgcmVoeXBlUGx1Z2luczogW3JlaHlwZVNsdWcsIFtyZWh5cGVBdXRvbGlua0hlYWRpbmdzLCB7IGJlaGF2aW9yOiAnd3JhcCcgfV1dLFxuICAgIH0pLFxuICAgIHJlYWN0KCksXG4gICAgY29weVJlZGlyZWN0cygpLFxuICBdLFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBleGNsdWRlOiBbJ2x1Y2lkZS1yZWFjdCddLFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgIH0sXG4gIH0sXG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sdUJBQXVCO0FBQzlCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sNEJBQTRCO0FBRW5DLFNBQVMsZUFBZTtBQUN4QixTQUFTLGNBQWMsWUFBWSxpQkFBaUI7QUFUcEQsSUFBTSxtQ0FBbUM7QUFZekMsSUFBTSxnQkFBZ0IsTUFBTTtBQUMxQixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQ1osVUFBSTtBQUNGLFlBQUksV0FBVyxtQkFBbUIsR0FBRztBQUNuQyxvQkFBVSxRQUFRLEVBQUUsV0FBVyxLQUFLLENBQUM7QUFDckMsdUJBQWEscUJBQXFCLGlCQUFpQjtBQUFBLFFBQ3JEO0FBQUEsTUFDRixTQUFTLEtBQUs7QUFDWixnQkFBUSxLQUFLLG1DQUFtQyxHQUFHO0FBQUEsTUFDckQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBR0EsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0YsZUFBZSxDQUFDLFdBQVcsaUJBQWlCO0FBQUEsTUFDNUMsZUFBZSxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsRUFBRSxVQUFVLE9BQU8sQ0FBQyxDQUFDO0FBQUEsSUFDNUUsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLElBQ04sY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsY0FBYztBQUFBLEVBQzFCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
