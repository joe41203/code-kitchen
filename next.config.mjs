/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/code-kitchen",
  assetPrefix: "/code-kitchen",
  output: "export",
  images: {
    unoptimized: true
  }
};

export default nextConfig;
