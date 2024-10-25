import { SIGNIN_PATH } from '@/constants/routes'
import { User } from '@/server/db/models'
import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: SIGNIN_PATH,
    signOut: SIGNIN_PATH,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isAuthenticated = !!auth?.user
      if (isAuthenticated && nextUrl.pathname === SIGNIN_PATH) {
        return Response.redirect(new URL('/', nextUrl))
      }
      return true
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      token.role = 'admin'
      return token
    },
    async session({ session, user, token }) {
      return Promise.resolve(session)
    },
  },
  providers: [],
} satisfies NextAuthConfig
