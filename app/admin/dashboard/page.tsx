import React from 'react'
import AdminSidebar from '@/app/ui/admin/admin-sidebar'
import AdminHeader from '@/app/ui/admin/admin-header'
import AdminMainContent from '@/app/ui/admin/admin-main-content'

const AdminDashboard = (): React.JSX.Element => {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <AdminMainContent />
      </div>
    </div>
  )
}

export default AdminDashboard
