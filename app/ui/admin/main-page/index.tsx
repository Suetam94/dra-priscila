import React from 'react'
import PresentationSection from '@/app/ui/admin/main-page/presentation-section'
import Accordion from '@/app/ui/general/accordion'
import ServicesSection from '@/app/ui/admin/main-page/services-section'
import { Playfair_Display } from 'next/font/google'

const playfairDisplay = Playfair_Display({ subsets: ['latin'] })

const MainPage = (): React.JSX.Element => {
  return (
    <div className="p-6">
      <h3 className={`${playfairDisplay.className} text-2xl font-bold text-base-blue mb-4`}>Gerenciando a página inicial</h3>
      <Accordion title="Configurações da Seção de Apresentação">
        <PresentationSection />
      </Accordion>
      <Accordion title="Configurações da Seção de Nossos Serviços">
        <ServicesSection />
      </Accordion>
    </div>
  )
}

export default MainPage
