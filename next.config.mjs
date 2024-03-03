import path from "path";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.dirname("styles")],
  },
};

export default nextConfig;
