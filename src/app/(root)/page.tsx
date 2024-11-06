import PageLayout from '@/components/ui/PageLayout'
import { getUser } from '@/app/lib/dal'

export default async function Home() {
  const user = await getUser()
  return (
    <PageLayout>
      <div className="header-box">
        <h1 className="header-box-title">
          Bienvenue <span className="text-blue-600">{user?.firstname}</span>
        </h1>
        <p>Voici votre tableau de bord.</p>
      </div>
    </PageLayout>
  )
}
