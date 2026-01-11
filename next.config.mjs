/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // <--- This tells Next.js to generate static HTML
  images: {
    unoptimized: true, // <--- Required for static export (unless using an external image loader)
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

export default nextConfig
