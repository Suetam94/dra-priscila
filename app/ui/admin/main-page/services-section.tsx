'use client'

import React, { useState, useEffect } from 'react'
import FileInput from '@/app/ui/general/file-input'
import TextInput from '@/app/ui/general/text-input'
import {
  addService,
  uploadImage,
  getServices,
  deleteService,
  IServiceData,
  updateService,
  IServiceDataWithId
} from '@/app/lib/ServicesSection'

const ServicesSection = (): React.JSX.Element => {
  const [services, setServices] = useState<IServiceDataWithId[] | undefined>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getServices()
      setServices(data)
    }
    setLoading(true)
    ;(async () => await fetchData())()
    setLoading(false)
  }, [])

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file)
  }

  const handleAddService = async () => {
    try {
      let uploadedImageUrl = imageUrl
      if (selectedFile) {
        uploadedImageUrl = await uploadImage(selectedFile)
      }
      const newService: IServiceData = { imageUrl: uploadedImageUrl!, title, content }

      if (editingId) {
        setLoading(true)
        await updateService(editingId, newService)
        setLoading(false)
        setServices(services && services.map((service) => (service.id === editingId ? { ...service, ...newService } : service)))
        setEditingId(null)
      } else {
        setLoading(true)
        const newServiceId = await addService(newService)
        setLoading(false)
        setServices([...services!, { id: newServiceId.data!, ...newService }])
      }

      setTitle('')
      setContent('')
      setSelectedFile(null)
      setImageUrl(null)
      alert('Serviço salvo com sucesso!')
    } catch (error) {
      alert('Erro ao salvar o serviço. Tente novamente mais tarde.')
      console.error(error)
    }
  }

  const handleEditService = (service: IServiceDataWithId) => {
    setTitle(service.title)
    setContent(service.content)
    setImageUrl(service.imageUrl)
    setEditingId(service.id)
  }

  const handleDeleteService = async (id: string) => {
    try {
      setLoading(true)
      await deleteService(id)
      setLoading(false)
      setServices(services && services.filter((service) => service.id !== id))
      alert('Serviço deletado com sucesso!')
    } catch (error) {
      alert('Erro ao deletar o serviço. Tente novamente mais tarde.')
      console.error(error)
    }
  }

  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      <h4 className="text-2xl font-bold text-base-blue mb-4">Nossos Serviços:</h4>
      <div className="mb-4">
        <p className="text-base-blue mb-2">Imagem do Serviço:</p>
        <FileInput disabled={loading} onChange={handleFileChange} />
        {imageUrl && <img src={imageUrl} alt="Service" className="mt-4 rounded-lg shadow-lg max-w-xs" />}
      </div>
      <div className="mb-4">
        <TextInput
          label="Título do Serviço"
          value={title}
          onChange={setTitle}
          placeholder="Digite o título do serviço"
          disabled={loading}
        />
      </div>
      <div className="mb-4">
        <TextInput
          label="Descrição do Serviço"
          value={content}
          onChange={setContent}
          placeholder="Digite a descrição do serviço"
          disabled={loading}
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleAddService}
          className="bg-base-blue text-base-gray py-2 px-4 rounded-md hover:bg-base-pink transition duration-300"
          disabled={loading}
        >
          {editingId ? 'Atualizar Serviço' : 'Adicionar Serviço'}
        </button>
      </div>
      <div className={`${services && services.length === 0 ? 'hidden' : ''} mt-6`}>
        <h4 className="text-xl font-bold text-base-blue mb-4">Serviços Adicionados:</h4>
        {services && services.map((service) => (
          <div key={service.id} className="mb-4 p-4 border rounded-lg shadow-md">
            <img src={service.imageUrl} alt={service.title} className="rounded-lg shadow-md mb-2 max-w-xs" />
            <h5 className="text-lg font-bold text-base-blue">{service.title}</h5>
            <p className="text-base-gray">{service.content}</p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleEditService(service)}
                className="bg-base-blue text-white py-1 px-3 rounded-md"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteService(service.id)}
                className="bg-red-500 text-white py-1 px-3 rounded-md"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ServicesSection
