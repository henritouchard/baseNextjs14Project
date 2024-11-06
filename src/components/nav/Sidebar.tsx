'use client'

import DesktopSideBarLink from '@/components/nav/SidebarLinks'
import { DesktopSideBarUserButton } from '@/components/nav/UserButton'
import { MENU_ROUTES } from '@/constants/menuRoutes'
import { USER_PATH } from '@/constants/routes'
import { cn } from '@/lib/utils'
import { User } from '@/server/db/models'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type SidebarProps = {
  user: User | null
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()
  function isCurrentPath(path: string) {
    return path === pathname || pathname.startsWith(path + '/')
  }

  const isUserActive = isCurrentPath(USER_PATH)
  return (
    <div className="sidebar">
      <nav className="flex flex-col text-black-1">
        <Link
          href={'/'}
          className={cn(
            'sidebar-link flex items-center rounded-sm mb-12 cursor-pointer'
          )}
        >
          <div className="relative size-6">
            <Image height={30} width={30} src="/logo.png" alt="logo" />
          </div>
          <h1 className={cn('sidebar-logo')}>TESTAPP</h1>
        </Link>

        {MENU_ROUTES.map((linkElement) => {
          const { path, name, icon } = linkElement
          const isActive = isCurrentPath(path)
          return (
            <DesktopSideBarLink
              key={name}
              icon={icon}
              label={name}
              isActive={isActive}
              path={path}
            />
          )
        })}
      </nav>

      <DesktopSideBarUserButton user={user} isActive={isUserActive} />
    </div>
  )
}
