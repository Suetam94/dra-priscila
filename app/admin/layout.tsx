import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { adminAuth } from '@/lib/firebase-admin'
import AdminHeader from '@/app/ui/admin/admin-header'
import AdminSidebar from '@/app/ui/admin/admin-sidebar'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value

  if (!session) {
    redirect('/login')
  }

  try {
    await adminAuth.verifySessionCookie(session, true)
  } catch {
    redirect('/login')
  }

  return (
    <div className="flex h-screen bg-base-gray">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 bg-white shadow-md overflow-auto">{children}</main>
      </div>
    </div>
  )
}

