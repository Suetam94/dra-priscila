'use client'

import React from 'react'
import { Playfair_Display } from 'next/font/google'
import Copyright from '@/app/ui/general/copyright'
import ContactForm from '@/app/ui/general/contact-form'

const playfairDisplay = Playfair_Display({ subsets: ['latin'] })

const Footer = (): React.JSX.Element => {
  return (
    <footer className="w-full bg-base-blue text-base-gray pt-8 flex flex-col items-center justify-between">
      <div className="container mx-auto px-4 mb-3">
        <h2 className={`${playfairDisplay.className} text-3xl font-bold mb-6 text-center`}>
          Entre em Contato
        </h2>
        <ContactForm />
      </div>
      <Copyright />
    </footer>
  )
}

export default Footer
