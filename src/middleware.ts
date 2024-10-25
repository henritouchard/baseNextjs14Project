import NextAuth from 'next-auth'
import { authConfig } from '@/server/auth/config'
import { PUBLIC_PATHS, SIGNIN_PATH } from '@/constants/routes'
import { NextResponse } from 'next/server'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isAuthenticated = !!req.auth
  const isPublicRoute = PUBLIC_PATHS.includes(nextUrl.pathname)

  if (isAuthenticated) return undefined

  if (!isAuthenticated && !isPublicRoute) {
    const signInUrl = new URL(SIGNIN_PATH, nextUrl)
    signInUrl.searchParams.set('redirect', nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
