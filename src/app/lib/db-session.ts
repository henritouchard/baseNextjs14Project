import { db } from '@/server/db'
import { sessionTable } from '@/server/db/models'

// @ts-ignore
import { SIGNIN_PATH } from '@/constants/routes'
import { UserRole } from '@/constants/userRoles'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { SessionPayload } from '../auth/definitions'

const secretKey = process.env.JWT_ENCRYPTION_SECRET
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload, expirationTime: Date) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(key)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error: any) {
    console.log('Failed to verify session', error.message)
    return null
  }
}

export async function createSession(id: string, role: UserRole) {
  const cookieStore = await cookies()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  // 1. Create a session in the database
  const data = await db
    .insert(sessionTable)
    .values({
      userId: id,
      expiresAt,
      createdAt: new Date(),
    })
    // Return the session ID
    .returning({ id: sessionTable.id })

  const sessionId = data[0].id

  // 2. Encrypt the session ID
  const session = await encrypt(
    {
      sessionId,
      userId: id,
      userRole: role,
    } as SessionPayload,
    expiresAt
  )

  // 3. Store the session in cookies for optimistic auth checks
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
  redirect(SIGNIN_PATH)
}
