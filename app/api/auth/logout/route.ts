import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const cookie = req.cookies.get('session')
    const isProd = process.env.NODE_ENV === 'production'

    if (cookie?.value) {
      try {
        const decoded = await adminAuth.verifySessionCookie(cookie.value, true)
        // Revoke refresh tokens to invalidate existing sessions
        await adminAuth.revokeRefreshTokens(decoded.sub)
      } catch {
        // ignore verification errors during logout; we'll clear the cookie anyway
      }
    }

    const res = NextResponse.json({ ok: true })
    res.cookies.set({
      name: 'session',
      value: '',
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      expires: new Date(0),
      path: '/'
    })
    return res
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

