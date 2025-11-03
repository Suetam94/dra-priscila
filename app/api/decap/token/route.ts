import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()
    const client_id = process.env.GITHUB_CLIENT_ID
    const client_secret = process.env.GITHUB_CLIENT_SECRET

    if (!client_id || !client_secret) {
      return NextResponse.json({ error: 'Missing GitHub OAuth env vars' }, { status: 500 })
    }

    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ client_id, client_secret, code })
    })

    const data = await res.json()
    if (data.error || !data.access_token) {
      return NextResponse.json({ error: data.error_description || 'OAuth exchange failed' }, { status: 400 })
    }

    return NextResponse.json({ token: data.access_token, provider: 'github' })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 })
  }
}
