import { addDoc, collection, deleteDoc, doc, getDocs, limit, query, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '@/config/firebase'
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
  const storageRef = ref(storage, `images/${file.name}`)
  await uploadBytes(storageRef, file)
  return await getDownloadURL(storageRef)
}

export const addPresentationSection = async (data: PresentationSectionData): Promise<IReturnString> => {
  try {
    const parsedPresentationSection = presentationSectionSchema.safeParse(data)

    if (!parsedPresentationSection.success) {
      return {
        error: true,
        message: parsedPresentationSection.error.message
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

export const getPresentationSection = async (): Promise<IReturnOne> => {
  try {
    const q = query(collection(db, collectionName), limit(1))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0]
      const data = { id: docSnap.id, ...docSnap.data() } as PresentationSectionDataWithId

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

export const updatePresentationSection = async (id: string, data: Partial<PresentationSectionData>): Promise<IReturn> => {
  try {
    const parsedPresentationSection = presentationSectionSchemaWithId.safeParse({ id, ...data })

    if (!parsedPresentationSection.success) {
      return {
        error: true,
        message: parsedPresentationSection.error.message
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

export const deleteAllPresentationSection = async (): Promise<IReturn> => {
  try {
    const q = query(collection(db, collectionName))
    const querySnapshot = await getDocs(q)
    const deletePromises = querySnapshot.docs.map(async (docSnap) => {
      const docRef = doc(db, collectionName, docSnap.id)
      return deleteDoc(docRef)
    })
    await Promise.all(deletePromises)

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

export const savePresentationSection = async (data: PresentationSectionData): Promise<IReturn> => {
  try {
    const existingData = await getPresentationSection()
    if (existingData && existingData.data && existingData.data.id) {
      await updatePresentationSection(existingData.data.id, data)
    } else {
      await addPresentationSection(data)
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
