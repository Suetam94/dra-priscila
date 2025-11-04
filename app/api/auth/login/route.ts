import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { adminAuth } from '@/lib/firebase-admin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const LoginSchema = z.object({
  idToken: z.string()
})

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const { idToken } = LoginSchema.parse(json)

    // Verify the identity token and create a session cookie
    const decoded = await adminAuth.verifyIdToken(idToken)
    const expiresIn = 60 * 60 * 8 * 1000 // 8 hours
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn })

    const isProd = process.env.NODE_ENV === 'production'
    const res = NextResponse.json({ ok: true, uid: decoded.uid })
    res.cookies.set({
      name: 'session',
      value: sessionCookie,
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: Math.floor(expiresIn / 1000),
      path: '/'
    })
    return res
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 })
  }
}

