import { UserRole } from '@/constants/userRoles'

export type SessionPayload = {
  sessionId: string
  userId: string
  userRole: UserRole
  expiresAt: Date
}
