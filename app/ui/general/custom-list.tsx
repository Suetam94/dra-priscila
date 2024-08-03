import React from 'react'
import { Icon } from '@phosphor-icons/react'
import { TextColorVariation } from '@/app/ui/general/card'

export interface IListItems {
  title: string
  description: string
  icon: Icon
}

export interface ICustomListProps {
  textColor: TextColorVariation
  items: IListItems[]
}

const CustomList = ({ items, textColor }: ICustomListProps): React.JSX.Element => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto p-6 space-y-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-start space-x-4">
          <item.icon className={`${textColor} w-6 h-6 mt-1`} />
          <div>
            <h4 className={`${textColor} font-bold text-xl`}>{item.title}</h4>
            <p className={`mt-1 ${textColor}`}>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CustomList
