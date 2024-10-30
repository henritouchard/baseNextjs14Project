export enum UserRole {
  OPERATOR = 'opérateur',
  CANDIDATE = 'candidat',
  ADMIN = 'admin',
}

export const userRoleLabels = {
  [UserRole.OPERATOR]: 'Opérateur',
  [UserRole.CANDIDATE]: 'Candidat',
  [UserRole.ADMIN]: 'Administrateur',
}
