import React from 'react'
import DashboardContainer from '@/app/ui/admin/dashboard-container'
import WhoIAmSection from '@/app/ui/admin/who-i-am'
import ProtectedRoute from '@/app/ui/general/protected-route'

const Page = () => {
  return (
    <ProtectedRoute>
      <DashboardContainer>
        <WhoIAmSection />
      </DashboardContainer>
    </ProtectedRoute>
  )
}

export default Page
