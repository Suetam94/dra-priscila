'use client'

import React from 'react'
import { SignOut } from '@phosphor-icons/react'

const AdminHeader = (): React.JSX.Element => {
  return (
    <header className="w-full bg-base-blue text-base-gray p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Painel Administrativo</h1>
      <button className="flex items-center text-base-gray hover:text-base-pink">
        <SignOut size={24} className="mr-2" />
        Sair
      </button>
    </header>
  )
}

export default AdminHeader
