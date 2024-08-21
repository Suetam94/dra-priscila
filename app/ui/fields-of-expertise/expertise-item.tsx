'use client'

import React from 'react'
import iconList from '@/utils/icon'

export interface IExpertiseItemProps {
  Icon: string
  title: string
  items: string[]
}

const ExpertiseItem = ({ Icon, items, title }: IExpertiseItemProps) => {
  const renderIcon = (iconName: string) => {
    const selectedIcon = iconList.find((icon) => icon.name === iconName)
    return selectedIcon ? <selectedIcon.Icon className="text-base-blue w-6 h-6 mr-2" /> : null
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
       <div className="flex items-center mb-4">
        {renderIcon(Icon)}
        <h3 className="text-base-blue font-bold text-xl">{title}</h3>
       </div>
      {items.map((item, i) => (
        <p key={item + i} className={`text-base text-base-blue text-justify ${i !== 0 && 'mt-2'}`}>{item}</p>
      ))}
    </div>
  )
}

export default ExpertiseItem
