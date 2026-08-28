import React from 'react'
import clsx from 'clsx'
import { buttonClasses, textLinkClasses } from '@/app/ui/general/button'
import { ArrowIcon, MapPinIcon, WhatsappIcon } from '@/app/ui/general/icons'
import { clinics, secretary, whatsappUrl } from '@/app/lib/site'

const Locations = (): React.JSX.Element => (
  <section className="border-y border-rule bg-page-alt py-16 lg:py-24" id="onde-atendo">
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="mb-10 grid max-w-2xl gap-4 lg:mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral-ink">Onde atendo</p>
        <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">Três endereços em Curitiba</h2>
        <p className="text-ink-mid">
          Escolha o endereço mais conveniente e fale direto pelo WhatsApp para verificar horários e
          disponibilidade.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {clinics.map(({ name, address, phone, phoneLabel, bookingUrl }) => (
          <article key={name} className="flex flex-col gap-4 border border-rule bg-page p-7">
            <h3 className="font-serif text-xl font-medium text-ink">{name}</h3>
            <p className="flex items-start gap-2 text-[0.95rem] text-ink-mid">
              <MapPinIcon size={17} className="mt-1 shrink-0 text-coral-ink" />
              {address}
            </p>
            <div className="mt-auto grid justify-items-start gap-4">
              <a
                href={whatsappUrl(phone)}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(buttonClasses('sm'), 'w-full')}
              >
                <WhatsappIcon size={17} />
                {phoneLabel}
              </a>
              {bookingUrl && (
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={textLinkClasses()}>
                  Central de marcação
                  <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 text-[0.95rem] text-ink-mid">
        {secretary.label}:{' '}
        <a
          href={whatsappUrl(secretary.phone)}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-coral-ink underline underline-offset-4 hover:text-ink"
        >
          {secretary.phoneLabel}
        </a>
      </p>
    </div>
  </section>
)

export default Locations
