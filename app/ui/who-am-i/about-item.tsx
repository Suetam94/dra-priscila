import React from 'react'
import Image from 'next/image'

export interface IAboutItemProps {
  imageUrl?: string
  content: string
  alt: string
  imagePosition?: 'left' | 'right'
}

const AboutItem = ({ imageUrl, content, alt, imagePosition = 'left' }: IAboutItemProps) => {
  return (
    <div className={`flex flex-col ${imagePosition === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center mb-8`}>
      {imageUrl && (
        <div className="w-full md:w-1/3 mb-4 md:mb-0 flex-shrink-0">
          <div className="relative w-full h-48 md:h-64">
            <Image src={imageUrl} alt={alt} layout="fill" objectFit="cover" className="rounded-lg shadow-lg" />
          </div>
        </div>
      )}
      <div className="w-full md:w-2/3 text-base-blue text-justify px-4">
        {content}
      </div>
    </div>
  )
}

export default AboutItem
