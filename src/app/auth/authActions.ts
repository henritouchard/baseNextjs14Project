'use server'

import { HOME_PATH, SIGNIN_PATH } from '@/constants/routes'
import { UserRole } from '@/constants/userRoles'
import { signIn } from '@/server/auth'
import { consumeInvite, getInvite } from '@/server/repositories/invite'
import { createUser } from '@/server/repositories/user'
import * as bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'
import {
  SigninFormType,
  signinSchema,
  SignUpAdminFormType,
  signUpAdminSchema,
  SignUpInviteeFormType,
  signUpInviteeSchema,
} from './AuthTypes'
import { deleteSession } from '@/app/lib/db-session'

function encryptPassword(password: string) {
  return bcrypt.hash(password, 10)
}

export async function signinAction(data: SigninFormType, redirectTo?: string) {
  try {
    const parsedData = signinSchema.safeParse(data)
    if (!parsedData.success) {
      return 'Données invalides.'
    }
    await signIn({
      email: data.email,
      password: data.password,
    })
  } catch (error) {
    console.error(error)
    return 'Une erreur inattendue est survenue.'
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
    console.error(error)
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
  if (!invite || invite?.consumedAt) {
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
    console.error(error)
    return 'Une erreur inattendue est survenue.'
  }

  redirect(SIGNIN_PATH)
}

export async function signOutAction() {
  await deleteSession()
}
