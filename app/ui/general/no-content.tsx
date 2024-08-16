'use client'

import React from 'react'
import { SmileyXEyes } from '@phosphor-icons/react'

interface NoContentProps {
  message?: string
}

const NoContent = ({ message = 'Nenhum conteúdo disponível' }: NoContentProps): React.JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] bg-base-gray p-6 rounded-lg shadow-md">
      <SmileyXEyes className="w-24 h-24 text-base-blue mb-4" />
      <p className="text-base-blue text-xl font-medium">{message}</p>
    </div>
  )
}

export default NoContent
