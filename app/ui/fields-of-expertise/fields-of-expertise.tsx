'use server'

import React from 'react'
import { getFieldsOfExpertise } from '@/app/lib/FieldsOfExpertise'
import FieldsOfExpertiseData from '@/app/ui/fields-of-expertise/fields-of-expertise-data'

// const fieldsOfExpertiseData: IExpertiseItemProps[] = [
//   {
//     title: 'Dermatologia Clínica',
//     Icon: ClipboardText,
//     items: [
//       'Tratamento de doenças de pele de uma forma geral, como acne, melasma e dermatites',
//       'Tratamento de doenças cutâneas imunomediadas como psoríase, dermatite atópica e urticária, desde fases iniciais até o uso de medicamentos sistêmicos como os imunobiológicos'
//     ]
//   },
//   {
//     title: 'Oncologia Cutânea',
//     Icon: ShieldCheck,
//     items: [
//       'Diagnóstico e seguimento de pacientes com história de câncer de pele',
//       'Tratamento clínico de câncer de pele',
//       'Tratamento cirúrgico de câncer de pele (cirurgia convencional e cirurgia micrográfica de Mohs)'
//     ]
//   },
//   {
//     title: 'Cirurgia Dermatológica Geral',
//     Icon: Scissors,
//     items: ['Tratamento cirúrgico de lesões cutâneas diversas como por exemplo cistos, nevos e xantelasmas']
//   }
// ]

const FieldsOfExpertise = async (): Promise<React.JSX.Element> => {
  const { data } = await getFieldsOfExpertise()

  return (
    <section className="w-full px-4 pb-8 pt-3 bg-base-gray">
      <div className="max-w-7xl mx-auto">
         <FieldsOfExpertiseData data={data} />
        {/* <TitleSection title={'Áreas de Atuação'} backgroundVariation={'bg-base-pink'} className={'mb-5'} /> */}
        {/* <div className="flex flex-col gap-8"> */}
        {/*  {fieldsOfExpertise.map((field) => ( */}
        {/*    <ExpertiseItem key={field.title} Icon={field.Icon} title={field.title} items={field.items} /> */}
        {/*  ))} */}
        {/* </div> */}
      </div>
    </section>
  )
}

export default FieldsOfExpertise
