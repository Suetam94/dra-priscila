import React from 'react'
import Link from 'next/link'

export interface IAdminOptionsProps {
  title: string
  description: string
  link: string
}

const AdminOptions = ({ title, description, link }: IAdminOptionsProps) => {
  return (
    <Link
      className="bg-base-gray p-4 rounded-lg shadow-lg hover:bg-base-pink hover:shadow-xl transition duration-300 ease-in-out"
      href={link}
      key={title}
    >
      <h3 className="text-xl font-bold text-base-blue mb-2">{title}</h3>
      <p className="text-base-blue">{description}</p>
    </Link>
  )
}

export default AdminOptions
