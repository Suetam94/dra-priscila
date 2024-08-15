'use server'

import React from 'react'
import TitleSection from '@/app/ui/section/title-section'
import BlogPost, { IBlogPostProps } from '@/app/ui/more-about-dermatology/blog-post'
import { getBlogPosts } from '@/app/lib/Blog'

const blogPosts: IBlogPostProps[] = [
  {
    title: 'O que é Dermatologia?',
    description:
      'A dermatologia é a especialidade médica responsável por diagnosticar e tratar doenças e condições da pele, cabelo e unhas.',
    imageUrl: '/o_que_e_dermatologia_realista.png',
    link: '/blog/o-que-e-dermatologia'
  },
  {
    title: 'Cuidados Diários com a Pele',
    description: 'Descubra dicas essenciais para manter sua pele saudável e radiante todos os dias.',
    imageUrl: '/cuidado_diario_pele.png',
    link: '/blog/cuidados-diarios-pele'
  },
  {
    title: 'Tratamentos Dermatológicos Modernos',
    description: 'Saiba mais sobre os tratamentos dermatológicos mais avançados disponíveis atualmente.',
    imageUrl: '/tratamentos_dermatologicos_modernos.png',
    link: '/blog/tratamentos-dermatologicos-modernos'
  }
]

const BlogPage = async (): Promise<React.JSX.Element> => {
  const { data: blogPosts } = await getBlogPosts()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <TitleSection title="Saiba Mais Sobre a Dermatologia" backgroundVariation="bg-base-pink" className="mb-3" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts && blogPosts.map((post) => (
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
