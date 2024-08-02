'use client'

import React from 'react'
import Image from 'next/image'
import { InstagramLogo } from '@phosphor-icons/react'
import MobileMenu from '@/app/ui/general/menu-mobile'

const Header = (): React.JSX.Element => {
  return (
    <header className="h-20 min-w-full relative">
      <div className="w-full bg-base-blue flex justify-between items-center p-2">
        <Image src="/logo-header.png" alt="Dra. Priscila Dermatologista" width={190} height={70} />
        <div className="flex items-center justify-around gap-4">
          <InstagramLogo className="text-base-gray" size="25" weight="light" />
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

export default Header
