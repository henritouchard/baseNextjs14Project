'use client'

import { signOutAction } from '@/app/(root)/user/userActions'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'

export default function User() {
  const session = useSession()

  return (
    <div className="">
      {JSON.stringify(session.data?.user)}
      <form action={signOutAction}>
        <Button type="submit">Se déconnecter</Button>
      </form>
    </div>
  )
}
