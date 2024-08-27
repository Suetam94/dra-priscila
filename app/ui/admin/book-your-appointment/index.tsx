'use client'

import React, { useEffect, useState } from 'react'
import {
  addClinic,
  deleteClinic,
  getClinics,
  IClinicPropsWithId,
  IPhoneProps,
  uploadImage
} from '@/app/lib/BookYourAppointment'
import TextInput from '@/app/ui/general/text-input'
import FileInput from '@/app/ui/general/file-input'
import Accordion from '@/app/ui/general/accordion'
import Spinner from '@/app/ui/general/spinner'
import Modal from '@/app/ui/general/modal'

const BookYourAppointment = (): React.JSX.Element => {
  const [clinics, setClinics] = useState<IClinicPropsWithId[] | undefined>([])
  const [selectedClinic, setSelectedClinic] = useState<IClinicPropsWithId | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalType, setModalType] = useState<'success' | 'error'>('success')
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleClose = () => setIsOpen(false)

  useEffect(() => {
    const fetchClinics = async () => {
      setLoading(true)
      const { data } = await getClinics()
      setClinics(data)
      setLoading(false)
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
      setLoading(true)
      if (selectedFile) {
        const formData = new FormData()
        formData.append('file', selectedFile)
        selectedClinic.image.url = (await uploadImage(formData)).data!
      }
      const { error, message } = await addClinic(selectedClinic)

      if (error) {
        setMessage(message ?? 'Oops, houve um erro ao tentar salvar o post!')
        setModalType('error')
      } else {
        setModalType('success')
        setMessage('O novo post foi salvo com sucesso')
      }

      const { data } = await getClinics()
      setClinics(data)
      setLoading(false)
      setSelectedClinic(null)
      setSelectedFile(null)
    }
  }

  const handleDelete = async (id: string) => {
    setLoading(true)
    const { error, message } = await deleteClinic(id)

    if (error) {
      setMessage(message ?? 'Oops, houve um erro ao tentar deletar a clínica!')
      setModalType('error')
    } else {
      setModalType('success')
      setMessage('A nova clínica foi deletada com sucesso')
    }

    const { data } = await getClinics()
    setClinics(data)
    setLoading(false)
  }

  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      <h4 className="text-2xl font-bold text-base-blue mb-4">Gerenciar Clínicas para Marcar Consulta</h4>
      <Accordion title="Configurações da página Marque Sua Consulta">
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
            {loading ? <Spinner /> : 'Salvar'}
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          {clinics && clinics.map((clinic) => (
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
                  onClick={() => handleDelete(clinic.id!)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
                >
                  Deletar
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

export default BookYourAppointment
