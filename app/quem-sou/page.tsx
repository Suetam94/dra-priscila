import React from 'react'
import AboutMe from '@/app/ui/who-am-i/about-me'
import about from '@/content/about.json'

const Page = async (): Promise<React.JSX.Element> => {
  return (
    <section className="w-full px-4 pb-8 pt-3 bg-base-gray">
      <AboutMe aboutMe={about as any} />
    </section>
  )
}

export default Page
