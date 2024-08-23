'use client'

import React, { useState } from 'react'

interface IPhoneProps {
  ddd: string
  number: string
  isWhatsapp: boolean
}

interface PhoneInputProps {
  phones: IPhoneProps[]
  onChange: (phones: IPhoneProps[]) => void
}

const PhoneInput = ({ phones, onChange }: PhoneInputProps): React.JSX.Element => {
  const [phone, setPhone] = useState<IPhoneProps>({
    ddd: '',
    number: '',
    isWhatsapp: false
  })

  const handleAddPhone = () => {
    if (phone.ddd && phone.number) {
      const updatedPhones = [...phones, phone]
      onChange(updatedPhones)
      setPhone({ ddd: '', number: '', isWhatsapp: false }) // Limpa os campos de entrada
    }
  }

  const handleRemovePhone = (index: number) => {
    const updatedPhones = phones.filter((_, i) => i !== index)
    onChange(updatedPhones)
  }

  return (
    <div>
      <label className="block text-base-blue mb-2">Telefones</label>
      <div className="flex items-center space-x-4 mb-2">
        <input
          type="text"
          value={phone.ddd}
          onChange={(e) => setPhone({ ...phone, ddd: e.target.value })}
          placeholder="DDD"
          className="w-16 px-3 py-2 border border-base-gray rounded-md text-base-gray focus:outline-none focus:ring focus:border-base-blue"
        />
        <input
          type="text"
          value={phone.number}
          onChange={(e) => setPhone({ ...phone, number: e.target.value })}
          placeholder="Número"
          className="w-full px-3 py-2 border border-base-gray rounded-md text-base-gray focus:outline-none focus:ring focus:border-base-blue"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={phone.isWhatsapp}
            onChange={(e) => setPhone({ ...phone, isWhatsapp: e.target.checked })}
          />
          <span>WhatsApp</span>
        </label>
        <button
          onClick={handleAddPhone}
          className="bg-base-blue text-base-gray py-2 px-4 rounded-md hover:bg-base-pink transition duration-300"
        >
          Adicionar Telefone
        </button>
      </div>
      <ul className="space-y-2">
        {phones.map((phone, index) => (
          <li key={index} className="flex justify-between items-center border p-2 rounded-md">
            <span>
              ({phone.ddd}) {phone.number} {phone.isWhatsapp && '(WhatsApp)'}
            </span>
            <button
              onClick={() => handleRemovePhone(index)}
              className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-700 transition duration-300"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PhoneInput
