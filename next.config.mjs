/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Asegúrate de que la estructura app/ esté habilitada
  },
  images: {
    domains: ['www.sentieriselvaggi.it', 'e1.pxfuel.com', 'image-0.uhdpaper.com'],
  },
};

export default nextConfig;
