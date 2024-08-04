'use client'

import React from 'react'
import { MapPin, Phone, Clock, Wallet } from '@phosphor-icons/react'
import Image from 'next/image'

const ContactInfo = (): React.JSX.Element => {
  return (
    <div className="bg-base-blue shadow-lg rounded-lg p-6 w-full h-full flex flex-col">
      <div className="w-full mb-4 px-10">
        <Image src="/logo-header.png" alt="Dra. Priscila Francisco" layout="responsive" width={150} height={50} />
      </div>
      <h3 className="text-base-gray font-bold text-xl mb-4 text-center">Clínica Francisco</h3>
      <div className="flex items-center mb-4">
        <MapPin className="text-base-gray w-6 h-6 mr-2" />
        <p className="text-base-gray">Rua Dr. Raul Carneiro Filho, 371, Curitiba - Paraná</p>
      </div>
      <div className="flex items-center mb-4">
        <Phone className="text-base-gray w-6 h-6 mr-2" />
        <p className="text-base-gray">(41) 1234-5678</p>
      </div>
      <div className="flex items-center mb-4">
        <Clock className="text-base-gray w-6 h-6 mr-2" />
        <p className="text-base-gray">Seg-Sex: 08h - 18h</p>
      </div>
      <div className="flex items-center">
        <Wallet className="text-base-gray w-6 h-6 mr-2" />
        <p className="text-base-gray">Atendimento particular e convênios</p>
      </div>
    </div>
  )
}

export default ContactInfo
