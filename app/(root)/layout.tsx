import MobileNavbar from '@/components/mobileNavbar'
import Sidebar from '@/components/Sidebar'
import { HOME_PATH } from '@/constants/routes'
import Image from 'next/image'
import Link from 'next/link'

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex h-screen w-full">
      <Sidebar user={'user'} />
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
