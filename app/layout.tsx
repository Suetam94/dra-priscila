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
    'A dermatologista Dra. Priscila Francisco Ã© especializada em dermatologia clÃ­nica e cirÃºrgica. Oferecemos tratamentos avanÃ§ados para doenÃ§as de pele, cabelo e unhas, alÃ©m de procedimentos estÃ©ticos modernos. Marque sua consulta e cuide da sua saÃºde com excelÃªncia',
  keywords:
    'dermatologista, Dra. Priscila Francisco, dermatologia clÃ­nica, dermatologia cirÃºrgica, tratamentos de pele, doenÃ§as de pele, cuidados com a pele, estÃ©tica, procedimentos estÃ©ticos, cabelo, unhas, acne, psorÃ­ase, eczema, melanoma, consulta dermatolÃ³gica, clÃ­nica dermatolÃ³gica, Curitiba, saÃºde da pele, rejuvenescimento, remoÃ§Ã£o de cicatrizes, tratamento de manchas, dermatologia estÃ©tica, cirurgia dermatolÃ³gica',
  openGraph: {
    title: 'Dra. Priscila Francisco - Dermatologista',
    description:
      'A dermatologista Dra. Priscila Francisco Ã© especializada em dermatologia clÃ­nica e cirÃºrgica. Oferecemos tratamentos avanÃ§ados para doenÃ§as de pele, cabelo e unhas, alÃ©m de procedimentos estÃ©ticos modernos. Marque sua consulta e cuide da sua saÃºde com excelÃªncia.',
    type: 'website',
    url: 'https://drapriscilafrancisco.com.br/',
    locale: 'pt-BR'
  },
  robots: 'index, follow',
  authors: [
    { name: 'Mateus VinÃ­cius da Silva', url: 'https://www.linkedin.com/in/mateus-vin%C3%ADcius-da-silva-8156301a5/' }
  ]
}
export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="bg-base-gray" lang="pt-BR">
        <body className={lato.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    )
}
