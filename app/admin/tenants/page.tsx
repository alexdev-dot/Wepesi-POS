"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { Building2, Users, Search, MoreVertical, Eye, Edit, Trash2, ShieldAlert, CheckCircle, Clock, XCircle, Filter, Download } from "@/components/admin/icons"
import { Loader2, X as XIcon } from "lucide-react"

interface Tenant {
  id: string
  user_id: string
  business_name: string
  business_type: string
  branch_name: string
  country: string
  city: string
  branch_address: string | null
  currency: string
  tax_enabled: boolean
  tax_name: string | null
  tax_rate: number | null
  subscription_plan: string
  subscription_period: string
  status: string
  created_at: string
  updated_at: string
  users: {
    email: string
    name: string
  }
}

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  retail: 'Retail Store',
  supermarket: 'Supermarket',
  restaurant: 'Restaurant',
  cafe: 'Cafe/Coffee Shop',
  hardware: 'Hardware Store',
  kiosk: 'Self-Service Kiosk',
  salon: 'Salon/Spa',
  pharmacy: 'Pharmacy'
}

export default function TenantsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    suspended: 0
  })
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [totalTenants, setTotalTenants] = useState(0)
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch tenants
  const fetchTenants = useCallback(async () => {
    setError("")
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "50"
      })
      if (statusFilter !== "all") params.append("status", statusFilter)
      if (searchQuery) params.append("search", searchQuery)

      const response = await fetch(`/api/admin/tenants?${params}`)
      const data = await response.json()

      if (response.ok) {
        setTenants(data.tenants || [])
        setStats(data.stats || { total: 0, active: 0, pending: 0, suspended: 0 })
        setTotalTenants(data.pagination?.total || 0)
      } else {
        setError(data.error || "Failed to fetch tenants")
      }
    } catch (err) {
      setError("Network error while fetching tenants")
    }
  }, [page, statusFilter, searchQuery])

  useEffect(() => {
    fetchTenants()
  }, [fetchTenants])

  // Memoize filtered tenants to prevent recalculation on every render
  const filteredTenants = useMemo(() => {
    return tenants.filter(tenant => {
      const matchesSearch = searchQuery === "" || 
        tenant.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tenant.users.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || tenant.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [tenants, searchQuery, statusFilter])

  // Memoize event handlers to prevent recreation
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const handleStatusFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value)
    setPage(1)
  }, [])

  const handleViewTenant = useCallback((tenant: Tenant) => {
    setSelectedTenant(tenant)
    setViewModalOpen(true)
  }, [])

  const handleEditTenant = useCallback((tenant: Tenant) => {
    setSelectedTenant(tenant)
    setEditModalOpen(true)
  }, [])

  const handleDeleteTenant = useCallback((tenant: Tenant) => {
    setSelectedTenant(tenant)
    setDeleteModalOpen(true)
  }, [])

  const handleConfirmDelete = useCallback(async () => {
    if (!selectedTenant) return
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/tenants?id=${selectedTenant.id}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      if (response.ok && data.success) {
        setDeleteModalOpen(false)
        setSelectedTenant(null)
        fetchTenants()
      } else {
        setError(data.error || "Failed to delete tenant")
      }
    } catch (err) {
      setError("Network error while deleting tenant")
    } finally {
      setIsDeleting(false)
    }
  }, [selectedTenant, fetchTenants])

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const getStatsArray = () => [
    {
      title: "Total Tenants",
      value: stats.total.toString(),
      change: "+0%",
      icon: Building2,
      color: "blue"
    },
    {
      title: "Active Businesses",
      value: stats.active.toString(),
      change: "+0%",
      icon: CheckCircle,
      color: "green"
    },
    {
      title: "Pending Approval",
      value: stats.pending.toString(),
      change: "+0",
      icon: Clock,
      color: "amber"
    },
    {
      title: "Suspended",
      value: stats.suspended.toString(),
      change: "-0",
      icon: ShieldAlert,
      color: "red"
    }
  ]

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
        {getStatsArray().map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-slate-200 bg-card p-4 sm:p-5 shadow-sm"
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
      <div className="rounded-xl border border-slate-200 bg-card shadow-sm">
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
                suppressHydrationWarning
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm bg-card"
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
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Type</th>
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
              {filteredTenants.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 sm:px-6 py-8 text-center">
                    <p className="text-slate-600">No tenants found</p>
                  </td>
                </tr>
              ) : (
                filteredTenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 sm:px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{tenant.business_name}</p>
                        <p className="text-xs text-slate-500">{tenant.users.email}</p>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="text-sm text-slate-700">{BUSINESS_TYPE_LABELS[tenant.business_type] || tenant.business_type}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      {getPlanBadge(tenant.subscription_plan)}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      {getStatusBadge(tenant.status)}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-700">1</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="text-sm font-medium text-slate-800">$0</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="text-sm text-slate-600">{formatTimestamp(tenant.created_at)}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="text-sm text-slate-600">-</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => handleViewTenant(tenant)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleEditTenant(tenant)}
                          className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all" 
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteTenant(tenant)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" 
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all" title="More">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden px-4 sm:px-6 py-4 space-y-3">
          {filteredTenants.length === 0 ? (
            <div className="text-center py-8 text-slate-600">
              No tenants found
            </div>
          ) : (
            filteredTenants.map((tenant) => (
              <div key={tenant.id} className="bg-card border rounded-xl p-4 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm shrink-0">
                    {tenant.business_name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900 truncate">{tenant.business_name}</span>
                      {getStatusBadge(tenant.status)}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 truncate">{tenant.users.email}</p>
                  </div>
                  <span className="text-sm font-bold text-slate-900">$0</span>
                </div>
                
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xs text-slate-500">Type</p>
                        <p className="text-sm font-semibold text-slate-900">{BUSINESS_TYPE_LABELS[tenant.business_type] || tenant.business_type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Plan</p>
                        {getPlanBadge(tenant.subscription_plan)}
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Users</p>
                        <p className="text-sm font-semibold text-slate-900">1</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xs text-slate-500">Created</p>
                        <p className="text-sm font-semibold text-slate-900">{formatTimestamp(tenant.created_at)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Active</p>
                        <p className="text-sm font-semibold text-slate-900">-</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleViewTenant(tenant)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEditTenant(tenant)}
                        className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all" 
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteTenant(tenant)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" 
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all" title="More">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="px-4 sm:px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm sm:text-base text-slate-600">
            Showing <span className="font-medium text-slate-800">{filteredTenants.length}</span> of <span className="font-medium text-slate-800">{totalTenants}</span> tenants
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-all">
              {page}
            </button>
            <button 
              onClick={() => setPage(p => p + 1)}
              disabled={filteredTenants.length < 50}
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {viewModalOpen && selectedTenant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Tenant Details</h3>
                <button 
                  onClick={() => setViewModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Business Name</p>
                  <p className="font-semibold text-slate-900">{selectedTenant.business_name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Business Type</p>
                  <p className="font-semibold text-slate-900">{selectedTenant.business_type}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Branch Name</p>
                  <p className="font-semibold text-slate-900">{selectedTenant.branch_name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Country</p>
                  <p className="font-semibold text-slate-900">{selectedTenant.country}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">City</p>
                  <p className="font-semibold text-slate-900">{selectedTenant.city}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Currency</p>
                  <p className="font-semibold text-slate-900">{selectedTenant.currency}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Subscription Plan</p>
                  <p className="font-semibold text-slate-900">{selectedTenant.subscription_plan}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  {getStatusBadge(selectedTenant.status)}
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-semibold text-slate-900">{selectedTenant.users.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Owner Name</p>
                  <p className="font-semibold text-slate-900">{selectedTenant.users.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Tax Enabled</p>
                  <p className="font-semibold text-slate-900">{selectedTenant.tax_enabled ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Tax Rate</p>
                  <p className="font-semibold text-slate-900">{selectedTenant.tax_rate ? `${selectedTenant.tax_rate}%` : 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-slate-500">Branch Address</p>
                  <p className="font-semibold text-slate-900">{selectedTenant.branch_address || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Created At</p>
                  <p className="font-semibold text-slate-900">{formatTimestamp(selectedTenant.created_at)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && selectedTenant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Edit Tenant</h3>
                <button 
                  onClick={() => setEditModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-slate-600 mb-4">Edit functionality coming soon. This will allow you to update tenant information.</p>
              <button 
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && selectedTenant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 rounded-full">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Delete Tenant</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-slate-600 mb-4">
                Are you sure you want to delete <strong>{selectedTenant.business_name}</strong>? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3">
                <button 
                  onClick={() => setDeleteModalOpen(false)}
                  disabled={isDeleting}
                  className="px-4 py-2 border border-slate-200 text-slate-900 rounded-lg hover:bg-slate-50 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
