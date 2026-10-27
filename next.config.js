/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'pictures.betaseries.com' },
      { protocol: 'https', hostname: 'external-content.duckduckgo.com' },
    ],
  },
  crossOrigin: 'anonymous',
}
