'use client'

import React, { useState, useEffect } from 'react'
import FileInput from '@/app/ui/general/file-input'
import TextInput from '@/app/ui/general/text-input'
import { Playfair_Display } from 'next/font/google'
import { getWhoIAmSection, saveWhoIAmSection, uploadImage, IWhoIAmSectionData } from '@/app/lib/WhoIAm'
import Accordion from '@/app/ui/general/accordion'
import LoadingSpinner from '@/app/ui/general/loading-spinner'
import Modal from '@/app/ui/general/modal'

const playfairDisplay = Playfair_Display({ subsets: ['latin'] })

const WhoIAmSection = (): React.JSX.Element => {
  const [data, setData] = useState<IWhoIAmSectionData | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState<string[]>([])
  const [fullText, setFullText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState<'success' | 'error'>('success')
  const [modalMessage, setModalMessage] = useState('')

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const { data } = await getWhoIAmSection()
      if (data) {
        setData(data)
        setTitle(data.title)
        setSummary(data.summary)
        setFullText(data.fullText)
        setImageUrl(data.mainImageUrl)
      }
    }
    (async () => await fetchData())()
    setIsLoading(false)
  }, [])

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file)
  }

  const handleSave = async () => {
    try {
      setIsLoading(true)
      let uploadedImageUrl = imageUrl
      if (selectedFile) {
        const formData = new FormData()
        formData.append('file', selectedFile)
        uploadedImageUrl = await uploadImage(formData)
      }
      const newData: IWhoIAmSectionData = { title, summary, fullText, mainImageUrl: uploadedImageUrl! }

      const { error, message } = await saveWhoIAmSection(newData)

      if (error) {
        throw new Error(message)
      }

      setIsLoading(false)
    } catch (e) {
      console.error(e)
      setIsLoading(false)
      setIsOpen(true)
      setModalType('error')
      setModalMessage((e as Error).message ?? 'Oops! Aconteceu um erro, tente novamente!')

      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      <h3 className={`${playfairDisplay.className} text-2xl font-bold text-base-blue mb-4`}>
        Gerenciando a página Quem Sou
      </h3>
      <Accordion title="Configurações da seção quem sou eu">
        <div className="mb-4">
          <p className="text-base-blue mb-2">Imagem Principal:</p>
          <FileInput onChange={handleFileChange} />
          {imageUrl && <img src={imageUrl} alt="Main Image" className="mt-4 rounded-lg shadow-lg max-w-xs" />}
        </div>
        <div className="mb-4">
          <TextInput label="Título" value={title} onChange={setTitle} placeholder="Digite o título" />
        </div>
        <div className="mb-4">
          <TextInput
            label="Resumo"
            value={summary.join(';')}
            onChange={(value) => setSummary(value.split(';'))}
            placeholder="Digite cada item do resumo separado por ponto e vírgula"
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="Texto Completo"
            value={fullText}
            onChange={setFullText}
            placeholder="Digite o texto completo"
          />
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleSave}
            className="bg-base-blue text-base-gray py-2 px-4 rounded-md hover:bg-base-pink transition duration-300"
          >
            {data ? 'Atualizar Dados' : 'Salvar Dados'}
          </button>
        </div>
      </Accordion>
      <Modal isOpen={isOpen} onClose={handleCloseModal} type={modalType} message={modalMessage} />
    </section>
  )
}

export default WhoIAmSection
