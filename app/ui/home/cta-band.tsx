import React from 'react'
import Link from 'next/link'
import { buttonClasses } from '@/app/ui/general/button'

const CtaBand = (): React.JSX.Element => (
  <section className="bg-navy text-on-navy" id="agendar">
    <div className="mx-auto grid max-w-6xl justify-items-center gap-6 px-5 py-16 text-center sm:px-8 lg:py-20">
      <h2 className="max-w-[22ch] font-serif text-3xl font-medium text-white sm:text-4xl lg:text-5xl">
        Agende sua consulta
      </h2>
      <p className="max-w-[46ch] text-on-navy-mid">
        Para avaliar uma lesão, tirar uma dúvida sobre a pele ou dar seguimento a um tratamento já em
        curso.
      </p>
      <Link href="/marque-sua-consulta" className={buttonClasses()}>
        Marcar consulta
      </Link>
    </div>
  </section>
)

export default CtaBand
