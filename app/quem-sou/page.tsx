import React from 'react'
import AboutMe from '@/app/ui/who-am-i/about-me'
import { getWhoIAmSection } from '@/app/lib/WhoIAm'

const Page = async (): Promise<React.JSX.Element> => {
  const { data: aboutMe } = await getWhoIAmSection()

  return (
    <section className="w-full px-4 pb-8 pt-3 bg-base-gray">
      {aboutMe && <AboutMe aboutMe={aboutMe} />}
    </section>
  )
}

export default Page
