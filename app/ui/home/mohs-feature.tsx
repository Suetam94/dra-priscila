import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { bookingHref } from '@/app/lib/site'
import clsx from 'clsx'
import { buttonClasses } from '@/app/ui/general/button'

// Escrito na primeira pessoa, como ela escreve na própria biografia, em vez da
// voz passiva de bula ("o tumor é removido", "retira-se").
const steps = [
  { numeral: 'i', text: 'Retiro o tumor visível em camadas finas, uma de cada vez.' },
  { numeral: 'ii', text: 'Cada camada vai para o microscópio ali mesmo, durante a cirurgia.' },
  { numeral: 'iii', text: 'Se ainda encontro células do tumor na margem, volto e retiro só aquela região.' },
  { numeral: 'iv', text: 'A cirurgia termina quando as margens estão livres, preservando o máximo de pele sadia.' }
]

const MohsFeature = (): React.JSX.Element => (
  <section className="bg-navy text-on-navy" id="mohs">
    <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24">
      <div className="grid justify-items-start gap-5">
        {/* Esta seção não existia no site antigo. O título usa o termo exato que
            já constava nas áreas de atuação, e o texto foi escrito na primeira
            pessoa, seguindo o jeito dela na biografia. Ainda precisa da revisão
            dela antes de ir ao ar, por ser conteúdo médico assinado. */}
        <h2 className="font-serif text-3xl font-medium text-white sm:text-4xl">
          Cirurgia Micrográfica de Mohs
        </h2>
        <hr className="h-0.5 w-12 border-0 bg-coral" />
        <p className="text-on-navy-mid">
          Depois da residência eu segui minha formação em cirurgia micrográfica de Mohs, e ela é hoje
          minha paixão. É a técnica que uso quando quero ter certeza de que retirei todo o tumor,
          preservando o máximo possível de pele sadia ao redor. Por isso ela é especialmente indicada no
          rosto, onde cada milímetro faz diferença no resultado.
        </p>
        <p className="text-on-navy-mid">
          No Brasil, essa formação é específica e reconhecida pela Sociedade Brasileira de Cirurgia
          Dermatológica.
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
        <Link href={bookingHref} className={clsx(buttonClasses(), 'mt-2')}>
          Agende sua consulta
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
