'use client'

import { z } from 'zod'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'

const UserSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Email inválido' }),
  password: z.string({ required_error: 'A senha é obrigatória' })
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
    await signOut(auth)

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
