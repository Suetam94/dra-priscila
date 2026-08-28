import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import BrandMark from '@/app/ui/general/brand-mark'

interface BrandLockupProps {
  height?: number
  /** Usa tons claros, para quando o lockup fica sobre fundo navy. */
  onDark?: boolean
  className?: string
}

const BrandLockup = ({ height = 44, onDark = false, className }: BrandLockupProps): React.JSX.Element => (
  <Link href="/" className={clsx('flex items-center gap-3', className)}>
    <BrandMark height={height} />
    <span
      className={clsx(
        'font-serif text-xl font-medium leading-tight',
        onDark ? 'text-on-navy' : 'text-ink'
      )}
    >
      Priscila Francisco
      <span
        className={clsx(
          'mt-1 block font-sans text-[0.6rem] font-bold uppercase tracking-[0.2em]',
          onDark ? 'text-coral' : 'text-ink-soft'
        )}
      >
        Dermatologia
      </span>
    </span>
  </Link>
)

export default BrandLockup
