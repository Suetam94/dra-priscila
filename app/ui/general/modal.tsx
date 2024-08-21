'use client'

import React from 'react'
import { XCircle, CheckCircle } from '@phosphor-icons/react'

interface IModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'success' | 'error'
  message: string
}

const Modal = ({ isOpen, onClose, type, message }: IModalProps): React.JSX.Element | null => {
  if (!isOpen) return null

  const Icon = type === 'success' ? CheckCircle : XCircle
  const iconColor = type === 'success' ? 'text-green-500' : 'text-red-500'
  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100'

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className={`p-6 rounded-lg shadow-lg w-full max-w-md mx-4 ${bgColor}`}>
        <div className="flex items-center mb-4">
          <Icon className={`w-8 h-8 mr-3 ${iconColor}`} />
          <h2 className="text-xl font-bold text-base-blue">{type === 'success' ? 'Sucesso!' : 'Erro!'}</h2>
        </div>
        <p className="text-base-blue mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-base-blue text-base-gray py-2 px-4 rounded-md hover:bg-base-pink transition duration-300"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
