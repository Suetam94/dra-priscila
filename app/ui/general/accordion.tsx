'use client'

import React, { useState, ReactNode } from 'react'

interface AccordionProps {
  title: string
  children: ReactNode
}

const Accordion = ({ title, children }: AccordionProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="mb-4 border rounded-lg shadow-lg">
      <button
        onClick={toggleAccordion}
        className="w-full p-4 text-left bg-base-blue text-base-gray font-bold rounded-t-lg flex justify-between items-center"
      >
        <span>{title}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="p-4 bg-white rounded-b-lg">
          {children}
        </div>
      )}
    </div>
  )
}

export default Accordion
