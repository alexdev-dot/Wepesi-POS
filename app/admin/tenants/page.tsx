"use client"

import { useState, useMemo, useCallback } from "react"
import { Building2, Users, Search, MoreVertical, Eye, Edit, Trash2, ShieldAlert, CheckCircle, Clock, XCircle, Filter, Download } from "@/components/admin/icons"

// Static data moved outside component to prevent recreation on each render
const stats = [
    {
      title: "Total Tenants",
      value: "1,247",
      change: "+12.5%",
      icon: Building2,
      color: "blue"
    },
    {
      title: "Active Businesses",
      value: "892",
      change: "+8.2%",
      icon: CheckCircle,
      color: "green"
    },
    {
      title: "Pending Approval",
      value: "45",
      change: "+3",
      icon: Clock,
      color: "amber"
    },
    {
      title: "Suspended",
      value: "18",
      change: "-2",
      icon: ShieldAlert,
      color: "red"
    }
  ]

  const tenants = [
    {
      id: 1,
      name: "Tech Solutions Ltd",
      email: "contact@techsolutions.com",
      plan: "Enterprise",
      status: "active",
      users: 45,
      revenue: "$12,450",
      createdAt: "Jan 15, 2024",
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Retail Store ABC",
      email: "info@retailabc.com",
      plan: "Professional",
      status: "active",
      users: 12,
      revenue: "$8,320",
      createdAt: "Feb 3, 2024",
      lastActive: "1 day ago"
    },
    {
      id: 3,
      name: "Restaurant XYZ",
      email: "manager@restaurantxyz.com",
      plan: "Starter",
      status: "pending",
      users: 8,
      revenue: "$0",
      createdAt: "Mar 10, 2024",
      lastActive: "Never"
    },
    {
      id: 4,
      name: "Grocery Store 123",
      email: "admin@grocery123.com",
      plan: "Professional",
      status: "active",
      users: 25,
      revenue: "$15,680",
      createdAt: "Dec 20, 2023",
      lastActive: "3 hours ago"
    },
    {
      id: 5,
      name: "Fashion Boutique",
      email: "sales@fashionboutique.com",
      plan: "Enterprise",
      status: "suspended",
      users: 18,
      revenue: "$9,240",
      createdAt: "Jan 28, 2024",
      lastActive: "5 days ago"
    },
    {
      id: 6,
      name: "Coffee Shop Chain",
      email: "ops@coffeeshop.com",
      plan: "Enterprise",
      status: "active",
      users: 67,
      revenue: "$22,890",
      createdAt: "Nov 15, 2023",
      lastActive: "30 minutes ago"
    },
    {
      id: 7,
      name: "Auto Parts Store",
      email: "manager@autoparts.com",
      plan: "Starter",
      status: "active",
      users: 6,
      revenue: "$3,450",
      createdAt: "Feb 18, 2024",
      lastActive: "1 hour ago"
    },
    {
      id: 8,
      name: "Pharmacy Plus",
      email: "admin@pharmacyplus.com",
      plan: "Professional",
      status: "pending",
      users: 14,
      revenue: "$0",
      createdAt: "Mar 5, 2024",
      lastActive: "Never"
    }
  ]

export default function TenantsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTenant, setSelectedTenant] = useState<number | null>(null)

  // Memoize filtered tenants to prevent recalculation on every render
  const filteredTenants = useMemo(() => {
    return tenants.filter(tenant => {
      const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tenant.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || tenant.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchQuery, statusFilter])

  // Memoize event handlers to prevent recreation
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const handleStatusFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value)
  }, [])

  // Helper functions moved outside component
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="h-3 w-3" />
            Active
          </span>
        )
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
            <Clock className="h-3 w-3" />
            Pending
          </span>
        )
      case "suspended":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <XCircle className="h-3 w-3" />
            Suspended
          </span>
        )
      default:
        return null
    }
  }

  const getPlanBadge = (plan: string) => {
    const colors = {
      "Enterprise": "bg-purple-100 text-purple-700",
      "Professional": "bg-blue-100 text-blue-700",
      "Starter": "bg-slate-100 text-slate-700"
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${colors[plan as keyof typeof colors]}`}>
        {plan}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Tenants / Businesses</h1>
            <p className="text-slate-600">Manage all tenant accounts and business information</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className={`text-sm font-medium mt-2 ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${
                stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                stat.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                'bg-red-100 text-red-600'
              }`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Filters and Search */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tenants by name or email..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            {/* Export Button */}
            <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all text-sm font-medium text-slate-700">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full min-w-225">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Business</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Plan</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Users</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Revenue</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Created</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Last Active</th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredTenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 sm:px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{tenant.name}</p>
                      <p className="text-xs text-slate-500">{tenant.email}</p>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    {getPlanBadge(tenant.plan)}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    {getStatusBadge(tenant.status)}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-700">{tenant.users}</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm font-medium text-slate-800">{tenant.revenue}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm text-slate-600">{tenant.createdAt}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm text-slate-600">{tenant.lastActive}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="View">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all" title="Edit">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all" title="More">
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
        <div className="lg:hidden px-4 sm:px-6 py-4 space-y-3">
          {filteredTenants.map((tenant) => (
            <div key={tenant.id} className="bg-white border rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm shrink-0">
                  {tenant.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900 truncate">{tenant.name}</span>
                    {getStatusBadge(tenant.status)}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 truncate">{tenant.email}</p>
                </div>
                <span className="text-sm font-bold text-slate-900">{tenant.revenue}</span>
              </div>
              
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-slate-500">Plan</p>
                      {getPlanBadge(tenant.plan)}
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Users</p>
                      <p className="text-sm font-semibold text-slate-900">{tenant.users}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-slate-500">Created</p>
                      <p className="text-sm font-semibold text-slate-900">{tenant.createdAt}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Active</p>
                      <p className="text-sm font-semibold text-slate-900">{tenant.lastActive}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="View">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all" title="Edit">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all" title="More">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="px-4 sm:px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm sm:text-base text-slate-600">
            Showing <span className="font-medium text-slate-800">1</span> to <span className="font-medium text-slate-800">{filteredTenants.length}</span> of <span className="font-medium text-slate-800">{tenants.length}</span> tenants
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-all">
              1
            </button>
            <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
              2
            </button>
            <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
              3
            </button>
            <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
