/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/demos/shahin-bazaar",
  assetPrefix: "/demos/shahin-bazaar/",
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;