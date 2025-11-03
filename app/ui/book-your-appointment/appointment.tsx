'use server'

import React from 'react'
import TitleSection from '@/app/ui/section/title-section'
import Clinic from '@/app/ui/book-your-appointment/clinic'
import clinicsData from '@/content/appointment-clinics.json'

const BookAppointment = async (): Promise<React.JSX.Element> => {
  const clinics = (clinicsData as any).clinics || []

  return (
    <section className="w-full bg-base-gray">
      <div className="max-w-7xl mx-auto">
        <TitleSection title={'Marque sua consulta'} backgroundVariation={'bg-base-pink'} className={'mb-3'} />
        {clinics.map((clinic: any) => (
          <Clinic
            key={clinic.name}
            name={clinic.name}
            address={clinic.address}
            image={clinic.image}
            contact={clinic.contact}
          />
        ))}
      </div>
    </section>
  )
}

export default BookAppointment

