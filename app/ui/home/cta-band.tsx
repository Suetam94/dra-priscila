import React from 'react'
import Link from 'next/link'
import { buttonClasses } from '@/app/ui/general/button'

const CtaBand = (): React.JSX.Element => (
  <section className="bg-navy text-on-navy" id="agendar">
    <div className="mx-auto grid max-w-6xl justify-items-center gap-6 px-5 py-16 text-center sm:px-8 lg:py-20">
      {/* Título e chamada como no site antigo. */}
      <h2 className="max-w-[22ch] font-serif text-3xl font-medium text-white sm:text-4xl lg:text-5xl">
        Marque sua consulta
      </h2>
      <Link href="/marque-sua-consulta" className={buttonClasses()}>
        Agende sua consulta
      </Link>
    </div>
  </section>
)

export default CtaBand
