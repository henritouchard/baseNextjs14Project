import { z } from 'zod'

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  redirectTo: z.string().optional(),
})

export type SigninFormType = z.infer<typeof signinSchema>
