import React from 'react'

const CreatedBy = (): React.JSX.Element => (
  <div className="mt-8 flex flex-col items-center gap-1 border-t border-rule pt-6">
    <p className="text-[0.7rem] uppercase tracking-[0.16em] text-ink-soft">Desenvolvido por</p>
    <a
      href="https://www.linkedin.com/in/mateus-vin%C3%ADcius-da-silva-8156301a5/"
      target="_blank"
      rel="noreferrer"
      className="text-xs font-bold text-ink transition-colors hover:text-coral-ink"
    >
      Mateus Vinícius da Silva
    </a>
  </div>
)

export default CreatedBy
