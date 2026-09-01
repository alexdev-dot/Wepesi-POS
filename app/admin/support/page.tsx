"use client"

import { useState, useMemo, useCallback } from "react"
import { Ticket, MessageCircle, Clock, CheckCircle, AlertCircle, Search, Filter, Download, MoreVertical, Eye, Mail, User, ArrowUpRight, ArrowDownRight, Calendar, Send, Archive } from "lucide-react"

// Static data moved outside component
const stats = [
    {
      title: "Total Tickets",
      value: "1,247",
      change: "+8.5%",
      trend: "up",
      icon: Ticket,
      color: "blue"
    },
    {
      title: "Open Tickets",
      value: "156",
      change: "+12.3%",
      trend: "up",
      icon: MessageCircle,
      color: "amber"
    },
    {
      title: "Resolved Today",
      value: "23",
      change: "+5",
      trend: "up",
      icon: CheckCircle,
      color: "green"
    },
    {
      title: "Avg Response Time",
      value: "2.4h",
      change: "-0.5h",
      trend: "down",
      icon: Clock,
      color: "purple"
    }
  ]

  const tickets = [
    {
      id: "TKT-001",
      subject: "Unable to process payment",
      tenant: "Tech Solutions Ltd",
      email: "contact@techsolutions.com",
      priority: "high",
      status: "open",
      category: "Billing",
      createdAt: "Mar 15, 2024",
      lastUpdate: "2 hours ago",
      assignedTo: "John Doe"
    },
    {
      id: "TKT-002",
      subject: "Feature request: Custom reports",
      tenant: "Retail Store ABC",
      email: "info@retailabc.com",
      priority: "medium",
      status: "in_progress",
      category: "Feature Request",
      createdAt: "Mar 14, 2024",
      lastUpdate: "5 hours ago",
      assignedTo: "Jane Smith"
    },
    {
      id: "TKT-003",
      subject: "Login issues after update",
      tenant: "Restaurant XYZ",
      email: "manager@restaurantxyz.com",
      priority: "high",
      status: "open",
      category: "Technical",
      createdAt: "Mar 15, 2024",
      lastUpdate: "30 minutes ago",
      assignedTo: "Unassigned"
    },
    {
      id: "TKT-004",
      subject: "Export functionality not working",
      tenant: "Grocery Store 123",
      email: "admin@grocery123.com",
      priority: "low",
      status: "resolved",
      category: "Bug",
      createdAt: "Mar 10, 2024",
      lastUpdate: "1 day ago",
      assignedTo: "John Doe"
    },
    {
      id: "TKT-005",
      subject: "API integration help needed",
      tenant: "Fashion Boutique",
      email: "sales@fashionboutique.com",
      priority: "medium",
      status: "in_progress",
      category: "Technical",
      createdAt: "Mar 13, 2024",
      lastUpdate: "3 hours ago",
      assignedTo: "Jane Smith"
    },
    {
      id: "TKT-006",
      subject: "Account upgrade request",
      tenant: "Coffee Shop Chain",
      email: "ops@coffeeshop.com",
      priority: "low",
      status: "resolved",
      category: "Account",
      createdAt: "Mar 8, 2024",
      lastUpdate: "2 days ago",
      assignedTo: "John Doe"
    },
    {
      id: "TKT-007",
      subject: "Data synchronization error",
      tenant: "Auto Parts Store",
      email: "manager@autoparts.com",
      priority: "high",
      status: "open",
      category: "Technical",
      createdAt: "Mar 15, 2024",
      lastUpdate: "1 hour ago",
      assignedTo: "Unassigned"
    },
    {
      id: "TKT-008",
      subject: "Question about plan features",
      tenant: "Pharmacy Plus",
      email: "admin@pharmacyplus.com",
      priority: "low",
      status: "closed",
      category: "General Inquiry",
      createdAt: "Mar 5, 2024",
      lastUpdate: "3 days ago",
      assignedTo: "Jane Smith"
    }
  ]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  // Memoize filtered tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           ticket.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
      const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [searchQuery, statusFilter, priorityFilter])

  // Memoize event handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const handleStatusFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value)
  }, [])

  const handlePriorityFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriorityFilter(e.target.value)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
            <MessageCircle className="h-3 w-3" />
            Open
          </span>
        )
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            <Clock className="h-3 w-3" />
            In Progress
          </span>
        )
      case "resolved":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="h-3 w-3" />
            Resolved
          </span>
        )
      case "closed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            <Archive className="h-3 w-3" />
            Closed
          </span>
        )
      default:
        return null
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <AlertCircle className="h-3 w-3" />
            High
          </span>
        )
      case "medium":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
            <Clock className="h-3 w-3" />
            Medium
          </span>
        )
      case "low":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="h-3 w-3" />
            Low
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 sm:p-4 rounded-lg bg-primary/10 text-primary">
            <Ticket className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Support Tickets</h1>
            <p className="text-sm sm:text-base text-slate-600">Manage and respond to support requests</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all font-medium text-sm sm:text-base">
          <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
          New Ticket
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
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-green-600" />
                  )}
                  <span className="text-sm font-medium text-green-600">
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${
                stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                'bg-purple-100 text-purple-600'
              }`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tickets Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Filters and Search */}
        <div className="p-4 sm:p-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tickets by ID, subject, or tenant..."
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
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={handlePriorityFilterChange}
              className="px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm sm:text-base bg-white"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {/* Export Button */}
            <button className="flex items-center gap-2 px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all text-sm sm:text-base font-medium text-slate-700">
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
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Ticket ID</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Subject</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Tenant</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Priority</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Category</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Last Update</th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm font-medium text-slate-800">{ticket.id}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <p className="text-sm font-medium text-slate-800 max-w-xs truncate">{ticket.subject}</p>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{ticket.tenant}</p>
                      <p className="text-xs text-slate-500">{ticket.email}</p>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    {getPriorityBadge(ticket.priority)}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    {getStatusBadge(ticket.status)}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm text-slate-600">{ticket.category}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                        {ticket.assignedTo === "Unassigned" ? "?" : ticket.assignedTo.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="text-sm text-slate-600">{ticket.assignedTo}</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm text-slate-600">{ticket.lastUpdate}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="View">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all" title="Reply">
                        <Send className="h-4 w-4" />
                      </button>
                      {ticket.status === 'open' && (
                        <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all" title="Assign">
                          <User className="h-4 w-4" />
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
        <div className="md:hidden px-4 sm:px-6 py-4 space-y-3">
          {filteredTickets.map((ticket) => (
            <div key={ticket.id} className="bg-white border rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600 font-semibold text-sm shrink-0">
                  {ticket.id.slice(-2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">{ticket.id}</span>
                    {getPriorityBadge(ticket.priority)}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 truncate">{ticket.subject}</p>
                </div>
                {getStatusBadge(ticket.status)}
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Tenant</p>
                    <p className="text-sm font-semibold text-slate-900 truncate max-w-25">{ticket.tenant}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Assigned</p>
                    <p className="text-sm font-semibold text-slate-900 truncate max-w-20">{ticket.assignedTo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="px-4 sm:px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm sm:text-base text-slate-600">
            Showing <span className="font-medium text-slate-800">1</span> to <span className="font-medium text-slate-800">{filteredTickets.length}</span> of <span className="font-medium text-slate-800">{tickets.length}</span> tickets
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
    </div>
  )
}
