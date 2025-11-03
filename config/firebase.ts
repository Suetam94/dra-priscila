import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from '@firebase/firestore'
import { getStorage, type FirebaseStorage } from '@firebase/storage'
import { getAuth, setPersistence, browserLocalPersistence, type Auth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_AUTH_DOMAIN,
  projectId: process.env.NEXT_PROJECT_ID,
  storageBucket: process.env.NEXT_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_APP_ID,
  measurementId: process.env.NEXT_MEASUREMENT_ID
}

let app: FirebaseApp | undefined
let db: Firestore | undefined
let storage: FirebaseStorage | undefined
let auth: Auth | undefined

try {
  const hasEnv = Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
  )
  if (hasEnv) {
    app = initializeApp(firebaseConfig)
    db = getFirestore(app)
    storage = getStorage(app)
    auth = getAuth(app)
    if (typeof window !== 'undefined' && auth) {
      void setPersistence(auth, browserLocalPersistence)
    }
  }
} catch {
  // noop: allow build to continue without Firebase
}

export { db, storage, auth }
