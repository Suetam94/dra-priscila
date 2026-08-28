import React from 'react'
import { LinkedinLogo } from '@phosphor-icons/react'

const CreatedBy = (): React.JSX.Element => {
  return (
    <div className="w-full border-t border-hairline mt-10 py-4 flex flex-col items-center gap-2">
      <p className="text-xs text-ink-soft">Created by</p>
      <a
        href="https://www.linkedin.com/in/mateus-vin%C3%ADcius-da-silva-8156301a5/"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-xs font-medium text-ink hover:text-base-pink-deep transition-colors"
      >
        <LinkedinLogo size={16} />
        Mateus Vinícius da Silva
      </a>
    </div>
  )
}

export default CreatedBy
