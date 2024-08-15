'use client'

import React, { useState, useEffect } from 'react'
import { getDoctorInfo, saveDoctorInfo, IDoctorInfo } from '@/app/lib/DoctorInfo'
import TextInput from '@/app/ui/general/text-input'
import Accordion from '@/app/ui/general/accordion'

const DoctorInfo = (): React.JSX.Element => {
  const [doctorInfo, setDoctorInfo] = useState<IDoctorInfo>({
    name: '',
    RQE: '',
    CRM: '',
    address: '',
    email: '',
    phone: ''
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      const data = await getDoctorInfo()
      if (data) {
        setDoctorInfo(data)
      }
      setIsLoading(false)
    }
    (() => fetchDoctorInfo())()
  }, [])

  const handleChange = (field: keyof IDoctorInfo, value: string) => {
    setDoctorInfo({ ...doctorInfo, [field]: value })
  }

  const handleSave = async () => {
    await saveDoctorInfo(doctorInfo)
    alert('Dados salvos com sucesso!')
  }

  if (isLoading) {
    return <p>Carregando...</p>
  }

  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      <h4 className="text-2xl font-bold text-base-blue mb-4">Gerenciar Informações do Médico</h4>
      <Accordion title="Configurações dos seus dados">
        <div className="mb-4">
          <TextInput
            label="Nome"
            value={doctorInfo.name}
            onChange={(value) => handleChange('name', value)}
            placeholder="Nome do médico"
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="RQE"
            value={doctorInfo.RQE}
            onChange={(value) => handleChange('RQE', value)}
            placeholder="RQE do médico"
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="CRM"
            value={doctorInfo.CRM}
            onChange={(value) => handleChange('CRM', value)}
            placeholder="CRM do médico"
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="Endereço"
            value={doctorInfo.address}
            onChange={(value) => handleChange('address', value)}
            placeholder="Endereço do médico"
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="E-mail"
            value={doctorInfo.email}
            onChange={(value) => handleChange('email', value)}
            placeholder="E-mail do médico"
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="Telefone"
            value={doctorInfo.phone}
            onChange={(value) => handleChange('phone', value)}
            placeholder="Telefone do médico"
          />
        </div>
        <button
          onClick={handleSave}
          className="bg-base-blue text-base-gray py-2 px-4 rounded-md hover:bg-base-pink transition duration-300"
        >
          Salvar Informações
        </button>
      </Accordion>
    </section>
  )
}

export default DoctorInfo
