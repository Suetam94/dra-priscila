'use client'

// mesma razão do header: os ícones do phosphor dependem de Context, exigem Client Component.
import React from 'react'
import Link from 'next/link'
import { InstagramLogo, MapPin, Phone } from '@phosphor-icons/react'
import BrandMark from '@/app/ui/general/brand-mark'
import ContactForm from '@/app/ui/general/contact-form'
import CreatedBy from '@/app/ui/general/created-by'

const Footer = (): React.JSX.Element => {
  return (
    <footer className="w-full bg-sunken border-t border-hairline pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <BrandMark size={44} />
              <span className="font-serif font-semibold text-ink leading-tight">
                Dra. Priscila Francisco
                <span className="block font-sans font-medium text-[0.62rem] tracking-[0.16em] uppercase text-base-pink-deep mt-0.5">
                  Dermatologista
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              Dermatologia clínica e cirúrgica em Curitiba, PR. Diagnóstico, tratamento e acompanhamento próximo — do
              consultório à cirurgia.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft mb-4">Navegação</h4>
            <nav className="flex flex-col gap-2.5">
              <Link href="/quem-sou" className="text-sm text-ink-soft hover:text-ink transition-colors">
                Quem Sou
              </Link>
              <Link href="/areas-de-atuacao" className="text-sm text-ink-soft hover:text-ink transition-colors">
                Áreas de Atuação
              </Link>
              <Link href="/onde-pode-me-encontrar" className="text-sm text-ink-soft hover:text-ink transition-colors">
                Onde Me Encontrar
              </Link>
              <Link
                href="/mais-sobre-a-dermatologia"
                className="text-sm text-ink-soft hover:text-ink transition-colors"
              >
                Sobre a Dermatologia
              </Link>
              <Link href="/marque-sua-consulta" className="text-sm text-ink-soft hover:text-ink transition-colors">
                Marcar Consulta
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft mb-4">Contato</h4>
            <div className="flex flex-col gap-3 text-sm text-ink-soft">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-base-pink-deep" />
                [Endereço] — Curitiba, PR
              </div>
              <a href="tel:" className="flex items-start gap-2 hover:text-ink transition-colors">
                <Phone size={16} className="mt-0.5 shrink-0 text-base-pink-deep" />
                [Telefone]
              </a>
              <a href="#" className="flex items-start gap-2 hover:text-ink transition-colors">
                <InstagramLogo size={16} className="mt-0.5 shrink-0 text-base-pink-deep" />
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-ink text-center mb-6">Entre em Contato</h2>
          <ContactForm />
        </div>

        <div className="mt-10 pt-6 border-t border-hairline flex flex-col gap-2 text-xs text-ink-soft md:flex-row md:justify-between">
          <span>© 2026 Dra. Priscila Francisco — Dermatologista · CRM-PR [xxxxx] · RQE [xxxxx]</span>
          <Link href="/politica-de-privacidade" className="underline underline-offset-2 hover:text-ink">
            Política de Privacidade
          </Link>
        </div>
      </div>

      <CreatedBy />
    </footer>
  )
}

export default Footer
