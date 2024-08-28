'use client'

import React, { useState, useEffect } from 'react'
import { addClinic, getClinics, deleteClinic, IClinicWithId, IClinic } from '@/app/lib/WhereFindMe'
import TextInput from '@/app/ui/general/text-input'
import { Playfair_Display } from 'next/font/google'
import Accordion from '@/app/ui/general/accordion'
import PhoneInput from '@/app/ui/admin/where-find-me/phone-component'
import TextArea from '@/app/ui/general/text-area'
import Modal from '@/app/ui/general/modal'
import Spinner from '@/app/ui/general/spinner'

const playfairDisplay = Playfair_Display({ subsets: ['latin'] })

const WhereFindMeSection = (): React.JSX.Element => {
  const [clinics, setClinics] = useState<IClinicWithId[] | undefined>([])
  const [selectedClinic, setSelectedClinic] = useState<IClinic | undefined>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalType, setModalType] = useState<'success' | 'error'>('success')
  const [modalMessage, setModalMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchClinics = async () => {
      setLoading(true)
      const clinics = await getClinics()
      setLoading(false)
      setClinics(clinics.data)
      setLoading(true)
    }
    ;(async () => await fetchClinics())()
  }, [])

  const handleModalClose = () => {
    setIsOpen(false)
  }

  const handleChange = (field: string, value: any) => {
    setSelectedClinic((prevState) => {
      if (prevState) {
        return { ...prevState, [field]: value }
      }

      return {
        image: { url: '', alt: '' },
        name: '',
        address: '',
        phones: [],
        businessHour: { week: { start: '', end: '' }, hour: { start: '', end: '' } },
        healthPlan: [],
        [field]: value
      }
    })
  }

  const handleSave = async () => {
    if (selectedClinic) {
      setLoading(true)
      const { error, message } = await addClinic(selectedClinic as IClinic)
      setLoading(false)

      if (error) {
        setModalMessage(message ?? 'Oops! Aconteceu um erro ao tentar adicionar uma nova clínica.')
        setModalType('error')
      } else {
        setModalMessage(`A clínica: ${selectedClinic.name} foi adicionada com sucesso!`)
        setModalType('success')
      }

      setIsOpen(true)
      const clinics = await getClinics()
      setClinics(clinics.data)
      setSelectedClinic(undefined)
    } else {
      setModalMessage('Preencha os campos antes de tentar salvar!')
      setModalType('error')
      setIsOpen(true)
    }
  }

  const handleDelete = async (id: string) => {
    setLoading(true)
    const { error, message } = await deleteClinic(id)
    setLoading(false)

    if (error) {
      setModalMessage(message ?? 'Oops! Aconteceu um erro ao tentar deletar a clínica.')
      setModalType('error')
    } else {
      setModalMessage('A clínica foi deletada com sucesso!')
      setModalType('success')
    }

    setIsOpen(true)

    const clinics = await getClinics()
    setClinics(clinics.data)
  }

  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      <h3 className={`${playfairDisplay.className} text-2xl font-bold text-base-blue mb-4`}>
        Gerenciando a página Onde Me Encontrar
      </h3>
      <Accordion title="Configurações da página Onde Me Encontrar">
        <div className="mt-6">
          <h5 className="text-lg font-bold mb-2">Adicionar Clínica</h5>
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
              label="URL da imagem"
              value={selectedClinic?.image?.url || ''}
              onChange={(value) =>
                handleChange('image', {
                  url: value,
                  alt: selectedClinic?.name ?? 'Foto da Clínica'
                })
              }
            />
          </div>
          <div className="mb-4">
            <PhoneInput phones={selectedClinic?.phones || []} onChange={(phones) => handleChange('phones', phones)} />
          </div>
          <div className="mb-4">
            <TextInput
              label="Horário de Atendimento (Semana)"
              value={`${selectedClinic?.businessHour?.week?.start || ''}${selectedClinic?.businessHour?.week?.end || ''}`}
              onChange={(value) =>
                handleChange('businessHour', {
                  week: {
                    start: value.split(' - ')[0],
                    end: value.split(' - ')[1]
                  },
                  hour: selectedClinic?.businessHour?.hour || { start: '', end: '' }
                })
              }
              placeholder="Ex: Segunda-feira - Sexta-feira"
            />
          </div>
          <div className="mb-4">
            <TextInput
              label="Horário de Atendimento (Horas)"
              value={`${selectedClinic?.businessHour?.hour?.start || ''}${selectedClinic?.businessHour?.hour?.end || ''}`}
              onChange={(value) =>
                handleChange('businessHour', {
                  week: selectedClinic?.businessHour?.week || { start: '', end: '' },
                  hour: {
                    start: value.split(' - ')[0],
                    end: value.split(' - ')[1]
                  }
                })
              }
              placeholder="Ex: 08:00 - 18:00"
            />
          </div>
          <div className="mb-4">
            <TextArea
              label="Planos de Saúde"
              value={selectedClinic?.healthPlan?.join('\n') || ''}
              onChange={(value) => handleChange('healthPlan', value.split('\n'))}
              placeholder="Planos de Saúde separados por linha"
            />
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-base-blue text-base-gray py-2 px-4 rounded-md hover:bg-base-pink transition duration-300"
          >
            {loading ? <Spinner /> : 'Salvar Clínica'}
          </button>
        </div>
        <div className="flex flex-col space-y-4 mt-10">
          {clinics &&
            clinics.map((clinic) => (
              <div key={clinic.id} className="border rounded p-4 flex justify-between items-center">
                <div>
                  <h5 className="text-lg font-bold">{clinic.name}</h5>
                  <p>{clinic.address}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDelete(clinic.id!)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
                  >
                    {loading ? <Spinner /> : 'Deletar'}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </Accordion>
      <Modal isOpen={isOpen} onClose={handleModalClose} type={modalType} message={modalMessage} />
    </section>
  )
}

export default WhereFindMeSection
