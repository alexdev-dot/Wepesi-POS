"use client"

import { useState, useMemo, useCallback, lazy, Suspense } from "react"
import { Receipt, DollarSign, Clock, CheckCircle, AlertCircle, Search, Download, Filter, MoreVertical, Eye, FileText, Mail, Trash2, ArrowUpRight, ArrowDownRight, Calendar } from "@/components/admin/icons"

const InvoiceForm = lazy(() => import("@/components/admin/invoice-form").then(m => ({ default: m.InvoiceForm })))
type InvoiceFormData = any

// Static data moved outside component
const stats = [
    {
      title: "Total Revenue",
      value: "$284,520",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      color: "green"
    },
    {
      title: "Pending Invoices",
      value: "$45,230",
      change: "+8.2%",
      trend: "up",
      icon: Clock,
      color: "amber"
    },
    {
      title: "Paid This Month",
      value: "$32,450",
      change: "+12.5%",
      trend: "up",
      icon: CheckCircle,
      color: "blue"
    },
    {
      title: "Overdue Amount",
      value: "$8,750",
      change: "-2.1%",
      trend: "down",
      icon: AlertCircle,
      color: "red"
    }
  ]

  const invoices = [
    {
      id: "INV-001",
      tenant: "Tech Solutions Ltd",
      email: "contact@techsolutions.com",
      amount: "$199.00",
      status: "paid",
      dueDate: "Mar 15, 2024",
      paidDate: "Mar 14, 2024",
      plan: "Enterprise"
    },
    {
      id: "INV-002",
      tenant: "Retail Store ABC",
      email: "info@retailabc.com",
      amount: "$79.00",
      status: "paid",
      dueDate: "Mar 20, 2024",
      paidDate: "Mar 19, 2024",
      plan: "Professional"
    },
    {
      id: "INV-003",
      tenant: "Restaurant XYZ",
      email: "manager@restaurantxyz.com",
      amount: "$29.00",
      status: "pending",
      dueDate: "Apr 10, 2024",
      paidDate: null,
      plan: "Starter"
    },
    {
      id: "INV-004",
      tenant: "Grocery Store 123",
      email: "admin@grocery123.com",
      amount: "$948.00",
      status: "paid",
      dueDate: "Dec 20, 2023",
      paidDate: "Dec 18, 2023",
      plan: "Professional"
    },
    {
      id: "INV-005",
      tenant: "Fashion Boutique",
      email: "sales@fashionboutique.com",
      amount: "$199.00",
      status: "overdue",
      dueDate: "Mar 28, 2024",
      paidDate: null,
      plan: "Enterprise"
    },
    {
      id: "INV-006",
      tenant: "Coffee Shop Chain",
      email: "ops@coffeeshop.com",
      amount: "$2,388.00",
      status: "paid",
      dueDate: "Nov 15, 2023",
      paidDate: "Nov 14, 2023",
      plan: "Enterprise"
    },
    {
      id: "INV-007",
      tenant: "Auto Parts Store",
      email: "manager@autoparts.com",
      amount: "$29.00",
      status: "pending",
      dueDate: "Apr 18, 2024",
      paidDate: null,
      plan: "Starter"
    },
    {
      id: "INV-008",
      tenant: "Pharmacy Plus",
      email: "admin@pharmacyplus.com",
      amount: "$79.00",
      status: "overdue",
      dueDate: "Apr 5, 2024",
      paidDate: null,
      plan: "Professional"
    }
  ]

export default function BillingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState<InvoiceFormData | null>(null)

  const handleOpenCreateModal = useCallback(() => {
    setEditingInvoice(null)
    setIsInvoiceModalOpen(true)
  }, [])

  const handleOpenEditModal = useCallback((invoice: any) => {
    setEditingInvoice({
      invoiceId: invoice.id,
      tenantId: invoice.id,
      tenantName: invoice.tenant,
      tenantEmail: invoice.email,
      plan: invoice.plan,
      amount: parseFloat(invoice.amount.replace(/[$,]/g, "")),
      dueDate: invoice.dueDate,
      description: "",
      items: [
        { id: "1", description: `${invoice.plan} Subscription`, quantity: 1, price: parseFloat(invoice.amount.replace(/[$,]/g, "")), total: parseFloat(invoice.amount.replace(/[$,]/g, "")) }
      ]
    })
    setIsInvoiceModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsInvoiceModalOpen(false)
    setEditingInvoice(null)
  }, [])

  const handleSaveInvoice = useCallback((data: InvoiceFormData) => {
    console.log("Saving invoice:", data)
    // TODO: Implement actual save logic (API call)
    handleCloseModal()
  }, [handleCloseModal])

  // Memoize filtered invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice => {
      const matchesSearch = invoice.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           invoice.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchQuery, statusFilter])

  // Memoize event handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const handleStatusFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value)
  }, [])

  const handleDateFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateFilter(e.target.value)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="h-3 w-3" />
            Paid
          </span>
        )
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
            <Clock className="h-3 w-3" />
            Pending
          </span>
        )
      case "overdue":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <AlertCircle className="h-3 w-3" />
            Overdue
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 sm:p-4 rounded-lg bg-primary/10 text-primary">
            <Receipt className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Billing & Invoices</h1>
            <p className="text-sm sm:text-base text-slate-600">View and manage billing information and invoices</p>
          </div>
        </div>
        <button onClick={handleOpenCreateModal} className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all font-medium text-sm sm:text-base">
          <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
          Generate Invoice
        </button>
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
                <div className="flex items-center gap-1 mt-2">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className={`h-4 w-4 ${stat.title === 'Overdue Amount' ? 'text-red-600' : 'text-green-600'}`} />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-green-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.title === 'Overdue Amount' 
                      ? (stat.trend === 'up' ? 'text-red-600' : 'text-green-600')
                      : (stat.trend === 'up' ? 'text-green-600' : 'text-red-600')
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                stat.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                'bg-red-100 text-red-600'
              }`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Invoices Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Filters and Search */}
        <div className="p-4 sm:p-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search invoices by ID, tenant, or email..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm sm:text-base"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm sm:text-base bg-white"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={handleDateFilterChange}
              className="px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm sm:text-base bg-white"
            >
              <option value="all">All Time</option>
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
              <option value="this_year">This Year</option>
            </select>

            {/* Export Button */}
            <button className="flex items-center gap-2 px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all text-sm sm:text-base font-medium text-slate-700">
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
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">Invoice ID</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">Tenant</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">Plan</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">Amount</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">Due Date</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">Paid Date</th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm sm:text-base font-medium text-slate-800">{invoice.id}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div>
                      <p className="text-sm sm:text-base font-medium text-slate-800">{invoice.tenant}</p>
                      <p className="text-xs sm:text-sm text-slate-500">{invoice.email}</p>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    {getPlanBadge(invoice.plan)}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm sm:text-base font-semibold text-slate-800">{invoice.amount}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    {getStatusBadge(invoice.status)}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-sm sm:text-base text-slate-600">{invoice.dueDate}</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm sm:text-base text-slate-600">{invoice.paidDate || "-"}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="View">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all" title="Download">
                        <Download className="h-4 w-4" />
                      </button>
                      {invoice.status !== 'paid' && (
                        <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all" title="Send Reminder">
                          <Mail className="h-4 w-4" />
                        </button>
                      )}
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
          {filteredInvoices.map((invoice) => (
            <div key={invoice.id} className="bg-white border rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm shrink-0">
                  {invoice.id.charAt(3)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-semibold text-slate-900 truncate">{invoice.id}</span>
                    {getStatusBadge(invoice.status)}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 truncate">{invoice.tenant}</p>
                </div>
                <span className="text-sm sm:text-base font-bold text-slate-900">{invoice.amount}</span>
              </div>
              
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-slate-500">Plan</p>
                      {getPlanBadge(invoice.plan)}
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Due</p>
                      <p className="text-sm font-semibold text-slate-900">{invoice.dueDate}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="text-xs text-slate-500">Paid</p>
                      <p className="text-sm font-semibold text-slate-900">{invoice.paidDate || "-"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="View">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all" title="Download">
                      <Download className="h-4 w-4" />
                    </button>
                    {invoice.status !== 'paid' && (
                      <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all" title="Send Reminder">
                        <Mail className="h-4 w-4" />
                      </button>
                    )}
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
            Showing <span className="font-medium text-slate-800">1</span> to <span className="font-medium text-slate-800">{filteredInvoices.length}</span> of <span className="font-medium text-slate-800">{invoices.length}</span> invoices
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
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Form Modal */}
      {isInvoiceModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl flex flex-col">
            <Suspense fallback={<div className="flex items-center justify-center p-8">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>}>
              <InvoiceForm
                mode={editingInvoice ? "edit" : "create"}
                initialData={editingInvoice || undefined}
                onSave={handleSaveInvoice}
                onCancel={handleCloseModal}
              />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  )
}
