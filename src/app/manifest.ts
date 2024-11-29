import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: process.env.APP_NAME || 'Default App Name',
    short_name: process.env.SHORT_NAME || 'NextPWA',
    description: process.env.DESCRIPTION || 'A Progressive Web App built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: process.env.BACKGROUND_COLOR || '#ffffff',
    theme_color: process.env.THEME_COLOR || '#000000',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}