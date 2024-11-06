import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { userTable } from './users'

export const sessionTable = pgTable('session', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
  deletedAt: timestamp('deleted_at', {
    withTimezone: true,
    mode: 'date',
  }),
})
export type Session = InferSelectModel<typeof sessionTable>
export type NewSession = InferInsertModel<typeof sessionTable>
