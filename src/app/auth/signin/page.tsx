'use client'

import { signinAction } from '@/app/auth/authActions'
import { SigninFormType, signinSchema } from '@/app/auth/AuthTypes'
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

export default function SignIn() {
  const [error, setError] = useState<string | null>(null)
  const form = useForm<SigninFormType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: SigninFormType) {
    const params = new URLSearchParams(window.location.search)
    const redirectUrl = params.get('redirect') || '/'
    const error = await signinAction(values, redirectUrl)
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
        {error && (
          <div className="flex justify-center gap-3 items-center text-red-500">
            <FontAwesomeIcon className="text-2xl" icon={faExclamationCircle} />
            <span>{error}</span>
          </div>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
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
              Se connecter
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  )
}
