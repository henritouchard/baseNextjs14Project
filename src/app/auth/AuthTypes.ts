import { UserRole } from '@/constants/userRoles'
import { z } from 'zod'

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export type SigninFormType = z.infer<typeof signinSchema>

export const signUpAdminSchema = z
  .object({
    email: z.string().email(),
    firstname: z.string().min(2).max(20),
    lastname: z.string().min(2).max(20),
    siret: z.string().length(14),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Les mots de passe ne correspondent pas',
  })

export type SignUpAdminFormType = z.infer<typeof signUpAdminSchema>

export const signUpInviteeSchema = z
  .object({
    inviteId: z.string(),
    email: z.string().email(),
    firstname: z.string().min(2).max(20),
    lastname: z.string().min(2).max(20),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Les mots de passe ne correspondent pas',
  })

export type SignUpInviteeFormType = z.infer<typeof signUpInviteeSchema>
