'use server'

import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, query } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { z } from 'zod'
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

const fieldsOfExpertiseSchema = z.object({
  title: z.string({ required_error: 'O título da área de atuação é obrigatório.' }),
  Icon: z.any({ required_error: 'O ícone representativo da área de atuação é obrigatório.' }),
  items: z.array(z.string(), { required_error: 'É necessário povoar os detalhes da área de atuação.' })
})

const fieldsOfExpertiseSchemaWithId = fieldsOfExpertiseSchema.partial().extend({ id: z.string() })

const collectionName = 'fieldsOfExpertiseData'

export const addFieldOfExpertise = async (formData: FormData): Promise<IReturnString> => {
  try {
    const field = formDataToObject<IExpertiseItemProps>(formData)
    field.items = JSON.parse(field.items as unknown as string)
    const parsedFieldOfExpertise = fieldsOfExpertiseSchema.safeParse(field)

    if (!parsedFieldOfExpertise.success) {
      return {
        error: true,
        message: parsedFieldOfExpertise.error.message
      }
    }

    const docRef = await addDoc(collection(db, collectionName), field)

    return {
      error: false,
      data: docRef.id
    }
  } catch (e) {
    return {
      error: true,
      message: (e as Error).message
    }
  }
}

export const getFieldsOfExpertise = async (): Promise<IReturnArray> => {
  try {
    const q = query(collection(db, collectionName))
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as IExpertiseItemPropsWithId))

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

export const updateFieldOfExpertise = async (formData: FormData): Promise<IReturn> => {
  try {
    const field = formDataToObject<IExpertiseItemPropsWithId>(formData)

    const parsedFieldOfExpertise = fieldsOfExpertiseSchemaWithId.safeParse(field)

    if (!parsedFieldOfExpertise.success) {
      return {
        error: true,
        message: parsedFieldOfExpertise.error.message
      }
    }

    const { id, ...updatedData } = field

    const docRef = doc(db, collectionName, id!)

    await updateDoc(docRef, updatedData)

    return {
      error: true
    }
  } catch (e) {
    return {
      error: true,
      message: (e as Error).message
    }
  }
}

export const deleteFieldOfExpertise = async (id: string): Promise<IReturn> => {
  try {
    const parsedId = z.string({ required_error: 'O ID do doutor é obrigatório.' }).safeParse(id)

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
