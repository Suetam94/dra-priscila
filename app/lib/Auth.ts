'use client'

import { z } from 'zod'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'

const UserSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Email invÃ¡lido' }),
  password: z.string({ required_error: 'A senha Ã© obrigatÃ³ria' })
})

export interface ILogin {
  email: string
  password: string
}

export interface IReturn {
  error: boolean
  message?: string
}

export const loginUser = async ({ email, password }: ILogin): Promise<IReturn> => {
  try {
    const validate = UserSchema.safeParse({ email, password })

    if (!validate.success) {
      return {
        error: true,
        message: validate.error.message
      }
    }

    if (!auth) { throw new Error('Auth indisponível') }
    await signInWithEmailAndPassword(auth, email, password)

    return { error: false, message: 'Login bem-sucedido' }
  } catch (e) {
    return {
      error: true,
      message: (e as Error).message
    }
  }
}

export const logOutUser = async (): Promise<{ error: boolean }> => {
  try {
    if (!auth) return { error: true }; await signOut(auth)

    return {
      error: false
    }
  } catch (e) {
    console.error(e)
    return {
      error: true
    }
  }
}
