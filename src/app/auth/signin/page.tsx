import SignInForm from '@/app/auth/signin/signInForm'
import { getUser } from '@/app/lib/dal'
import { Card } from '@/components/ui/card'
import { HOME_PATH, SIGNUP_ADMIN_PATH } from '@/constants/routes'

import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function SignIn() {
  const user = await getUser()
  if (user) redirect(HOME_PATH)

  return (
    <div className="flex justify-center items-center h-screen px-4">
      <Card className="flex flex-col gap-4 justify-center items-center p-6 w-full max-w-md">
        <Image
          className="mb-6"
          height={60}
          width={60}
          src="/logo.png"
          alt="logo"
        />
        <h1 className="text-2xl font-bold">Se connecter</h1>
        <SignInForm />
        <div className="flex items-center my-2 w-full">
          <hr className="flex-grow border-t  border-gray-300" />
          <span className="mx-4 text-gray-500">ou</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <Link href={SIGNUP_ADMIN_PATH}>
          Créer un <span className="text-mainGradient">compte</span>
        </Link>
      </Card>
    </div>
  )
}
