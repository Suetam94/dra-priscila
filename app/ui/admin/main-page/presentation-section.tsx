'use client'

import React, { useState, useEffect } from 'react'
import FileInput from '@/app/ui/general/file-input'
import TextInput from '@/app/ui/general/text-input'
import {
  savePresentationSection,
  uploadImage,
  getPresentationSection,
  deleteAllPresentationSection
} from '@/app/lib/PresentationSection'

const PresentationSection = (): React.JSX.Element => {
  const [mainText, setMainText] = useState('')
  const [subText, setSubText] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPresentationSection()
      if (data) {
        setMainText(data.mainText || '')
        setSubText(data.subText || '')
        setImageUrl(data.imageUrl || null)
      }
    }
    ;(async () => await fetchData())()
  }, [])

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file)
  }

  const handleSave = async () => {
    try {
      let uploadedImageUrl = imageUrl
      if (selectedFile) {
        uploadedImageUrl = await uploadImage(selectedFile)
      }
      const data = { mainText, subText, imageUrl: uploadedImageUrl }
      await savePresentationSection(data)
      alert('Dados salvos com sucesso!')
    } catch (error) {
      alert('Erro ao salvar os dados. Tente novamente mais tarde.')
      console.error(error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteAllPresentationSection()
      setMainText('')
      setSubText('')
      setImageUrl(null)
      setSelectedFile(null)
      alert('Dados deletados com sucesso!')
    } catch (error) {
      alert('Erro ao deletar os dados. Tente novamente mais tarde.')
      console.error(error)
    }
  }

  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      <h4 className="text-2xl font-bold text-base-blue mb-4">Seção de apresentação:</h4>
      <div className="mb-4">
        <p className="text-base-blue mb-2">Imagem de fundo:</p>
        <FileInput onChange={handleFileChange} />
        {imageUrl && <img src={imageUrl} alt="Background" className="mt-4 rounded-lg shadow-lg max-w-xs" />}
      </div>
      <div className="mb-4">
        <TextInput
          label="Texto principal"
          value={mainText}
          onChange={setMainText}
          placeholder="Digite o texto principal"
        />
      </div>
      <div className="mb-4">
        <TextInput label="Subtexto" value={subText} onChange={setSubText} placeholder="Digite o subtexto" />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="bg-base-blue text-base-gray py-2 px-4 rounded-md hover:bg-base-pink transition duration-300"
        >
          Salvar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
        >
          Deletar
        </button>
      </div>
    </section>
  )
}

export default PresentationSection
