'use server'

import { signIn } from '@/server/auth'
import {
  SigninFormType,
  signinSchema,
  SignUpAdminFormType,
  signUpAdminSchema,
  SignUpInviteeFormType,
  signUpInviteeSchema,
} from './AuthTypes'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { HOME_PATH, SIGNIN_PATH } from '@/constants/routes'
import { consumeInvite, getInvite } from '@/server/repositories/invite'
import * as bcrypt from 'bcrypt'
import { createUser } from '@/server/repositories/user'
import { UserRole } from '@/constants/userRoles'

function encryptPassword(password: string) {
  return bcrypt.hash(password, 10)
}

export async function signinAction(data: SigninFormType, redirectTo?: string) {
  try {
    const parsedData = signinSchema.safeParse(data)
    if (!parsedData.success) {
      return 'Données invalides.'
    }

    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
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
  }

  redirect(redirectTo || HOME_PATH)
}

export async function signupAdminAction(data: SignUpAdminFormType) {
  const parsedData = signUpAdminSchema.safeParse(data)
  if (!parsedData.success) {
    return 'Données invalides.'
  }

  const { email, firstname, lastname, password } = parsedData.data

  try {
    await createUser({
      email: email,
      password: await encryptPassword(password),
      firstname,
      lastname,
      role: UserRole.ADMIN,
    })
  } catch (error) {
    return 'Une erreur inattendue est survenue.'
  }

  redirect(SIGNIN_PATH)
}

export async function signupNonAdminAction(data: SignUpInviteeFormType) {
  const parsedData = signUpInviteeSchema.safeParse(data)
  if (!parsedData.success) {
    return 'Données invalides.'
  }
  const { inviteId, firstname, lastname, password } = data

  const invite = await getInvite(inviteId)
  if (!invite || invite?.consummedAt) {
    return "L'invitation a déjà été utilisée."
  }

  try {
    const user = await createUser({
      email: invite.email,
      password: await encryptPassword(password),
      firstname,
      lastname,
      role: invite.role!,
    })
    consumeInvite(inviteId, user.id)
  } catch (error) {
    return 'Une erreur inattendue est survenue.'
  }

  redirect(SIGNIN_PATH)
}
