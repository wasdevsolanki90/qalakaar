/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    // domains: ["cdn.sanity.io"],
    // added pattern(path for cloudinary.com, from where the images are saved)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        // pathname: '/dlmeuxeum/image/upload/**',
      },
    ],
  },
};

module.exports = nextConfig;
