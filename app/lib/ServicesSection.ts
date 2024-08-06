import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '@/config/firebase'

export interface ServiceData {
  imageUrl: string
  title: string
  content: string
}

export interface ServiceDataWithId extends ServiceData {
  id: string
}

const collectionName = 'servicesSection'

export const uploadImage = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `images/${file.name}`)
  await uploadBytes(storageRef, file)
  return await getDownloadURL(storageRef)
}

export const addService = async (data: ServiceData): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data)
    return docRef.id
  } catch (error) {
    throw new Error(`Error adding document: ${error}`)
  }
}

export const getServices = async (): Promise<ServiceDataWithId[]> => {
  try {
    const q = query(collection(db, collectionName))
    const querySnapshot = await getDocs(q)
    const services: ServiceDataWithId[] = []
    querySnapshot.forEach((docSnap) => {
      services.push({ id: docSnap.id, ...docSnap.data() } as ServiceDataWithId)
    })
    return services
  } catch (error) {
    throw new Error(`Error getting documents: ${error}`)
  }
}

export const updateService = async (id: string, data: Partial<ServiceData>): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, id)
    await updateDoc(docRef, data)
  } catch (error) {
    throw new Error(`Error updating document: ${error}`)
  }
}

export const deleteService = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, id)
    await deleteDoc(docRef)
  } catch (error) {
    throw new Error(`Error deleting document: ${error}`)
  }
}
