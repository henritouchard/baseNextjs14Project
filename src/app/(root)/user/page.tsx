import { db } from '@/server/db'

export default async function User() {
  const user = await db.query.users.findFirst()
  return <div className="">{JSON.stringify(user)}</div>
}
