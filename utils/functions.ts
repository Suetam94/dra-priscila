import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/config/firebase'
import { z } from 'zod'

interface IReturn {
  error: boolean
  message?: string
}

interface IReturnString extends IReturn {
  data?: string
}

const fileSchema = z.instanceof(Blob, { message: 'O tipo de imagem é inválida.' })

export const generalUploadImage = async (formData: FormData): Promise<IReturnString> => {
  try {
    const file = formData.get('file') as File

    const supportedFiles = ['jpg', 'jpeg', 'png', 'svg']
    const filteredName = supportedFiles.filter((extension) => file.name.endsWith(extension))

    if (filteredName.length === 0) {
      throw new Error(`O formato da imagem é inválida, os formatos aceitos são: ${supportedFiles.join(',')}`)
    }

    const parsedFile = fileSchema.safeParse(file)

    if (!parsedFile.success) {
      const message = parsedFile.error.message
      throw new Error(message)
    }

    const storageRef = ref(storage, `images/${file.name}`)
    await uploadBytes(storageRef, file)
    const downloadUrl = await getDownloadURL(storageRef)

    return {
      error: false,
      data: downloadUrl
    }
  } catch (e) {
    return {
      error: true,
      message: (e as Error).message
    }
  }
}

export const formDataToObject = <T extends Record<string, any>>(formData: FormData): T => {
  const obj: Partial<T> = {}

  formData.forEach((value, key) => {
    if (value instanceof Blob) {
      if (obj[key as keyof T]) {
        if (Array.isArray(obj[key as keyof T])) {
          (obj[key as keyof T] as File[]).push(value)
        } else {
          obj[key as keyof T] = [obj[key as keyof T], value] as any
        }
      } else {
        obj[key as keyof T] = value as any
      }
    } else {
      if (obj[key as keyof T]) {
        if (Array.isArray(value)) {
          (obj[key as keyof T] as string[]).push(value as string)
        } else {
          obj[key as keyof T] = [obj[key as keyof T], value] as any
        }
      } else {
        obj[key as keyof T] = value as any
      }
    }
  })

  return obj as T
}

const validJSON = (value: string) => {
  try {
    return JSON.parse(value)
  } catch (e) {
    return false
  }
}
