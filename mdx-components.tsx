import type { MDXComponents } from "mdx/types";

// function H1({ children }) {
//     return <div className="text-lg font-body text-secondary">{children}</div>;
// }

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // h1: H1,
        ...components,
    };
}
