import React from 'react'

const credentials = [
  { title: 'UFSC', detail: 'Formação médica' },
  { title: 'Santa Casa', detail: 'Residência em Curitiba' },
  { title: 'Cirurgia de Mohs', detail: 'Formação reconhecida' },
  { title: 'SBD e SBCD', detail: 'Membro titular' }
]

const CredentialsStrip = (): React.JSX.Element => (
  <section className="border-b border-rule bg-page" aria-label="Formação e titulação">
    <div className="mx-auto grid max-w-6xl grid-cols-2 px-5 sm:px-8 md:grid-cols-4">
      {credentials.map(({ title, detail }) => (
        <div
          key={title}
          className="border-b border-r border-rule px-3 py-5 text-center last:border-r-0 even:border-r-0 md:border-b-0 md:even:border-r"
        >
          <strong className="block font-serif text-lg font-medium text-ink">{title}</strong>
          <span className="mt-1 block text-[0.72rem] font-bold uppercase tracking-[0.12em] text-ink-soft">
            {detail}
          </span>
        </div>
      ))}
    </div>
  </section>
)

export default CredentialsStrip
