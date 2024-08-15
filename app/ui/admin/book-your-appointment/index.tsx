'use client'

import React, { useEffect, useState } from 'react'
import {
  addClinic,
  deleteClinic,
  getClinics,
  IClinicPropsWithId,
  IPhoneProps,
  updateClinic,
  uploadImage
} from '@/app/lib/BookYourAppointment'
import TextInput from '@/app/ui/general/text-input'
import FileInput from '@/app/ui/general/file-input'
import Accordion from '@/app/ui/general/accordion'

const BookYourAppointment = (): React.JSX.Element => {
  const [clinics, setClinics] = useState<IClinicPropsWithId[]>([])
  const [selectedClinic, setSelectedClinic] = useState<IClinicPropsWithId | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    const fetchClinics = async () => {
      const clinicsList = await getClinics()
      setClinics(clinicsList)
    }
    void fetchClinics()
  }, [])

  const handleChange = (field: string, value: string | IPhoneProps[]) => {
    if (selectedClinic) {
      setSelectedClinic({ ...selectedClinic, [field]: value })
    }
  }

  const handleSave = async () => {
    if (selectedClinic) {
      if (selectedFile) {
        selectedClinic.image.url = await uploadImage(selectedFile)
      }
      if (selectedClinic.id) {
        await updateClinic(selectedClinic.id, selectedClinic)
      } else {
        await addClinic(selectedClinic)
      }
      const clinicsList = await getClinics()
      setClinics(clinicsList)
      setSelectedClinic(null)
      setSelectedFile(null)
    }
  }

  const handleDelete = async (id: string) => {
    await deleteClinic(id)
    const clinicsList = await getClinics()
    setClinics(clinicsList)
  }

  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      <h4 className="text-2xl font-bold text-base-blue mb-4">Gerenciar Clínicas para Marcar Consulta</h4>
      <Accordion title="Configurações da página Marque Sua Consulta">
        <div className="flex flex-col space-y-4">
          {clinics.map((clinic) => (
            <div key={clinic.id} className="border rounded p-4 flex justify-between items-center">
              <div>
                <h5 className="text-lg font-bold">{clinic.name}</h5>
                <p>{clinic.address}</p>
                <ul>
                  {clinic.contact.phones.map((phone, index) => (
                    <li key={index}>
                      {phone.isWhatsapp ? 'WhatsApp: ' : 'Telefone: '}
                      {phone.ddd} {phone.number}
                    </li>
                  ))}
                </ul>
                {clinic.contact.bookingUrl && (
                  <p>
                    <a
                      href={clinic.contact.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Marcar Consulta
                    </a>
                  </p>
                )}
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
            <TextInput
              label="Telefone (DDD Número, separado por vírgula)"
              value={selectedClinic?.contact.phones.map((phone) => `${phone.ddd} ${phone.number}`).join(', ') || ''}
              onChange={(value) =>
                handleChange(
                  'contact.phones',
                  value.split(', ').map((phone) => {
                    const [ddd, number] = phone.split(' ')
                    return { ddd, number, isWhatsapp: false }
                  })
                )
              }
              placeholder="Telefones da clínica"
            />
          </div>
          <div className="mb-4">
            <TextInput
              label="URL de Marcação de Consulta"
              value={selectedClinic?.contact.bookingUrl || ''}
              onChange={(value) => handleChange('contact.bookingUrl', value)}
              placeholder="URL para marcação de consulta"
            />
          </div>
          <div className="mb-4">
            <FileInput onChange={setSelectedFile} />
          </div>
          <button
            onClick={handleSave}
            className="bg-base-blue w-full text-base-gray py-2 px-4 rounded-md hover:bg-base-pink transition duration-300"
          >
            {selectedClinic?.id ? 'Atualizar Clínica' : 'Salvar Clínica'}
          </button>
        </div>
      </Accordion>
    </section>
  )
}

export default BookYourAppointment
