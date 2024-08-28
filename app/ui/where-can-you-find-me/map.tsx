'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import LoadingSpinner from '@/app/ui/general/loading-spinner'

const OpenStreetMap = dynamic(() => import('@/app/ui/where-can-you-find-me/open-street-map'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})

interface OpenStreetMapComponentProps {
  address: string
}

const MapComponent: React.FC<OpenStreetMapComponentProps> = ({ address }) => {
  return (
    <div className="w-full h-64 lg:min-h-full">
      <OpenStreetMap address={address} />
    </div>
  )
}

export default MapComponent
