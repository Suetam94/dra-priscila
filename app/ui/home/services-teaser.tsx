import React from 'react'
import Link from 'next/link'
import { ArrowIcon } from '@/app/ui/general/icons'

const services = [
  {
    numeral: 'i',
    title: 'Dermatologia clínica',
    description:
      'Acne, melasma e dermatites no dia a dia. E as doenças imunomediadas, como psoríase, dermatite atópica e urticária, acompanhadas do primeiro sinal até o tratamento com imunobiológicos quando o caso exige.'
  },
  {
    numeral: 'ii',
    title: 'Oncologia cutânea',
    description:
      'Diagnóstico, tratamento e seguimento de câncer de pele, incluindo cirurgia convencional e cirurgia micrográfica de Mohs. Quem já teve um tumor precisa de vigilância continuada, e essa parte costuma ser a mais negligenciada.',
    link: { href: '#mohs', label: 'Entenda a cirurgia de Mohs' }
  },
  {
    numeral: 'iii',
    title: 'Cirurgia dermatológica',
    description:
      'Remoção de cistos, nevos, xantelasmas e outras lesões cutâneas, com o planejamento da cicatriz fazendo parte da decisão cirúrgica desde o começo.'
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
        {services.map(({ numeral, title, description, link }) => (
          <article
            key={title}
            className="flex flex-col gap-3 border border-rule bg-page p-7 transition-colors hover:border-rule-strong sm:p-8"
          >
            <p className="font-serif italic text-coral-ink">{numeral}</p>
            <h3 className="font-serif text-xl font-medium text-ink">{title}</h3>
            <p className="text-[0.98rem] text-ink-mid">{description}</p>
            {link && (
              <Link
                href={link.href}
                className="mt-auto inline-flex items-center gap-2 self-start border-b border-current pb-0.5 text-sm font-bold text-coral-ink transition-colors hover:text-ink"
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
