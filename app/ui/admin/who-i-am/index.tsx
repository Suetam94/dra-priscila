'use client'

import React, { useState, useEffect } from 'react'
import FileInput from '@/app/ui/general/file-input'
import TextInput from '@/app/ui/general/text-input'
import { Playfair_Display } from 'next/font/google'
import { getWhoIAmSection, saveWhoIAmSection, uploadImage, IWhoIAmSectionData } from '@/app/lib/WhoIAm'
import Accordion from '@/app/ui/general/accordion'

const playfairDisplay = Playfair_Display({ subsets: ['latin'] })

const WhoIAmSection = (): React.JSX.Element => {
  const [data, setData] = useState<IWhoIAmSectionData | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState<string[]>([])
  const [fullText, setFullText] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWhoIAmSection()
      if (data) {
        setData(data)
        setTitle(data.title)
        setSummary(data.summary)
        setFullText(data.fullText)
        setImageUrl(data.mainImageUrl)
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
      const newData: IWhoIAmSectionData = { title, summary, fullText, mainImageUrl: uploadedImageUrl! }

      await saveWhoIAmSection(newData)
      alert('Dados salvos com sucesso!')
    } catch (error) {
      alert('Erro ao salvar os dados. Tente novamente mais tarde.')
      console.error(error)
    }
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
            value={summary.join('\n')}
            onChange={(value) => setSummary(value.split('\n'))}
            placeholder="Digite cada item do resumo em uma nova linha"
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
    </section>
  )
}

export default WhoIAmSection
