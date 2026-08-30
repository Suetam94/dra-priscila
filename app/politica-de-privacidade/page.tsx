import React from 'react'
import type { Metadata } from 'next'
import { secretary, site } from '@/app/lib/site'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Dra. Priscila Francisco',
  description: 'Como os dados enviados pelo site são coletados, usados e protegidos.',
  robots: 'noindex, follow'
}

// Texto herdado do site antigo, apenas reformatado. Conteúdo jurídico não deve
// ser reescrito por conta própria: quem responde por ele é a médica.
const sections = [
  {
    title: '1. Coleta de Informações',
    body: 'Coletamos informações pessoais que você nos fornece diretamente, como seu nome, e-mail, número de telefone e outras informações necessárias para fornecer nossos serviços.'
  },
  {
    title: '2. Uso de Informações',
    body: 'Usamos as informações que coletamos para fornecer, manter e melhorar nossos serviços, bem como para comunicar-se com você sobre atualizações e outros assuntos relacionados ao nosso site.'
  },
  {
    title: '3. Compartilhamento de Informações',
    body: 'Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para cumprir a lei ou proteger nossos direitos.'
  },
  {
    title: '4. Segurança',
    body: 'Tomamos medidas razoáveis para proteger suas informações pessoais contra perda, roubo e uso indevido. No entanto, nenhum método de transmissão pela Internet ou armazenamento eletrônico é completamente seguro.'
  },
  {
    title: '5. Seus Direitos',
    body: 'Você tem o direito de acessar, corrigir ou excluir suas informações pessoais que coletamos. Entre em contato conosco para exercer esses direitos.'
  },
  {
    title: '6. Alterações nesta Política',
    body: 'Podemos atualizar esta política de privacidade de tempos em tempos. Notificaremos você sobre quaisquer alterações publicando a nova política nesta página.'
  },
  {
    title: '7. Contato',
    // O site antigo publicava "contato@seusite.com", endereço de exemplo que
    // nunca foi substituído, e não existe e-mail dela em nenhum dado nosso.
    // A LGPD exige um canal de contato, então apontamos para o WhatsApp da
    // secretária, que é um canal real e verificado.
    body: `Se você tiver alguma dúvida sobre esta política de privacidade, ou quiser exercer os direitos descritos acima, entre em contato pelo WhatsApp ${secretary.phoneLabel}.`
  }
]

const PrivacyPolicy = (): React.JSX.Element => (
  <main className="px-5 py-16 sm:px-8 lg:py-24">
    <div className="mx-auto grid max-w-2xl gap-8">
      <header className="grid gap-4">
        <h1 className="font-serif text-3xl font-medium text-ink sm:text-4xl">Política de Privacidade</h1>
        <p className="text-ink-mid">
          Sua privacidade é importante para nós. Esta política descreve como coletamos, usamos e
          protegemos suas informações pessoais ao utilizar nosso site e serviços.
        </p>
      </header>

      <div className="grid gap-7 border-t border-rule pt-8">
        {sections.map(({ title, body }) => (
          <section key={title} className="grid gap-2">
            <h2 className="font-serif text-xl font-medium text-ink">{title}</h2>
            <p className="text-[0.98rem] leading-relaxed text-ink-mid">{body}</p>
          </section>
        ))}
      </div>

      <p className="border-t border-rule pt-6 text-sm text-ink-soft">
        {site.doctorFullName}. {site.crm}, {site.rqe}.
      </p>
    </div>
  </main>
)

export default PrivacyPolicy
