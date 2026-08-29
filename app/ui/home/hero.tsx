import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { bookingHref } from '@/app/lib/site'
import { buttonClasses, textLinkClasses } from '@/app/ui/general/button'
import { ArrowIcon } from '@/app/ui/general/icons'

const Hero = (): React.JSX.Element => (
  <section className="border-b border-rule bg-page-alt">
    <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
      <div className="grid justify-items-start gap-6">
        {/* O site antigo abria com o nome e "Dermatologista" abaixo. A linha de
            apoio reaproveita a descrição que já existia no metadata dele. */}
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral-ink">Dermatologista</p>
        <h1 className="font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl lg:text-[3.5rem]">
          Dra. Priscila Francisco
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-ink-mid">
          Especializada em dermatologia clínica e cirúrgica, com atuação em oncologia cutânea e cirurgia
          micrográfica de Mohs, em Curitiba.
        </p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href={bookingHref} className={buttonClasses()}>
            Agende sua consulta
          </Link>
          <Link href="#mohs" className={textLinkClasses()}>
            Cirurgia de Mohs
            <ArrowIcon className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* A foto é um recorte em fundo branco, com a médica deslocada para a
          direita. O fundo claro é intencional: forma o único bloco luminoso da
          página. height 135% + ancoragem no topo corta as pernas e mantém
          rosto, tronco e mãos. */}
      <div className="relative aspect-[4/5] overflow-hidden border border-rule bg-white">
        <Image
          src="/my-image.jpeg"
          alt="Dra. Priscila Francisco, dermatologista em Curitiba"
          width={2560}
          height={1440}
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="absolute left-0 top-0 h-[135%] w-full max-w-none object-cover object-[100%_0]"
        />
      </div>
    </div>
  </section>
)

export default Hero
