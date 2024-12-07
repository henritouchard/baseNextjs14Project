'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { MobileSideBarLink } from '@/components/nav/SidebarLinks'
import { MENU_ROUTES } from '@/constants/menuRoutes'
import { HOME_PATH, USER_PATH } from '@/constants/routes'
import { cn } from '@/lib/utils'
import { faBars, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type MobileNavbarProps = {
  user: any
}

export default function MobileNavbar({ user }: MobileNavbarProps) {
  const pathname = usePathname()
  console.log(user)
  function isCurrentPath(path: string) {
    return path === pathname || pathname.startsWith(path + '/')
  }
  const isUserActive = isCurrentPath(USER_PATH)
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <FontAwesomeIcon icon={faBars} />
        </SheetTrigger>
        <SheetHeader className="hidden">
          {/* avoid warnings about missing description */}
          <SheetDescription>MobileMenu</SheetDescription>
        </SheetHeader>
        <SheetContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          side="left"
          className="border-none"
        >
          <SheetTitle className="hidden">Menu</SheetTitle>
          <Link
            href={HOME_PATH}
            className={cn(
              'flex rounded-sm gap-3 items-center mb-2 cursor-pointer'
            )}
          >
            <div className="relative size-6">
              <Image height={30} width={30} src="/logo.png" alt="logo" />
            </div>
            <h1 className={cn('text-26 font-ibm-plex-serif font-bold')}>
              TESTAPP
            </h1>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <nav className="flex flex-col gap-2">
                {MENU_ROUTES.map((linkElement) => {
                  const { path, name, icon } = linkElement
                  const isActive = isCurrentPath(path)
                  return (
                    <MobileSideBarLink
                      key={name}
                      icon={icon}
                      label={name}
                      isActive={isActive}
                      path={path}
                    />
                  )
                })}
              </nav>
            </SheetClose>
            <MobileSideBarLink
              icon={<FontAwesomeIcon icon={faCircleUser} size="xl" />}
              label="Utilisateur"
              isActive={isUserActive}
              path={USER_PATH}
            />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}
