import React from 'react'
import Hero from '@/app/ui/home/hero'
import CredentialsStrip from '@/app/ui/home/credentials-strip'
import ServicesTeaser from '@/app/ui/home/services-teaser'
import MohsFeature from '@/app/ui/home/mohs-feature'
import AboutTeaser from '@/app/ui/home/about-teaser'
import Locations from '@/app/ui/home/locations'
import CtaBand from '@/app/ui/home/cta-band'
import CookieConsent from '@/app/ui/general/cookie-consent'

export default function Home (): React.JSX.Element {
  return (
    <main className="w-full">
      <Hero />
      <CredentialsStrip />
      {/* Mohs antes das áreas de atuação: é a formação rara dela e o motivo
          pelo qual alguém procura uma cirurgiã em vez de um dermatologista
          geral. */}
      <MohsFeature />
      <ServicesTeaser />
      <AboutTeaser />
      <Locations />
      <CtaBand />
      <CookieConsent />
    </main>
  )
}
