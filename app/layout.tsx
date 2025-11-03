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
    'A dermatologista Dra. Priscila Francisco ÃƒÆ’Ã‚Â© especializada em dermatologia clÃƒÆ’Ã‚Â­nica e cirÃƒÆ’Ã‚Âºrgica. Oferecemos tratamentos avanÃƒÆ’Ã‚Â§ados para doenÃƒÆ’Ã‚Â§as de pele, cabelo e unhas, alÃƒÆ’Ã‚Â©m de procedimentos estÃƒÆ’Ã‚Â©ticos modernos. Marque sua consulta e cuide da sua saÃƒÆ’Ã‚Âºde com excelÃƒÆ’Ã‚Âªncia',
  keywords:
    'dermatologista, Dra. Priscila Francisco, dermatologia clÃƒÆ’Ã‚Â­nica, dermatologia cirÃƒÆ’Ã‚Âºrgica, tratamentos de pele, doenÃƒÆ’Ã‚Â§as de pele, cuidados com a pele, estÃƒÆ’Ã‚Â©tica, procedimentos estÃƒÆ’Ã‚Â©ticos, cabelo, unhas, acne, psorÃƒÆ’Ã‚Â­ase, eczema, melanoma, consulta dermatolÃƒÆ’Ã‚Â³gica, clÃƒÆ’Ã‚Â­nica dermatolÃƒÆ’Ã‚Â³gica, Curitiba, saÃƒÆ’Ã‚Âºde da pele, rejuvenescimento, remoÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o de cicatrizes, tratamento de manchas, dermatologia estÃƒÆ’Ã‚Â©tica, cirurgia dermatolÃƒÆ’Ã‚Â³gica',
  openGraph: {
    title: 'Dra. Priscila Francisco - Dermatologista',
    description:
      'A dermatologista Dra. Priscila Francisco ÃƒÆ’Ã‚Â© especializada em dermatologia clÃƒÆ’Ã‚Â­nica e cirÃƒÆ’Ã‚Âºrgica. Oferecemos tratamentos avanÃƒÆ’Ã‚Â§ados para doenÃƒÆ’Ã‚Â§as de pele, cabelo e unhas, alÃƒÆ’Ã‚Â©m de procedimentos estÃƒÆ’Ã‚Â©ticos modernos. Marque sua consulta e cuide da sua saÃƒÆ’Ã‚Âºde com excelÃƒÆ’Ã‚Âªncia.',
    type: 'website',
    url: 'https://drapriscilafrancisco.com.br/',
    locale: 'pt-BR'
  },
  robots: 'index, follow',
  authors: [
    { name: 'Mateus VinÃƒÆ’Ã‚Â­cius da Silva', url: 'https://www.linkedin.com/in/mateus-vin%C3%ADcius-da-silva-8156301a5/' }
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
