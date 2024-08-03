import React from 'react'
import CreatedBy from '@/app/ui/general/created-by'

const Copyright = (): React.JSX.Element => {
  return (
    <div className="w-full bg-base-blue pt-8 text-white">
      <div className="container mx-auto px-4 text-center space-y-4">
        <p className="text-sm md:text-base">
          Copyright | Todos os direitos reservados |
          <a href="/politica-de-privacidade" className="underline hover:text-gray-300">Política de Privacidade</a>
        </p>
        <p className="text-sm md:text-base">
          Dra. Priscila Francisco - Dermatologista - CRM: 777.777, RQE: 77.777
        </p>
      </div>
      <div className="mt-4">
        <CreatedBy />
      </div>
    </div>
  )
}

export default Copyright
