import React from 'react'
import Link from 'next/link'
import { ArrowIcon } from '@/app/ui/general/icons'

// Textos vindos do site antigo (fields-of-expertise-data.tsx), que descrevia
// cada área com os itens detalhados abaixo.
const services = [
  {
    numeral: 'i',
    title: 'Dermatologia clínica',
    items: [
      'Tratamento de doenças de pele de uma forma geral, como acne, melasma e dermatites.',
      'Doenças cutâneas imunomediadas, como psoríase, dermatite atópica e urticária, desde as fases iniciais até o uso de medicamentos sistêmicos como os imunobiológicos.'
    ]
  },
  {
    numeral: 'ii',
    title: 'Oncologia cutânea',
    items: [
      'Diagnóstico e seguimento de pacientes com história de câncer de pele.',
      'Tratamento clínico do câncer de pele.',
      'Tratamento cirúrgico, por cirurgia convencional e por cirurgia micrográfica de Mohs.'
    ],
    link: { href: '#mohs', label: 'Entenda a cirurgia de Mohs' }
  },
  {
    numeral: 'iii',
    title: 'Cirurgia dermatológica geral',
    items: [
      'Tratamento cirúrgico de lesões cutâneas diversas, como cistos, nevos e xantelasmas.'
    ]
  }
]

const ServicesTeaser = (): React.JSX.Element => (
  <section className="py-16 lg:py-24" id="atuacao">
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="mx-auto mb-12 grid max-w-2xl justify-items-center gap-4 text-center lg:mb-14">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral-ink">Áreas de atuação</p>
        <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
          Três frentes que raramente andam separadas
        </h2>
        <p className="text-ink-mid">
          Uma lesão que parece simples pode pedir cirurgia. Um câncer de pele tratado hoje pede
          acompanhamento por anos. Por isso as três áreas convivem no mesmo consultório.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {services.map(({ numeral, title, items, link }) => (
          <article
            key={title}
            className="flex flex-col gap-4 border border-rule bg-page p-7 transition-colors hover:border-rule-strong sm:p-8"
          >
            <p className="font-serif italic text-coral-ink">{numeral}</p>
            <h3 className="font-serif text-xl font-medium text-ink">{title}</h3>
            <ul className="grid gap-3">
              {items.map((item) => (
                <li key={item} className="relative pl-4 text-[0.95rem] leading-relaxed text-ink-mid">
                  <span className="absolute left-0 top-[0.7em] h-1 w-1 rounded-full bg-coral-ink" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            {link && (
              <Link
                href={link.href}
                className="mt-auto inline-flex items-center gap-2 self-start border-b border-current pb-0.5 pt-1 text-sm font-bold text-coral-ink transition-colors hover:text-ink"
              >
                {link.label}
                <ArrowIcon />
              </Link>
            )}
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default ServicesTeaser
