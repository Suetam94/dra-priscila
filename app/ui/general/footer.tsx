import React from 'react'
import Link from 'next/link'
import BrandLockup from '@/app/ui/general/brand-lockup'
import CreatedBy from '@/app/ui/general/created-by'
import { InstagramIcon, MapPinIcon, PhoneIcon } from '@/app/ui/general/icons'
import { clinics, navLinks, site, whatsappUrl } from '@/app/lib/site'

const Footer = (): React.JSX.Element => {
  const main = clinics[0]

  return (
    <footer className="border-t border-rule bg-page-alt pb-8 pt-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-12">
          <div>
            <BrandLockup height={48} />
            <p className="mt-4 max-w-sm text-[0.94rem] text-ink-mid">
              Dermatologia clínica, cirúrgica e oncologia cutânea em Curitiba. Diagnóstico, cirurgia e
              acompanhamento com a mesma médica.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-ink-soft">Navegar</h2>
            {/* py-2 nos links: sem isso a área de toque fica em 23px, abaixo do
                mínimo confortável em telas pequenas. */}
            <nav className="grid">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="py-2 text-[0.94rem] text-ink-mid transition-colors hover:text-ink"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/marque-sua-consulta"
                className="py-2 text-[0.94rem] text-ink-mid transition-colors hover:text-ink"
              >
                Agendar consulta
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-ink-soft">Contato</h2>
            <div className="grid gap-3 text-[0.94rem] text-ink-mid">
              <p className="flex items-start gap-2">
                <MapPinIcon size={16} className="mt-1 shrink-0 text-coral-ink" />
                {main.address}
              </p>
              <a
                href={whatsappUrl(main.phone)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 transition-colors hover:text-ink"
              >
                <PhoneIcon size={16} className="mt-1 shrink-0 text-coral-ink" />
                {main.phoneLabel}
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 transition-colors hover:text-ink"
              >
                <InstagramIcon size={16} className="mt-1 shrink-0 text-coral-ink" />
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-2 border-t border-rule pt-6 text-xs text-ink-soft md:grid-flow-col md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {site.doctor}. {site.crm}, {site.rqe}.
          </span>
          <Link href="/politica-de-privacidade" className="underline underline-offset-4 hover:text-ink">
            Política de privacidade
          </Link>
        </div>

        <CreatedBy />
      </div>
    </footer>
  )
}

export default Footer
