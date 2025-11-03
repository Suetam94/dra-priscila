import React from 'react'
import { Playfair_Display } from 'next/font/google'
import Link from 'next/link'
import hero from '@/content/hero.json'

const playfairDisplay = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] })

const MainSectionBackground = (): React.JSX.Element => {
  const bg = hero.backgroundImage || '/my-image.jpeg'
  return (
    <section className="min-w-full min-h-full">
      <div
        className="relative min-h-[500px] bg-cover bg-right-top"
        style={{ backgroundImage: `url('${bg}')`, backgroundPosition: '70% top' }}
      >
        <div className="absolute inset-0 bg-[#121927] opacity-75"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6">
          <h1 className={`${playfairDisplay.className} text-white text-4xl font-bold`}>
            {hero.title}
          </h1>
          <h2 className={`${playfairDisplay.className} text-white text-2xl`}>
            {hero.subtitle}
          </h2>
          <Link href={hero.ctaHref} className="bg-[#f2a497] text-white text-lg py-2 px-6 rounded-full hover:bg-[#e88e80] transition-colors duration-300">
            {hero.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default MainSectionBackground

