'use client'

import { signOutAction } from '@/app/auth/authActions'
import { Button } from '@/components/ui/button'

export default function User() {
  return (
    <div className="">
      <form action={() => signOutAction()}>
        <Button type="submit">Se déconnecter</Button>
      </form>
    </div>
  )
}
