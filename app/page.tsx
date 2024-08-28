import React from 'react'
import MainSectionBackground from '@/app/ui/section/main-section-background'
import TitleSection from '@/app/ui/section/title-section'
import servicesData from './lib/standard-info/services.json'
import MainInfoSection from '@/app/ui/section/main-info-section'
import CookieConsent from '@/app/ui/general/cookie-consent'

export default function Home (): React.JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center bg-base-gray w-full">
      <MainSectionBackground />
      <TitleSection className="px-4 py-8 md:px-8 md:py-16" title="Nossos serviços" backgroundVariation="bg-base-gray" />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-8">
        {servicesData.services.map((service) => (
          <MainInfoSection
            hasCard={true}
            key={service.title}
            card={{
              content: service.content,
              title: service.title,
              imageUrl: service.imageUrl,
              contentColor: 'text-base-gray',
              cardBackground: 'bg-base-blue',
              titleColor: 'text-base-gray'
            }}
          />
        ))}
      </div>
      <CookieConsent />
    </main>
  )
}
