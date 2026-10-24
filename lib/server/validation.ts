export type SetupInput = { company: string; name: string; email: string; password: string }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateSetup(input: SetupInput) {
  const errors: Record<string, string> = {}
  const company = input.company.trim()
  const name = input.name.trim()
  const email = input.email.trim().toLowerCase()

  if (company.length < 2 || company.length > 120) errors.company = 'Company name must be 2–120 characters'
  if (name.length < 2 || name.length > 120) errors.name = 'Admin name must be 2–120 characters'
  if (email.length > 254 || !emailPattern.test(email)) errors.email = 'Enter a valid email address'
  if (input.password.length < 12 || input.password.length > 128) errors.password = 'Password must be 12–128 characters'

  return {
    success: Object.keys(errors).length === 0,
    errors,
    data: { company, name, email },
  }
}
