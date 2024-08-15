'use client'

import React, { useState, useEffect } from 'react'
import iconList from '@/utils/icon'
import {
  addFieldOfExpertise,
  getFieldsOfExpertise,
  updateFieldOfExpertise,
  deleteFieldOfExpertise,
  IExpertiseItemPropsWithId
} from '@/app/lib/FieldsOfExpertise'
import TextInput from '@/app/ui/general/text-input'

const FieldsOfExpertise = (): React.JSX.Element => {
  const [fieldsOfExpertise, setFieldsOfExpertise] = useState<IExpertiseItemPropsWithId[] | undefined>([])
  const [selectedField, setSelectedField] = useState<IExpertiseItemPropsWithId | null>(null)

  useEffect(() => {
    const fetchFieldsOfExpertise = async () => {
      const fields = await getFieldsOfExpertise()
      setFieldsOfExpertise(fields.data)
    }
    void fetchFieldsOfExpertise()
  }, [])

  const handleChange = <T extends string | string[]>(field: string, value: T) => {
    if (selectedField) {
      setSelectedField({ ...selectedField, [field]: value })
    }
  }

  const handleIconChange = (iconName: string) => {
    const selectedIcon = iconList.find((icon) => icon.name === iconName)
    if (selectedIcon && selectedField) {
      setSelectedField({ ...selectedField, Icon: selectedIcon.Icon })
    }
  }

  const handleSave = async () => {
    if (selectedField) {
      if (selectedField.id) {
        await updateFieldOfExpertise(selectedField.id, selectedField)
      } else {
        await addFieldOfExpertise(selectedField as IExpertiseItemPropsWithId)
      }
      const fields = await getFieldsOfExpertise()
      setFieldsOfExpertise(fields.data)
      setSelectedField(null)
    }
  }

  const handleDelete = async (id: string) => {
    await deleteFieldOfExpertise(id)
    const fields = await getFieldsOfExpertise()
    setFieldsOfExpertise(fields.data)
  }

  return (
    <section className="p-4 bg-white rounded-lg shadow-md">
      <h4 className="text-2xl font-bold text-base-blue mb-4 text-center">Gerenciar Áreas de Expertise</h4>
      <div className="space-y-4">
        {fieldsOfExpertise && fieldsOfExpertise.map((field) => (
          <div key={field.id} className="border rounded p-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
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
                onClick={() => setSelectedField(field)}
                className="bg-base-pink text-base-gray py-2 px-4 rounded-md hover:bg-base-blue transition duration-300"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(field.id!)}
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
          {selectedField ? 'Editar Área de Expertise' : 'Adicionar Área de Expertise'}
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
                className={`p-2 border rounded-md hover:bg-base-blue transition duration-300 ${selectedField?.Icon?.name === icon.name ? 'bg-base-blue' : 'bg-base-gray'} flex justify-center items-center`}
              >
                <icon.Icon className="w-6 h-6 text-base-pink" />
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <TextInput
            label="Itens"
            value={selectedField?.items.join(', ') || ''}
            onChange={(value) => handleChange('items', value.split(', '))}
            placeholder="Itens separados por vírgula"
          />
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-base-blue text-base-gray py-2 px-4 rounded-md hover:bg-base-pink transition duration-300"
        >
          {selectedField?.id ? 'Atualizar Área de Expertise' : 'Salvar Área de Expertise'}
        </button>
      </div>
    </section>
  )
}

export default FieldsOfExpertise
