import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'
import { presentationSchema, type PresentationData } from '@/app/lib/schemas/presentation'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const collectionName = 'presentationData'

async function requireSession(req: NextRequest) {
  const cookie = req.cookies.get('session')?.value
  if (!cookie) throw new Error('Unauthorized')
  return await adminAuth.verifySessionCookie(cookie, true)
}

export async function GET(req: NextRequest) {
  try {
    await requireSession(req)
    const db = getFirestore()
    const snap = await db.collection(collectionName).limit(1).get()
    if (snap.empty) return new NextResponse(null, { status: 204 })
    const doc = snap.docs[0]
    const data = { id: doc.id, ...doc.data() }
    return NextResponse.json({ ok: true, data })
  } catch {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const decoded = await requireSession(req)
    const body = await req.json()
    const parsed = presentationSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ ok: false, error: parsed.error.message }, { status: 400 })
    const db = getFirestore()
    const snap = await db.collection(collectionName).limit(1).get()
    const payload: PresentationData & { updatedAt: string; updatedBy: string } = {
      ...parsed.data,
      updatedAt: new Date().toISOString(),
      updatedBy: decoded.uid
    }
    if (snap.empty) {
      const ref = await db.collection(collectionName).add(payload)
      return NextResponse.json({ ok: true, id: ref.id })
    } else {
      const doc = snap.docs[0]
      await db.collection(collectionName).doc(doc.id).set(payload, { merge: true })
      return NextResponse.json({ ok: true, id: doc.id })
    }
  } catch (e) {
    const status = (e as Error).message === 'Unauthorized' ? 401 : 500
    return NextResponse.json({ ok: false, error: 'Failed to save' }, { status })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireSession(req)
    const db = getFirestore()
    const snap = await db.collection(collectionName).get()
    const batch = db.batch()
    snap.docs.forEach((d) => batch.delete(d.ref))
    await batch.commit()
    return NextResponse.json({ ok: true })
  } catch (e) {
    const status = (e as Error).message === 'Unauthorized' ? 401 : 500
    return NextResponse.json({ ok: false, error: 'Failed to delete' }, { status })
  }
}

