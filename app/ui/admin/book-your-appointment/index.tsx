'use client'

import React, { FormEvent, useEffect, useRef, useState } from 'react'
import {
  addClinic,
  deleteClinic,
  getClinics,
  IClinicProps,
  IClinicPropsWithId,
  IPhoneProps
} from '@/app/lib/BookYourAppointment'
import TextInput from '@/app/ui/general/text-input'
import Accordion from '@/app/ui/general/accordion'
import Spinner from '@/app/ui/general/spinner'
import Modal from '@/app/ui/general/modal'
import PhoneInput from '@/app/ui/admin/where-find-me/phone-component'

const BookYourAppointment = (): React.JSX.Element => {
  const [clinics, setClinics] = useState<IClinicPropsWithId[] | undefined>([])
  const [selectedClinic, setSelectedClinic] = useState<IClinicProps | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalType, setModalType] = useState<'success' | 'error'>('success')
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [phones, setPhones] = useState<IPhoneProps[]>([])
  const [bookingUrl, setBookingUrl] = useState<string | undefined>()

  const formRef = useRef<HTMLFormElement>(null)

  const handleClose = () => setIsOpen(false)

  useEffect(() => {
    const fetchClinics = async () => {
      setLoading(true)
      const { data } = await getClinics()
      setClinics(data)
      setLoading(false)
    }
    (async () => await fetchClinics())()
  }, [])

  const handleChange = (field: string, value: any) => {
    setSelectedClinic((prevState) => {
      if (prevState) {
        return { ...prevState, [field]: value }
      }

      return {
        image: { url: '', alt: '' },
        address: '',
        contact: {
          phones: [...phones],
          bookingUrl
        },
        name: '',
        [field]: value
      }
    })
  }

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    if (selectedClinic) {
      setLoading(true)

      setLoading(true)

      const clinicToSave = {
        ...selectedClinic,
        contact: {
          ...selectedClinic.contact,
          bookingUrl: bookingUrl || selectedClinic?.contact.bookingUrl,
          phones
        }
      }

      const { error, message } = await addClinic(clinicToSave)

      if (error) {
        setMessage(message ?? 'Oops, houve um erro ao tentar salvar os dados!')
        setModalType('error')
      } else {
        setModalType('success')
        setMessage('Os dados foram salvos com sucesso')
      }

      setIsOpen(true)

      const { data } = await getClinics()
      setClinics(data)
      setLoading(false)
      setSelectedClinic(null)
      setPhones([])
      setBookingUrl('')
      cleanInputValue()
      if (formRef.current) {
        formRef.current.reset()
      }
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

    setIsOpen(true)

    const { data } = await getClinics()
    setClinics(data)
    setLoading(false)
  }

  const cleanInputValue = () => {
    const inputs = document.querySelectorAll('input[type="text"], input[type="url"], textarea')
    inputs.forEach(input => {
      (input as HTMLInputElement).value = ''
    })
  }

  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      <h4 className="text-2xl font-bold text-base-blue mb-4">Gerenciar Clínicas para Marcar Consulta</h4>
      <Accordion title="Configurações da página Marque Sua Consulta">
        <form ref={formRef} onSubmit={(e) => handleSave(e)} className="mt-6">
          <h5 className="text-lg font-bold mb-2">Adicionar Clínica Para Agendamentos</h5>
          <div className="mb-4">
            <TextInput
              label="Nome"
              value={selectedClinic?.name || ''}
              onChange={(value) => handleChange('name', value)}
              placeholder="Nome da clínica"
              required={true}
              invalidMessage="O nome da clínica é obrigatório"
            />
          </div>
          <div className="mb-4">
            <TextInput
              label="Endereço"
              value={selectedClinic?.address || ''}
              onChange={(value) => handleChange('address', value)}
              placeholder="Endereço da clínica"
              required={true}
              invalidMessage="O endereço da clínica é obrigatório"
            />
          </div>
          <div className="mb-4">
            <PhoneInput phones={phones || []} onChange={(phones) => setPhones(phones)} />
          </div>
          <div className="mb-4">
            <TextInput
              label="URL de Marcação de Consulta"
              value={selectedClinic?.contact.bookingUrl || ''}
              onChange={(value) => setBookingUrl(value)}
              placeholder="URL para marcação de consulta"
            />
          </div>
          <div className="mb-4">
            <TextInput
              label="URL da imagem"
              value={selectedClinic?.image?.url || ''}
              onChange={(value) =>
                handleChange('image', {
                  url: value,
                  alt: selectedClinic?.name ?? 'Foto da Clínica'
                })
              }
              placeholder="URL da imagem da clínica"
            />
          </div>
          <button
            type="submit"
            className="bg-base-blue w-full text-base-gray py-2 px-4 rounded-md hover:bg-base-pink transition duration-300"
          >
            {loading ? <Spinner /> : 'Salvar'}
          </button>
        </form>
        <div className="flex flex-col space-y-4 mt-10">
          {clinics &&
            clinics.map((clinic) => (
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
