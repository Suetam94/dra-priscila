'use client'

import React, { useMemo, useState } from 'react'
import { SignOut } from '@phosphor-icons/react'
import { logOutUser } from '@/app/lib/Auth'
import { usePathname, useRouter } from 'next/navigation'
import Spinner from '@/app/ui/general/spinner'

const AdminHeader = (): React.JSX.Element => {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  const breadcrumb = useMemo(() => {
    if (!pathname) return ''
    const section = pathname.replace('/admin', '').split('/').filter(Boolean)[0] || 'dashboard'
    const map: Record<string, string> = {
      dashboard: 'Dashboard',
      'main-page': 'Página inicial',
      'who-i-am': 'Quem sou',
      'fields-of-expertise': 'Áreas de atuação',
      'where-find-me': 'Onde pode me encontrar',
      'more-about-dermatology': 'Mais sobre a dermatologia',
      'book-your-appointment': 'Marque sua consulta',
      'my-info': 'Dados do médico'
    }
    return `Admin / ${map[section] ?? section}`
  }, [pathname])

  const handleLogOut = async () => {
    try {
      setLoading(true)
      // Clear server session cookie
      await fetch('/api/auth/logout', { method: 'POST' })
      // Optionally sign out Firebase client to clear in-memory state
      await logOutUser()
      router.push('/login')
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  return (
    <header className="w-full bg-base-blue text-base-gray p-4 flex items-center shadow-md">
      <h1 className="text-2xl font-bold mr-6">Painel Administrativo</h1>
      <span className="text-sm opacity-80 flex-1">{breadcrumb}</span>
      <button onClick={handleLogOut} className="flex items-center text-base-gray hover:text-base-pink">
        <SignOut size={24} className="mr-2" />
        {loading ? <Spinner /> : 'Sair'}
      </button>
    </header>
  )
}

export default AdminHeader
