'use client'

// @phosphor-icons/react usa React Context internamente (cor/tamanho padrão dos ícones),
// então qualquer componente que os renderize precisa ser Client Component.
import React from 'react'
import { InstagramLogo, MapPin, Phone } from '@phosphor-icons/react'
import Link from 'next/link'
import MobileMenu from '@/app/ui/general/menu-mobile'
import BrandMark from '@/app/ui/general/brand-mark'

interface NavLinks {
  href: string
  label: string
}

const navLinks: NavLinks[] = [
  { href: '/quem-sou', label: 'Quem Sou' },
  { href: '/areas-de-atuacao', label: 'Áreas de Atuação' },
  { href: '/onde-pode-me-encontrar', label: 'Onde Me Encontrar' },
  { href: '/mais-sobre-a-dermatologia', label: 'Sobre a Dermatologia' }
]

const Header = (): React.JSX.Element => {
  return (
    <>
      <div className="bg-base-blue-soft text-base-gray text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 px-4 py-2 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 opacity-90">
              <MapPin size={14} /> Curitiba, PR
            </span>
            <a href="tel:" className="inline-flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
              <Phone size={14} /> (00) 00000-0000
            </a>
          </div>
          <a href="#" className="inline-flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
            <InstagramLogo size={14} /> Instagram
          </a>
        </div>
      </div>

      <header className="w-full sticky top-0 z-40 bg-base-blue">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 py-3 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <BrandMark size={36} />
            <span className="font-serif font-semibold text-base-gray leading-tight">
              Dra. Priscila Francisco
              <span className="block font-sans font-medium text-[0.62rem] tracking-[0.16em] uppercase text-base-pink mt-0.5">
                Dermatologista
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-base-gray/85 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/marque-sua-consulta"
            className="hidden lg:inline-flex items-center rounded-sm bg-base-pink px-6 py-2.5 text-sm font-semibold text-base-blue transition-colors hover:bg-base-pink-deep hover:text-white"
          >
            Marcar consulta
          </Link>

          <MobileMenu />
        </div>
      </header>
    </>
  )
}

export default Header
