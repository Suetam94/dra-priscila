import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/app/ui/general/header'
import Footer from '@/app/ui/general/footer'
import { Fraunces, Public_Sans } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap'
})

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-public-sans',
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://drapriscilafrancisco.com.br'),
  title: 'Dra. Priscila Francisco - Dermatologista',
  description:
    'A dermatologista Dra. Priscila Francisco é especializada em dermatologia clínica e cirúrgica. Oferecemos tratamentos avançados para doenças de pele, cabelo e unhas, além de procedimentos estéticos modernos. Marque sua consulta e cuide da sua saúde com excelência',
  keywords:
    'dermatologista, Dra. Priscila Francisco, dermatologia clínica, dermatologia cirúrgica, tratamentos de pele, doenças de pele, cuidados com a pele, estética, procedimentos estéticos, cabelo, unhas, acne, psoríase, eczema, melanoma, consulta dermatológica, clínica dermatológica, Curitiba, saúde da pele, rejuvenescimento, remoção de cicatrizes, tratamento de manchas, dermatologia estética, cirurgia dermatológica',
  openGraph: {
    title: 'Dra. Priscila Francisco - Dermatologista',
    description:
        'A dermatologista Dra. Priscila Francisco é especializada em dermatologia clínica e cirúrgica. Oferecemos tratamentos avançados para doenças de pele, cabelo e unhas, além de procedimentos estéticos modernos. Marque sua consulta e cuide da sua saúde com excelência.',
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
export default function RootLayout ({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
      <html className={`${fraunces.variable} ${publicSans.variable} bg-paper`} lang="pt-BR">
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
  )
}
