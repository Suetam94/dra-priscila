import type { MetadataRoute } from 'next'
import { site } from '@/app/lib/site'

// Arquivo de rota do App Router: o Next gera /robots.txt a partir daqui.
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/'
  },
  sitemap: `${site.url}/sitemap.xml`
})

export default robots
