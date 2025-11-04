'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import TextInput from '@/app/ui/general/text-input'
import Spinner from '@/app/ui/general/spinner'
import Modal from '@/app/ui/general/modal'
import { loginUser } from '@/app/lib/Auth'

const LoginPage = (): React.JSX.Element => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalType, setModalType] = useState<'success' | 'error'>('success')
  const [message, setMessage] = useState<string>('')

  const handleClose = () => setIsOpen(false)

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error, message, idToken } = await loginUser({ email, password })

      if (error || !idToken) {
        setModalType('error')
        setMessage(message ?? 'Falha no login')
        setIsOpen(true)
        setLoading(false)
        return
      }

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      })

      if (!res.ok) {
        setModalType('error')
        setMessage('Não foi possível iniciar a sessão')
        setIsOpen(true)
        setLoading(false)
        return
      }

      router.push('/admin/dashboard')
    } catch (e) {
      setModalType('error')
      setMessage('Ocorreu um erro ao autenticar')
      setIsOpen(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex justify-center items-center h-screen bg-base-gray">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-base-blue mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <TextInput
              label="E-mail"
              value={email}
              onChange={setEmail}
              placeholder="Seu e-mail"
              required={true}
              invalidMessage="O e-mail é obrigatório"
            />
          </div>
          <div className="mb-4">
            <TextInput
              label="Senha"
              value={password}
              onChange={setPassword}
              placeholder="Sua senha"
              type="password"
              required={true}
              invalidMessage="A senha é obrigatória"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-base-blue text-base-gray py-2 px-4 rounded-md hover:bg-base-pink transition duration-300"
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Entrar'}
          </button>
        </form>
      </div>
      <Modal isOpen={isOpen} onClose={handleClose} type={modalType} message={message} />
    </section>
  )
}

export default LoginPage
