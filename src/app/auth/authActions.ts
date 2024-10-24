'use server'

import { signIn } from '@/server/auth'
import { SigninFormType } from './AuthTypes'
import { AuthError } from 'next-auth'

export async function signinAction(data: SigninFormType) {
  try {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirectTo: data.redirectTo,
    })
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      const { type, cause } = error as AuthError
      switch (type) {
        case 'CredentialsSignin':
          return 'Identifiants incorrects.'
        case 'CallbackRouteError':
          return cause?.err?.toString()
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}
