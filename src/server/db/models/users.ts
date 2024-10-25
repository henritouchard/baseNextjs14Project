import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import {
  pgEnum,
  pgTable,
  serial,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

enum UserRole {
  ADMIN = 'admin',
  OPERATOR = 'operator',
  CANDIDATE = 'candidate',
}

export const userRole = pgEnum('user_role', [
  UserRole.ADMIN,
  UserRole.OPERATOR,
  UserRole.CANDIDATE,
])

export const userTable = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 30 }),
  password: varchar('password', { length: 255 }),
  emailVerified: timestamp('email_verified'),
  role: userRole('role'),
})

export type User = Omit<InferSelectModel<typeof userTable>, 'password'>
export type UserWithPassword = InferSelectModel<typeof userTable>
export type NewUser = InferInsertModel<typeof userTable>
