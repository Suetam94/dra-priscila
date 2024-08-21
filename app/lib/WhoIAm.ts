'use server'

import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, limit } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '@/config/firebase'
import { z } from 'zod'

export interface IWhoIAmSectionData {
  title: string
  summary: string[]
  mainImageUrl: string
  fullText: string
}

const whoIAmSchema = z.object({
  title: z.string(),
  summary: z.array(z.string()),
  mainImageUrl: z.string(),
  fullText: z.string()
})

export interface IWhoIAmSectionDataWithId extends IWhoIAmSectionData {
  id: string
}

const whoIAmSchemaWithIdSchema = whoIAmSchema.partial().extend({ id: z.string() })

interface IReturn {
  error: boolean,
  message?: string
}

interface IReturnOne extends IReturn {
  data?: IWhoIAmSectionDataWithId
}

const collectionName = 'whoIAmData'

export const uploadImage = async (formData: FormData): Promise<string> => {
  try {
    const file = formData.get('file') as File

    const storageRef = ref(storage, `images/${file.name}`)
    await uploadBytes(storageRef, file)
    return await getDownloadURL(storageRef)
  } catch (e) {
    console.log(e)
    return (e as Error).message
  }
}

export const addWhoIAmSection = async (data: IWhoIAmSectionData): Promise<IReturn> => {
  try {
    const parsedWhoIam = whoIAmSchema.safeParse(data)

    if (!parsedWhoIam.success) {
      return {
        error: true,
        message: parsedWhoIam.error.message
      }
    }

    await addDoc(collection(db, collectionName), data)

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

export const getWhoIAmSection = async (): Promise<IReturnOne> => {
  try {
    const q = query(collection(db, collectionName), limit(1))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0]
      const data = { id: docSnap.id, ...docSnap.data() } as IWhoIAmSectionDataWithId

      return {
        error: false,
        data
      }
    } else {
      return {
        error: false
      }
    }
  } catch (e) {
    return {
      error: true,
      message: (e as Error).message
    }
  }
}

export const updateWhoIAmSection = async (id: string, data: Partial<IWhoIAmSectionData>): Promise<IReturn> => {
  try {
    const parsedWhoIAm = whoIAmSchemaWithIdSchema.safeParse({ id, ...data })

    if (!parsedWhoIAm.success) {
      return {
        error: true,
        message: parsedWhoIAm.error.message
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

export const deleteWhoIAmSection = async (id: string): Promise<IReturn> => {
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

export const saveWhoIAmSection = async (data: IWhoIAmSectionData): Promise<IReturn> => {
  try {
    const existingData = await getWhoIAmSection()
    if (existingData && existingData.data?.id) {
      const { error, message } = await updateWhoIAmSection(existingData.data?.id, data)

      if (!error && message) {
        return {
          error, message
        }
      }
    } else {
      const { error, message } = await addWhoIAmSection(data)

      if (!error && message) {
        return {
          error, message
        }
      }
    }

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
