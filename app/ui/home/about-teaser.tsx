import React from 'react'
import Link from 'next/link'
import { ArrowIcon } from '@/app/ui/general/icons'

// Titulação conforme o site antigo (about-me.tsx, defaultSummary).
const formation = [
  { label: 'Medicina', detail: 'Universidade Federal de Santa Catarina' },
  { label: 'Dermatologia', detail: 'Residência no Hospital Santa Casa de Misericórdia de Curitiba' },
  {
    label: 'Especialização',
    detail: 'Oncologia cutânea e cirurgia dermatológica pelo Hospital Santa Casa de Curitiba'
  },
  {
    label: 'Cirurgiã de Mohs',
    detail: 'Formada pelo Hospital Santa Casa de Curitiba e reconhecida pela Sociedade Brasileira de Cirurgia Dermatológica'
  },
  {
    label: 'Preceptora',
    detail: 'Formação de novos dermatologistas no Hospital Santa Casa de Misericórdia de Curitiba e no Hospital de Dermatologia Sanitária do Paraná (São Roque)'
  },
  {
    label: 'Membro titular',
    detail: 'Sociedade Brasileira de Dermatologia e Sociedade Brasileira de Cirurgia Dermatológica'
  }
]

const AboutTeaser = (): React.JSX.Element => (
  <section className="py-16 lg:py-24" id="sobre">
    <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div className="grid justify-items-start gap-5 self-start">
        {/* Título como no site antigo. */}
        <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">Quem sou</h2>
        {/* Trecho literal da biografia que ela escreveu para o site antigo. */}
        <blockquote className="border-l-2 border-coral pl-5 font-serif text-xl italic leading-relaxed text-ink">
          A possibilidade de tratar meu paciente de uma forma completa, desde o diagnóstico, tratamento
          cirúrgico e seguimento, e ainda oferecendo a melhor técnica, me fez seguir minha formação.
        </blockquote>
      </div>

      <div className="grid justify-items-start gap-5">
        <p className="text-ink-mid">
          A medicina nunca foi o caminho mais óbvio e pré-definido na minha vida. Foi durante a minha
          primeira formação, em nutrição pela Universidade Federal do Paraná, que fui aos poucos me
          apaixonando pela clínica, pelo cuidar e pelo que a medicina pode fazer na vida de alguém.
          Concluí a faculdade, trabalhei, mas a pulguinha da medicina tinha realmente me picado, e anos
          depois eu me formava médica pela minha amada Universidade Federal de Santa Catarina.
        </p>
        <p className="text-ink-mid">
          A escolha da especialidade também não foi óbvia nem fácil. Foi a versatilidade, a complexidade
          intrínseca e a admiração pelo trabalho de profissionais exemplares que me fizeram escolher a
          dermatologia. Voltei então para minha cidade natal e fiz residência médica no Hospital Santa
          Casa de Misericórdia de Curitiba.
        </p>
        <p className="text-ink-mid">
          Entrei para a medicina por amar a clínica e sempre me considerei da clínica médica. Mas aos
          poucos, graças aos professores que tive na Santa Casa, outra área foi ganhando seu espaço na
          minha vida: a cirurgia dermatológica.
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
          Ler a história completa
          <ArrowIcon />
        </Link>
      </div>
    </div>
  </section>
)

export default AboutTeaser
