import React from 'react'
import Link from 'next/link'
import BrandLockup from '@/app/ui/general/brand-lockup'
import HeaderNav from '@/app/ui/general/header-nav'
import MobileMenu from '@/app/ui/general/menu-mobile'
import { InstagramIcon, MapPinIcon, PhoneIcon } from '@/app/ui/general/icons'
import { clinics, site, whatsappUrl } from '@/app/lib/site'

// Server Component. O header tem fundo sólido e uma cor só: não depende de
// JavaScript de scroll para ficar legível.
const Header = (): React.JSX.Element => {
  const main = clinics[0]

  return (
    <>
      <div className="bg-navy text-sm text-on-navy-mid">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-7 gap-y-1 px-5 py-2 sm:px-8 md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <span className="inline-flex items-center gap-2">
              <MapPinIcon size={14} />
              {site.city}
            </span>
            <a
              href={whatsappUrl(main.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-on-navy"
            >
              <PhoneIcon size={14} />
              {main.phoneLabel}
            </a>
          </div>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-on-navy"
          >
            <InstagramIcon size={14} />
            Instagram
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-rule bg-page">
        <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3 sm:px-8">
          <BrandLockup height={44} />
          <HeaderNav />
          <Link
            href="/marque-sua-consulta"
            className="hidden border border-navy bg-navy px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-navy-soft lg:inline-flex"
          >
            Agendar consulta
          </Link>
          <MobileMenu />
        </div>
      </header>
    </>
  )
}

export default Header
