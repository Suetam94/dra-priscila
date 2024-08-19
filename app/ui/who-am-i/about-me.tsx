'use client'

import React from 'react'
import Image from 'next/image'
import { CheckCircle } from '@phosphor-icons/react'
import TitleSection from '@/app/ui/section/title-section'
import { IWhoIAmSectionDataWithId } from '@/app/lib/WhoIAm'

interface IAboutMe {
  aboutMe?: IWhoIAmSectionDataWithId
}

const defaultSummary = [
  'Médica pela Universidade Federal de Santa Catarina;',
  'Dermatologista pelo Hospital Santa Casa de Misericórdia de Curitiba;',
  'Especialista em oncologia cutânea e cirurgia dermatológica pelo Hospital Santa Casa de Curitiba;',
  'Cirurgiã de Mohs formada pelo Hospital Santa Casa de Curitiba e reconhecida pela Sociedade Brasileira de Cirurgia Dermatológica;',
  'Preceptora atuando na formação de novos Dermatologistas no Hospital Santa Casa de Misericórdia de Curitiba e no Hospital de Dermatologia Sanitária do Paraná (São Roque);',
  'Membro titular da Sociedade Brasileira de Dermatologia e da Sociedade Brasileira de Cirurgia Dermatológica;'
]

const defaultFullText =
  'Olá, meu nome é Priscila e sou curitibana de nascimento e de coração. A medicina nunca foi o caminho mais óbvio e pré-definido na minha vida, na verdade foi durante a minha primeira formação, em nutrição pela Universidade Federal do Paraná, que fui aos poucos me apaixonando pela clínica, pelo cuidar e pelo que a medicina pode fazer na vida de alguém. Concluí a faculdade, trabalhei, mas a pulguinha da medicina tinha realmente me picado, e anos depois dessa sementinha ser plantada me formava médica pela minha amada Universidade Federal de Santa Catarina. A escolha da especialidade também não foi óbvia e nem fácil, foi a versatilidade, a complexidade intrínseca e a admiração pelo trabalho de profissionais exemplares que me fizeram escolher a Dermatologia como minha área de atuação. Voltei então para minha cidade natal e no Hospital Santa Casa de Misericórdia de Curitiba fiz minha residência médica em Dermatologia. Entrei para a medicina por amar a clínica e sempre me considerei “da clínica médica”, mas aos poucos, e graças aos professores que tive na Santa Casa, outra área da dermatologia foi ganhando seu espaço na minha vida: a cirurgia dermatológica. A possibilidade de tratar meu paciente de uma forma completa, desde o diagnóstico, tratamento cirúrgico e seguimento, e ainda oferecendo a melhor técnica, me fez seguir minha formação, ainda no serviço de Dermatologia da Santa Casa de Curitiba, em oncologia cutânea, cirurgia dermatológica e cirurgia micrográfica de Mohs, hoje minha paixão. Atualmente me dedico a tratar minhas paixões iniciais, as doenças dermatológicas clínicas, e também o câncer de pele e cirurgia dermatológica de uma forma geral. Ambas ocupando lugares muito importantes no meu dia a dia.'

const AboutMe = ({ aboutMe }: IAboutMe): React.JSX.Element => {
  let title, fullText, summary, mainImageUrl

  if (aboutMe !== undefined) {
    ({ title, fullText, summary, mainImageUrl } = aboutMe)
  }

  const image = mainImageUrl && mainImageUrl !== '' ? mainImageUrl : '/about-me-1.png'
  const summaryData = summary && summary.length > 0 ? summary : defaultSummary
  const fullTextData = fullText && fullText !== '' ? fullText : defaultFullText

  return (
    <section className="w-full bg-base-gray">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Seção 1: Foto e Resumo */}
        <div className="flex flex-col md:flex-row items-start mb-16">
          <div className="w-full md:w-1/2 p-4 flex justify-center">
            <div className="relative w-64 h-96">
              <Image
                src={image}
                alt="Dra. Priscila Francisco"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4 text-center md:text-left">
            <TitleSection title={title || 'Dra. Priscila Francisco'} backgroundVariation={'bg-base-gray'} />
            <ul className="text-base-blue list-none pl-0 text-left">
              {summaryData.map((summary, index) => {
                return (
                  <li key={index} className="flex items-start mb-2">
                    <CheckCircle className="w-6 h-6 text-base-blue mr-2 flex-shrink-0" />
                    <span>{summary}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Seção 2: Texto Completo */}
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <TitleSection title={'Quem sou'} backgroundVariation={'bg-base-pink'} className={'mb-3'} />
          {
            <p className="text-base-blue text-justify mb-4">{fullTextData}</p>
          }
        </div>
      </div>
    </section>
  )
}

export default AboutMe
