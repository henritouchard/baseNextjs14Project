'use server'

import { deleteSession } from '@/app/lib/db-session'

export async function signOutAction() {
  await deleteSession()
}
