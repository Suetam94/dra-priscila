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
    'A dermatologista Dra. Priscila Francisco ÃƒÂ© especializada em dermatologia clÃƒÂ­nica e cirÃƒÂºrgica. Oferecemos tratamentos avanÃƒÂ§ados para doenÃƒÂ§as de pele, cabelo e unhas, alÃƒÂ©m de procedimentos estÃƒÂ©ticos modernos. Marque sua consulta e cuide da sua saÃƒÂºde com excelÃƒÂªncia',
  keywords:
    'dermatologista, Dra. Priscila Francisco, dermatologia clÃƒÂ­nica, dermatologia cirÃƒÂºrgica, tratamentos de pele, doenÃƒÂ§as de pele, cuidados com a pele, estÃƒÂ©tica, procedimentos estÃƒÂ©ticos, cabelo, unhas, acne, psorÃƒÂ­ase, eczema, melanoma, consulta dermatolÃƒÂ³gica, clÃƒÂ­nica dermatolÃƒÂ³gica, Curitiba, saÃƒÂºde da pele, rejuvenescimento, remoÃƒÂ§ÃƒÂ£o de cicatrizes, tratamento de manchas, dermatologia estÃƒÂ©tica, cirurgia dermatolÃƒÂ³gica',
  openGraph: {
    title: 'Dra. Priscila Francisco - Dermatologista',
    description:
      'A dermatologista Dra. Priscila Francisco ÃƒÂ© especializada em dermatologia clÃƒÂ­nica e cirÃƒÂºrgica. Oferecemos tratamentos avanÃƒÂ§ados para doenÃƒÂ§as de pele, cabelo e unhas, alÃƒÂ©m de procedimentos estÃƒÂ©ticos modernos. Marque sua consulta e cuide da sua saÃƒÂºde com excelÃƒÂªncia.',
    type: 'website',
    url: 'https://drapriscilafrancisco.com.br/',
    locale: 'pt-BR'
  },
  robots: 'index, follow',
  authors: [
    { name: 'Mateus VinÃƒÂ­cius da Silva', url: 'https://www.linkedin.com/in/mateus-vin%C3%ADcius-da-silva-8156301a5/' }
  ]
}
export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
  return (
    <html className="bg-base-gray" lang="pt-BR">
      <body className={lato.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
}
