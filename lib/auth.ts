export interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
  businessType?: string
  businessName?: string
  phoneNumber?: string
  businessEmail?: string
  businessAddress?: string
  branchName?: string
  country?: string
  city?: string
  branchAddress?: string
  currency?: string
  taxEnabled?: boolean
  taxName?: string
  taxRate?: number
  taxInclusive?: boolean
  subscriptionPlan?: string
  subscriptionPeriod?: string
  onboarded?: boolean
}

const USERS_STORAGE_KEY = 'pos_users'
const CURRENT_USER_KEY = 'pos_current_user'

export function getUsers(): User[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(USERS_STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export function saveUser(user: User): void {
  const users = getUsers()
  users.push(user)
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

export function findUserByEmail(email: string): User | undefined {
  const users = getUsers()
  return users.find(user => user.email.toLowerCase() === email.toLowerCase())
}

export function validateUser(email: string, password: string): User | null {
  const user = findUserByEmail(email)
  if (user && user.password === password) {
    return user
  }
  return null
}

export function setCurrentUser(user: User): void {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(CURRENT_USER_KEY)
  return stored ? JSON.parse(stored) : null
}

export function logout(): void {
  localStorage.removeItem(CURRENT_USER_KEY)
}

export function updateUserOnboarding(userId: string, businessType: string, businessName: string): void {
  const users = getUsers()
  const userIndex = users.findIndex(u => u.id === userId)
  if (userIndex !== -1) {
    users[userIndex].businessType = businessType
    users[userIndex].businessName = businessName
    users[userIndex].onboarded = true
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
    
    // Update current user if it's the same user
    const currentUser = getCurrentUser()
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(users[userIndex])
    }
  }
}

export function completeUserOnboarding(userId: string, onboardingData: Partial<User>): void {
  const users = getUsers()
  const userIndex = users.findIndex(u => u.id === userId)
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...onboardingData, onboarded: true }
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
    
    // Update current user if it's the same user
    const currentUser = getCurrentUser()
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(users[userIndex])
    }
  }
}

// Super Admin Authentication - Updated to use secure API routes
export interface SuperAdminSession {
  email: string
  role: "super_admin"
  loginTime: string
}

const SUPER_ADMIN_SESSION_KEY = 'super_admin_session'

// Login using secure API route
export async function loginSuperAdmin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/auth/super-admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (response.ok && data.success) {
      return { success: true }
    } else {
      return { success: false, error: data.error || 'Login failed' }
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'Network error' }
  }
}

// Logout using secure API route
export async function logoutSuperAdmin(): Promise<void> {
  try {
    await fetch('/api/auth/super-admin/logout', {
      method: 'POST',
    })
  } catch (error) {
    console.error('Logout error:', error)
  }
}

// Validate session using API route
export async function validateSuperAdminSession(): Promise<{ valid: boolean; admin?: any }> {
  try {
    const response = await fetch('/api/auth/super-admin/validate')
    const data = await response.json()

    if (response.ok && data.valid) {
      return { valid: true, admin: data.admin }
    } else {
      return { valid: false }
    }
  } catch (error) {
    console.error('Session validation error:', error)
    return { valid: false }
  }
}

// Legacy functions for backward compatibility (deprecated)
export function validateSuperAdmin(email: string, password: string): boolean {
  console.warn('validateSuperAdmin is deprecated. Use loginSuperAdmin API instead.')
  return false
}

export function setSuperAdminSession(session: SuperAdminSession): void {
  console.warn('setSuperAdminSession is deprecated. Session is now managed via httpOnly cookies.')
}

export function getSuperAdminSession(): SuperAdminSession | null {
  console.warn('getSuperAdminSession is deprecated. Use validateSuperAdminSession API instead.')
  return null
}

export function isSuperAdminLoggedIn(): boolean {
  console.warn('isSuperAdminLoggedIn is deprecated. Use validateSuperAdminSession API instead.')
  return false
}

export function clearSuperAdminSession(): void {
  console.warn('clearSuperAdminSession is deprecated. Use logoutSuperAdmin API instead.')
}
