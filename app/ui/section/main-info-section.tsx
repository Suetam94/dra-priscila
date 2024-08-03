import React from 'react'
import Card, { ICardProps } from '@/app/ui/general/card'

export interface IMainInfoSectionProps {
  hasCard: boolean
  card?: ICardProps
}

const MainInfoSection = ({ hasCard, card }: IMainInfoSectionProps): React.JSX.Element => {
  return (
    <section className="w-full px-2 py-4 flex">
      {hasCard && card && <Card {...card} />}
    </section>
  )
}

export default MainInfoSection
