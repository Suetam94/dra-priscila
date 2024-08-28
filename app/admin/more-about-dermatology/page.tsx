import React from 'react'
import DashboardContainer from '@/app/ui/admin/dashboard-container'
import DermatologyBlog from '@/app/ui/admin/dermatology-blog'
import ProtectedRoute from '@/app/ui/general/protected-route'

const Page = () => {
  return (
    <ProtectedRoute>
      <DashboardContainer>
        <DermatologyBlog />
      </DashboardContainer>
    </ProtectedRoute>
  )
}

export default Page
