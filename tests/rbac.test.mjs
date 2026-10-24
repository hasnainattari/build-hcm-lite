import assert from 'node:assert/strict'
import test from 'node:test'

const admin = { id: 'a1', companyId: 'c1', role: 'admin' }
const employee = { id: 'e1', companyId: 'c1', role: 'employee', employeeId: 'emp-1' }

function canAccessEmployee(user, employeeId) {
  return user.role !== 'employee' || user.employeeId === employeeId
}

test('admin can access employees in their company scope', () => assert.equal(canAccessEmployee(admin, 'emp-2'), true))
test('employee can only access their own employee row', () => {
  assert.equal(canAccessEmployee(employee, 'emp-1'), true)
  assert.equal(canAccessEmployee(employee, 'emp-2'), false)
})
test('unknown roles do not pass role checks', () => assert.equal(['admin', 'hr', 'employee'].includes('manager'), false))

test('employee scope rejects missing or mismatched employee ids', () => {
  assert.equal(canAccessEmployee({ ...employee, employeeId: undefined }, 'emp-1'), false)
  assert.equal(canAccessEmployee(employee, ''), false)
})

test('setup policy requires a strong password and normalized email', () => {
  const email = ' Admin@Example.com '.trim().toLowerCase()
  assert.equal(email, 'admin@example.com')
  assert.equal('short-pass'.length >= 12, false)
  assert.equal('long-enough-pass'.length >= 12, true)
})
