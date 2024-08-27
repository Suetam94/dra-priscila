'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import {
  addBlogPost,
  deleteBlogPost,
  getBlogPosts, IBlogPostProps,
  IBlogPostPropsWithId,
  updateBlogPost,
  uploadImage
} from '@/app/lib/Blog'
import TextInput from '@/app/ui/general/text-input'
import FileInput from '@/app/ui/general/file-input'
import Accordion from '@/app/ui/general/accordion'
import TextArea from '@/app/ui/general/text-area'
import Modal from '@/app/ui/general/modal'
import Spinner from '@/app/ui/general/spinner'

const DermatologyBlog = (): React.JSX.Element => {
  const [blogPosts, setBlogPosts] = useState<IBlogPostPropsWithId[] | undefined>([])
  const [selectedPost, setSelectedPost] = useState<IBlogPostProps | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalType, setModalType] = useState<'success' | 'error'>('success')
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleClose = () => setIsOpen(false)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true)
      const { data } = await getBlogPosts()
      setLoading(false)
      setBlogPosts(data)
    }
    void fetchBlogPosts()
  }, [])

  const handleChange = (field: string, value: string) => {
    setSelectedPost((prevState) => {
      if (prevState) {
        return { ...prevState, [field]: value }
      }

      return {
        title: '',
        description: '',
        link: '',
        imageUrl: ''
      }
    })
  }

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    if (selectedPost) {
      setLoading(true)
      if (selectedFile) {
        const formData = new FormData()
        formData.append('file', selectedFile)
        selectedPost.imageUrl = (await uploadImage(formData)).data!
      }
      const { error, message } = await addBlogPost(selectedPost)

      if (error) {
        setMessage(message ?? 'Oops, houve um erro ao tentar salvar o post!')
        setModalType('error')
      } else {
        setModalType('success')
        setMessage('O novo post foi salvo com sucesso')
      }

      setIsOpen(true)
      const { data } = await getBlogPosts()
      setLoading(false)
      setBlogPosts(data)
      setSelectedPost(null)
      setSelectedFile(null)
    }
  }

  const handleDelete = async (id: string) => {
    setLoading(true)
    await deleteBlogPost(id)
    setLoading(false)
    const { data } = await getBlogPosts()
    setBlogPosts(data)
  }

  return (
    <section className="p-4 bg-white rounded-lg shadow-md">
      <h4 className="text-2xl font-bold text-base-blue mb-4">Gerenciar Blog</h4>
      <Accordion title="Configurações da página Mais Sobre a Dermatologia">
        <form onSubmit={(e) => handleSave(e)} className="mt-6">
          <h5 className="text-lg font-bold mb-2 text-center">Adicionar Postagem do Blog</h5>
          <div className="mb-4">
            <TextInput
              label="Título"
              value={selectedPost?.title || ''}
              onChange={(value) => handleChange('title', value)}
              placeholder="Título do post"
              required={true}
              invalidMessage="O título do post é obrigatório"
            />
          </div>
          <div className="mb-4">
            <TextArea
              label="Descrição"
              value={selectedPost?.description || ''}
              onChange={(value) => handleChange('description', value)}
              placeholder="Texto do post"
              invalidMessage="O texto do post é obrigatório"
              required={true}
            />
          </div>
          <div className="mb-4">
            <TextInput
              label="Link"
              value={selectedPost?.link || ''}
              onChange={(value) => handleChange('link', value)}
              placeholder="Link para mais informações"
            />
          </div>
          <div className="mb-4">
            <FileInput onChange={setSelectedFile} />
          </div>
          <button
            type="submit"
            className="w-full bg-base-pink text-base-gray py-2 px-4 rounded-md hover:bg-base-blue transition duration-300"
          >
            {loading ? <Spinner /> : 'Salvar Postagem'}
          </button>
        </form>

        <div className="space-y-4 mt-10">
          {blogPosts &&
            blogPosts.map((post) => (
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
                    onClick={() => handleDelete(post.id!)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
                  >
                    {loading ? <Spinner /> : 'Deletar'}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </Accordion>
      <Modal isOpen={isOpen} onClose={handleClose} type={modalType} message={message} />
    </section>
  )
}

export default DermatologyBlog
