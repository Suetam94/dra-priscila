import { z } from 'zod'
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '@/config/firebase'
import { generalUploadImage } from '@/utils/functions'

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

const collectionName = 'moreAboutDermatologyData'

export const uploadImage = generalUploadImage

export const addBlogPost = async (data: IBlogPostProps): Promise<IReturnString> => {
  try {
    const parsedPost = postSchema.safeParse(data)

    if (!parsedPost.success) {
      const message = parsedPost.error.message
      throw new Error(message)
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

export const getBlogPosts = async (): Promise<IReturnArray> => {
  try {
    const q = query(collection(db, collectionName))
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data()
    })) as IBlogPostPropsWithId[]

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

export const updateBlogPost = async (id: string, data: Partial<IBlogPostProps>): Promise<IReturn> => {
  try {
    const parsedPost = postSchemaWithId.safeParse({ id, ...data })

    if (!parsedPost.success) {
      const message = parsedPost.error.message
      throw new Error(message)
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

export const deleteBlogPost = async (id: string): Promise<IReturn> => {
  try {
    const parsedId = z.string({ required_error: 'O id é obrigatório para exclusão de um post.' }).safeParse(id)

    if (!parsedId.success) {
      const message = parsedId.error.message
      throw new Error(message)
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
