import React from 'react'
import FieldsOfExpertiseData from '@/app/ui/fields-of-expertise/fields-of-expertise-data'

// Sem prop: FieldsOfExpertiseData usa a lista fixa que já mantinha como padrão.
// A busca no Firestore saiu junto com o painel administrativo.
const FieldsOfExpertise = (): React.JSX.Element => (
  <section className="w-full bg-base-gray px-4 pb-8 pt-3">
    <div className="mx-auto max-w-7xl">
      <FieldsOfExpertiseData />
    </div>
  </section>
)

export default FieldsOfExpertise
