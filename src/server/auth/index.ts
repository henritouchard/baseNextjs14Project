import NextAuth from 'next-auth'
import Discord from 'next-auth/providers/discord'
import Credentials from 'next-auth/providers/credentials'
import { userTable } from '@/server/db/models'
import { db } from '@/server/db'
import { and, eq } from 'drizzle-orm'
import * as bcrypt from 'bcrypt'
import { signinSchema } from '@/app/auth/AuthTypes'

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
    console.log('Invalid user or password.')
    return null
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    console.log('Invalid user or password.')
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
    signIn: '/auth/signin',
  },
}

export const { handlers, signIn, signOut, auth } = NextAuth(options)
