'use client'

import React, { useState } from 'react'
import { sendEmail } from '@/utils/email'

const ContactForm = (): React.JSX.Element => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      const { error } = await sendEmail(formData)

      if (error) throw error

      setSuccess('Mensagem enviada com sucesso!')
      setFormData({ name: '', phone: '', email: '', message: '' })
    } catch (error) {
      setError('Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="bg-base-gray rounded-lg shadow-md p-6 w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-base-blue mb-2">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-base-pink rounded-md text-base-blue focus:outline-none focus:ring focus:border-base-blue"
          placeholder="Nome"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-base-blue mb-2">Telefone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-base-pink rounded-md text-base-blue focus:outline-none focus:ring focus:border-base-blue"
          placeholder="Telefone"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-base-blue mb-2">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-base-pink rounded-md text-base-blue focus:outline-none focus:ring focus:border-base-blue"
          placeholder="E-mail"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-base-blue mb-2">Mensagem</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-base-pink rounded-md text-base-blue focus:outline-none focus:ring focus:border-base-blue"
          placeholder="Mensagem"
          rows={4}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-base-pink text-white py-2 rounded-md hover:bg-base-blue focus:outline-none focus:ring focus:ring-base-pink focus:ring-opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </form>
  )
}

export default ContactForm
