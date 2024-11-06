import { UserRole } from '@/constants/userRoles'
import { db } from '@/server/db'
import { invitationTable } from '@/server/db/models'
import { eq } from 'drizzle-orm'

export async function getInvite(invite: string) {
  return await db.query.invitationTable.findFirst({
    where: eq(invitationTable.id, invite),
  })
}

export async function createInvite(
  inviteeEmail: string,
  role: UserRole,
  inviterId: string
) {
  return await db
    .insert(invitationTable)
    .values({ email: inviteeEmail, role, inviterId })
    .returning()
}

export async function consumeInvite(invite: string, inviteeId: string) {
  return await db
    .update(invitationTable)
    .set({ consumedAt: new Date(), inviteeId })
    .where(eq(invitationTable.id, invite))
}
