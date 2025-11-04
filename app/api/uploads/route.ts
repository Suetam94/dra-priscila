import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'
import { getStorage } from 'firebase-admin/storage'
import { randomUUID } from 'crypto'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function requireSession(req: NextRequest) {
  const cookie = req.cookies.get('session')?.value
  if (!cookie) throw new Error('Unauthorized')
  return await adminAuth.verifySessionCookie(cookie, true)
}

export async function POST(req: NextRequest) {
  try {
    await requireSession(req)
    const form = await req.formData()
    const file = form.get('file') as File | null
    const folder = (form.get('folder') as string) || 'who-i-am'
    if (!file) return NextResponse.json({ ok: false, error: 'Arquivo ausente' }, { status: 400 })

    const contentType = file.type || 'application/octet-stream'
    if (!contentType.startsWith('image/')) {
      return NextResponse.json({ ok: false, error: 'Apenas imagens são permitidas' }, { status: 400 })
    }

    const size = (file as any).size as number | undefined
    if (size && size > 5 * 1024 * 1024) {
      return NextResponse.json({ ok: false, error: 'Imagem excede 5MB' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const bucketName = process.env.NEXT_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET
    const bucket = getStorage().bucket(bucketName)
    const safeFolder = folder.replace(/[^a-zA-Z0-9-_]/g, '') || 'uploads'
    const path = `images/${safeFolder}/${Date.now()}-${file.name}`
    const token = randomUUID()

    const gcsFile = bucket.file(path)
    await gcsFile.save(buffer, {
      contentType,
      public: false,
      metadata: {
        cacheControl: 'public, max-age=31536000',
        metadata: { firebaseStorageDownloadTokens: token }
      }
    })

    const encodedPath = encodeURIComponent(path)
    const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodedPath}?alt=media&token=${token}`

    return NextResponse.json({ ok: true, url })
  } catch (e) {
    const status = (e as Error).message === 'Unauthorized' ? 401 : 500
    return NextResponse.json({ ok: false, error: 'Falha no upload' }, { status })
  }
}
