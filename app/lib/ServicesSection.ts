import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '@/config/firebase'
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
  const storageRef = ref(storage, `images/${file.name}`)
  await uploadBytes(storageRef, file)
  return await getDownloadURL(storageRef)
}

export const addService = async (data: IServiceData): Promise<IReturnString> => {
  try {
    const parsedService = serviceDataSchema.safeParse(data)

    if (!parsedService.success) {
      return {
        error: true,
        message: parsedService.error.message
      }
    }

    const docRef = await addDoc(collection(db, collectionName), data)
    return { error: false, data: docRef.id }
  } catch (e) {
    return {
      error: true,
      message: (e as Error).message
    }
  }
}

export const getServices = async (): Promise<IReturnArray> => {
  try {
    const q = query(collection(db, collectionName))
    const querySnapshot = await getDocs(q)
    const services: IServiceDataWithId[] = []
    querySnapshot.forEach((docSnap) => {
      services.push({ id: docSnap.id, ...docSnap.data() } as IServiceDataWithId)
    })
    return { error: false, data: services }
  } catch (e) {
    return {
      error: true,
      message: (e as Error).message
    }
  }
}

export const updateService = async (id: string, data: Partial<IServiceData>): Promise<IReturn> => {
  try {
    const parsedService = serviceDataSchemaWithId.safeParse({ id, ...data })

    if (!parsedService.success) {
      return {
        error: true,
        message: parsedService.error.message
      }
    }

    const docRef = doc(db, collectionName, id)
    await updateDoc(docRef, data)

    return {
      error: false
    }
  } catch (e) {
    return {
      error: true,
      message: (e as Error).message
    }
  }
}

export const deleteService = async (id: string): Promise<IReturn> => {
  try {
    const parsedId = z.string().safeParse(id)

    if (!parsedId.success) {
      return {
        error: true,
        message: parsedId.error.message
      }
    }

    const docRef = doc(db, collectionName, id)
    await deleteDoc(docRef)

    return {
      error: false
    }
  } catch (e) {
    return {
      error: true,
      message: (e as Error).message
    }
  }
}
