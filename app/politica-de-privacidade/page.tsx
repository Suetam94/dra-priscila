import React from 'react'
import TitleSection from '@/app/ui/section/title-section'

const PrivacyPolicy = (): React.JSX.Element => {
  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      <TitleSection title="Política de Privacidade" backgroundVariation="bg-base-pink" className="mb-5" />

      <div className="text-base-gray space-y-6">
        <p className="text-base-blue">
          Sua privacidade é importante para nós. Esta política de privacidade descreve como coletamos, usamos e
          protegemos suas informações pessoais ao utilizar nosso site e serviços.
        </p>

        <h2 className="text-lg font-bold text-base-blue">1. Coleta de Informações</h2>
        <p className="text-base-blue">
          Coletamos informações pessoais que você nos fornece diretamente, como seu nome, e-mail, número de telefone e
          outras informações necessárias para fornecer nossos serviços.
        </p>

        <h2 className="text-lg font-bold text-base-blue">2. Uso de Informações</h2>
        <p className="text-base-blue">
          Usamos as informações que coletamos para fornecer, manter e melhorar nossos serviços, bem como para
          comunicar-se com você sobre atualizações, ofertas e outros assuntos relacionados ao nosso site.
        </p>

        <h2 className="text-lg font-bold text-base-blue">3. Compartilhamento de Informações</h2>
        <p className="text-base-blue">
          Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para cumprir a lei ou
          proteger nossos direitos.
        </p>

        <h2 className="text-lg font-bold text-base-blue">4. Segurança</h2>
        <p className="text-base-blue">
          Tomamos medidas razoáveis para proteger suas informações pessoais contra perda, roubo e uso indevido. No
          entanto, nenhum método de transmissão pela Internet ou armazenamento eletrônico é completamente seguro.
        </p>

        <h2 className="text-lg font-bold text-base-blue">5. Seus Direitos</h2>
        <p className="text-base-blue">
          Você tem o direito de acessar, corrigir ou excluir suas informações pessoais que coletamos. Entre em contato
          conosco para exercer esses direitos.
        </p>

        <h2 className="text-lg font-bold text-base-blue">6. Alterações nesta Política</h2>
        <p className="text-base-blue">
          Podemos atualizar esta política de privacidade de tempos em tempos. Notificaremos você sobre quaisquer
          alterações postando a nova política de privacidade em nosso site.
        </p>

        <h2 className="text-lg font-bold text-base-blue">7. Contato</h2>
        <p className="text-base-blue">
          Se você tiver alguma dúvida sobre esta política de privacidade, entre em contato conosco pelo e-mail
          contato@seusite.com.
        </p>
      </div>
    </section>
  )
}

export default PrivacyPolicy
