import React from 'react'
import DashboardContainer from '@/app/ui/admin/dashboard-container'
import DoctorInfo from '@/app/ui/admin/my-info'
import ProtectedRoute from '@/app/ui/general/protected-route'

const Page = () => {
  return (
    <ProtectedRoute>
      <DashboardContainer>
        <DoctorInfo />
      </DashboardContainer>
    </ProtectedRoute>
  )
}

export default Page
