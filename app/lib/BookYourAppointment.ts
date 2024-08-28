'use server'

import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore'
import { db, storage } from '@/config/firebase'
import { z } from 'zod'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export interface IPhoneProps {
  ddd: string
  number: string
  isWhatsapp: boolean
}

export interface IClinicContact {
  phones: IPhoneProps[]
  bookingUrl?: string
}

export interface IClinicImage {
  url: string
  alt: string
}

export interface IClinicProps {
  name: string
  address: string
  contact: IClinicContact
  image: IClinicImage
}

export interface IClinicPropsWithId extends IClinicProps {
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
  data?: IClinicPropsWithId[]
}

const clinicPhoneSchema = z.object({
  ddd: z.string({ required_error: 'O DDD do telefone da clínica é obrigatório.' }),
  number: z.string({ required_error: 'O número do telefone da clínica é obrigatório.' }),
  isWhatsapp: z.boolean({ required_error: 'É necessário indicar se o telefone é whatsapp.' })
})

const clinicContactSchema = z.object({
  phones: z.array(clinicPhoneSchema),
  bookingUrl: z.string({ required_error: 'O endereço para marcação de consulta deve ser uma URL válida' }).url({ message: 'O endereço para marcação de consulta deve ser uma URL válida' }).optional()
})

const clinicImageSchema = z.object({
  url: z.string({ required_error: 'A URL da imagem da clínica é obrigatória.' }),
  alt: z.string({ required_error: 'O nome da imagem da clínica é obrigatório.' })
})

const clinicSchema = z.object({
  name: z.string({ required_error: 'O nome da clínica é obrigatório.' }),
  address: z.string({ required_error: 'O endereço da clínica é obrigatório.' }),
  contact: clinicContactSchema,
  image: clinicImageSchema
})

const clinicSchemaWithId = clinicSchema.partial().extend({ id: z.string() })

const collectionName = 'bookYourAppointmentData'

const fileSchema = z.instanceof(Blob, { message: 'O tipo de imagem é inválida.' })

export const uploadImage = async (formData: FormData): Promise<IReturnString> => {
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

    console.log(downloadUrl)

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

export const addClinic = async (data: IClinicProps): Promise<IReturnString> => {
  try {
    const parsedClinic = clinicSchema.safeParse(data)

    if (!parsedClinic.success) {
      throw new Error(parsedClinic.error.message)
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

export const getClinics = async (): Promise<IReturnArray> => {
  try {
    const q = query(collection(db, collectionName))
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data()
    })) as IClinicPropsWithId[]

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

export const updateClinic = async (id: string, data: Partial<IClinicProps>): Promise<IReturn> => {
  try {
    const parsedClinic = clinicSchemaWithId.safeParse(data)

    if (!parsedClinic.success) {
      throw new Error(parsedClinic.error.message)
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

export const deleteClinic = async (id: string): Promise<IReturn> => {
  try {
    const parsedId = z.string({ required_error: 'O id é obrigatório para exclusão de uma clínica.' }).safeParse(id)

    if (!parsedId.success) {
      throw new Error(parsedId.error.message)
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
