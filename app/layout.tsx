import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/app/ui/general/header'
import Footer from '@/app/ui/general/footer'
import StructuredData from '@/app/ui/general/structured-data'
import { site } from '@/app/lib/site'
import { EB_Garamond, Lato } from 'next/font/google'

const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-garamond',
  display: 'swap'
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-lato',
  display: 'swap'
})

// O Google corta o título por volta de 60 caracteres e a descrição por volta de
// 155. Os valores anteriores tinham 77 e 205, então o fim ficava cortado no
// resultado de busca. Estes cabem inteiros.
const title = 'Dra. Priscila Francisco | Cirurgia de Mohs em Curitiba'
const description =
  'Dermatologista em Curitiba especializada em câncer de pele e cirurgia dermatológica, incluindo cirurgia micrográfica de Mohs.'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  // A meta keywords foi removida: o Google a ignora desde 2009 e a lista antiga
  // ainda prometia estética e rejuvenescimento, que não constam nas áreas de
  // atuação que ela mesma definiu.
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description,
    type: 'website',
    url: '/',
    locale: 'pt_BR',
    siteName: `Dra. ${site.doctor}`,
    // 1200x630 é a proporção que WhatsApp, Facebook e LinkedIn recortam sem
    // perder conteúdo. O retrato cru servia de provisório, mas é 16:9 e cada
    // rede cortava num lugar diferente.
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dra. Priscila Francisco, dermatologista em Curitiba'
      }
    ]
  },
  twitter: { card: 'summary_large_image', title, description },
  robots: 'index, follow',
  authors: [
    { name: 'Mateus Vinícius da Silva', url: 'https://www.linkedin.com/in/mateus-vin%C3%ADcius-da-silva-8156301a5/' }
  ]
}
// suppressHydrationWarning cobre apenas os atributos desta tag, não os filhos.
// Serve para extensões de navegador que escrevem no <html> antes do React
// hidratar, como Dark Reader e tradutores. Comparando o HTML servido com o DOM
// em navegador limpo, os atributos são idênticos, então isto não está
// escondendo divergência vinda do nosso código.
export default function RootLayout ({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
      <html
        className={`${garamond.variable} ${lato.variable} bg-page`}
        lang="pt-BR"
        suppressHydrationWarning
      >
        <body>
          <StructuredData />
          <Header />
          {children}
          <Footer />
        </body>
      </html>
  )
}
