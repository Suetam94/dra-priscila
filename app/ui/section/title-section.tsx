import React from 'react'
import { Playfair_Display } from 'next/font/google'

const playfairDisplay = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] })

export interface ITitleSectionProps {
  title: string
  backgroundVariation: 'bg-base-blue' | 'bg-base-gray' | 'bg-base-pink'
  className?: string
}

const TitleSection = ({ title, backgroundVariation, className }: ITitleSectionProps): React.JSX.Element => {
  return (
    <section className={`w-full py-8 ${backgroundVariation} ${className}`}>
      <div className="max-w-7xl mx-auto text-center">
        <h3 className={`${playfairDisplay.className} text-3xl lg:text-4xl font-bold text-base-blue`}>
          {title}
        </h3>
        <div className="mt-4 w-24 h-1 mx-auto bg-base-blue"></div>
      </div>
    </section>
  )
}

export default TitleSection
