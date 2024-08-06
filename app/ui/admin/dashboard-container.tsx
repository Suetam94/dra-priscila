import React from 'react'
import AdminSidebar from '@/app/ui/admin/admin-sidebar'
import AdminHeader from '@/app/ui/admin/admin-header'

interface DashboardContainerProps {
  children: React.ReactNode
}

const DashboardContainer = ({ children }: DashboardContainerProps): React.JSX.Element => {
  return (
    <div className="flex h-screen bg-base-gray">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 bg-white shadow-md overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardContainer
