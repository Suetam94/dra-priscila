import clsx from 'clsx'

/**
 * Um único gesto sólido por bloco. A ação secundária vira link de texto
 * (textLinkClasses), porque dois retângulos de mesmo peso lado a lado não
 * criam hierarquia nenhuma.
 *
 * Caixa em sentença, não em maiúsculas: caixa-alta com tracking largo fica
 * reservada para os rótulos pequenos, onde ela ainda funciona.
 */
export type ButtonSize = 'md' | 'sm'

export const buttonClasses = (size: ButtonSize = 'md', className?: string): string =>
  clsx(
    'inline-flex items-center justify-center gap-2 bg-on-navy font-bold text-navy transition-colors',
    'hover:bg-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral',
    size === 'md' ? 'px-7 py-3.5 text-[0.95rem]' : 'px-5 py-2.5 text-sm',
    className
  )

/** Ação secundária: texto sublinhado, sem caixa. */
export const textLinkClasses = (className?: string): string =>
  clsx(
    'group inline-flex items-center gap-2 border-b border-on-navy-mid pb-1 text-[0.95rem] font-bold text-on-navy',
    'transition-colors hover:border-coral hover:text-coral',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral',
    className
  )
