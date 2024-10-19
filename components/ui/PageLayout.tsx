import { ReactNode } from "react"

type PageLayoutProps = {
  children: ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <section className="size-full px-4 pt-4">
      {children}
    </section>
  )
}
