import { z } from 'zod'

export interface IServiceData {
  imageUrl: string
  title: string
  content: string
}

export interface IServiceDataWithId extends IServiceData {
  id: string
}

interface IReturn {
  error: boolean,
  message?: string
}

interface IReturnString extends IReturn {
  data?: string
}

interface IReturnArray extends IReturn {
  data?: IServiceDataWithId[]
}

const serviceDataSchema = z.object({
  imageUrl: z.string({ required_error: 'A URL da imagem é obrigatória' }),
  title: z.string({ required_error: 'O título do serviço é obrigatório' }),
  content: z.string({ required_error: 'O conteúdo do serviço é obrigatório' })
})

const serviceDataSchemaWithId = serviceDataSchema.partial().extend({ id: z.string() })

const collectionName = 'servicesData'

export const uploadImage = async (file: File): Promise<string> => {
  const form = new FormData()
  form.append('file', file)
  form.append('folder', 'services')
  const res = await fetch('/api/uploads', { method: 'POST', body: form })
  const j = await res.json()
  if (!j.ok) throw new Error(j.error || 'Falha no upload')
  return j.url as string
}

export const addService = async (data: IServiceData): Promise<IReturnString> => {
  try {
    const parsedService = serviceDataSchema.safeParse(data)
    if (!parsedService.success) return { error: true, message: parsedService.error.message }
    const res = await fetch('/api/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (!res.ok) return { error: true }
    const j = await res.json()
    return { error: false, data: j.id as string }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const getServices = async (): Promise<IReturnArray> => {
  try {
    const res = await fetch('/api/services', { cache: 'no-store' })
    const j = await res.json()
    return { error: false, data: j.data as IServiceDataWithId[] }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const updateService = async (id: string, data: Partial<IServiceData>): Promise<IReturn> => {
  try {
    const parsedService = serviceDataSchemaWithId.safeParse({ id, ...data })
    if (!parsedService.success) return { error: true, message: parsedService.error.message }
    const res = await fetch(`/api/services/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (!res.ok) return { error: true }
    return { error: false }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const deleteService = async (id: string): Promise<IReturn> => {
  try {
    const res = await fetch(`/api/services/${id}`, { method: 'DELETE' })
    if (!res.ok) return { error: true }
    return { error: false }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}
