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
    async jwt({ token, user, account, profile }) {
      if (user) {
        // Remember to update types/next-auth.d.ts if you need to add new properties
        token.id = user.id!
        token.role = user.role
        token.firstname = user.firstname
        token.lastname = user.lastname
      }
      return token
    },
    async session({ session, user, token }) {
      if (session.user && token.id) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.firstname = token.firstname
        session.user.lastname = token.lastname
      }

      return Promise.resolve(session)
    },
  },
  providers: [],
} satisfies NextAuthConfig
