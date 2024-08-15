import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, query } from 'firebase/firestore'
import { db } from '@/config/firebase'
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

const clinicSchema = z.object({
  image: imageSchema,
  name: z.string(),
  address: z.string(),
  phones: z.array(phoneSchema),
  businessHour: businessHourSchema,
  healthPlan: z.array(z.string())
})

export interface IClinicWithId extends IClinic {
  id?: string
}

const clinicSchemaWithId = clinicSchema.partial().extend({ id: z.string() })

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
    const parsedClinic = clinicSchema.safeParse(clinic)

    if (!parsedClinic.success) {
      return {
        error: false,
        message: parsedClinic.error.message
      }
    }

    const docRef = await addDoc(collection(db, collectionName), clinic)
    return { error: false, data: docRef.id }
  } catch (e) {
    return {
      error: true,
      message: (e as Error).message
    }
  }
}

export const getClinics = async (): Promise<IReturnArray> => {
  try {
    const q = query(collection(db, collectionName))
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as IClinicWithId))

    return {
      error: false,
      data
    }
  } catch (e) {
    return {
      error: true,
      message: (e as Error).message
    }
  }
}

export const updateClinic = async (id: string, clinic: Partial<IClinic>): Promise<IReturn> => {
  try {
    const parsedClinic = clinicSchemaWithId.safeParse({ id, ...clinic })

    if (!parsedClinic.success) {
      return {
        error: true,
        message: parsedClinic.error.message
      }
    }

    const docRef = doc(db, collectionName, id)
    await updateDoc(docRef, clinic)

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

export const deleteClinic = async (id: string): Promise<IReturn> => {
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
