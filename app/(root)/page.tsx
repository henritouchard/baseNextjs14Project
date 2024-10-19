import PageLayout from "@/components/ui/PageLayout";

export default function Home() {

  const user = 'John Doe'

  return (
    <PageLayout>
      <div className="header-box">
        <h1 className="header-box-title">
          Bienvenue <span className="text-bank-green-gradient">{user}</span>
        </h1>
        <p className="">Voici votre tableau de bord.</p>
      </div>
    </PageLayout>
  )
}
