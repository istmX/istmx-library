import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/app/portfolio-components/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/cat-home', '/demo', '/home'],
      },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'Applebot',
          'GPTBot',
          'ClaudeBot',
          'PerplexityBot',
          'cohere-ai',
        ],
        allow: '/',
        disallow: ['/cat-home', '/demo', '/home'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
