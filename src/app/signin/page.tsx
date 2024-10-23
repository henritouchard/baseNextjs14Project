import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signIn } from '@/server/auth'

export default function SignIn() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <form
        action={async () => {
          'use server'
          await signIn('discord')
        }}
      >
        <Button type="submit">Signin with Discord</Button>
      </form>
      <form
        action={async (formData) => {
          'use server'
          await signIn('credentials', formData)
        }}
      >
        <label>
          Email
          <Input name="email" type="email" />
        </label>
        <label>
          Password
          <Input name="password" type="password" />
        </label>
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  )
}
