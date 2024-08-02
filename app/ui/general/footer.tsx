'use client'

import React from 'react'
import { Clock, MapPin, Phone, WhatsappLogo } from '@phosphor-icons/react'
import { Playfair_Display } from 'next/font/google'
import Copyright from '@/app/ui/general/copyright'

const playfairDisplay = Playfair_Display({ subsets: ['latin'] })

const Footer = (): React.JSX.Element => {
  return (
    <footer className="w-full bg-base-pink text-base-blue pt-8 flex flex-col items-center justify-between">
      <div className="container mx-auto px-4 mb-3">
        <h2 className={`${playfairDisplay.className} text-3xl font-bold mb-6 text-center`}>
          Nossas Informações
        </h2>
        <ul className="space-y-4">
          <li className="flex items-center">
            <MapPin size={32} className="mr-4 text-base-blue" />
            <p className="capitalize">Rua Alferes Ângelo Sampaio, 777, sala 77</p>
          </li>
          <li className="flex items-center">
            <Phone size={32} className="mr-4 text-base-blue" />
            <p className="capitalize">(41) 3245-2020</p>
          </li>
          <li className="flex items-center">
            <WhatsappLogo size={32} className="mr-4 text-base-blue" />
            <p className="capitalize">(41) 99985-3285</p>
          </li>
          <li className="flex items-center">
            <Clock size={32} className="mr-4 text-base-blue" />
            <p className="capitalize">08h - 18h</p>
          </li>
        </ul>
      </div>
      <Copyright />
    </footer>
  )
}

export default Footer
