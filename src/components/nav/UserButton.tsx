import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SheetClose } from '@/components/ui/sheet'
import { USER_PATH } from '@/constants/routes'
import { cn } from '@/lib/utils'
import { User } from '@/server/db/models'
import Link from 'next/link'
import { ReactNode } from 'react'

type SideBarLinkProps = {
  user: User
  isActive: boolean
}

export function DesktopSideBarUserButton({ user, isActive }: SideBarLinkProps) {
  // TODO: allow images
  const userImage = undefined
  return (
    <Link
      href={USER_PATH}
      className={cn(
        'sidebar-link rounded-sm cursor-pointer text-black-1 hover:bg-gray-200',
        {
          'text-white': isActive,
          'bg-blue-gradient': isActive,
        }
      )}
    >
      <Avatar>
        <AvatarImage src={userImage} />
        <AvatarFallback className="bg-red-500">
          {user?.name?.[0] ?? 'D'}
        </AvatarFallback>
      </Avatar>
      <p
        className={cn('sidebar-label', {
          '!text-white': isActive,
        })}
      >
        Utilisateur
      </p>
    </Link>
  )
}

export function MobileSideBarUserButton({
  icon,
  label,
  isActive,
  path,
}: SideBarLinkProps) {
  return (
    <SheetClose asChild>
      <Link
        href={path}
        className={cn('mobilenav-sheet_close cursor-pointer h-12', {
          'text-white': isActive,
          'bg-blue-gradient': isActive,
        })}
      >
        <div className="size-6">{icon}</div>
        <p
          className={cn('text-16 font-semibold', {
            '!text-white': isActive,
          })}
        >
          {label}
        </p>
      </Link>
    </SheetClose>
  )
}
