import React from 'react'
import TitleSection from '@/app/ui/section/title-section'
import { IContactInfoProps } from '@/app/ui/where-can-you-find-me/contact-info'
import ClinicPlace from '@/app/ui/where-can-you-find-me/clinic-place'
import clinicsData from '@/content/clinics.json'

const WhereToFindMe = (): React.JSX.Element => {
  const clinics = (clinicsData as any).clinics as IContactInfoProps[]

  return (
    <section className="w-full px-4 pb-8 pt-3 bg-base-gray">
      <TitleSection title="Onde você pode me encontrar?" backgroundVariation={'bg-base-pink'} className="mb-3" />
      {clinics && clinics.map((clinic) => <ClinicPlace key={clinic.name} {...clinic} />)}
    </section>
  )
}

export default WhereToFindMe

