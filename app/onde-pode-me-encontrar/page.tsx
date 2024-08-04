import React from 'react'
import OpenStreetMapComponent from '@/app/ui/where-can-you-find-me/map'
import ContactInfo from '@/app/ui/where-can-you-find-me/contact-info'
import TitleSection from '@/app/ui/section/title-section'

const WhereToFindMe = () => {
  const address = 'Rua Dr. Raul Carneiro Filho, 371, Curitiba - Paraná'

  return (
    <section className="w-full px-4 pb-8 pt-3 bg-base-gray">
      <div className="max-w-7xl mx-auto">
        <TitleSection title="Onde você pode me encontrar?" backgroundVariation={'bg-base-pink'} className="mb-3" />
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
          <div className="flex flex-col flex-1 order-1 lg:order-2 h-full">
            <ContactInfo />
          </div>
          <div className="flex flex-col flex-1 order-2 lg:order-1 min-h-full">
            <OpenStreetMapComponent address={address} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhereToFindMe
