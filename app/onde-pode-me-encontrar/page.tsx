import React from 'react'
import TitleSection from '@/app/ui/section/title-section'
import { IContactInfoProps } from '@/app/ui/where-can-you-find-me/contact-info'
import ClinicPlace from '@/app/ui/where-can-you-find-me/clinic-place'

const clinics: IContactInfoProps[] = [
  {
    image: {
      url: 'https://clinprosaude.com.br/wp-content/uploads/2019/08/Recep%C3%A7%C3%A3o-Vacina%C3%A7%C3%A3o-.jpg',
      alt: 'Frente da Clínica Pró-saúde'
    },
    name: 'Clínica Pró-saúde',
    address: 'Rua São Vicente, 55 Juvevê',
    phones: [
      { ddd: '41', number: '3254-2138', isWhatsapp: false },
      { ddd: '41', number: '3253-7370', isWhatsapp: false },
      { ddd: '41', number: '99222-1412', isWhatsapp: true }
    ],
    businessHour: {
      week: {
        start: 'Segunda-feira',
        end: 'Sexta-feira'
      },
      hour: {
        start: '08:00',
        end: '18:00'
      }
    },
    healthPlan: ['Plano A', 'Plano B', 'Plano C']
  },
  {
    image: {
      url: 'https://4cpatiobatel.crmall.com/Api/store/image/RTBpR2RqV1A5VUdPM3lpY2ZUa1FmUT09',
      alt: 'Frente do INC - Unidade Shopping Pátio Batel'
    },
    name: 'INC - Unidade Shopping Pátio Batel',
    address: 'Av. do Batel, 1868 - Batel, Curitiba - PR, 80420-090',
    phones: [
      { ddd: '41', number: '3028-8545', isWhatsapp: false }
    ],
    businessHour: {
      week: {
        start: 'Segunda-feira',
        end: 'Sexta-feira'
      },
      hour: {
        start: '09:00',
        end: '17:00'
      }
    },
    healthPlan: ['Plano D', 'Plano E']
  }
]

const WhereToFindMe = () => {
  return (
    <section className="w-full px-4 pb-8 pt-3 bg-base-gray">
      <TitleSection title="Onde você pode me encontrar?" backgroundVariation={'bg-base-pink'} className="mb-3" />
      {
        clinics.map(clinic => <ClinicPlace key={clinic.name} {...clinic} />)
      }
    </section>
  )
}

export default WhereToFindMe
