"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, Users, Plus, Edit, Trash2, Search, Check, X } from "lucide-react"

interface Role {
  id: number
  name: string
  description: string
  permissions: string[]
  userCount: number
  createdAt: string
}

interface Permission {
  id: number
  name: string
  category: string
  description: string
  module: string
}

export default function RolesPermissionsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"roles" | "permissions">("roles")
  const [permissionSearchQuery, setPermissionSearchQuery] = useState("")

  const [roles, setRoles] = useState<Role[]>([
    {
      id: 1,
      name: "Administrator",
      description: "Full access to all system features",
      permissions: ["All Permissions"],
      userCount: 2,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Manager",
      description: "Can manage inventory, sales, and reports",
      permissions: ["View Dashboard", "Manage Inventory", "View Reports", "Process Sales"],
      userCount: 5,
      createdAt: "2024-01-15"
    },
    {
      id: 3,
      name: "Cashier",
      description: "Can process sales and view basic reports",
      permissions: ["Process Sales", "View Products"],
      userCount: 12,
      createdAt: "2024-01-16"
    },
    {
      id: 4,
      name: "Inventory Manager",
      description: "Can manage stock and purchases",
      permissions: ["Manage Inventory", "View Products", "Manage Purchases"],
      userCount: 3,
      createdAt: "2024-01-17"
    }
  ])

  const [permissions, setPermissions] = useState<Permission[]>([
    { id: 1, name: "View Dashboard", category: "Dashboard", description: "Access to dashboard and analytics", module: "Dashboard" },
    { id: 2, name: "Manage Inventory", category: "Inventory", description: "Add, edit, and delete inventory items", module: "Inventory" },
    { id: 3, name: "View Products", category: "Inventory", description: "View product catalog and details", module: "Inventory" },
    { id: 4, name: "Process Sales", category: "Sales", description: "Create and process sales transactions", module: "POS" },
    { id: 5, name: "View Reports", category: "Reports", description: "Access sales and inventory reports", module: "Reports" },
    { id: 6, name: "Manage Purchases", category: "Inventory", description: "Manage purchase orders and suppliers", module: "Purchases" },
    { id: 7, name: "Manage Customers", category: "People", description: "Add and manage customer information", module: "People" },
    { id: 8, name: "Manage Employees", category: "People", description: "Add and manage employee accounts", module: "People" },
    { id: 9, name: "Manage Expenses", category: "Financial", description: "Record and manage business expenses", module: "Financial" },
    { id: 10, name: "View Cash Register", category: "Financial", description: "Access cash register and transactions", module: "Financial" },
    { id: 11, name: "Manage Settings", category: "Settings", description: "Access and modify system settings", module: "Settings" },
    { id: 12, name: "Manage Roles", category: "Settings", description: "Create and manage user roles", module: "Settings" },
  ])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen)
  }

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false)
  }

  const handleMenuClick = () => {
    if (window.innerWidth < 1024) {
      toggleMobileSidebar()
    } else {
      toggleSidebar()
    }
  }

  const handleEditRole = (role: Role) => {
    console.log("Edit role:", role)
  }

  const handleDeleteRole = (role: Role) => {
    console.log("Delete role:", role)
  }

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredPermissions = permissions.filter(permission =>
    permission.name.toLowerCase().includes(permissionSearchQuery.toLowerCase()) ||
    permission.category.toLowerCase().includes(permissionSearchQuery.toLowerCase()) ||
    permission.module.toLowerCase().includes(permissionSearchQuery.toLowerCase())
  )

  return (
    <div className="flex h-screen bg-background font-sans">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        currentPath="/settings/roles" 
        mobileOpen={mobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />
      <div className="flex flex-1 flex-col overflow-hidden font-sans">
        <Header onMenuClick={handleMenuClick} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 font-sans">
          <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto font-sans">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Roles & Permissions</h1>
                <p className="text-sm text-muted-foreground mt-1">Manage user roles and their access permissions</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                {activeTab === "roles" && (
                  <Button 
                    className="h-10 sm:h-11 bg-blue-600 hover:bg-blue-700 text-sm font-semibold shadow-sm hover:shadow transition-all flex-1 sm:flex-none"
                    onClick={() => setIsAddRoleOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Role
                  </Button>
                )}
                {activeTab === "permissions" && (
                  <Button 
                    className="h-10 sm:h-11 bg-blue-600 hover:bg-blue-700 text-sm font-semibold shadow-sm hover:shadow transition-all flex-1 sm:flex-none"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Permission
                  </Button>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-border">
              <nav className="flex gap-6">
                <button
                  onClick={() => setActiveTab("roles")}
                  className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === "roles"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Roles
                </button>
                <button
                  onClick={() => setActiveTab("permissions")}
                  className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === "permissions"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Permissions
                </button>
              </nav>
            </div>

            {/* Roles Tab Content */}
            {activeTab === "roles" && (
              <>
                {/* Stats Cards */}
                <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                  <div className="group relative rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shadow-sm group-hover:shadow transition-all">
                        <Shield className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Roles</p>
                      <p className="mt-1 text-lg sm:text-xl font-bold text-foreground tracking-tight">{roles.length}</p>
                      <p className="mt-0.5 text-[10px] sm:text-xs text-muted-foreground">Active roles</p>
                    </div>
                  </div>
                  <div className="group relative rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 shadow-sm group-hover:shadow transition-all">
                        <Users className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Users</p>
                      <p className="mt-1 text-lg sm:text-xl font-bold text-foreground tracking-tight">{roles.reduce((acc, role) => acc + role.userCount, 0)}</p>
                      <p className="mt-0.5 text-[10px] sm:text-xs text-muted-foreground">Assigned users</p>
                    </div>
                  </div>
                  <div className="group relative rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 shadow-sm group-hover:shadow transition-all">
                        <Check className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Permissions</p>
                      <p className="mt-1 text-lg sm:text-xl font-bold text-foreground tracking-tight">{permissions.length}</p>
                      <p className="mt-0.5 text-[10px] sm:text-xs text-muted-foreground">Available permissions</p>
                    </div>
                  </div>
                  <div className="group relative rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-orange-100 shadow-sm group-hover:shadow transition-all">
                        <Shield className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Admin Roles</p>
                      <p className="mt-1 text-lg sm:text-xl font-bold text-foreground tracking-tight">{roles.filter(r => r.name === "Administrator").length}</p>
                      <p className="mt-0.5 text-[10px] sm:text-xs text-muted-foreground">Full access</p>
                    </div>
                  </div>
                </div>

                {/* Search Section */}
                <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
                  <div className="relative w-full">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search roles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-10 pl-9 sm:pl-10 text-sm border bg-muted focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* Roles Table */}
                <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted border-b border-border">
                        <tr>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role Name</th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Permissions</th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Users</th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Created</th>
                          <th className="px-4 sm:px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredRoles.map((role) => (
                          <tr key={role.id} className="hover:bg-muted transition-colors">
                            <td className="px-4 sm:px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                  <Shield className="h-5 w-5" strokeWidth={2} />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-foreground">{role.name}</p>
                                  <p className="text-xs text-muted-foreground">Role ID: {role.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 sm:px-6 py-4">
                              <p className="text-sm text-muted-foreground max-w-xs truncate">{role.description}</p>
                            </td>
                            <td className="px-4 sm:px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {role.permissions.slice(0, 2).map((permission, index) => (
                                  <span key={index} className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                                    {permission}
                                  </span>
                                ))}
                                {role.permissions.length > 2 && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs font-medium">
                                    +{role.permissions.length - 2} more
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 sm:px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium text-foreground">{role.userCount}</span>
                              </div>
                            </td>
                            <td className="px-4 sm:px-6 py-4">
                              <p className="text-sm text-muted-foreground">{role.createdAt}</p>
                            </td>
                            <td className="px-4 sm:px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-muted-foreground hover:text-blue-600 hover:bg-blue-50"
                                  onClick={() => handleEditRole(role)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-muted-foreground hover:text-red-600 hover:bg-red-50"
                                  onClick={() => handleDeleteRole(role)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* Permissions Tab Content */}
            {activeTab === "permissions" && (
              <>
                {/* Stats Cards */}
                <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                  <div className="group relative rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shadow-sm group-hover:shadow transition-all">
                        <Check className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Permissions</p>
                      <p className="mt-1 text-lg sm:text-xl font-bold text-foreground tracking-tight">{permissions.length}</p>
                      <p className="mt-0.5 text-[10px] sm:text-xs text-muted-foreground">System permissions</p>
                    </div>
                  </div>
                  <div className="group relative rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 shadow-sm group-hover:shadow transition-all">
                        <Shield className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Categories</p>
                      <p className="mt-1 text-lg sm:text-xl font-bold text-foreground tracking-tight">{[...new Set(permissions.map(p => p.category))].length}</p>
                      <p className="mt-0.5 text-[10px] sm:text-xs text-muted-foreground">Permission categories</p>
                    </div>
                  </div>
                  <div className="group relative rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 shadow-sm group-hover:shadow transition-all">
                        <Users className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Roles Using</p>
                      <p className="mt-1 text-lg sm:text-xl font-bold text-foreground tracking-tight">{roles.length}</p>
                      <p className="mt-0.5 text-[10px] sm:text-xs text-muted-foreground">Active roles</p>
                    </div>
                  </div>
                  <div className="group relative rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-orange-100 shadow-sm group-hover:shadow transition-all">
                        <Check className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">Modules</p>
                      <p className="mt-1 text-lg sm:text-xl font-bold text-foreground tracking-tight">{[...new Set(permissions.map(p => p.module))].length}</p>
                      <p className="mt-0.5 text-[10px] sm:text-xs text-muted-foreground">System modules</p>
                    </div>
                  </div>
                </div>

                {/* Search Section */}
                <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
                  <div className="relative w-full">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search permissions..."
                      value={permissionSearchQuery}
                      onChange={(e) => setPermissionSearchQuery(e.target.value)}
                      className="h-10 pl-9 sm:pl-10 text-sm border bg-muted focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* Permissions Table */}
                <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted border-b border-border">
                        <tr>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Permission Name</th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Module</th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                          <th className="px-4 sm:px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredPermissions.map((permission) => (
                          <tr key={permission.id} className="hover:bg-muted transition-colors">
                            <td className="px-4 sm:px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                                  <Check className="h-5 w-5" strokeWidth={2} />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-foreground">{permission.name}</p>
                                  <p className="text-xs text-muted-foreground">ID: {permission.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 sm:px-6 py-4">
                              <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                                {permission.category}
                              </span>
                            </td>
                            <td className="px-4 sm:px-6 py-4">
                              <p className="text-sm text-muted-foreground">{permission.module}</p>
                            </td>
                            <td className="px-4 sm:px-6 py-4">
                              <p className="text-sm text-muted-foreground max-w-xs truncate">{permission.description}</p>
                            </td>
                            <td className="px-4 sm:px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-muted-foreground hover:text-blue-600 hover:bg-blue-50"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-muted-foreground hover:text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
