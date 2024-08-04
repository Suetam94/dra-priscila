import React from 'react'
import TitleSection from '@/app/ui/section/title-section'
import ContactInfo, { IContactInfoProps } from '@/app/ui/where-can-you-find-me/contact-info'
import OpenStreetMapComponent from '@/app/ui/where-can-you-find-me/map'

const ClinicPlace = ({ businessHour, image, address, name, phones, healthPlan }: IContactInfoProps): React.JSX.Element => {
  return (
    <div className="max-w-7xl mx-auto mb-10">
      <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
        <div className="flex flex-col flex-1 order-1 lg:order-2 h-full">
          <ContactInfo
            address={address}
            businessHour={businessHour}
            image={image}
            name={name}
            phones={phones}
            healthPlan={healthPlan}
          />
        </div>
        <div className="flex flex-col flex-1 order-2 lg:order-1 min-h-full">
          <OpenStreetMapComponent address={address} />
        </div>
      </div>
    </div>
  )
}

export default ClinicPlace
