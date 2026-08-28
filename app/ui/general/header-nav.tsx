'use client'

// Client Component só por causa do usePathname, que marca a página atual.
// O resto do header continua sendo Server Component.

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { navLinks } from '@/app/lib/site'

const HeaderNav = (): React.JSX.Element => {
  const pathname = usePathname()

  return (
    <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
      {navLinks.map(({ href, label }) => {
        const isCurrent = pathname === href

        return (
          <Link
            key={href}
            href={href}
            aria-current={isCurrent ? 'page' : undefined}
            className={clsx(
              'border-b-2 py-1.5 text-sm font-bold tracking-wide transition-colors',
              isCurrent
                ? 'border-coral text-ink'
                : 'border-transparent text-ink-mid hover:border-rule-strong hover:text-ink'
            )}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}

export default HeaderNav
