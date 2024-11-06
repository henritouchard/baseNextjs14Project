import { signinSchema } from '@/app/auth/AuthTypes'
import { createSession } from '@/app/lib/db-session'
import { UserRole } from '@/constants/userRoles'
import { db } from '@/server/db'
import { User, userTable, UserWithPassword } from '@/server/db/models'
import * as bcrypt from 'bcrypt'
import { and, eq } from 'drizzle-orm'

export async function signIn(credentials: any): Promise<User | null> {
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
  await createSession(user.id, user.role as UserRole)

  return user
}
