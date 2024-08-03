import React from 'react'
import Image from 'next/image'

export type TextColorVariation = 'text-base-blue' | 'text-base-gray' | 'text-base-pink'
export type BackgroundColorVariation = 'bg-base-blue' | 'bg-base-gray' | 'bg-base-pink'

export interface ICardProps {
  imageUrl: string
  title: string
  titleColor: TextColorVariation
  content: string | React.JSX.Element
  contentColor: TextColorVariation
  cardBackground: BackgroundColorVariation
}

const Card = ({ imageUrl, title, titleColor, cardBackground, content, contentColor }: ICardProps) => {
  const isElement = React.isValidElement(content)

  return (
    <div className={`${cardBackground} w-full rounded-lg overflow-hidden my-4 mx-2`}>
      <Image src={imageUrl} alt={title} width={400} height={300} className="w-full h-auto" />
      <div className="p-4">
        <h3 className={`${titleColor} text-base-blue font-bold text-lg`}>{title}</h3>
        <div className={`${contentColor} mt-2 text-base-gray`}>
          {isElement ? content : <p className="m-0">{content}</p>}
        </div>
      </div>
    </div>
  )
}

export default Card
