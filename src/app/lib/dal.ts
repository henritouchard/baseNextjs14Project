import 'server-only'

import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/db-session'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { SIGNIN_PATH } from '@/constants/routes'
import { db } from '@/server/db'
import { eq } from 'drizzle-orm'
import { User, userTable } from '@/server/db/models'

export const sessionExists = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    return null
  }

  return { isAuth: true, userId: session.userId as string }
})

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    redirect(SIGNIN_PATH)
  }

  return { isAuth: true, userId: session.userId as string }
})

export const getRequiredUser = cache(async (): Promise<User | null> => {
  const session = await sessionExists()
  if (!session) redirect(SIGNIN_PATH)

  try {
    const data = await db.query.userTable.findMany({
      where: eq(userTable.id, session.userId),
      columns: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        emailVerified: true,
        role: true,
      },
    })

    const user = data[0]
    return user as User
  } catch (error) {
    console.error('Failed to fetch user', error)
    return null
  }
})

export const getUser = cache(async (): Promise<User | null> => {
  const session = await sessionExists()
  if (!session) return null

  try {
    const data = await db.query.userTable.findMany({
      where: eq(userTable.id, session.userId),
      columns: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        emailVerified: true,
        role: true,
      },
    })

    const user = data[0]
    return user as User
  } catch (error) {
    console.error('Failed to fetch user', error)
    return null
  }
})
