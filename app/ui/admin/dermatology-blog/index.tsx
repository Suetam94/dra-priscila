'use client'

import React, { useEffect, useState } from 'react'
import {
  addBlogPost,
  deleteBlogPost,
  getBlogPosts,
  IBlogPostPropsWithId,
  updateBlogPost,
  uploadImage
} from '@/app/lib/Blog'
import TextInput from '@/app/ui/general/text-input'
import FileInput from '@/app/ui/general/file-input'
import Accordion from '@/app/ui/general/accordion'

const DermatologyBlog = (): React.JSX.Element => {
  const [blogPosts, setBlogPosts] = useState<IBlogPostPropsWithId[] | undefined>([])
  const [selectedPost, setSelectedPost] = useState<IBlogPostPropsWithId | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const { data } = await getBlogPosts()
      setBlogPosts(data)
    }
    void fetchBlogPosts()
  }, [])

  const handleChange = (field: string, value: string) => {
    if (selectedPost) {
      setSelectedPost({ ...selectedPost, [field]: value })
    }
  }

  const handleSave = async () => {
    if (selectedPost) {
      if (selectedFile) {
        selectedPost.imageUrl = (await uploadImage(selectedFile)).data!
      }
      if (selectedPost.id) {
        await updateBlogPost(selectedPost.id, selectedPost)
      } else {
        await addBlogPost(selectedPost)
      }
      const { data } = await getBlogPosts()
      setBlogPosts(data)
      setSelectedPost(null)
      setSelectedFile(null)
    }
  }

  const handleDelete = async (id: string) => {
    await deleteBlogPost(id)
    const { data } = await getBlogPosts()
    setBlogPosts(data)
  }

  return (
    <section className="p-4 bg-white rounded-lg shadow-md">
      <h4 className="text-2xl font-bold text-base-blue mb-4">Gerenciar Blog</h4>
      <Accordion title="Configurações da página Mais Sobre a Dermatologia">
        <div className="space-y-4">
          {blogPosts && blogPosts.map((post) => (
            <div
              key={post.id}
              className="border rounded p-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0"
            >
              <div>
                <h5 className="text-lg font-bold">{post.title}</h5>
                <p>{post.description}</p>
                <p>
                  <a href={post.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    Leia mais
                  </a>
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="bg-base-pink text-base-gray py-2 px-4 rounded-md hover:bg-base-blue transition duration-300"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(post.id!)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h5 className="text-lg font-bold mb-2 text-center">
            {selectedPost ? 'Editar Postagem do Blog' : 'Adicionar Postagem do Blog'}
          </h5>
          <div className="mb-4">
            <TextInput
              label="Título"
              value={selectedPost?.title || ''}
              onChange={(value) => handleChange('title', value)}
              placeholder="Título do post"
            />
          </div>
          <div className="mb-4">
            <TextInput
              label="Descrição"
              value={selectedPost?.description || ''}
              onChange={(value) => handleChange('description', value)}
              placeholder="Descrição do post"
            />
          </div>
          <div className="mb-4">
            <TextInput
              label="Link"
              value={selectedPost?.link || ''}
              onChange={(value) => handleChange('link', value)}
              placeholder="Link para o post completo"
            />
          </div>
          <div className="mb-4">
            <FileInput onChange={setSelectedFile} />
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-base-pink text-base-gray py-2 px-4 rounded-md hover:bg-base-blue transition duration-300"
          >
            {selectedPost?.id ? 'Atualizar Postagem' : 'Salvar Postagem'}
          </button>
        </div>
      </Accordion>
    </section>
  )
}

export default DermatologyBlog
