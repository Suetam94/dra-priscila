import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'
import { getStorage } from '@firebase/storage'
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_AUTH_DOMAIN,
  projectId: process.env.NEXT_PROJECT_ID,
  storageBucket: process.env.NEXT_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_APP_ID,
  measurementId: process.env.NEXT_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)

void setPersistence(auth, browserLocalPersistence)

export { db, storage, auth }
