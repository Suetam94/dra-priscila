'use client'

import { z } from 'zod'

export interface IDoctorInfo {
  name: string
  RQE: string
  CRM: string
  address: string
  email: string
  phone: string
}

export interface IDoctorInfoWithId extends IDoctorInfo {
  id: string
}

interface IReturn {
  error: boolean
  message?: string
}

interface IReturnString extends IReturn {
  data?: string
}

interface IReturnOne extends IReturn {
  data?: IDoctorInfoWithId
}

const doctorInfoSchema = z.object({
  name: z.string({ required_error: 'O nome do médico é obrigatório.' }),
  RQE: z.string({ required_error: 'O RQE do médico é obrigatório.' }),
  CRM: z.string({ required_error: 'O CRM do médico é obrigatório.' }),
  address: z.string({ required_error: 'O endereço do médico é obrigatório.' }),
  email: z.string({ required_error: 'O e-mail do médico é obrigatório.' }),
  phone: z.string({ required_error: 'O telefone do médico é obrigatório.' })
})

const doctorInfoSchemaWithId = doctorInfoSchema.partial().extend({ id: z.string() })

export const addDoctorInfo = async (data: IDoctorInfo): Promise<IReturnString> => {
  try {
    const parsed = doctorInfoSchema.safeParse(data)
    if (!parsed.success) return { error: true, message: parsed.error.message }
    const res = await fetch('/api/doctor-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) return { error: true }
    const j = await res.json()
    return { error: false, data: j.id as string }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const getDoctorInfo = async (): Promise<IReturnOne> => {
  try {
    const res = await fetch('/api/doctor-info', { cache: 'no-store' })
    if (res.status === 204) return { error: false }
    const { data } = await res.json()
    return { error: false, data: data as IDoctorInfoWithId }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const updateDoctorInfo = async (_id: string, data: Partial<IDoctorInfo>): Promise<IReturn> => {
  try {
    const parsed = doctorInfoSchemaWithId.safeParse({ id: 'placeholder', ...data })
    if (!parsed.success) return { error: true, message: parsed.error.message }
    const res = await fetch('/api/doctor-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) return { error: true }
    return { error: false }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const deleteDoctorInfo = async (_id: string): Promise<IReturn> => {
  try {
    return { error: true, message: 'Not implemented' }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const saveDoctorInfo = async (data: IDoctorInfo): Promise<IReturn> => {
  try {
    const res = await fetch('/api/doctor-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) return { error: true }
    return { error: false }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

