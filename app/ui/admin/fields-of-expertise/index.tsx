'use client'

import React, { useEffect, useState } from 'react'
import iconList from '@/utils/icon'
import {
  addFieldOfExpertise,
  deleteFieldOfExpertise,
  getFieldsOfExpertise,
  IExpertiseItemPropsWithId
} from '@/app/lib/FieldsOfExpertise'
import TextInput from '@/app/ui/general/text-input'
import Modal from '@/app/ui/general/modal'
import LoadingSpinner from '@/app/ui/general/loading-spinner'
import { IconProps } from '@phosphor-icons/react'
import TextArea from '@/app/ui/general/text-area'

interface IFieldsOfExpertise {
  name: string
  Icon: React.ComponentType<IconProps>
}

const FieldsOfExpertise = (): React.JSX.Element => {
  const [fieldsOfExpertise, setFieldsOfExpertise] = useState<IExpertiseItemPropsWithId[] | undefined>([])
  const [selectedField, setSelectedField] = useState<Partial<IExpertiseItemPropsWithId>>({
    id: '',
    title: '',
    items: [],
    Icon: undefined
  })
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState<'success' | 'error'>('success')
  const [modalMessage, setModalMessage] = useState('')
  const [iconSelected, setIconSelected] = useState<IFieldsOfExpertise | null>(null)

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    setLoading(true)
    const fetchFieldsOfExpertise = async () => {
      const fields = await getFieldsOfExpertise()
      setFieldsOfExpertise(fields.data)
      setLoading(false)
    }
    (async () => await fetchFieldsOfExpertise())()
    setLoading(false)
  }, [])

  const handleChange = <T extends string | string[]>(field: string, value: T) => {
    setSelectedField((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleIconChange = (iconName: string) => {
    const selectedIcon = iconList.find((icon) => icon.name === iconName)
    if (selectedIcon) {
      setIconSelected(selectedIcon)
      setSelectedField((prev) => ({
        ...prev,
        Icon: iconName
      }))
    }
  }

  const handleSave = async () => {
    if (selectedField) {
      const formData = new FormData()

      Object.keys(selectedField).forEach((field) => {
        const value = selectedField[field as keyof IExpertiseItemPropsWithId]
        if (value !== undefined && value !== null && value !== '' && field !== 'id') {
          if (Array.isArray(value)) {
            formData.append(field, JSON.stringify(value))
          } else if (field === 'Icon') {
            formData.append('Icon', value)
          } else {
            formData.append(field, value.toString())
          }
        }
      })
      setLoading(true)
      const { error, message } = await addFieldOfExpertise(formData)

      if (error) {
        setIsOpen(true)
        setModalType('error')
        setModalMessage(message ?? 'Oops! Aconteceu um erro, tente novamente!')

        setLoading(false)
        return
      }

      const fields = await getFieldsOfExpertise()
      setFieldsOfExpertise(fields.data)
      setSelectedField({
        id: '',
        title: '',
        items: [],
        Icon: undefined
      })
      setIconSelected(null)
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    setLoading(true)
    await deleteFieldOfExpertise(id)
    const fields = await getFieldsOfExpertise()
    setFieldsOfExpertise(fields.data)
    setLoading(false)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <section className="p-4 bg-white rounded-lg shadow-md">
      <h4 className="text-2xl font-bold text-base-blue mb-4 text-center">Gerenciar Áreas de Expertise</h4>
      <div className="mt-6">
        <h5 className="text-lg font-bold mb-2 text-center">
          {selectedField?.id ? 'Editar Área de Expertise' : 'Adicionar Área de Expertise'}
        </h5>
        <div className="mb-4">
          <TextInput
            label="Título"
            value={selectedField?.title || ''}
            onChange={(value) => handleChange('title', value)}
            placeholder="Título da área de expertise"
          />
        </div>
        <div className="mb-4">
          <label className="block text-base-blue mb-2">Ícone</label>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
            {iconList.map((icon) => (
              <button
                key={icon.name}
                type="button"
                onClick={() => handleIconChange(icon.name)}
                className={`p-2 border rounded-md hover:bg-base-blue transition duration-300 ${
                  iconSelected?.name === icon.name ? 'bg-base-blue' : 'bg-base-gray'
                } flex justify-center items-center`}
              >
                <icon.Icon className="w-6 h-6 text-base-pink" />
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <TextArea
            label="Itens"
            value={selectedField?.items?.join('\n') || ''}
            onChange={(value) => handleChange('items', value.split('\n'))}
            placeholder="Itens separados por nova linha"
            rows={4}
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-base-blue text-base-gray py-2 px-4 rounded-md hover:bg-base-pink transition duration-300"
        >
          {selectedField?.id ? 'Atualizar Área de Expertise' : 'Salvar Área de Expertise'}
        </button>
      </div>
      <div className="space-y-4 mt-10">
        {fieldsOfExpertise && fieldsOfExpertise.length > 0
          ? (
              fieldsOfExpertise.map((field) => (
            <div
              key={field.id}
              className="border rounded p-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0"
            >
              <div>
                <h5 className="text-lg font-bold">{field.title}</h5>
                <ul className="list-disc ml-4">
                  {field.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDelete(field.id!)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
                >
                  Deletar
                </button>
              </div>
            </div>
              ))
            )
          : (
          <LoadingSpinner />
            )}
      </div>
      <Modal isOpen={isOpen} onClose={handleCloseModal} type={modalType} message={modalMessage} />
    </section>
  )
}

export default FieldsOfExpertise
