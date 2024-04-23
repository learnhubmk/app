import path from 'path';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.dirname('styles')],
  },
  images: { formats: ['image/avif', 'image/webp'] },
};

export default nextConfig;
