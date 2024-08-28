'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const CookieConsent = (): React.JSX.Element => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const lgpdAccepted = localStorage.getItem('cookiesAccepted')

    if (lgpdAccepted) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = (): void => {
    localStorage.setItem('cookiesAccepted', 'true')
    setIsVisible(false)
  }

  const handleDecline = (): void => {
    localStorage.setItem('cookiesAccepted', 'false')
    setIsVisible(false)
  }

  if (!isVisible) return <></>

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-base-blue text-base-gray shadow-lg rounded-t-lg z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-center md:text-left mb-4 md:mb-0">
          Utilizamos cookies para melhorar sua experiência em nosso site. Ao continuar navegando, você concorda com a
          nossa{' '}
          <Link href="/politica-de-privacidade" className="text-base-pink underline">
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="flex space-x-4">
          <button
            onClick={handleAccept}
            className="bg-base-gray text-base-blue py-2 px-4 rounded-md hover:bg-base-pink transition duration-300"
          >
            Aceitar
          </button>
          <button
            onClick={handleDecline}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
          >
            Recusar
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
