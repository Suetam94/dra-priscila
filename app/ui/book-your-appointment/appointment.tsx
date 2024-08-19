'use server'

import React from 'react'
import TitleSection from '@/app/ui/section/title-section'
import Clinic, { IClinicProps } from '@/app/ui/book-your-appointment/clinic'
import { getClinics } from '@/app/lib/BookYourAppointment'

const clinicsData: IClinicProps[] = [
  {
    name: 'Clínica Pró-saúde',
    address: 'Rua São Vicente, 55 Juvevê',
    contact: {
      phones: [
        { ddd: '41', number: '3254-2138', isWhatsapp: false },
        { ddd: '41', number: '3253-7370', isWhatsapp: false },
        { ddd: '41', number: '99222-1412', isWhatsapp: true }
      ]
    },
    image: {
      url: 'https://clinprosaude.com.br/wp-content/uploads/2019/08/Recep%C3%A7%C3%A3o-Vacina%C3%A7%C3%A3o-.jpg',
      alt: 'Frente da Clínica Pró-saúde'
    }
  },
  {
    name: 'INC - Unidade Shopping Pátio Batel',
    address: 'Av. do Batel, 1868 - Batel, Curitiba - PR, 80420-090',
    contact: {
      phones: [{ ddd: '41', number: '3028-8545', isWhatsapp: false }],
      bookingUrl: 'https://inc.centraldemarcacao.com.br/'
    },
    image: {
      url: 'https://4cpatiobatel.crmall.com/Api/store/image/RTBpR2RqV1A5VUdPM3lpY2ZUa1FmUT09',
      alt: 'Frente do INC - Unidade Shopping Pátio Batel'
    }
  }
]

const BookAppointment = async (): Promise<React.JSX.Element> => {
  const { data } = await getClinics()

  const clinics = data && data.length > 0 ? data : clinicsData

  return (
    <section className="w-full bg-base-gray">
      <div className="max-w-7xl mx-auto">
        <TitleSection title={'Marque sua consulta'} backgroundVariation={'bg-base-pink'} className={'mb-3'} />
        {clinics && clinics.map((clinic) => (
          <Clinic
            key={clinic.name}
            name={clinic.name}
            address={clinic.address}
            image={clinic.image}
            contact={clinic.contact}
          />
        ))}
      </div>
    </section>
  )
}

export default BookAppointment
