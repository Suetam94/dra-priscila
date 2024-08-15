import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, limit } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { z } from 'zod'

export interface IDoctorInfo {
  name: string
  RQE: string
  CRM: string
  address: string
  email: string
  phone: string
}

export interface IDoctorInfoWithId extends IDoctorInfo {
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
  data?: IDoctorInfoWithId
}

const doctorInfoSchema = z.object({
  name: z.string({ required_error: 'O nome do médico é obrigatório.' }),
  RQE: z.string({ required_error: 'O RQE do médico é obrigatório.' }),
  CRM: z.string({ required_error: 'O CRM do médico é obrigatório.' }),
  address: z.string({ required_error: 'O endereço do médico é obrigatório.' }),
  email: z.string({ required_error: 'O email do médico é obrigatório.' }),
  phone: z.string({ required_error: 'O telefone do médico é obrigatório.' })
})

const doctorInfoSchemaWithId = doctorInfoSchema.partial().extend({ id: z.string() })

const collectionName = 'doctorInfoData'

export const addDoctorInfo = async (data: IDoctorInfo): Promise<IReturnString> => {
  try {
    const parsedDoctorInfo = doctorInfoSchema.safeParse(data)

    if (!parsedDoctorInfo.success) {
      return {
        error: true,
        message: parsedDoctorInfo.error.message
      }
    }

    const docRef = await addDoc(collection(db, collectionName), data)

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

export const getDoctorInfo = async (): Promise<IReturnOne> => {
  try {
    const q = query(collection(db, collectionName), limit(1))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0]
      const data = { id: docSnap.id, ...docSnap.data() } as IDoctorInfoWithId

      return {
        error: false,
        data
      }
    } else {
      return { error: false }
    }
  } catch (e) {
    return {
      error: true,
      message: (e as Error).message
    }
  }
}

export const updateDoctorInfo = async (id: string, data: Partial<IDoctorInfo>): Promise<IReturn> => {
  try {
    const parsedDoctorInfo = doctorInfoSchemaWithId.safeParse({ id, ...data })

    if (!parsedDoctorInfo.success) {
      return {
        error: true,
        message: parsedDoctorInfo.error.message
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

export const deleteDoctorInfo = async (id: string): Promise<IReturn> => {
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

export const saveDoctorInfo = async (data: IDoctorInfo): Promise<IReturn> => {
  try {
    const existingData = await getDoctorInfo()
    if (existingData && existingData.data && existingData.data.id) {
      await updateDoctorInfo(existingData.data.id, data)
    } else {
      await addDoctorInfo(data)
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
