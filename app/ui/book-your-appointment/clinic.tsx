'use client'

import React from 'react'
import Image from 'next/image'
import { Phone, WhatsappLogo, MapPin } from '@phosphor-icons/react'

interface IPhoneProps {
  ddd: string
  number: string
  isWhatsapp: boolean
}

export interface IClinicProps {
  name: string,
  address: string,
  image: {
    url: string
    alt: string
  },
  contact: {
    phones: IPhoneProps[],
    bookingUrl?: string
  }
}

const Clinic = ({ name, image, contact, address }: IClinicProps) => {
  const formatPhoneNumber = (ddd: string, number: string): string => {
    return `(${ddd}) ${number}`
  }

  const getWhatsappLink = (ddd: string, number: string): string => {
    const formattedNumber = `${ddd}${number.replace(/\D/g, '')}`
    const message = encodeURIComponent('Olá, gostaria de marcar uma consulta.')
    return `https://wa.me/55${formattedNumber}?text=${message}`
  }

  return (
    <div key={name} className="flex flex-col md:flex-row items-center mb-5 bg-white rounded-lg shadow-lg p-4 h-[500px] md:h-[350px]">
      <div className="w-full md:w-1/2 p-4 flex justify-center">
        <div className="w-72 md:w-128 h-auto">
          <Image
            src={image.url}
            alt={image.alt}
            layout="responsive"
            width={512}
            height={768}
            objectFit="cover"
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 p-4 text-center md:text-left flex flex-col justify-start flex-shrink-0">
        <h3 className="text-2xl font-bold text-base-blue mb-4">{name}</h3>
        <div className="flex items-center text-base-blue text-lg font-medium mb-2 flex-shrink-0">
          <MapPin className="w-6 h-6 text-base-blue mr-2 flex-shrink-0" />
          <span>{address}</span>
        </div>
        {contact.phones.map((phone) => (
          <div key={phone.number} className="text-base-blue text-lg font-medium mb-2 flex items-center flex-shrink-0">
            {phone.isWhatsapp
              ? (
              <a href={getWhatsappLink(phone.ddd, phone.number)} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <WhatsappLogo className="w-6 h-6 text-base-pink mr-2 flex-shrink-0" />
                <span className="text-base-pink">{formatPhoneNumber(phone.ddd, phone.number)}</span>
              </a>
                )
              : (
              <div className="flex items-center flex-shrink-0">
                <Phone className="w-6 h-6 text-base-blue mr-2 flex-shrink-0" />
                <span>{formatPhoneNumber(phone.ddd, phone.number)}</span>
              </div>
                )}
          </div>
        ))}
        {contact.bookingUrl && (
          <p className="text-base-blue text-lg mt-2">
            Marcação de consulta: <a href={contact.bookingUrl} className="text-base-pink underline">Clique aqui</a>
          </p>
        )}
      </div>
    </div>
  )
}

export default Clinic
