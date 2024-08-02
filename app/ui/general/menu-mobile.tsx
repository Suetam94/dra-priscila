'use client'

import React, { useState } from 'react'
import { List, X } from '@phosphor-icons/react'
import clsx from 'clsx'

const MobileMenu = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <button onClick={toggleMenu} className="p-2">
        {isOpen ? <X size={32} /> : <List size={25} weight="bold" className="text-base-gray" />}
      </button>
      <div
        className={clsx(
          'fixed top-0 left-0 w-full h-full bg-base-gray text-base-blue flex flex-col items-center justify-center transition-transform duration-300',
          {
            'transform translate-x-0': isOpen,
            'transform -translate-x-full': !isOpen
          }
        )}
      >
        <div className="flex items-center justify-between w-full px-4 py-4 bg-base-gray fixed top-0">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={toggleMenu} className="p-2">
            <X size={32} />
          </button>
        </div>
        <div className="mt-16 flex flex-col items-center space-y-4 p-4 w-full">
          <a href="/quem-sou" className="block text-xl px-4 py-2 rounded-md hover:bg-base-blue hover:text-white transition-colors duration-300" onClick={closeMenu}>Quem Sou</a>
          <a href="/areas-de-atuacao" className="block text-xl px-4 py-2 rounded-md hover:bg-base-blue hover:text-white transition-colors duration-300" onClick={closeMenu}>Áreas de Atuação</a>
          <a href="/onde-pode-me-encontrar" className="block text-xl px-4 py-2 rounded-md hover:bg-base-blue hover:text-white transition-colors duration-300" onClick={closeMenu}>Onde Pode Me Encontrar</a>
          <a href="/mais-sobre-a-dermatologia" className="block text-xl px-4 py-2 rounded-md hover:bg-base-blue hover:text-white transition-colors duration-300" onClick={closeMenu}>Saiba Mais Sobre a Dermatologia</a>
          <a href="/marque-sua-consulta" className="block text-xl px-4 py-2 rounded-md hover:bg-base-blue hover:text-white transition-colors duration-300" onClick={closeMenu}>Marque a Sua Consulta</a>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
