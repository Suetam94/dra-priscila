import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, limit } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '@/config/firebase'

export interface WhoIAmSectionData {
  title: string
  summary: string[]
  mainImageUrl: string
  fullText: string
}

export interface WhoIAmSectionDataWithId extends WhoIAmSectionData {
  id: string
}

const collectionName = 'whoIAmSection'

export const uploadImage = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `images/${file.name}`)
  await uploadBytes(storageRef, file)
  return await getDownloadURL(storageRef)
}

export const addWhoIAmSection = async (data: WhoIAmSectionData): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data)
    return docRef.id
  } catch (error) {
    throw new Error(`Error adding document: ${error}`)
  }
}

export const getWhoIAmSection = async (): Promise<WhoIAmSectionDataWithId | null> => {
  try {
    const q = query(collection(db, collectionName), limit(1))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0]
      return { id: docSnap.id, ...docSnap.data() } as WhoIAmSectionDataWithId
    } else {
      return null
    }
  } catch (error) {
    throw new Error(`Error getting document: ${error}`)
  }
}

export const updateWhoIAmSection = async (id: string, data: Partial<WhoIAmSectionData>): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, id)
    await updateDoc(docRef, data)
  } catch (error) {
    throw new Error(`Error updating document: ${error}`)
  }
}

export const deleteWhoIAmSection = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, id)
    await deleteDoc(docRef)
  } catch (error) {
    throw new Error(`Error deleting document: ${error}`)
  }
}

export const saveWhoIAmSection = async (data: WhoIAmSectionData): Promise<void> => {
  try {
    const existingData = await getWhoIAmSection()
    if (existingData && existingData.id) {
      await updateWhoIAmSection(existingData.id, data)
    } else {
      await addWhoIAmSection(data)
    }
  } catch (error) {
    throw new Error(`Error saving document: ${error}`)
  }
}
