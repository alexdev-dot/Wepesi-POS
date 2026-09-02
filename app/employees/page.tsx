"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, UserPlus, Download, Filter, Search, MoreVertical, Mail, Phone, MapPin, Calendar, Shield, X, Briefcase, Clock, Lock, KeyRound, Eye, EyeOff } from "lucide-react"
import { useMobile } from "@/lib/hooks/use-mobile"

export default function EmployeesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false)
  const isMobile = useMobile()
  const [isPinModalOpen, setIsPinModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [newPin, setNewPin] = useState("")
  const [showPin, setShowPin] = useState(false)

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

  const handleSetPin = (employee: any) => {
    setSelectedEmployee(employee)
    setNewPin(employee.pin || "")
    setIsPinModalOpen(true)
  }

  const handlePinSave = () => {
    // In a real app, this would save to the backend
    console.log(`Setting PIN ${newPin} for ${selectedEmployee.name}`)
    setIsPinModalOpen(false)
    setSelectedEmployee(null)
    setNewPin("")
  }

  const employeeStats = [
    { title: "Total Employees", value: "24", change: "+2", isPositive: true, icon: Users },
    { title: "Active", value: "22", change: "", isPositive: true, icon: Briefcase },
    { title: "On Leave", value: "2", change: "", isPositive: false, icon: Calendar },
    { title: "New This Month", value: "3", change: "", isPositive: true, icon: UserPlus },
  ]

  const employees = [
    { id: 1, name: "Alex Kariuki", email: "alex@pos.com", phone: "+254 700 123 456", role: "Manager", department: "Management", status: "Active", joinDate: "2023-01-15", salary: "KSh 85,000", pin: "1234" },
    { id: 2, name: "Jane Smith", email: "jane@pos.com", phone: "+254 700 234 567", role: "Cashier", department: "Sales", status: "Active", joinDate: "2023-03-20", salary: "KSh 45,000", pin: "5678" },
    { id: 3, name: "John Doe", email: "john@pos.com", phone: "+254 700 345 678", role: "Cashier", department: "Sales", status: "Active", joinDate: "2023-05-10", salary: "KSh 45,000", pin: "9012" },
    { id: 4, name: "Mary Johnson", email: "mary@pos.com", phone: "+254 700 456 789", role: "Inventory Manager", department: "Inventory", status: "Active", joinDate: "2023-06-01", salary: "KSh 55,000", pin: null },
    { id: 5, name: "Peter Williams", email: "peter@pos.com", phone: "+254 700 567 890", role: "Cashier", department: "Sales", status: "On Leave", joinDate: "2024-01-15", salary: "KSh 45,000", pin: "3456" },
    { id: 6, name: "Sarah Brown", email: "sarah@pos.com", phone: "+254 700 678 901", role: "Cashier", department: "Sales", status: "Active", joinDate: "2024-02-20", salary: "KSh 45,000", pin: null },
    { id: 7, name: "David Wilson", email: "david@pos.com", phone: "+254 700 789 012", role: "Supervisor", department: "Operations", status: "Active", joinDate: "2024-03-10", salary: "KSh 60,000", pin: "7890" },
    { id: 8, name: "Emily Davis", email: "emily@pos.com", phone: "+254 700 890 123", role: "Cashier", department: "Sales", status: "On Leave", joinDate: "2024-04-05", salary: "KSh 45,000", pin: null },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700 border-green-200"
      case "On Leave": return "bg-orange-100 text-orange-700 border-orange-200"
      case "Inactive": return "bg-red-100 text-red-700 border-red-200"
      default: return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  return (
    <div className="flex h-screen bg-background font-sans">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        currentPath="/employees" 
        mobileOpen={mobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />
      <div className="flex flex-1 flex-col overflow-hidden font-sans">
        <Header onMenuClick={handleMenuClick} />
        <main className="flex-1 flex flex-col bg-muted/30 overflow-auto">
          {/* Page Header */}
          <div className="px-4 sm:px-6 py-4 sm:py-5">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600 shadow-sm">
                  <Users className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-foreground">Employees</h1>
                  <p className="text-sm text-muted-foreground mt-0.5">Manage your team and staff</p>
                </div>
              </div>

              {/* Filters Section */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search employees..."
                    className="h-10 pl-9 sm:pl-10 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
                  />
                </div>

                {/* Department Filter */}
                <select className="px-3 py-2 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all shadow-sm">
                  <option>All Departments</option>
                  <option>Management</option>
                  <option>Sales</option>
                  <option>Inventory</option>
                  <option>Operations</option>
                </select>

                {/* Status Filter */}
                <select className="px-3 py-2 border border-border rounded-lg bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all shadow-sm">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>On Leave</option>
                  <option>Inactive</option>
                </select>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 ml-auto">
                  <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg bg-card text-sm text-foreground hover:bg-muted transition-all shadow-sm">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">More Filters</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg bg-card text-sm text-foreground hover:bg-muted transition-all shadow-sm">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                  <Button 
                    className="h-10 bg-violet-600 hover:bg-violet-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all"
                    onClick={() => setIsAddEmployeeOpen(true)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Employee
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto px-4 sm:px-6 pb-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Stats Cards */}
              <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                {employeeStats.map((stat) => (
                  <div key={stat.title} className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                        stat.isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      } shadow-sm`}>
                        <stat.icon className="h-5 w-5" strokeWidth={2} />
                      </div>
                      {stat.change && (
                        <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                          stat.isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}>
                          <span>{stat.change}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{stat.title}</h4>
                      <p className="mt-2 text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Employees Table */}
              <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                <div className="px-4 sm:px-6 py-4 border-b border-border bg-muted flex items-center justify-between">
                  <h3 className="text-base font-semibold text-foreground">All Employees</h3>
                  <span className="text-sm text-muted-foreground">24 employees</span>
                </div>
                
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Employee</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Contact</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Role</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Department</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">PIN</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Status</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Joined</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {employees.map((employee) => (
                        <tr key={employee.id} className="hover:bg-muted transition-colors">
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600 font-semibold text-sm">
                                {employee.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-foreground">{employee.name}</div>
                                <div className="text-xs text-muted-foreground">{employee.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Phone className="h-3 w-3" />
                                <span>{employee.phone}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-foreground">{employee.role}</td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-muted-foreground">{employee.department}</td>
                          <td className="px-4 sm:px-6 py-4">
                            {employee.pin ? (
                              <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-green-600" />
                                <span className="text-sm font-mono text-muted-foreground">••••</span>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleSetPin(employee)}
                                className="flex items-center gap-1 text-xs text-violet-600 hover:text-violet-700 font-medium"
                              >
                                <KeyRound className="h-3 w-3" />
                                Set PIN
                              </button>
                            )}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(employee.status)}`}>
                              {employee.status}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-muted-foreground">{employee.joinDate}</td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-1">
                              {employee.pin && (
                                <button
                                  onClick={() => handleSetPin(employee)}
                                  className="p-1.5 text-muted-foreground hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all"
                                  title="Edit PIN"
                                >
                                  <KeyRound className="h-4 w-4" />
                                </button>
                              )}
                              <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all">
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden px-4 sm:px-6 py-4 space-y-3">
                  {employees.map((employee) => (
                    <div key={employee.id} className="bg-card border border-border rounded-xl p-4 shadow-sm">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600 font-semibold text-sm shrink-0">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground truncate">{employee.name}</span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border shrink-0 ${getStatusColor(employee.status)}`}>
                              {employee.status}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 truncate">{employee.email}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Phone className="h-3 w-3" />
                            {employee.phone}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-border text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Role</p>
                            <p className="text-sm font-semibold text-foreground">{employee.role}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">PIN</p>
                            {employee.pin ? (
                              <div className="flex items-center gap-1">
                                <Lock className="h-3 w-3 text-green-600" />
                                <span className="text-sm font-semibold text-foreground">••••</span>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleSetPin(employee)}
                                className="text-xs font-semibold text-violet-600 hover:text-violet-700"
                              >
                                Set PIN
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {employee.pin && (
                            <button
                              onClick={() => handleSetPin(employee)}
                              className="p-2 text-muted-foreground hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all"
                            >
                              <KeyRound className="h-4 w-4" />
                            </button>
                          )}
                          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Employee Modal */}
      {isAddEmployeeOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsAddEmployeeOpen(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="bg-card rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 shadow-sm">
                    <UserPlus className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Add Employee</h3>
                    <p className="text-xs text-muted-foreground">Add a new team member</p>
                  </div>
                </div>
                <button onClick={() => setIsAddEmployeeOpen(false)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
              <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
                <div className="grid gap-4 grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">First Name</label>
                    <Input type="text" placeholder="Enter first name" className="h-10 px-3 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Last Name</label>
                    <Input type="text" placeholder="Enter last name" className="h-10 px-3 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <Input type="email" placeholder="Enter email address" className="h-10 px-3 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                  <Input type="tel" placeholder="Enter phone number" className="h-10 px-3 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all" />
                </div>
                <div className="grid gap-4 grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Role</label>
                    <select className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all">
                      <option>Select role</option>
                      <option>Manager</option>
                      <option>Supervisor</option>
                      <option>Cashier</option>
                      <option>Inventory Manager</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Department</label>
                    <select className="w-full px-3 py-2.5 text-sm border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all">
                      <option>Select department</option>
                      <option>Management</option>
                      <option>Sales</option>
                      <option>Inventory</option>
                      <option>Operations</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Salary</label>
                  <Input type="number" placeholder="Enter salary" className="h-10 px-3 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Join Date</label>
                  <Input type="date" className="h-10 px-3 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all" />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsAddEmployeeOpen(false)} className="flex-1 h-10 border-border text-foreground hover:bg-muted">Cancel</Button>
                  <Button className="flex-1 h-10 bg-violet-600 hover:bg-violet-700 text-sm font-semibold shadow-sm hover:shadow-md transition-all">Add Employee</Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* PIN Modal */}
      {isPinModalOpen && selectedEmployee && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsPinModalOpen(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="bg-card rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 shadow-sm">
                    <KeyRound className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Set PIN</h3>
                    <p className="text-xs text-muted-foreground">For {selectedEmployee.name}</p>
                  </div>
                </div>
                <button onClick={() => setIsPinModalOpen(false)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
              <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">4-Digit PIN</label>
                  <div className="relative">
                    <Input
                      type={showPin ? "text" : "password"}
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="Enter 4-digit PIN"
                      maxLength={4}
                      className="h-10 px-3 text-sm border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all font-mono tracking-widest"
                    />
                    <button
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs font-medium"
                    >
                      {showPin ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsPinModalOpen(false)} className="flex-1 h-10 border-border text-foreground hover:bg-muted">Cancel</Button>
                  <Button 
                    onClick={handlePinSave}
                    disabled={newPin.length !== 4}
                    className={`flex-1 h-10 text-sm font-semibold shadow-sm hover:shadow-md transition-all ${
                      newPin.length === 4 
                        ? "bg-violet-600 hover:bg-violet-700" 
                        : "bg-slate-300 cursor-not-allowed"
                    }`}
                  >
                    Save PIN
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
