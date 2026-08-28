import React from 'react'
import Link from 'next/link'
import { ArrowIcon } from '@/app/ui/general/icons'

const formation = [
  { label: 'Medicina', detail: 'Universidade Federal de Santa Catarina' },
  { label: 'Residência em dermatologia', detail: 'Santa Casa de Misericórdia de Curitiba' },
  { label: 'Oncologia cutânea e cirurgia dermatológica', detail: 'Santa Casa de Misericórdia de Curitiba' },
  { label: 'Cirurgiã de Mohs', detail: 'Reconhecida pela Sociedade Brasileira de Cirurgia Dermatológica' },
  { label: 'Preceptoria', detail: 'Santa Casa de Curitiba e Hospital de Dermatologia Sanitária do Paraná' },
  { label: 'Membro titular', detail: 'Sociedade Brasileira de Dermatologia e de Cirurgia Dermatológica' }
]

const AboutTeaser = (): React.JSX.Element => (
  <section className="py-16 lg:py-24" id="sobre">
    <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div className="grid justify-items-start gap-5 self-start">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral-ink">Sobre</p>
        <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
          Cheguei à medicina pelo caminho mais longo
        </h2>
        <blockquote className="border-l-2 border-coral pl-5 font-serif text-xl italic leading-relaxed text-ink">
          A medicina nunca foi o caminho óbvio pra mim. Fui me apaixonando pelo cuidar aos poucos, e um dia
          percebi que já estava dentro.
        </blockquote>
      </div>

      <div className="grid justify-items-start gap-5">
        <p className="text-ink-mid">
          Me formei em nutrição pela Universidade Federal do Paraná antes de pensar em medicina. Foi ali,
          na clínica, atendendo gente de verdade, que entendi o que queria fazer da vida. Voltei para a
          faculdade, me formei médica pela Universidade Federal de Santa Catarina e vim fazer residência
          em dermatologia em Curitiba, minha cidade.
        </p>
        <p className="text-ink-mid">
          Entrei na dermatologia pela clínica e achava que ficaria só nela. A cirurgia apareceu depois, na
          Santa Casa, e mudou meu jeito de trabalhar: dava para acompanhar o paciente do diagnóstico até
          bem depois da alta, sem passar o caso adiante.
        </p>

        <ul className="w-full border-t border-rule">
          {formation.map(({ label, detail }) => (
            <li key={label} className="grid gap-0.5 border-b border-rule py-3.5">
              <b className="text-[0.78rem] font-bold uppercase tracking-[0.1em] text-ink">{label}</b>
              <span className="text-[0.95rem] text-ink-mid">{detail}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/quem-sou"
          className="inline-flex items-center gap-2 border-b border-current pb-0.5 text-sm font-bold text-coral-ink transition-colors hover:text-ink"
        >
          Conhecer a trajetória completa
          <ArrowIcon />
        </Link>
      </div>
    </div>
  </section>
)

export default AboutTeaser
