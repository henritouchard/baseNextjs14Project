import { defineConfig, Config } from 'drizzle-kit'
import '@/lib/loadEnvConfig'

const config = ((): Config => {
  const {
    DATABASE_HOST: host,
    DATABASE_PORT: port,
    DATABASE_USER: user,
    DATABASE_PASSWORD: password,
    DATABASE_NAME: database,
    NODE_ENV: nodeEnv,
  } = process.env
  if (!host || !port || !user || !password || !database) {
    throw new Error(
      'DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME must be set'
    )
  }

  return {
    schema: './src/server/db/models',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
      host,
      port: parseInt(port),
      user,
      password,
      database: database,
      ssl: nodeEnv === 'production',
    },
    verbose: true,
    strict: true,
  }
})()

export default defineConfig(config)
