'use client'

import { signupAdminAction } from '@/app/auth/authActions'
import { SignUpAdminFormType, signUpAdminSchema } from '@/app/auth/AuthTypes'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function SignUp() {
  const [error, setError] = useState<string | null>(null)
  const form = useForm<SignUpAdminFormType>({
    resolver: zodResolver(signUpAdminSchema),
    defaultValues: {
      email: '',
      firstname: '',
      lastname: '',
      siret: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: SignUpAdminFormType) {
    const error = await signupAdminAction(values)
    if (error) {
      setError(error)
    }
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
        <h1 className="text-2xl font-bold">
          Créer un compte{' '}
          <span className="text-mainGradient">administrateur</span>
        </h1>
        <p className="text-sm text-gray-500">
          Vous créez un compte en tant qu&apos;administrateur de votre
          entreprise.
        </p>
        {error && (
          <div className="flex justify-center gap-3 items-center text-red-500">
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="siret"
              render={({ field }) => (
                <FormItem className="mb-8">
                  <FormLabel>Siret</FormLabel>
                  <FormControl>
                    <Input placeholder="Be safe" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    <Input placeholder="Be safe" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mb-4">
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
              Créer mon compte
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  )
}
