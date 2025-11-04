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

export interface ILoginSuccess extends IReturn {
  idToken?: string
}

export const loginUser = async ({ email, password }: ILogin): Promise<ILoginSuccess> => {
  try {
    const validate = UserSchema.safeParse({ email, password })

    if (!validate.success) {
      return {
        error: true,
        message: validate.error.message
      }
    }

    const cred = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await cred.user.getIdToken(true)

    return { error: false, message: 'Login bem-sucedido', idToken }
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
