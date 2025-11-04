import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'
import { blogPostPartialSchema } from '@/app/lib/schemas/blog'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const collectionName = 'moreAboutDermatologyData'

async function requireSession(req: NextRequest) {
  const cookie = req.cookies.get('session')?.value
  if (!cookie) throw new Error('Unauthorized')
  return await adminAuth.verifySessionCookie(cookie, true)
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireSession(req)
    const body = await req.json().catch(() => ({}))
    const parsed = blogPostPartialSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ ok: false, error: parsed.error.message }, { status: 400 })
    const db = getFirestore()
    await db.collection(collectionName).doc(params.id).set(parsed.data, { merge: true })
    return NextResponse.json({ ok: true })
  } catch (e) {
    const status = (e as Error).message === 'Unauthorized' ? 401 : 500
    return NextResponse.json({ ok: false, error: 'Failed to update' }, { status })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireSession(req)
    const db = getFirestore()
    await db.collection(collectionName).doc(params.id).delete()
    return NextResponse.json({ ok: true })
  } catch (e) {
    const status = (e as Error).message === 'Unauthorized' ? 401 : 500
    return NextResponse.json({ ok: false, error: 'Failed to delete' }, { status })
  }
}

