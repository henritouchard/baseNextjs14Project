import { signinSchema } from '@/app/auth/AuthTypes'
import { SIGNIN_PATH } from '@/constants/routes'
import { db } from '@/server/db'
import { userTable } from '@/server/db/models'
import * as bcrypt from 'bcrypt'
import { and, eq } from 'drizzle-orm'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Discord from 'next-auth/providers/discord'

async function authorize(credentials: any) {
  const parsedCredentials = signinSchema.safeParse(credentials)
  if (!parsedCredentials.success) {
    return null
  }
  const { email, password } = parsedCredentials.data

  let user = null

  user = await db.query.userTable.findFirst({
    where: and(eq(userTable.email, email)),
  })

  if (!user) {
    return null
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
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
  providers: [Discord, credentialProvider],
  pages: {
    signIn: SIGNIN_PATH,
  },
}

export const { handlers, signIn, signOut, auth } = NextAuth(options)
