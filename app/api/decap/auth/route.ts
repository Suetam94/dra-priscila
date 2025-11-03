import { NextRequest, NextResponse } from 'next/server'

export async function GET (req: NextRequest) {
  const url = new URL(req.url)
  const origin = `${url.protocol}//${url.host}`

  const clientId = process.env.GITHUB_CLIENT_ID
  if (!clientId) {
    return NextResponse.json({ error: 'Missing GITHUB_CLIENT_ID' }, { status: 500 })
  }

  const defaultRedirect = `${origin}/api/decap/callback`
  const redirectUri = process.env.GITHUB_REDIRECT_URI || defaultRedirect
  const scope = url.searchParams.get('scope') || 'repo,user'
  const state = Math.random().toString(36).slice(2)

  const authorizeUrl = new URL('https://github.com/login/oauth/authorize')
  authorizeUrl.searchParams.set('client_id', clientId)
  authorizeUrl.searchParams.set('redirect_uri', redirectUri)
  authorizeUrl.searchParams.set('scope', scope)
  authorizeUrl.searchParams.set('state', state)

  return NextResponse.redirect(authorizeUrl.toString())
}
