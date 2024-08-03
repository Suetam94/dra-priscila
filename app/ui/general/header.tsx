'use client'

import React from 'react'
import Image from 'next/image'
import { InstagramLogo } from '@phosphor-icons/react'
import Link from 'next/link'
import MobileMenu from '@/app/ui/general/menu-mobile'

const Header = (): React.JSX.Element => {
  return (
    <header className="w-full relative bg-base-blue">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-2 lg:px-8 lg:gap-10">
        <Image src="/logo-header.png" alt="Dra. Priscila Dermatologista" width={190} height={70} />
        <div className="hidden lg:flex lg:justify-between lg:gap-7 items-center text-center font-bold">
          <Link href="/quem-sou" className="text-base-gray hover:text-white transition-colors duration-300">Quem Sou</Link>
          <Link href="/areas-de-atuacao" className="text-base-gray hover:text-white transition-colors duration-300">Áreas de Atuação</Link>
          <Link href="/onde-pode-me-encontrar" className="text-base-gray hover:text-white transition-colors duration-300">Onde Pode Me Encontrar</Link>
          <Link href="/mais-sobre-a-dermatologia" className="text-base-gray hover:text-white transition-colors duration-300">Saiba Mais Sobre a Dermatologia</Link>
          <Link href="/marque-sua-consulta" className="text-base-gray hover:text-white transition-colors duration-300">Marque a Sua Consulta</Link>
          <InstagramLogo className="text-base-gray hover:text-white transition-colors duration-300" size="32" weight="light" />
        </div>
        <MobileMenu />
      </div>
    </header>
  )
}

export default Header
