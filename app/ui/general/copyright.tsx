import React from 'react'
import CreatedBy from '@/app/ui/general/created-by'
import Link from 'next/link'
import MyInfo from '@/app/ui/general/my-info'

const Copyright = (): React.JSX.Element => {
  return (
    <div className="w-full bg-base-blue pt-8 text-white">
      <div className="container mx-auto px-4 text-center space-y-4">
        <p className="text-sm md:text-base">
          Copyright | Todos os direitos reservados |
          <Link href="/politica-de-privacidade" className="underline hover:text-gray-300">
            Política de Privacidade
          </Link>
          | <Link href="/login" className="underline hover:text-gray-300">Área do Médico</Link> |
        </p>
        <MyInfo />
      </div>
      <div className="mt-4">
        <CreatedBy />
      </div>
    </div>
  )
}

export default Copyright
