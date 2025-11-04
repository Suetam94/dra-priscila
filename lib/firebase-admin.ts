import { getApps, initializeApp, cert, applicationDefault, type AppOptions } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

// Initializes Firebase Admin SDK using env credentials.
// Designed to run on the server only.

function parseServiceAccount(): { projectId?: string; clientEmail?: string; privateKey?: string; useADC?: boolean } {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT || process.env.NEXT_FIREBASE_SERVICE_ACCOUNT
  if (raw) {
    try {
      const jsonStr = raw.trim().startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf8')
      const json = JSON.parse(jsonStr)
      let pk: string | undefined = json.private_key
      if (pk) {
        if (pk.startsWith('"') && pk.endsWith('"')) pk = pk.slice(1, -1)
        pk = pk.replace(/\\n/g, '\n')
      }
      return { projectId: json.project_id, clientEmail: json.client_email, privateKey: pk }
    } catch {
      // ignore and try other methods
    }
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return { useADC: true }
  }

  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL || process.env.NEXT_FIREBASE_CLIENT_EMAIL
  let privateKey = process.env.FIREBASE_PRIVATE_KEY || process.env.NEXT_FIREBASE_PRIVATE_KEY
  if (privateKey) {
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) privateKey = privateKey.slice(1, -1)
    privateKey = privateKey.replace(/\\n/g, '\n')
  }
  return { projectId, clientEmail, privateKey }
}

const { projectId, clientEmail, privateKey, useADC } = parseServiceAccount()

let options: AppOptions
if (useADC) {
  options = { credential: applicationDefault() }
} else {
  if (!projectId || !clientEmail || !privateKey) {
    const missing = [!projectId ? 'project_id' : null, !clientEmail ? 'client_email' : null, !privateKey ? 'private_key' : null]
      .filter(Boolean)
      .join(', ')
    throw new Error(
      `Firebase Admin credentials missing: ${missing}. Configure FIREBASE_SERVICE_ACCOUNT (JSON/base64) ou FIREBASE_PROJECT_ID/FIREBASE_CLIENT_EMAIL/FIREBASE_PRIVATE_KEY.`
    )
  }
  options = { credential: cert({ projectId, clientEmail, privateKey }) }
}

const app = getApps().length > 0 ? getApps()[0] : initializeApp(options)

export const adminAuth = getAuth(app)
export default app
