/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      hostname: 'lh3.googleusercontent.com'
    },
    {
      hostname: 'gtsjuxikwdifunrkhpyp.supabase.co'
    }]
  },
  experimental: {
    missingSuspenseWithCSRBailout: false
  }
}

export default nextConfig
