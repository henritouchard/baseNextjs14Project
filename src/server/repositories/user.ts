import { db } from '@/server/db'
import { NewUser, User, userTable, UserWithPassword } from '@/server/db/models'
import { eq } from 'drizzle-orm'

export async function createUser(user: NewUser): Promise<User> {
  const existingUser = await db.query.userTable.findFirst({
    where: eq(userTable.email, user.email),
  })
  if (existingUser) {
    throw new Error('User already exists')
  }

  const newUsers = await db.insert(userTable).values(user).returning()
  const { password, ...userWithoutPassword } = newUsers[0]
  return userWithoutPassword
}
