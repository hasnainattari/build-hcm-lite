export type SetupInput = { company: string; name: string; email: string; password: string }

export function validateSetup(input: SetupInput) {
  const errors: Record<string, string> = {}
  if (input.company.trim().length < 2) errors.company = 'Company name must be at least 2 characters'
  if (input.name.trim().length < 2) errors.name = 'Admin name must be at least 2 characters'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) errors.email = 'Enter a valid email address'
  if (input.password.length < 8) errors.password = 'Password must be at least 8 characters'
  return { success: Object.keys(errors).length === 0, errors }
}
