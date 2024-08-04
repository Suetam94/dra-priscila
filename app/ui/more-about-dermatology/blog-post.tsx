import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export interface IBlogPostProps {
  title: string
  description: string
  imageUrl: string
  link: string
}

const BlogPost = ({ title, description, imageUrl, link }: IBlogPostProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-5">
      <div className="relative w-full h-64">
        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" objectPosition="top" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-base-blue mb-2">{title}</h3>
        <p className="text-base-gray mb-4">{description}</p>
        <Link href={link} className="text-base-pink underline">Leia mais</Link>
      </div>
    </div>
  )
}

export default BlogPost
