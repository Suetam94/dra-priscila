import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { buttonClasses } from '@/app/ui/general/button'

const steps = [
  { numeral: 'i', text: 'O tumor visível é removido em camadas finas, uma de cada vez.' },
  { numeral: 'ii', text: 'Cada camada vai ao microscópio ali mesmo, durante o procedimento.' },
  { numeral: 'iii', text: 'Se ainda aparecem células tumorais na margem, retira-se só aquela região.' },
  { numeral: 'iv', text: 'A cirurgia termina quando as margens estão livres, preservando o máximo de pele sadia.' }
]

const MohsFeature = (): React.JSX.Element => (
  <section className="bg-navy text-on-navy" id="mohs">
    <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24">
      <div className="grid justify-items-start gap-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral">
          Cirurgia micrográfica de Mohs
        </p>
        <h2 className="font-serif text-3xl font-medium text-white sm:text-4xl">
          A cirurgia que examina o tumor antes de fechar
        </h2>
        <hr className="h-0.5 w-12 border-0 bg-coral" />
        <p className="text-on-navy-mid">
          É a técnica indicada sobretudo para tumores no rosto, onde cada milímetro de pele preservada
          muda o resultado. No Brasil, exige formação específica reconhecida pela Sociedade Brasileira de
          Cirurgia Dermatológica.
        </p>
        {/* Trecho literal da biografia dela no site antigo. */}
        <p className="font-serif text-lg italic text-stone">
          &ldquo;Cirurgia micrográfica de Mohs, hoje minha paixão.&rdquo;
        </p>
        <ol className="mt-2 grid w-full">
          {steps.map(({ numeral, text }) => (
            <li
              key={numeral}
              className="grid grid-cols-[2rem_1fr] gap-4 border-b border-white/15 py-4 text-[0.98rem] text-on-navy-mid first:border-t first:border-white/15"
            >
              <span className="font-serif text-lg italic text-coral">{numeral}</span>
              <span>{text}</span>
            </li>
          ))}
        </ol>
        <Link href="/marque-sua-consulta" className={clsx(buttonClasses(), 'mt-2')}>
          Avaliar uma lesão
        </Link>
      </div>

      <figure className="m-0">
        <Image
          src="/cirurgia-mohs.webp"
          alt="Dra. Priscila Francisco realizando uma cirurgia dermatológica com lupa cirúrgica"
          width={1440}
          height={1440}
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="w-full object-cover"
        />
      </figure>
    </div>
  </section>
)

export default MohsFeature
