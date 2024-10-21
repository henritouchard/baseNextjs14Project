import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

type SideBarLinkProps = {
  icon: ReactNode;
  label: string;
  path: string;
  isActive: boolean;
};

export default function DesktopSideBarLink({
  icon,
  label,
  isActive,
  path,
}: SideBarLinkProps) {
  return (
    <Link
      href={path}
      className={cn(
        "sidebar-link rounded-sm cursor-pointer text-black-1 hover:bg-gray-200",
        {
          "text-white": isActive,
          "bg-blue-gradient": isActive,
        },
      )}
    >
      <div className="relative">{icon}</div>
      <p
        className={cn("sidebar-label", {
          "!text-white": isActive,
        })}
      >
        {label}
      </p>
    </Link>
  );
}

export function MobileSideBarLink({
  icon,
  label,
  isActive,
  path,
}: SideBarLinkProps) {
  return (
    <SheetClose asChild>
      <Link
        href={path}
        className={cn("mobilenav-sheet_close cursor-pointer h-12", {
          "text-white": isActive,
          "bg-blue-gradient": isActive,
        })}
      >
        <div className="size-6">{icon}</div>
        <p
          className={cn("text-16 font-semibold", {
            "!text-white": isActive,
          })}
        >
          {label}
        </p>
      </Link>
    </SheetClose>
  );
}
