'use client'

import React, { useState, useEffect } from 'react'
import { addClinic, getClinics, updateClinic, deleteClinic, IClinicWithId, IClinic } from '@/app/lib/WhereFindMe'
import FileInput from '@/app/ui/general/file-input'
import TextInput from '@/app/ui/general/text-input'
import { Playfair_Display } from 'next/font/google'
import Accordion from '@/app/ui/general/accordion'

const playfairDisplay = Playfair_Display({ subsets: ['latin'] })

const WhereFindMeSection = (): React.JSX.Element => {
  const [clinics, setClinics] = useState<IClinicWithId[] | undefined>([])
  const [selectedClinic, setSelectedClinic] = useState<IClinicWithId | null>(null)

  useEffect(() => {
    const fetchClinics = async () => {
      const clinics = await getClinics()
      setClinics(clinics.data)
    }
    ;(async () => await fetchClinics())()
  }, [])

  const handleFileChange = (file: File | null) => {
    if (selectedClinic) {
      setSelectedClinic({ ...selectedClinic, image: { ...selectedClinic.image, url: URL.createObjectURL(file!) } })
    }
  }

  const handleChange = (field: string, value: string) => {
    if (selectedClinic) {
      setSelectedClinic({ ...selectedClinic, [field]: value })
    }
  }

  const handleSave = async () => {
    if (selectedClinic) {
      if (selectedClinic.id) {
        await updateClinic(selectedClinic.id, selectedClinic)
      } else {
        await addClinic(selectedClinic as IClinic)
      }
      const clinics = await getClinics()
      setClinics(clinics.data)
      setSelectedClinic(null)
    }
  }

  const handleDelete = async (id: string) => {
    await deleteClinic(id)
    const clinics = await getClinics()
    setClinics(clinics.data)
  }

  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      <h3 className={`${playfairDisplay.className} text-2xl font-bold text-base-blue mb-4`}>
        Gerenciando a página Onde Me Encontrar
      </h3>
      <Accordion title="Configurações da página Onde Me Encontrar">
        <div className="flex flex-col space-y-4">
          {clinics && clinics.map((clinic) => (
            <div key={clinic.id} className="border rounded p-4 flex justify-between items-center">
              <div>
                <h5 className="text-lg font-bold">{clinic.name}</h5>
                <p>{clinic.address}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedClinic(clinic)}
                  className="bg-base-pink text-base-gray py-2 px-4 rounded-md hover:bg-base-blue transition duration-300"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(clinic.id!)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h5 className="text-lg font-bold mb-2">{selectedClinic ? 'Editar Clínica' : 'Adicionar Clínica'}</h5>
          <div className="mb-4">
            <TextInput
              label="Nome"
              value={selectedClinic?.name || ''}
              onChange={(value) => handleChange('name', value)}
              placeholder="Nome da clínica"
            />
          </div>
          <div className="mb-4">
            <TextInput
              label="Endereço"
              value={selectedClinic?.address || ''}
              onChange={(value) => handleChange('address', value)}
              placeholder="Endereço da clínica"
            />
          </div>
          <div className="mb-4">
            <FileInput onChange={handleFileChange} />
            {selectedClinic?.image.url && (
              <img
                src={selectedClinic.image.url}
                alt={selectedClinic.image.alt}
                className="mt-4 rounded-lg shadow-lg max-w-xs"
              />
            )}
          </div>
          <button
            onClick={handleSave}
            className="bg-base-blue text-base-gray py-2 px-4 rounded-md hover:bg-base-pink transition duration-300"
          >
            {selectedClinic?.id ? 'Atualizar Clínica' : 'Salvar Clínica'}
          </button>
        </div>
      </Accordion>
    </section>
  )
}

export default WhereFindMeSection
