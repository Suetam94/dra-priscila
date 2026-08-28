import React from 'react'
import Link from 'next/link'
import { buttonClasses } from '@/app/ui/general/button'

const CtaBand = (): React.JSX.Element => (
  <section className="bg-navy text-on-navy" id="agendar">
    <div className="mx-auto grid max-w-6xl justify-items-center gap-6 px-5 py-16 text-center sm:px-8 lg:py-20">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral">Agendar</p>
      <h2 className="max-w-[22ch] font-serif text-3xl font-medium text-white sm:text-4xl lg:text-5xl">
        Se tem uma mancha te preocupando, não espere ela crescer
      </h2>
      <p className="max-w-[42ch] text-on-navy-mid">
        Marque uma avaliação. Quanto mais cedo se olha uma lesão, mais simples costuma ser o tratamento.
      </p>
      <Link href="/marque-sua-consulta" className={buttonClasses()}>
        Marcar uma consulta
      </Link>
    </div>
  </section>
)

export default CtaBand
