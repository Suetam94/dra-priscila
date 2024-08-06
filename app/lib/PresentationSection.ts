import { addDoc, collection, deleteDoc, doc, getDocs, limit, query, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '@/config/firebase'

interface PresentationSectionData {
  mainText?: string
  subText?: string
  imageUrl?: string | null
}

interface PresentationSectionDataWithId extends PresentationSectionData {
  id: string
}

const collectionName = 'presentationSection'

export const uploadImage = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `images/${file.name}`)
  await uploadBytes(storageRef, file)
  return await getDownloadURL(storageRef)
}

export const addPresentationSection = async (data: PresentationSectionData): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data)
    return docRef.id
  } catch (error) {
    throw new Error(`Error adding document: ${error}`)
  }
}

export const getPresentationSection = async (): Promise<PresentationSectionDataWithId | null> => {
  try {
    const q = query(collection(db, collectionName), limit(1))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0]
      return { id: docSnap.id, ...docSnap.data() } as PresentationSectionDataWithId
    } else {
      return null
    }
  } catch (error) {
    throw new Error(`Error getting document: ${error}`)
  }
}

export const updatePresentationSection = async (id: string, data: Partial<PresentationSectionData>): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, id)
    await updateDoc(docRef, data)
  } catch (error) {
    throw new Error(`Error updating document: ${error}`)
  }
}

export const deleteAllPresentationSection = async (): Promise<void> => {
  try {
    const q = query(collection(db, collectionName))
    const querySnapshot = await getDocs(q)
    const deletePromises = querySnapshot.docs.map(async (docSnap) => {
      const docRef = doc(db, collectionName, docSnap.id)
      return deleteDoc(docRef)
    })
    await Promise.all(deletePromises)
  } catch (error) {
    throw new Error(`Error deleting documents: ${error}`)
  }
}

export const savePresentationSection = async (data: PresentationSectionData): Promise<void> => {
  try {
    const existingData = await getPresentationSection()
    if (existingData && existingData.id) {
      await updatePresentationSection(existingData.id, data)
    } else {
      await addPresentationSection(data)
    }
  } catch (error) {
    throw new Error(`Error saving document: ${error}`)
  }
}
