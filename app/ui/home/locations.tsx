import React from 'react'
import clsx from 'clsx'
import { buttonClasses, textLinkClasses } from '@/app/ui/general/button'
import { ArrowIcon, MapPinIcon, WhatsappIcon } from '@/app/ui/general/icons'
import { mapsUrl, otherPlaces, ownPractice, whatsappUrl } from '@/app/lib/site'

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
          {/* O endereço é o próprio link para o mapa, que substitui o mapa
              embutido da página antiga e abre o aplicativo no celular. */}
          <a
            href={mapsUrl(ownPractice.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 text-ink-mid transition-colors hover:text-ink"
          >
            <MapPinIcon size={18} className="mt-1 shrink-0 text-coral-ink" />
            {ownPractice.address}
          </a>
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
      {/* O subgrid usa o gap declarado nele próprio, não o do pai. Os dois
          precisam bater, senão as faixas do pai são dimensionadas com um
          espaçamento e os cards desenhados com outro. */}
      <div className="grid gap-6 md:grid-cols-2 md:gap-x-6 md:gap-y-5 md:grid-rows-[auto_auto_auto_auto]">
        {otherPlaces.map(({ name, address, phone, phoneLabel, bookingUrl }) => (
          <article
            key={name}
            className="grid content-start gap-5 border border-rule bg-page p-7 md:row-span-4 md:grid-rows-subgrid"
          >
            <h4 className="font-serif text-xl font-medium text-ink">{name}</h4>
            <a
              href={mapsUrl(address)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-[0.95rem] text-ink-mid transition-colors hover:text-ink"
            >
              <MapPinIcon size={17} className="mt-1 shrink-0 text-coral-ink" />
              {address}
            </a>
            <a
              href={whatsappUrl(phone)}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(buttonClasses('sm'), 'w-full self-end')}
            >
              <WhatsappIcon size={17} />
              {phoneLabel}
            </a>
            {/* Sem invólucro: um div vazio ainda consumiria um gap no fim dos
                cards que não têm central de marcação. No desktop a faixa
                continua reservada pelo row-span, que é o que alinha os botões. */}
            {bookingUrl && (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(textLinkClasses(), 'justify-self-start self-end')}
              >
                Central de marcação
                <ArrowIcon className="transition-transform group-hover:translate-x-1" />
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default Locations
