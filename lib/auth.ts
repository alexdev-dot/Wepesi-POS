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

// Super Admin Authentication
export interface SuperAdminSession {
  email: string
  role: "super_admin"
  loginTime: string
}

const SUPER_ADMIN_SESSION_KEY = 'super_admin_session'

export function validateSuperAdmin(email: string, password: string): boolean {
  // In production, this should be validated server-side
  const SUPER_ADMIN_CREDENTIALS = {
    email: "superadmin@pos-system.com",
    password: "SuperAdmin@2025"
  }
  return email === SUPER_ADMIN_CREDENTIALS.email && password === SUPER_ADMIN_CREDENTIALS.password
}

export function setSuperAdminSession(session: SuperAdminSession): void {
  localStorage.setItem(SUPER_ADMIN_SESSION_KEY, JSON.stringify(session))
}

export function getSuperAdminSession(): SuperAdminSession | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(SUPER_ADMIN_SESSION_KEY)
  return stored ? JSON.parse(stored) : null
}

export function isSuperAdminLoggedIn(): boolean {
  return getSuperAdminSession() !== null
}

export function clearSuperAdminSession(): void {
  localStorage.removeItem(SUPER_ADMIN_SESSION_KEY)
}
