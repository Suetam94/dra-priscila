import React from 'react'
import DashboardContainer from '@/app/ui/admin/dashboard-container'
import FieldsOfExpertise from '@/app/ui/admin/fields-of-expertise'
import ProtectedRoute from '@/app/ui/general/protected-route'

const Page = () => {
  return (
    <ProtectedRoute>
      <DashboardContainer>
        <FieldsOfExpertise />
      </DashboardContainer>
    </ProtectedRoute>
  )
}

export default Page
