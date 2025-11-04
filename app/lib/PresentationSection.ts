import { z } from 'zod'

interface PresentationSectionData {
  mainText?: string
  subText?: string
  imageUrl?: string | null
}

interface PresentationSectionDataWithId extends PresentationSectionData {
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
  data?: PresentationSectionDataWithId
}

const presentationSectionSchema = z.object({
  mainText: z.string({ required_error: 'O texto principal deve ser uma sentença válida.' }).optional(),
  subText: z.string({ required_error: 'O subtexto deve ser uma sentença válida.' }).optional(),
  imageUrl: z.string().url({ message: 'O subtexto deve ser uma url válida.' }).optional()
})

const presentationSectionSchemaWithId = presentationSectionSchema.partial().extend({ id: z.string() })

const collectionName = 'presentationData'

export const uploadImage = async (file: File): Promise<string> => {
  const form = new FormData()
  form.append('file', file)
  form.append('folder', 'presentation')
  const res = await fetch('/api/uploads', { method: 'POST', body: form })
  const j = await res.json()
  if (!j.ok) throw new Error(j.error || 'Falha no upload')
  return j.url as string
}

export const addPresentationSection = async (data: PresentationSectionData): Promise<IReturnString> => {
  try {
    const parsedPresentationSection = presentationSectionSchema.safeParse(data)
    if (!parsedPresentationSection.success) return { error: true, message: parsedPresentationSection.error.message }
    const res = await fetch('/api/presentation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (!res.ok) return { error: true }
    const j = await res.json()
    return { error: false, data: j.id as string }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const getPresentationSection = async (): Promise<IReturnOne> => {
  try {
    const res = await fetch('/api/presentation', { cache: 'no-store' })
    if (res.status === 204) return { error: false }
    const { data } = await res.json()
    return { error: false, data }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const updatePresentationSection = async (_id: string, data: Partial<PresentationSectionData>): Promise<IReturn> => {
  try {
    const parsed = presentationSectionSchemaWithId.safeParse({ id: 'placeholder', ...data })
    if (!parsed.success) return { error: true, message: parsed.error.message }
    const res = await fetch('/api/presentation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (!res.ok) return { error: true }
    return { error: false }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const deleteAllPresentationSection = async (): Promise<IReturn> => {
  try {
    const res = await fetch('/api/presentation', { method: 'DELETE' })
    if (!res.ok) return { error: true }
    return { error: false }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const savePresentationSection = async (data: PresentationSectionData): Promise<IReturn> => {
  try {
    const res = await fetch('/api/presentation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (!res.ok) return { error: true }
    return { error: false }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}
