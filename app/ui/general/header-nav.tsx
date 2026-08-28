'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { sectionLinks } from '@/app/lib/site'

/**
 * O sublinhado acompanha a seção que está em vista, usando IntersectionObserver
 * em vez de listener de scroll. A margem negativa cria uma faixa de leitura no
 * meio da tela: a seção só conta como atual quando cruza o centro do viewport.
 */
const HeaderNav = (): React.JSX.Element => {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [currentId, setCurrentId] = useState<string | null>(null)

  useEffect(() => {
    if (!isHome) {
      setCurrentId(null)
      return
    }

    const sections = sectionLinks
      .map(({ sectionId }) => document.getElementById(sectionId))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrentId(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    sections.forEach((section) => { observer.observe(section) })
    return () => { observer.disconnect() }
  }, [isHome])

  return (
    <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
      {sectionLinks.map(({ href, sectionId, label }) => {
        const isCurrent = isHome && currentId === sectionId

        return (
          <Link
            key={href}
            href={href}
            aria-current={isCurrent ? 'true' : undefined}
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
