import type { MetadataRoute } from 'next'
import { site } from '@/app/lib/site'

// Só a home entra. A política de privacidade é noindex, e página marcada como
// noindex no sitemap manda sinais contraditórios para o buscador.
const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: site.url,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1
  }
]

export default sitemap
