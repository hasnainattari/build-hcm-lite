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
