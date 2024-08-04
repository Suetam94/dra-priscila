'use client'

import React from 'react'
import { IconProps } from '@phosphor-icons/react'

export interface IExpertiseItemProps {
  Icon: React.ComponentType<IconProps>
  title: string
  items: string[]
}

const ExpertiseItem = ({ Icon, items, title }: IExpertiseItemProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
      <div className="flex items-center mb-4">
        <Icon className="text-base-blue w-6 h-6 mr-2" />
        <h3 className="text-base-blue font-bold text-xl">{title}</h3>
      </div>
      {items.map((item, i) => (
        <p className={`text-base text-base-blue text-justify ${i !== 0 && 'mt-2'}`}>{item}</p>
      ))}
    </div>
  )
}

export default ExpertiseItem
