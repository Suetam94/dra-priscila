'use client'

import React, { useState } from 'react'
import { SignOut } from '@phosphor-icons/react'
import { logOutUser } from '@/app/lib/Auth'
import { useRouter } from 'next/navigation'
import Spinner from '@/app/ui/general/spinner'

const AdminHeader = (): React.JSX.Element => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogOut = async () => {
    setLoading(true)
    const { error } = await logOutUser()

    if (!error) {
      localStorage.clear()
      setLoading(false)
      router.push('/')
    }
    setLoading(false)
  }

  return (
    <header className="w-full bg-base-blue text-base-gray p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Painel Administrativo</h1>
      <button onClick={handleLogOut} className="flex items-center text-base-gray hover:text-base-pink">
        <SignOut size={24} className="mr-2" />
        {loading ? <Spinner /> : 'Sair'}
      </button>
    </header>
  )
}

export default AdminHeader
