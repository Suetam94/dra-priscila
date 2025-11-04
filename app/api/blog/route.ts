import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'
import { blogPostSchema, type BlogPostData } from '@/app/lib/schemas/blog'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const collectionName = 'moreAboutDermatologyData'

async function requireSession(req: NextRequest) {
  const cookie = req.cookies.get('session')?.value
  if (!cookie) throw new Error('Unauthorized')
  return await adminAuth.verifySessionCookie(cookie, true)
}

export async function GET(req: NextRequest) {
  try {
    await requireSession(req)
    const db = getFirestore()
    const snap = await db.collection(collectionName).get()
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    return NextResponse.json({ ok: true, data })
  } catch {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireSession(req)
    const body = await req.json()
    const parsed = blogPostSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ ok: false, error: parsed.error.message }, { status: 400 })
    const db = getFirestore()
    const ref = await db.collection(collectionName).add(parsed.data as BlogPostData)
    return NextResponse.json({ ok: true, id: ref.id })
  } catch (e) {
    const status = (e as Error).message === 'Unauthorized' ? 401 : 500
    return NextResponse.json({ ok: false, error: 'Failed to add' }, { status })
  }
}

