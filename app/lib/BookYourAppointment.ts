'use client'

import { z } from 'zod'

export interface IPhoneProps {
  ddd: string
  number: string
  isWhatsapp: boolean
}

export interface IClinicContact {
  phones: IPhoneProps[]
  bookingUrl?: string
}

export interface IClinicImage {
  url: string
  alt: string
}

export interface IClinicProps {
  name: string
  address: string
  contact: IClinicContact
  image: IClinicImage
}

export interface IClinicPropsWithId extends IClinicProps {
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
  data?: IClinicPropsWithId[]
}

const clinicPhoneSchema = z.object({
  ddd: z.string({ required_error: 'O DDD do telefone da clínica é obrigatório.' }),
  number: z.string({ required_error: 'O número do telefone da clínica é obrigatório.' }),
  isWhatsapp: z.boolean({ required_error: 'É necessário indicar se o telefone é WhatsApp.' })
})

const clinicContactSchema = z.object({
  phones: z.array(clinicPhoneSchema),
  bookingUrl: z
    .string({ required_error: 'O endereço para marcação de consulta deve ser uma URL válida' })
    .url({ message: 'O endereço para marcação de consulta deve ser uma URL válida' })
    .optional()
})

const clinicImageSchema = z.object({
  url: z.string({ required_error: 'A URL da imagem da clínica é obrigatória.' }),
  alt: z.string({ required_error: 'O nome da imagem da clínica é obrigatório.' })
})

const clinicSchema = z.object({
  name: z.string({ required_error: 'O nome da clínica é obrigatório.' }),
  address: z.string({ required_error: 'O endereço da clínica é obrigatório.' }),
  contact: clinicContactSchema,
  image: clinicImageSchema
})

const clinicSchemaWithId = clinicSchema.partial().extend({ id: z.string() })

export const uploadImage = async (formData: FormData): Promise<IReturnString> => {
  try {
    const file = formData.get('file') as File
    const supportedFiles = ['jpg', 'jpeg', 'png', 'svg']
    const filteredName = supportedFiles.filter((extension) => file.name.endsWith(extension))
    if (filteredName.length === 0) {
      throw new Error(`O formato da imagem é inválido, os formatos aceitos são: ${supportedFiles.join(',')}`)
    }
    formData.append('folder', 'book-your-appointment')
    const res = await fetch('/api/uploads', { method: 'POST', body: formData })
    const j = await res.json()
    if (!j.ok) return { error: true, message: j.error }
    return { error: false, data: j.url as string }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const addClinic = async (data: IClinicProps): Promise<IReturnString> => {
  try {
    const parsedClinic = clinicSchema.safeParse(data)
    if (!parsedClinic.success) throw new Error(parsedClinic.error.message)
    const res = await fetch('/api/book-your-appointment', {
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

export const getClinics = async (): Promise<IReturnArray> => {
  try {
    const res = await fetch('/api/book-your-appointment', { cache: 'no-store' })
    const j = await res.json()
    return { error: false, data: j.data as IClinicPropsWithId[] }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const updateClinic = async (id: string, data: Partial<IClinicProps>): Promise<IReturn> => {
  try {
    const parsedClinic = clinicSchemaWithId.safeParse({ id, ...data })
    if (!parsedClinic.success) throw new Error(parsedClinic.error.message)
    const res = await fetch(`/api/book-your-appointment/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) return { error: true }
    return { error: false }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const deleteClinic = async (id: string): Promise<IReturn> => {
  try {
    const res = await fetch(`/api/book-your-appointment/${id}`, { method: 'DELETE' })
    if (!res.ok) return { error: true }
    return { error: false }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

