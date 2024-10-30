import { Card } from '@/components/ui/card'
import Image from 'next/image'

type FullPageErrorMessageProps = {
  message: string
}

export default function FullPageErrorMessage({
  message,
}: FullPageErrorMessageProps) {
  return (
    <div className="flex justify-center items-center h-screen px-4">
      <Card className="flex flex-col gap-4 justify-center items-center p-6 w-full max-w-md text-center">
        <Image
          className="mb-6"
          height={60}
          width={60}
          src="/logo.png"
          alt="logo"
        />
        <h1 className="text-2xl font-bold text-red-500">Erreur</h1>
        <p className="text-sm text-gray-500">{message}</p>
      </Card>
    </div>
  )
}
