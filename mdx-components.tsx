import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    code: ({ children }) => (
      <code className="text-green-700 bg-slate-100 p-0.5 rounded">
        {children}
      </code>
    ),
    blockquote: ({ children }) => (
      <blockquote className="p-6 bg-green-600 text-slate-200 rounded-xl">
        <div className="text-xl font-nunito">💡 Note</div>
        {children}
      </blockquote>
    ),
    ol: ({ children }) => <ol className="flex flex-col gap-y-4">{children}</ol>,
    li: ({ children }) => (
      <li className="flex gap-x-4 text-base">
        <span>🏷️</span>
        {children}
      </li>
    ),
    h3: ({ children }) => (
      <h3 className="p-6 bg-green-800 text-slate-200 rounded-xl">
        <div className="text-xl font-nunito">🎯 Goal</div>
        {children}
      </h3>
    ),
    h5: ({ children }) => <h5 className="font-nunito text-lg">{children}</h5>,
    h6: ({ children }) => (
      <h6 className="p-4 bg-green-200 text-slate-900 rounded-xl">{children}</h6>
    ),
    ...components,
  };
}
