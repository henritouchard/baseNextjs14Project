import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './models/index'

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined
}

const {
  DATABASE_HOST: host,
  DATABASE_PORT: port,
  DATABASE_USER: user,
  DATABASE_PASSWORD: password,
  DATABASE_NAME: database,
} = process.env
if (!host || !port || !user || !password || !database) {
  throw new Error(
    'DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME must be set'
  )
}

const conn =
  globalForDb.conn ??
  postgres({
    host,
    port: parseInt(port),
    user,
    password,
    database: database,
  })
if (process.env.NODE_ENV !== 'production') globalForDb.conn = conn

export const db = drizzle(conn, { schema })
