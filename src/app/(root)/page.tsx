import PageLayout from '@/components/ui/PageLayout'
import { auth } from '@/server/auth'

export default async function Home() {
  const session = await auth()

  return (
    <PageLayout>
      <div className="header-box">
        <h1 className="header-box-title">
          Bienvenue{' '}
          <span className="text-blue-600">{session?.user?.firstname}</span>
        </h1>
        <p>Voici votre tableau de bord.</p>
      </div>
    </PageLayout>
  )
}
