'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { buttonClasses, textLinkClasses } from '@/app/ui/general/button'

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
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-rule bg-navy p-4">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-1 md:flex-row">
        <p className="text-center text-sm text-on-navy-mid md:text-left">
          Utilizamos cookies para melhorar sua experiência em nosso site. Ao continuar navegando, você concorda com a
          nossa{' '}
          <Link href="/politica-de-privacidade" className="text-coral underline underline-offset-4">
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="flex shrink-0 items-center gap-6">
          <button onClick={handleAccept} className={buttonClasses('sm')}>
            Aceitar
          </button>
          <button onClick={handleDecline} className={textLinkClasses()}>
            Recusar
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
