import React from 'react'
import AboutMe from '@/app/ui/who-am-i/about-me'

// Sem prop: AboutMe cai no conteúdo fixo que já trazia como padrão, o mesmo
// texto que a médica escreveu. Antes vinha do Firestore, que saiu do projeto.
const Page = (): React.JSX.Element => (
  <section className="w-full bg-base-gray px-4 pb-8 pt-3">
    <AboutMe />
  </section>
)

export default Page
