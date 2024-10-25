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
import { USER_PATH } from '@/constants/routes'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function SignIn() {
  const [previousUrl, setPreviousUrl] = useState<string | null>(null)

  const [error, setError] = useState<string | null>(null)
  const form = useForm<SigninFormType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    // Get the url from where the user was redirected
    if (document.referrer && document.referrer !== window.location.href) {
      setPreviousUrl(document.referrer)
    }
  }, [])

  async function onSubmit(values: SigninFormType) {
    const error = await signinAction(values, previousUrl)
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
