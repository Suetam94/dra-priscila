'use client'

import React from 'react'
import { MapPin, Phone, Clock, Wallet, WhatsappLogo } from '@phosphor-icons/react'
import Image from 'next/image'

interface IPhoneProps {
  ddd: string
  number: string
  isWhatsapp: boolean
}

export interface IContactInfoProps {
  image: {
    url: string
    alt: string
  }
  name: string
  address: string
  phones: IPhoneProps[]
  businessHour: {
    week: {
      start: string
      end: string
    }
    hour: {
      start: string
      end: string
    }
  }
  healthPlan: string[]
}

const ContactInfo = ({
  image,
  name,
  address,
  phones,
  businessHour,
  healthPlan
}: IContactInfoProps): React.JSX.Element => {
  const formatPhoneNumber = (ddd: string, number: string): string => {
    return `(${ddd}) ${number}`
  }

  const getWhatsappLink = (ddd: string, number: string): string => {
    const formattedNumber = `${ddd}${number.replace(/\D/g, '')}`
    const message = encodeURIComponent('Olá, gostaria de marcar uma consulta.')
    return `https://wa.me/55${formattedNumber}?text=${message}`
  }

  return (
    <div className="bg-base-blue shadow-lg rounded-lg p-6 w-full h-full flex flex-col">
      <div className="w-full mb-4 px-10">
        <Image src={image.url} alt={image.alt} layout="responsive" width={150} height={50} />
      </div>
      <h3 className="text-base-gray font-bold text-xl mb-4 text-center">{name}</h3>
      <div className="flex items-center mb-4">
        <MapPin className="text-base-gray w-6 h-6 mr-2" />
        <p className="text-base-gray">{address}</p>
      </div>
      <div className="mb-4">
        {phones.map((phone) => (
          <div key={phone.number} className="flex items-center mb-2">
            {phone.isWhatsapp
              ? (
              <a
                href={getWhatsappLink(phone.ddd, phone.number)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <WhatsappLogo className="w-6 h-6 text-base-gray mr-2" />
                <p className="text-base-gray">{formatPhoneNumber(phone.ddd, phone.number)}</p>
              </a>
                )
              : (
              <div className="flex items-center">
                <Phone className="text-base-gray w-6 h-6 mr-2" />
                <p className="text-base-gray">{formatPhoneNumber(phone.ddd, phone.number)}</p>
              </div>
                )}
          </div>
        ))}
      </div>
      <div className="flex items-center mb-4">
        <Clock className="text-base-gray w-6 h-6 mr-2" />
        <p className="text-base-gray">
          {businessHour.week.start}-{businessHour.week.end}: {businessHour.hour.start}h - {businessHour.hour.end}h
        </p>
      </div>
      {healthPlan.length > 0 && (
        <div className="flex items-center">
          <Wallet className="text-base-gray w-6 h-6 mr-2" />
          <p className="text-base-gray">Atendimento: {healthPlan.join(', ')}</p>
        </div>
      )}
    </div>
  )
}

export default ContactInfo
