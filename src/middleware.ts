import { decrypt } from '@/app/lib/db-session'
import { PUBLIC_PATHS, SIGNIN_PATH } from '@/constants/routes'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req
  const isPublicRoute = PUBLIC_PATHS.includes(nextUrl.pathname)

  // 3. Decrypt the session from the cookie
  const cookie = req?.cookies?.get('session')?.value
  const session = await decrypt(cookie)
  if (!isPublicRoute && !session?.userId) {
    return NextResponse.redirect(new URL(SIGNIN_PATH, req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
