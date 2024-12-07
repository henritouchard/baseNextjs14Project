import InviteeForm from '@/app/auth/invitee/inviteeForm'
import FullPageErrorMessage from '@/components/fullPageErrorMessage'
import { Card } from '@/components/ui/card'
import { getInvite } from '@/server/repositories/invite'

import { UserRole, userRoleLabels } from '@/constants/userRoles'
import Image from 'next/image'

export default async function Invitee(props: {
  searchParams: Promise<{ invite: string }>
}) {
  const searchParams = await props.searchParams
  const inviteData = await getInvite(searchParams.invite)

  if (!inviteData) {
    return (
      <FullPageErrorMessage message="Invitation non trouvée. Veuillez vérifier le lien d'invitation et réessayer, ou contactez votre organisme de formation." />
    )
  } else if (inviteData.consumedAt) {
    return <FullPageErrorMessage message="L'invitation a déjà été utilisée." />
  }

  return (
    <div className="flex justify-center items-center h-screen px-4">
      <Card className="flex flex-col gap-4 justify-center items-center p-6 w-full max-w-md">
        <Image
          className="mb-6"
          height={60}
          width={60}
          src="/logo.png"
          alt="logo"
        />
        <h1 className="text-2xl font-bold">Créer un compte</h1>
        <p className="text-sm text-gray-500">
          Vous créez un compte en tant que{' '}
          <span className="font-bold">
            {userRoleLabels[inviteData.role as UserRole]}
          </span>
        </p>
        <InviteeForm email={inviteData.email} inviteId={inviteData.id} />
      </Card>
    </div>
  )
}
