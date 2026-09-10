"use client"

import { useState, useMemo, useCallback } from "react"
import { CreditCard, Search, Filter, Download, Eye, CheckCircle, Clock, XCircle, ArrowRight, Smartphone, Building2, MoreVertical } from "lucide-react"

const payments = [
  {
    id: "PAY-001",
    business: "ABC Shop",
    customer: "John Doe",
    amount: 1500,
    method: "M-Pesa",
    reference: "MPESA123456",
    date: "2024-04-15",
    status: "successful",
    plan: "Professional"
  },
  {
    id: "PAY-002",
    business: "Tech Solutions Ltd",
    customer: "Jane Smith",
    amount: 25000,
    method: "Card",
    reference: "CARD789012",
    date: "2024-04-14",
    status: "successful",
    plan: "Enterprise"
  },
  {
    id: "PAY-003",
    business: "Retail Store ABC",
    customer: "Michael Johnson",
    amount: 3500,
    method: "M-Pesa",
    reference: "MPESA345678",
    date: "2024-04-14",
    status: "pending",
    plan: "Starter"
  },
  {
    id: "PAY-004",
    business: "Grocery Store 123",
    customer: "Sarah Williams",
    amount: 10000,
    method: "Bank",
    reference: "BANK901234",
    date: "2024-04-13",
    status: "successful",
    plan: "Professional"
  },
  {
    id: "PAY-005",
    business: "Fashion Boutique",
    customer: "David Brown",
    amount: 25000,
    method: "M-Pesa",
    reference: "MPESA567890",
    date: "2024-04-13",
    status: "failed",
    plan: "Enterprise"
  },
  {
    id: "PAY-006",
    business: "Coffee Shop Chain",
    customer: "Emily Davis",
    amount: 10000,
    method: "Card",
    reference: "CARD234567",
    date: "2024-04-12",
    status: "refunded",
    plan: "Professional"
  },
  {
    id: "PAY-007",
    business: "Auto Parts Store",
    customer: "Robert Miller",
    amount: 3500,
    method: "M-Pesa",
    reference: "MPESA890123",
    date: "2024-04-12",
    status: "successful",
    plan: "Starter"
  },
  {
    id: "PAY-008",
    business: "Pharmacy Plus",
    customer: "Lisa Anderson",
    amount: 10000,
    method: "Bank",
    reference: "BANK456789",
    date: "2024-04-11",
    status: "cancelled",
    plan: "Professional"
  },
  {
    id: "PAY-009",
    business: "Restaurant XYZ",
    customer: "James Wilson",
    amount: 3500,
    method: "M-Pesa",
    reference: "MPESA012345",
    date: "2024-04-11",
    status: "successful",
    plan: "Starter"
  },
  {
    id: "PAY-010",
    business: "Beauty Salon",
    customer: "Maria Garcia",
    amount: 25000,
    method: "Card",
    reference: "CARD678901",
    date: "2024-04-10",
    status: "pending",
    plan: "Enterprise"
  }
]

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState<typeof payments[0] | null>(null)

  const filteredPayments = useMemo(() => {
    return payments.filter(payment => {
      const matchesSearch = payment.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           payment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           payment.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           payment.id.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || payment.status === statusFilter
      const matchesMethod = methodFilter === "all" || payment.method === methodFilter
      return matchesSearch && matchesStatus && matchesMethod
    })
  }, [searchQuery, statusFilter, methodFilter])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "successful":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="h-3 w-3" />
            Successful
          </span>
        )
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
            <Clock className="h-3 w-3" />
            Pending
          </span>
        )
      case "failed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <XCircle className="h-3 w-3" />
            Failed
          </span>
        )
      case "refunded":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            <ArrowRight className="h-3 w-3" />
            Refunded
          </span>
        )
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            <XCircle className="h-3 w-3" />
            Cancelled
          </span>
        )
      default:
        return null
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "M-Pesa":
        return <Smartphone className="h-4 w-4 text-green-600" />
      case "Card":
        return <CreditCard className="h-4 w-4 text-blue-600" />
      case "Bank":
        return <Building2 className="h-4 w-4 text-purple-600" />
      default:
        return <CreditCard className="h-4 w-4 text-slate-400" />
    }
  }

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const handleStatusFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value)
  }, [])

  const handleMethodFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setMethodFilter(e.target.value)
  }, [])

  const handleViewDetails = useCallback((payment: typeof payments[0]) => {
    setSelectedPayment(payment)
  }, [])

  const handleCloseDetails = useCallback(() => {
    setSelectedPayment(null)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-primary/10 text-primary">
          <CreditCard className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Payments & Transactions</h1>
          <p className="text-slate-600">Manage payments and transactions</p>
        </div>
      </div>

      {/* Payment Table */}
      <div className="rounded-xl border border-slate-200 bg-card shadow-sm">
        {/* Filters and Search */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by business, customer, reference or ID..."
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
                className="px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm bg-card text-foreground"
              >
                <option value="all">All Status</option>
                <option value="successful">Successful</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Method Filter */}
            <select
              value={methodFilter}
              onChange={handleMethodFilterChange}
              className="px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm bg-card text-foreground"
            >
              <option value="all">All Methods</option>
              <option value="M-Pesa">M-Pesa</option>
              <option value="Card">Card</option>
              <option value="Bank">Bank</option>
            </select>

            {/* Export Button */}
            <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all text-sm font-medium text-slate-700">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Payment ID</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Business</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Customer</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Method</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Reference</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm font-medium text-slate-800">{payment.id}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm text-slate-600">{payment.business}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm text-slate-600">{payment.customer}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm font-medium text-slate-800">Ksh {payment.amount.toLocaleString('en-US')}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getMethodIcon(payment.method)}
                      <span className="text-sm text-slate-600">{payment.method}</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm text-slate-600 font-mono">{payment.reference}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm text-slate-600">{payment.date}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    {getStatusBadge(payment.status)}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => handleViewDetails(payment)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
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

        {/* Mobile View */}
        <div className="md:hidden space-y-4 p-4">
          {filteredPayments.map((payment) => (
            <div key={payment.id} className="border border-slate-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-800">{payment.id}</span>
                {getStatusBadge(payment.status)}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Business</span>
                  <span className="text-sm text-slate-800">{payment.business}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Customer</span>
                  <span className="text-sm text-slate-800">{payment.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Amount</span>
                  <span className="text-sm font-medium text-slate-800">Ksh {payment.amount.toLocaleString('en-US')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Method</span>
                  <div className="flex items-center gap-1">
                    {getMethodIcon(payment.method)}
                    <span className="text-sm text-slate-800">{payment.method}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Date</span>
                  <span className="text-sm text-slate-800">{payment.date}</span>
                </div>
              </div>
              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button 
                  onClick={() => handleViewDetails(payment)}
                  className="flex-1 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing <span className="font-medium text-slate-800">1</span> to <span className="font-medium text-slate-800">{filteredPayments.length}</span> of <span className="font-medium text-slate-800">{payments.length}</span> payments
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

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-md bg-card rounded-xl shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800">Payment Details</h2>
              <button
                onClick={handleCloseDetails}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="border-b border-slate-200 pb-4">
                <p className="text-sm text-slate-500 mb-1">Payment</p>
                <h3 className="text-xl font-bold text-slate-800">{selectedPayment.id}</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Business</span>
                  <span className="text-sm font-medium text-slate-800">{selectedPayment.business}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Amount</span>
                  <span className="text-sm font-bold text-slate-800">Ksh {selectedPayment.amount.toLocaleString('en-US')}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Method</span>
                  <div className="flex items-center gap-2">
                    {getMethodIcon(selectedPayment.method)}
                    <span className="text-sm font-medium text-slate-800">{selectedPayment.method}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Reference</span>
                  <span className="text-sm font-mono text-slate-800">{selectedPayment.reference}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Status</span>
                  {getStatusBadge(selectedPayment.status)}
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Date</span>
                  <span className="text-sm text-slate-800">{selectedPayment.date}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-slate-500">Plan</span>
                  <span className="text-sm font-medium text-slate-800">{selectedPayment.plan}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={handleCloseDetails}
                  className="w-full py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
