import React from 'react'
import DashboardContainer from '@/app/ui/admin/dashboard-container'
import WhereFindMeSection from '@/app/ui/admin/where-find-me'
import ProtectedRoute from '@/app/ui/general/protected-route'

const Page = () => {
  return (
    <ProtectedRoute>
      <DashboardContainer>
        <WhereFindMeSection />
      </DashboardContainer>
    </ProtectedRoute>
  )
}

export default Page
