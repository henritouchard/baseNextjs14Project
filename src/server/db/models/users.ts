import { UserRole } from '@/constants/userRoles'
import { getEnumValues } from '@/server/db/models/utils'
import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const userRole = pgEnum('user_role', [...getEnumValues(UserRole)])

export const userTable = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  firstname: varchar('firstname', { length: 30 }),
  lastname: varchar('lastname', { length: 30 }),
  password: varchar('password', { length: 255 }),
  emailVerified: timestamp('email_verified'),
  role: userRole('role').notNull(),
})

export type User = Omit<InferSelectModel<typeof userTable>, 'password'>
export type UserWithPassword = InferSelectModel<typeof userTable>
export type NewUser = InferInsertModel<typeof userTable>
