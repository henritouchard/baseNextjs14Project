import MobileNavbar from '@/components/nav/mobileNavbar'
import Sidebar from '@/components/nav/Sidebar'
import { HOME_PATH } from '@/constants/routes'
import { auth } from '@/server/auth'
import { User } from '@/server/db/models'
import Image from 'next/image'
import Link from 'next/link'

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth()
  const user = session?.user as User

  return (
    <main className="flex h-screen w-full">
      <Sidebar user={user} />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Link href={HOME_PATH}>
            <Image src="/logo.png" height={30} width={30} alt="logo" />
          </Link>
          <div>
            <MobileNavbar user={'user'} />
          </div>
        </div>
        {children}
      </div>
    </main>
  )
}
