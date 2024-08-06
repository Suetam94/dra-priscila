'use client'

import React from 'react'

interface Option {
  value: string
  label: string
}

interface SelectInputProps {
  label: string
  options: Option[]
  value?: string
  onChange: (value: string) => void
}

const SelectInput = ({ label, options, value = '', onChange }: SelectInputProps): React.JSX.Element => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value
    onChange(newValue)
  }

  return (
    <div className="w-full mb-4">
      <label className="block text-base-blue mb-2">{label}</label>
      <select
        value={value}
        onChange={handleSelectChange}
        className="w-full px-3 py-2 border border-base-pink rounded-md text-base-gray focus:outline-none focus:ring focus:border-base-blue"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectInput
