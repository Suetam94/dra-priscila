'use client'

import React, { useState } from 'react'

interface TextInputProps {
  label: string
  placeholder?: string
  value?: string
  onChange: (value: string) => void
}

const TextInput = ({ label, placeholder = '', value = '', onChange }: TextInputProps): React.JSX.Element => {
  const [inputValue, setInputValue] = useState(value)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setInputValue(newValue)
    onChange(newValue)
  }

  return (
    <div className="w-full mb-4">
      <label className="block text-base-blue mb-2">{label}</label>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-base-gray rounded-md text-base-gray focus:outline-none focus:ring focus:border-base-blue"
      />
    </div>
  )
}

export default TextInput
