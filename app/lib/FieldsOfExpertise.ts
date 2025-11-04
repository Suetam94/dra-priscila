'use client'

import { formDataToObject } from '@/utils/functions'

export interface IExpertiseItemProps {
  title: string
  Icon: string
  items: string[]
}

export interface IExpertiseItemPropsWithId extends IExpertiseItemProps {
  id?: string
}

interface IReturn {
  error: boolean
  message?: string
}

interface IReturnString extends IReturn {
  data?: string
}

interface IReturnArray extends IReturn {
  data?: IExpertiseItemPropsWithId[]
}

export const addFieldOfExpertise = async (formData: FormData): Promise<IReturnString> => {
  try {
    const field = formDataToObject<IExpertiseItemProps>(formData)
    const payload = {
      title: field.title,
      Icon: field.Icon as unknown as string,
      items: JSON.parse(field.items as unknown as string)
    }
    const res = await fetch('/api/fields-of-expertise', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
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

export const getFieldsOfExpertise = async (): Promise<IReturnArray> => {
  try {
    const res = await fetch('/api/fields-of-expertise', { cache: 'no-store' })
    const j = await res.json()
    return { error: false, data: j.data as IExpertiseItemPropsWithId[] }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const updateFieldOfExpertise = async (formData: FormData): Promise<IReturn> => {
  try {
    const field = formDataToObject<IExpertiseItemPropsWithId>(formData)
    const { id, ...updatedData } = field
    const res = await fetch(`/api/fields-of-expertise/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    })
    if (!res.ok) return { error: true }
    return { error: false }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const deleteFieldOfExpertise = async (id: string): Promise<IReturn> => {
  try {
    const res = await fetch(`/api/fields-of-expertise/${id}`, { method: 'DELETE' })
    if (!res.ok) return { error: true }
    return { error: false }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

