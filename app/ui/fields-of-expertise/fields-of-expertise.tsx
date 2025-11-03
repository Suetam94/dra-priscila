'use server'

import React from 'react'
import FieldsData from '@/content/fields-of-expertise.json'
import FieldsOfExpertiseData from '@/app/ui/fields-of-expertise/fields-of-expertise-data'

const FieldsOfExpertise = async (): Promise<React.JSX.Element> => {
  const data = (FieldsData as any).items || []

  return (
    <section className="w-full px-4 pb-8 pt-3 bg-base-gray">
      <div className="max-w-7xl mx-auto">
        <FieldsOfExpertiseData data={data} />
      </div>
    </section>
  )
}

export default FieldsOfExpertise
