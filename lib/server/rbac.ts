export const ROLES = ['admin', 'hr', 'employee'] as const
export type Role = (typeof ROLES)[number]

export type AuthUser = {
  id: string
  companyId: string
  role: Role
  employeeId?: string
}

export function hasRole(user: AuthUser, allowed: readonly Role[]) {
  return allowed.includes(user.role)
}

export function canAccessEmployee(user: AuthUser, employeeId: string) {
  return user.role !== 'employee' || user.employeeId === employeeId
}

export function assertRole(user: AuthUser, allowed: readonly Role[]) {
  if (!hasRole(user, allowed)) throw new Error('FORBIDDEN')
}

export function assertEmployeeScope(user: AuthUser, employeeId: string) {
  if (!canAccessEmployee(user, employeeId)) throw new Error('FORBIDDEN')
}
