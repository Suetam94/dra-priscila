'use client'

import { z } from 'zod'

export interface IBlogPostProps {
  title: string
  description: string
  imageUrl: string
  link: string
}

export interface IBlogPostPropsWithId extends IBlogPostProps {
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
  data?: IBlogPostPropsWithId[]
}

const postSchema = z.object({
  title: z.string({ required_error: 'O título do post é obrigatório.' }),
  description: z.string({ required_error: 'A descrição do post é obrigatória.' }),
  imageUrl: z.string({ required_error: 'A URL da imagem do post é obrigatória.' }),
  link: z.string({ required_error: 'O link do post é obrigatório.' })
})
const postSchemaWithId = postSchema.partial().extend({ id: z.string() })

const fileSchema = z.instanceof(Blob, { message: 'O tipo de imagem é inválido.' })

export const uploadImage = async (formData: FormData): Promise<IReturnString> => {
  try {
    const file = formData.get('file') as File
    const supportedFiles = ['jpg', 'jpeg', 'png', 'svg', 'webp']
    const filteredName = supportedFiles.filter((extension) => file.name.endsWith(extension))
    if (filteredName.length === 0) {
      throw new Error(`O formato da imagem é inválido, os formatos aceitos são: ${supportedFiles.join(',')}`)
    }
    const parsedFile = fileSchema.safeParse(file)
    if (!parsedFile.success) throw new Error(parsedFile.error.message)
    formData.append('folder', 'blog')
    const res = await fetch('/api/uploads', { method: 'POST', body: formData })
    const j = await res.json()
    if (!j.ok) return { error: true, message: j.error }
    return { error: false, data: j.url as string }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const addBlogPost = async (data: IBlogPostProps): Promise<IReturnString> => {
  try {
    const parsedPost = postSchema.safeParse(data)
    if (!parsedPost.success) throw new Error(parsedPost.error.message)
    const res = await fetch('/api/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (!res.ok) return { error: true }
    const j = await res.json()
    return { error: false, data: j.id as string }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const getBlogPosts = async (): Promise<IReturnArray> => {
  try {
    const res = await fetch('/api/blog', { cache: 'no-store' })
    const j = await res.json()
    return { error: false, data: j.data as IBlogPostPropsWithId[] }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const updateBlogPost = async (id: string, data: Partial<IBlogPostProps>): Promise<IReturn> => {
  try {
    const parsedPost = postSchemaWithId.safeParse({ id, ...data })
    if (!parsedPost.success) throw new Error(parsedPost.error.message)
    const res = await fetch(`/api/blog/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (!res.ok) return { error: true }
    return { error: false }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

export const deleteBlogPost = async (id: string): Promise<IReturn> => {
  try {
    const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
    if (!res.ok) return { error: true }
    return { error: false }
  } catch (e) {
    return { error: true, message: (e as Error).message }
  }
}

