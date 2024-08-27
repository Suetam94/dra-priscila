'use client'

import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import axios from 'axios'
import LoadingSpinner from '@/app/ui/general/loading-spinner'

interface OpenStreetMapComponentProps {
  address: string
}

const icon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const OpenStreetMapComponent: React.FC<OpenStreetMapComponentProps> = ({ address }) => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null)

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: address,
            format: 'json',
            limit: 1
          }
        })
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0]
          setCoordinates({ lat: parseFloat(lat), lon: parseFloat(lon) })
        } else {
          console.error('Address not found')
        }
      } catch (error) {
        console.error('Failed to fetch coordinates:', error)
      }
    }

    void fetchCoordinates()
  }, [address])

  return (
    <div className="w-full h-64 lg:min-h-full">
      {coordinates
        ? (
        <MapContainer center={[coordinates.lat, coordinates.lon]} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[coordinates.lat, coordinates.lon]} icon={icon}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
          )
        : (
        <LoadingSpinner />
          )}
    </div>
  )
}

export default OpenStreetMapComponent
