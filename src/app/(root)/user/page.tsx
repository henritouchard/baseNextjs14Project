import { db } from '@/server/db'

export default async function User() {
  const user = await db.query.userTable.findFirst()
  return <div className="">{JSON.stringify(user)}</div>
}
