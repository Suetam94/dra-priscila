import React from 'react'
import DashboardContainer from '@/app/ui/admin/dashboard-container'
import MainPage from '@/app/ui/admin/main-page'
import ProtectedRoute from '@/app/ui/general/protected-route'

const Page = () => {
  return (
    <ProtectedRoute>
      <DashboardContainer>
        <MainPage />
      </DashboardContainer>
    </ProtectedRoute>
  )
}

export default Page
