import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core'

export const userTable = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
})
export type User = InferSelectModel<typeof userTable>
export type NewUser = InferInsertModel<typeof userTable>
