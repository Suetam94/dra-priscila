'use server'

import React from 'react'
import TitleSection from '@/app/ui/section/title-section'
import BlogPost from '@/app/ui/more-about-dermatology/blog-post'
import blog from '@/content/blog.json'

const BlogPage = async (): Promise<React.JSX.Element> => {
  const posts = (blog as any).posts || []

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <TitleSection title="Saiba Mais Sobre a Dermatologia" backgroundVariation="bg-base-pink" className="mb-3" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <BlogPost
            key={post.title}
            title={post.title}
            description={post.description}
            imageUrl={post.imageUrl}
            link={post.link}
          />
        ))}
      </div>
    </div>
  )
}

export default BlogPage
