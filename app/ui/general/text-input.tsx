'use client'

import React, { useState } from 'react'

interface TextInputProps {
  label: string
  placeholder?: string
  value?: string
  type?: 'text' | 'password' | 'email'
  disabled?: boolean
  onChange: (value: string) => void
  required?: boolean
  invalidMessage?: string
}

const TextInput = ({
  label,
  placeholder = '',
  value = '',
  disabled = false,
  onChange,
  required,
  invalidMessage,
  type = 'text'
}: TextInputProps): React.JSX.Element => {
  const [inputValue, setInputValue] = useState(value)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setInputValue(newValue)
    onChange(newValue)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.setCustomValidity('')
  }

  const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
    e.target.setCustomValidity(invalidMessage ?? 'Este campo é obrigatório')
  }

  return (
    <div className="w-full mb-4">
      <label className="block text-base-blue mb-2">{label}</label>
      <input
        type={type}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-base-gray rounded-md text-base-gray focus:outline-none focus:ring focus:border-base-blue"
        disabled={disabled}
        required={required}
        onInvalid={(e: React.InvalidEvent<HTMLInputElement>) => handleInvalid(e)}
        onInput={handleInput}
      />
    </div>
  )
}

export default TextInput
