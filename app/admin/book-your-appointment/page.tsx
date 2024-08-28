import React from 'react'
import DashboardContainer from '@/app/ui/admin/dashboard-container'
import BookYourAppointment from '@/app/ui/admin/book-your-appointment'
import ProtectedRoute from '@/app/ui/general/protected-route'

const Page = () => {
  return (
    <ProtectedRoute>
      <DashboardContainer>
        <BookYourAppointment />
      </DashboardContainer>
    </ProtectedRoute>
  )
}

export default Page
