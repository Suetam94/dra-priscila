'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, type ReactNode } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import LoadingSpinner from '@/app/ui/general/loading-spinner'

const ProtectedRoute = ({ children }: { children: ReactNode }): React.JSX.Element => {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (user == null)) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return <LoadingSpinner />
  }

  return <>{children}</>
}

export default ProtectedRoute
