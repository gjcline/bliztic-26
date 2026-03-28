import { MDXProvider as Base } from '@mdx-js/react';

const components = {
  // add classes matching current "prose prose-invert ..." look
  h1: (p: any) => <h1 className="text-3xl font-bold mt-8 mb-4 text-white" {...p} />,
  h2: (p: any) => <h2 className="text-2xl font-bold mt-8 mb-4 text-white" {...p} />,
  h3: (p: any) => <h3 className="text-xl font-semibold mt-6 mb-3 text-white" {...p} />,
  p:  (p: any) => <p className="text-white/70 leading-relaxed my-4" {...p} />,
  ul: (p: any) => <ul className="list-disc pl-6 my-4 space-y-2 text-white/70" {...p} />,
  ol: (p: any) => <ol className="list-decimal pl-6 my-4 space-y-2 text-white/70" {...p} />,
  li: (p: any) => <li className="text-white/70" {...p} />,
  a:  (p: any) => <a className="text-indigo-400 hover:underline" {...p} />,
  hr: (p: any) => <hr className="my-8 border-white/10" {...p} />,
  img:(p: any) => <img className="rounded-xl border border-white/10 my-6" {...p} />,
  strong: (p: any) => <strong className="font-bold text-white" {...p} />,
  em: (p: any) => <em className="italic text-white/80" {...p} />,
  blockquote: (p: any) => <blockquote className="border-l-4 border-indigo-500 pl-4 my-6 text-white/80 italic" {...p} />,
  code: (p: any) => <code className="bg-white/10 text-white px-2 py-1 rounded text-sm" {...p} />,
  pre: (p: any) => <pre className="bg-[#0a0a0a] border border-white/10 rounded-lg p-4 overflow-x-auto my-6" {...p} />,
};

export const MDXProvider = ({ children }: { children: React.ReactNode }) => (
  <Base components={components}>{children}</Base>
);