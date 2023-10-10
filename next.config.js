/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    mdxRs: true,
  },
  output: "export",
  basePath: "/react-epic",
  images: {
    unoptimized: true,
  },
};

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

module.exports = withMDX(nextConfig);
