import React from 'react'
import AdminMainContent from '@/app/ui/admin/admin-main-content'
import DashboardContainer from '@/app/ui/admin/dashboard-container'
import ProtectedRoute from '@/app/ui/general/protected-route'

const AdminDashboard = (): React.JSX.Element => {
  return (
    <ProtectedRoute>
      <DashboardContainer>
        <AdminMainContent />
      </DashboardContainer>
    </ProtectedRoute>
  )
}

export default AdminDashboard
