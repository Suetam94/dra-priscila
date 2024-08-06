import React from 'react'
import AdminMainContent from '@/app/ui/admin/admin-main-content'
import DashboardContainer from '@/app/ui/admin/dashboard-container'

const AdminDashboard = (): React.JSX.Element => {
  return (
    <DashboardContainer>
      <AdminMainContent />
    </DashboardContainer>
  )
}

export default AdminDashboard
