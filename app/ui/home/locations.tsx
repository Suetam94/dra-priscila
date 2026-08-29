import React from 'react'
import clsx from 'clsx'
import { buttonClasses, textLinkClasses } from '@/app/ui/general/button'
import { ArrowIcon, MapPinIcon, WhatsappIcon } from '@/app/ui/general/icons'
import { otherPlaces, ownPractice, secretary, whatsappUrl } from '@/app/lib/site'

const Locations = (): React.JSX.Element => (
  <section className="border-y border-rule bg-page-alt py-16 lg:py-24" id="onde-atendo">
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="mb-10 grid max-w-2xl gap-4 lg:mb-12">
        {/* Título como no site antigo. */}
        <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
          Onde você pode me encontrar?
        </h2>
      </div>

      {/* O consultório dela vem destacado; os hospitais e clínicas onde ela
          também atende ficam agrupados depois. */}
      <article className="grid gap-6 border border-rule-strong bg-page p-8 sm:p-10 md:grid-cols-[1.3fr_1fr] md:items-end">
        <div className="grid gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-coral-ink">Consultório próprio</p>
          <h3 className="font-serif text-2xl font-medium text-ink sm:text-3xl">{ownPractice.name}</h3>
          <p className="flex items-start gap-2 text-ink-mid">
            <MapPinIcon size={18} className="mt-1 shrink-0 text-coral-ink" />
            {ownPractice.address}
          </p>
        </div>
        <a
          href={whatsappUrl(ownPractice.phone)}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(buttonClasses(), 'w-full md:w-auto md:justify-self-end')}
        >
          <WhatsappIcon size={18} />
          {ownPractice.phoneLabel}
        </a>
      </article>

      <h3 className="mb-5 mt-12 text-xs font-bold uppercase tracking-[0.16em] text-ink-soft">
        Também atendo em
      </h3>
      {/* subgrid: cada card ocupa as mesmas quatro faixas do pai, então título,
          endereço, botão e link secundário assentam na mesma altura entre os
          cards. Sem isso, o endereço que quebra em duas linhas e o link extra
          de uma das unidades empurram os botões para alturas diferentes.
          A quarta faixa fica vazia em quem não tem central de marcação, e é
          justamente essa reserva que mantém os botões alinhados. */}
      <div className="grid gap-6 md:grid-cols-2 md:gap-x-6 md:gap-y-4 md:grid-rows-[auto_auto_auto_auto]">
        {otherPlaces.map(({ name, address, phone, phoneLabel, bookingUrl }) => (
          <article
            key={name}
            className="grid content-start gap-4 border border-rule bg-page p-7 md:row-span-4 md:grid-rows-subgrid md:gap-0"
          >
            <h4 className="font-serif text-xl font-medium text-ink">{name}</h4>
            <p className="flex items-start gap-2 text-[0.95rem] text-ink-mid">
              <MapPinIcon size={17} className="mt-1 shrink-0 text-coral-ink" />
              {address}
            </p>
            <a
              href={whatsappUrl(phone)}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(buttonClasses('sm'), 'w-full self-end')}
            >
              <WhatsappIcon size={17} />
              {phoneLabel}
            </a>
            <div className="self-end">
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
