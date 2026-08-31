import React from 'react'
import { clinics, ownPractice, site } from '@/app/lib/site'

/**
 * Dados estruturados schema.org. É o que permite ao Google mostrar endereço,
 * telefone e especialidade no resultado de busca local, em vez de só um link
 * azul. Para médico com endereço fixo, é o item de SEO de maior efeito.
 *
 * Só declara o que temos verificado. Sem nota, sem avaliação, sem faixa de
 * preço e sem horário, porque inventar dado estruturado é pior que omitir: o
 * Google penaliza marcação que não corresponde ao conteúdo da página.
 */

const CURITIBA = { city: 'Curitiba', state: 'PR', country: 'BR' }

const toPostalAddress = (address: string): Record<string, string> => {
  const cep = address.match(/\d{5}-\d{3}/)
  return {
    '@type': 'PostalAddress',
    streetAddress: address.split(',').slice(0, 3).join(',').trim(),
    addressLocality: CURITIBA.city,
    addressRegion: CURITIBA.state,
    addressCountry: CURITIBA.country,
    ...(cep ? { postalCode: cep[0] } : {})
  }
}

const StructuredData = (): React.JSX.Element => {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Physician',
        '@id': `${site.url}/#medica`,
        name: site.doctorFullName,
        alternateName: `Dra. ${site.doctor}`,
        url: site.url,
        image: `${site.url}/my-image.jpeg`,
        medicalSpecialty: 'Dermatologic',
        // O CRM é o registro profissional dela; identifica a pessoa de forma única.
        identifier: [
          { '@type': 'PropertyValue', name: 'CRM-PR', value: '42453' },
          { '@type': 'PropertyValue', name: 'RQE', value: '32324' }
        ],
        address: toPostalAddress(ownPractice.address),
        telephone: `+55${ownPractice.phone}`,
        areaServed: { '@type': 'City', name: CURITIBA.city },
        // sameAs é onde o Google associa o site aos perfis oficiais da pessoa,
        // o que ajuda a consolidar a identidade dela entre as fontes.
        sameAs: [site.instagram, site.links],
        availableService: [
          {
            '@type': 'MedicalProcedure',
            name: 'Cirurgia micrográfica de Mohs',
            procedureType: 'https://schema.org/SurgicalProcedure'
          },
          {
            '@type': 'MedicalProcedure',
            name: 'Cirurgia dermatológica',
            procedureType: 'https://schema.org/SurgicalProcedure'
          },
          { '@type': 'MedicalProcedure', name: 'Diagnóstico e tratamento de câncer de pele' },
          { '@type': 'MedicalProcedure', name: 'Dermatologia clínica' }
        ],
        // Os três endereços, para a busca local reconhecer cada unidade.
        location: clinics.map((clinic) => ({
          '@type': 'MedicalClinic',
          name: clinic.name,
          address: toPostalAddress(clinic.address),
          telephone: `+55${clinic.phone}`
        }))
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#site`,
        url: site.url,
        name: `Dra. ${site.doctor}`,
        inLanguage: 'pt-BR',
        publisher: { '@id': `${site.url}/#medica` }
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      // O conteúdo é gerado por nós, não vem de entrada externa.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}

export default StructuredData
