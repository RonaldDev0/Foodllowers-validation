/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      hostname: 'lh3.googleusercontent.com'
    },
    {
      hostname: 'gtsjuxikwdifunrkhpyp.supabase.co'
    }]
  }
}

export default nextConfig
