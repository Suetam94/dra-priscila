'use client'

import React, { InvalidEvent, useState } from 'react'

interface TextAreaProps {
  label: string
  placeholder?: string
  value?: string
  disabled?: boolean
  rows?: number
  onChange: (value: string) => void
  required?: boolean
  invalidMessage?: string
}

const TextArea = ({
  label,
  placeholder = '',
  value = '',
  disabled = false,
  rows = 4,
  onChange,
  required,
  invalidMessage
}: TextAreaProps): React.JSX.Element => {
  const [inputValue, setInputValue] = useState(value)

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value
    setInputValue(newValue)
    onChange(newValue)
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.setCustomValidity('')
  }

  const handleInvalid = (e: InvalidEvent<HTMLTextAreaElement>) => {
    e.target.setCustomValidity(invalidMessage ?? 'Este campo é obrigatório')
  }

  return (
    <div className="w-full mb-4">
      <label className="block text-base-blue mb-2">{label}</label>
      <textarea
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 border border-base-gray rounded-md text-base-gray focus:outline-none focus:ring focus:border-base-blue resize-none"
        disabled={disabled}
        required={required}
        onInvalid={(e: InvalidEvent<HTMLTextAreaElement>) => handleInvalid(e)}
        onInput={handleInput}
      />
    </div>
  )
}

export default TextArea
