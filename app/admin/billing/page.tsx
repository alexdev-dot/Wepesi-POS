"use client"

import { useState, useMemo, useCallback } from "react"
import { Receipt, DollarSign, Clock, CheckCircle, AlertCircle, Search, Download, Filter, MoreVertical, Eye, FileText, Mail, Trash2, ArrowUpRight, ArrowDownRight, Calendar } from "lucide-react"
import { InvoiceForm, InvoiceFormData } from "@/components/admin/invoice-form"

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <Receipt className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Billing & Invoices</h1>
            <p className="text-slate-600">View and manage billing information and invoices</p>
          </div>
        </div>
        <button onClick={handleOpenCreateModal} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all font-medium">
          <FileText className="h-4 w-4" />
          Generate Invoice
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
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
        <div className="p-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search invoices by ID, tenant, or email..."
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
                className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm bg-white"
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
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm bg-white"
            >
              <option value="all">All Time</option>
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
              <option value="this_year">This Year</option>
            </select>

            {/* Export Button */}
            <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all text-sm font-medium text-slate-700">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Invoice ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Tenant</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Paid Date</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-800">{invoice.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{invoice.tenant}</p>
                      <p className="text-xs text-slate-500">{invoice.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getPlanBadge(invoice.plan)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-800">{invoice.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(invoice.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-600">{invoice.dueDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{invoice.paidDate || "-"}</span>
                  </td>
                  <td className="px-6 py-4">
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

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing <span className="font-medium text-slate-800">1</span> to <span className="font-medium text-slate-800">{filteredInvoices.length}</span> of <span className="font-medium text-slate-800">{invoices.length}</span> invoices
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-all">
              1
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
              2
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Form Modal */}
      {isInvoiceModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <InvoiceForm
              mode={editingInvoice ? "edit" : "create"}
              initialData={editingInvoice || undefined}
              onSave={handleSaveInvoice}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  )
}
