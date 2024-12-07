import { db } from '@/server/db'
import { NewUser, User, userTable } from '@/server/db/models'
import { eq } from 'drizzle-orm'

export async function createUser(user: NewUser): Promise<User> {
  const existingUser = await db.query.userTable.findFirst({
    where: eq(userTable.email, user.email),
  })
  if (existingUser) {
    throw new Error('User already exists')
  }

  const newUsers = await db.insert(userTable).values(user).returning()
  const { password: _password, ...userWithoutPassword } = newUsers[0] // eslint-disable-line @typescript-eslint/no-unused-vars

  return userWithoutPassword
}
