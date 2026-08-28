import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Hero = (): React.JSX.Element => (
  <section className="border-b border-rule bg-page-alt">
    <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
      <div className="grid justify-items-start gap-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral-ink">
          Dermatologia clínica, cirúrgica e oncológica
        </p>
        <h1 className="font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl lg:text-[3.5rem]">
          A mesma médica, do diagnóstico à alta.
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-ink-mid">
          Tratar bem uma doença de pele raramente cabe em uma consulta só. Aqui o diagnóstico, a cirurgia
          quando ela é necessária e o acompanhamento depois ficam com a mesma pessoa, em Curitiba.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/marque-sua-consulta"
            className="border border-stone bg-stone px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-navy transition-colors hover:border-white hover:bg-white"
          >
            Agendar consulta
          </Link>
          <Link
            href="/areas-de-atuacao"
            className="border border-rule-strong px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:border-ink"
          >
            O que eu trato
          </Link>
        </div>
      </div>

      {/* retrato-priscila.webp é o recorte com fundo transparente, gerado a
          partir de my-image.jpeg. A figura fica direto sobre o fundo escuro,
          ancorada embaixo, sem moldura. */}
      <div className="relative flex h-[26rem] items-end justify-center sm:h-[32rem] lg:h-[34rem]">
        <Image
          src="/retrato-priscila.webp"
          alt="Dra. Priscila Francisco, dermatologista em Curitiba"
          width={803}
          height={1429}
          priority
          sizes="(min-width: 1024px) 40vw, 80vw"
          className="h-full w-auto object-contain object-bottom"
        />
      </div>
    </div>
  </section>
)

export default Hero
