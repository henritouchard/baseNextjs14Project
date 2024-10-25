import { signinSchema } from '@/app/auth/AuthTypes'
import { SIGNIN_PATH } from '@/constants/routes'
import { authConfig } from '@/server/auth/config'
import { db } from '@/server/db'
import { User, userTable, UserWithPassword } from '@/server/db/models'
import * as bcrypt from 'bcrypt'
import { and, eq } from 'drizzle-orm'
import NextAuth, { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Discord from 'next-auth/providers/discord'

async function authorize(credentials: any): Promise<User | null> {
  const parsedCredentials = signinSchema.safeParse(credentials)
  if (!parsedCredentials.success) {
    return null
  }
  const { email, password } = parsedCredentials.data

  let user = null

  user = (await db.query.userTable.findFirst({
    where: and(eq(userTable.email, email)),
  })) as UserWithPassword | null

  if (!user) {
    return null
  }

  const isPasswordValid = await bcrypt.compare(password, user.password || '')
  if (!isPasswordValid) {
    return null
  }
  return user
}

const credentialProvider = Credentials({
  name: 'Credentials',
  credentials: {
    email: { label: 'Email', type: 'email', placeholder: 'john@doe.com' },
    password: { label: 'Password', type: 'password' },
  },
  authorize,
})

const options = {
  ...authConfig,
  providers: [Discord, credentialProvider],
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(options)
