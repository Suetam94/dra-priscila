'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sectionLinks } from '@/app/lib/site'

const MobileMenu = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // fecha a gaveta ao navegar para outra página
  useEffect(() => { setIsOpen(false) }, [pathname])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => { document.removeEventListener('keydown', onKeyDown) }
  }, [isOpen])

  return (
    <>
      <button
        type="button"
        onClick={() => { setIsOpen((open) => !open) }}
        aria-expanded={isOpen}
        aria-controls="mobile-drawer"
        className="inline-flex items-center gap-2 border border-rule-strong px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-ink lg:hidden"
      >
        {isOpen ? 'Fechar' : 'Menu'}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
          {isOpen
            ? <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
            : <path d="M2 4h12M2 8h12M2 12h12" strokeLinecap="round" />}
        </svg>
      </button>

      {isOpen && (
        <div id="mobile-drawer" className="absolute inset-x-0 top-full border-t border-rule bg-page lg:hidden">
          {/* onClick além do efeito de rota: os links do header são âncoras da
              própria home, então navegar entre seções não muda o pathname e a
              gaveta ficaria aberta. */}
          <div className="mx-auto max-w-6xl px-5 sm:px-8" onClick={() => { setIsOpen(false) }}>
            <nav className="flex flex-col py-2" aria-label="Navegação do menu">
              {sectionLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="border-b border-rule py-4 font-serif text-xl text-ink last:border-b-0"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <Link
              href="/marque-sua-consulta"
              className="mb-6 mt-4 flex items-center justify-center border border-stone bg-stone px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-navy transition-colors hover:border-white hover:bg-white"
            >
              Agendar consulta
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileMenu
