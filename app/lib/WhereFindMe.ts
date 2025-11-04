'use client'

import { z } from 'zod'

export interface IImage {
  url: string
  alt: string
}

const imageSchema = z.object({
  url: z.string(),
  alt: z.string()
})

export interface IPhone {
  ddd: string
  number: string
  isWhatsapp: boolean
}

const phoneSchema = z.object({
  ddd: z.string(),
  number: z.string(),
  isWhatsapp: z.boolean()
})

export interface IBusinessHour {
  week: {
    start: string
    end: string
  }
  hour: {
    start: string
    end: string
  }
}

const businessHourSchema = z.object({
  week: z.object({
    start: z.string(),
    end: z.string()
  }),
  hour: z.object({
    start: z.string(),
    end: z.string()
  })
})

export interface IClinic {
  image: IImage
  name: string
  address: string
  phones: IPhone[]
  businessHour: IBusinessHour
  healthPlan: string[]
}

export interface IClinicWithId extends IClinic {
  id: string
}

interface IReturn {
  error: boolean
  message?: string
}

interface IReturnString extends IReturn {
  data?: string
}

interface IReturnArray extends IReturn {
  data?: IClinicWithId[]
}

const collectionName = 'whereToFindMeData'

export const addClinic = async (clinic: IClinic): Promise<IReturnString> => {
  try {
    const res = await fetch('/api/where-find-me', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(clinic) })
    if (!res.ok) {
      const j = await res.json().catch(() => ({}))
      return { error: true, message: j.error || 'Falha ao salvar' }
    }
    const j = await res.json()
    return { error: false, data: j.id as string }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const getClinics = async (): Promise<IReturnArray> => {
  try {
    const res = await fetch('/api/where-find-me', { cache: 'no-store' })
    const j = await res.json()
    return { error: false, data: j.data as IClinicWithId[] }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const updateClinic = async (id: string, clinic: Partial<IClinic>): Promise<IReturn> => {
  try {
    const res = await fetch(`/api/where-find-me/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(clinic) })
    if (!res.ok) return { error: true }
    return { error: false }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const deleteClinic = async (id: string): Promise<IReturn> => {
  try {
    const res = await fetch(`/api/where-find-me/${id}`, { method: 'DELETE' })
    if (!res.ok) return { error: true }
    return { error: false }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}
