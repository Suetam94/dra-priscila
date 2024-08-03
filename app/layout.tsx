import React from 'react'
import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'
import Header from '@/app/ui/general/header'
import Footer from '@/app/ui/general/footer'

const lato = Lato({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dra. Priscila Francisco - Dermatologista',
  description:
    'A dermatologista Dra. Priscila Francisco é especializada em dermatologia clínica e cirúrgica. Oferecemos tratamentos avançados para doenças de pele, cabelo e unhas, além de procedimentos estéticos modernos. Marque sua consulta e cuide da sua saúde com excelência',
  keywords: 'dermatologista, Dra. Priscila Francisco, dermatologia clínica, dermatologia cirúrgica, tratamentos de pele, doenças de pele, cuidados com a pele, estética, procedimentos estéticos, cabelo, unhas, acne, psoríase, eczema, melanoma, consulta dermatológica, clínica dermatológica, Curitiba, saúde da pele, rejuvenescimento, remoção de cicatrizes, tratamento de manchas, dermatologia estética, cirurgia dermatológica',
  openGraph: {
    title: 'Dra. Priscila Francisco - Dermatologista',
    description: 'A dermatologista Dra. Priscila Francisco é especializada em dermatologia clínica e cirúrgica. Oferecemos tratamentos avançados para doenças de pele, cabelo e unhas, além de procedimentos estéticos modernos. Marque sua consulta e cuide da sua saúde com excelência.',
    type: 'website',
    url: 'https://drapriscilafrancisco.com.br/',
    locale: 'pt-BR'
  },
  robots: 'index, follow',
  authors: [{ name: 'Mateus Vinícius da Silva', url: 'https://www.linkedin.com/in/mateus-vin%C3%ADcius-da-silva-8156301a5/' }]

}
export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="bg-base-gray" lang="en">
      <body className={lato.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
