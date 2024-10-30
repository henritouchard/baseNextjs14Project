import { userRole, userTable } from '@/server/db/models/users'
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm'
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const invitationTable = pgTable('invitations', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  inviterId: uuid('inviterId').notNull(),
  inviteeId: uuid('inviteeId'),
  role: userRole('role'),

  consummedAt: timestamp('consummedAt'),
})

export const invitationRelations = relations(invitationTable, ({ one }) => ({
  inviterId: one(userTable, {
    fields: [invitationTable.inviterId],
    references: [userTable.id],
  }),
  inviteeId: one(userTable, {
    fields: [invitationTable.inviteeId],
    references: [userTable.id],
  }),
}))

export type Invitation = InferSelectModel<typeof invitationTable>
export type NewInvitation = InferInsertModel<typeof invitationTable>
