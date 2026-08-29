import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/app/ui/general/header'
import Footer from '@/app/ui/general/footer'
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

const title = 'Dra. Priscila Francisco | Cirurgia dermatológica e câncer de pele em Curitiba'
const description =
  'Dermatologista em Curitiba com foco em câncer de pele e cirurgia dermatológica, incluindo cirurgia micrográfica de Mohs. Diagnóstico, cirurgia e acompanhamento, além de atendimento em dermatologia clínica.'

export const metadata: Metadata = {
  metadataBase: new URL('https://drapriscilafrancisco.com.br'),
  title,
  description,
  // A meta keywords foi removida: o Google a ignora desde 2009 e a lista antiga
  // ainda prometia estética e rejuvenescimento, que não constam nas áreas de
  // atuação que ela mesma definiu.
  openGraph: {
    title,
    description,
    type: 'website',
    url: '/',
    locale: 'pt_BR',
    images: [{ url: '/my-image.jpeg', width: 1920, height: 1080, alt: 'Dra. Priscila Francisco' }]
  },
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
          <Header />
          {children}
          <Footer />
        </body>
      </html>
  )
}
