'use server'

import { signIn } from '@/server/auth'
import { SigninFormType } from './AuthTypes'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { HOME_PATH } from '@/constants/routes'

export async function signinAction(data: SigninFormType, redirectTo?: string) {
  try {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    return redirect(redirectTo || HOME_PATH)
  } catch (error) {
    if (error instanceof Error) {
      const { type, cause } = error as AuthError
      switch (type) {
        case 'CredentialsSignin':
          return 'Identifiants incorrects.'
        case 'CallbackRouteError':
          return cause?.err?.toString()
        default:
          return 'Une erreur inattendue est survenue.'
      }
    }
    throw error
  } finally {
    redirect(HOME_PATH)
  }
}
