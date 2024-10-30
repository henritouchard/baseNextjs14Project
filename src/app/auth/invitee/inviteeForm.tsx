'use client'

import { signupNonAdminAction } from '@/app/auth/authActions'
import {
  SignUpInviteeFormType,
  signUpInviteeSchema,
} from '@/app/auth/AuthTypes'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type InviteeFormProps = {
  inviteId: string
  email: string
}

export default function InviteeForm({ inviteId, email }: InviteeFormProps) {
  const [error, setError] = useState<string | null>(null)
  const form = useForm<SignUpInviteeFormType>({
    resolver: zodResolver(signUpInviteeSchema),
    defaultValues: {
      inviteId: inviteId,
      email: email,
      firstname: '',
      lastname: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: SignUpInviteeFormType) {
    const error = await signupNonAdminAction(values)
    if (error) {
      setError(error)
    }
  }

  return (
    <>
      {error && (
        <div className="flex justify-center items-center text-red-500">
          <FontAwesomeIcon className="text-2xl" icon={faExclamationCircle} />
          <span>{error}</span>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-8">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="bobApprenant@mail.com"
                    type="email"
                    {...field}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Input name="inviteId" value={inviteId} type="hidden" />

          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Bob" className="mb-4" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Bob" className="mb-4" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Be safe"
                    className="mb-4"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="mb-8">
                <FormLabel>Répétez le mot de passe</FormLabel>
                <FormControl>
                  <Input placeholder="Be safe" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full bg-mainGradient hover:bg-mainGradient/90 text-white"
            type="submit"
          >
            Créer un compte
          </Button>
        </form>
      </Form>
    </>
  )
}
