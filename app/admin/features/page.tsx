"use client"

import { useState, useMemo, useCallback } from "react"
import { Star, Plus, MoreVertical, Eye, Edit, Trash2, CheckCircle, Clock, XCircle, Search, Filter, Download } from "@/components/admin/icons"
import { FeatureView } from "@/components/admin/feature-view"

// Static data moved outside component
const stats = [
  {
    title: "Total Features",
    value: "24",
    change: "+3",
    icon: Star,
    color: "blue"
  },
  {
    title: "Active Features",
    value: "18",
    change: "+2",
    icon: CheckCircle,
    color: "green"
  },
  {
    title: "In Development",
    value: "4",
    change: "+1",
    icon: Clock,
    color: "amber"
  },
  {
    title: "Deprecated",
    value: "2",
    change: "0",
    icon: XCircle,
    color: "red"
  }
]

const features = [
  {
    id: 1,
    name: "Multi-tenant Support",
    description: "Support for multiple business tenants with isolated data",
    category: "Core",
    status: "active",
    priority: "high",
    usage: "892",
    lastUpdated: "Mar 15, 2024",
    details: {
      version: "2.1.0",
      releaseDate: "Jan 15, 2024",
      documentation: "/docs/multi-tenant",
      dependencies: ["Database", "Auth Service", "API Gateway"],
      metrics: {
        satisfaction: "4.8/5.0",
        bugs: "3 open",
        requests: "12 pending"
      }
    }
  },
  {
    id: 2,
    name: "Role-based Access Control",
    description: "Granular permissions for different user roles",
    category: "Security",
    status: "active",
    priority: "high",
    usage: "1247",
    lastUpdated: "Feb 28, 2024",
    details: {
      version: "3.0.1",
      releaseDate: "Dec 1, 2023",
      documentation: "/docs/rbac",
      dependencies: ["Auth Service", "User Management"],
      metrics: {
        satisfaction: "4.9/5.0",
        bugs: "1 open",
        requests: "8 pending"
      }
    }
  },
  {
    id: 3,
    name: "Real-time Analytics",
    description: "Live dashboard with sales and performance metrics",
    category: "Analytics",
    status: "active",
    priority: "medium",
    usage: "756",
    lastUpdated: "Mar 10, 2024",
    details: {
      version: "1.5.2",
      releaseDate: "Feb 20, 2024",
      documentation: "/docs/analytics",
      dependencies: ["WebSocket", "Data Pipeline", "Redis"],
      metrics: {
        satisfaction: "4.6/5.0",
        bugs: "5 open",
        requests: "15 pending"
      }
    }
  },
  {
    id: 4,
    name: "Inventory Management",
    description: "Track stock levels, alerts, and automatic reordering",
    category: "Operations",
    status: "active",
    priority: "high",
    usage: "1102",
    lastUpdated: "Jan 20, 2024",
    details: {
      version: "4.2.0",
      releaseDate: "Nov 10, 2023",
      documentation: "/docs/inventory",
      dependencies: ["Database", "Notification Service"],
      metrics: {
        satisfaction: "4.7/5.0",
        bugs: "2 open",
        requests: "6 pending"
      }
    }
  },
  {
    id: 5,
    name: "Payment Integration",
    description: "Multiple payment gateways and processing",
    category: "Payments",
    status: "active",
    priority: "high",
    usage: "945",
    lastUpdated: "Mar 5, 2024",
    details: {
      version: "2.0.3",
      releaseDate: "Jan 5, 2024",
      documentation: "/docs/payments",
      dependencies: ["Stripe", "PayPal", "Square"],
      metrics: {
        satisfaction: "4.5/5.0",
        bugs: "4 open",
        requests: "10 pending"
      }
    }
  },
  {
    id: 6,
    name: "Mobile App Support",
    description: "Native mobile applications for iOS and Android",
    category: "Mobile",
    status: "development",
    priority: "medium",
    usage: "0",
    lastUpdated: "Mar 1, 2024",
    details: {
      version: "0.9.0-beta",
      releaseDate: "TBD",
      documentation: "/docs/mobile",
      dependencies: ["React Native", "API Gateway"],
      metrics: {
        satisfaction: "N/A",
        bugs: "12 open",
        requests: "25 pending"
      }
    }
  },
  {
    id: 7,
    name: "AI-powered Recommendations",
    description: "Machine learning for product suggestions",
    category: "AI",
    status: "development",
    priority: "low",
    usage: "0",
    lastUpdated: "Feb 15, 2024",
    details: {
      version: "0.5.0-alpha",
      releaseDate: "TBD",
      documentation: "/docs/ai",
      dependencies: ["TensorFlow", "Data Pipeline", "ML Service"],
      metrics: {
        satisfaction: "N/A",
        bugs: "8 open",
        requests: "18 pending"
      }
    }
  },
  {
    id: 8,
    name: "Legacy Import Tool",
    description: "Import data from old POS systems",
    category: "Migration",
    status: "deprecated",
    priority: "low",
    usage: "12",
    lastUpdated: "Dec 10, 2023",
    details: {
      version: "1.0.0",
      releaseDate: "Jun 15, 2023",
      documentation: "/docs/legacy",
      dependencies: ["CSV Parser", "Database"],
      metrics: {
        satisfaction: "3.2/5.0",
        bugs: "0 open",
        requests: "0 pending"
      }
    }
  }
]

export default function FeaturesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [viewingFeature, setViewingFeature] = useState<typeof features[0] | null>(null)

  // Memoize filtered features
  const filteredFeatures = useMemo(() => {
    return features.filter(feature => {
      const matchesSearch = feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           feature.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || feature.status === statusFilter
      const matchesCategory = categoryFilter === "all" || feature.category === categoryFilter
      return matchesSearch && matchesStatus && matchesCategory
    })
  }, [searchQuery, statusFilter, categoryFilter])

  // Memoize event handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const handleStatusFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value)
  }, [])

  const handleCategoryFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value)
  }, [])

  const handleViewFeature = useCallback((feature: typeof features[0]) => {
    setViewingFeature(feature)
  }, [])

  const handleCloseView = useCallback(() => {
    setViewingFeature(null)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="h-3 w-3" />
            Active
          </span>
        )
      case "development":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
            <Clock className="h-3 w-3" />
            In Development
          </span>
        )
      case "deprecated":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <XCircle className="h-3 w-3" />
            Deprecated
          </span>
        )
      default:
        return null
    }
  }

  const getPriorityBadge = (priority: string) => {
    const colors = {
      "high": "bg-red-100 text-red-700",
      "medium": "bg-amber-100 text-amber-700",
      "low": "bg-slate-100 text-slate-700"
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${colors[priority as keyof typeof colors]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    )
  }

  const categories = [...new Set(features.map(f => f.category))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 sm:p-4 rounded-lg bg-primary/10 text-primary">
            <Star className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Feature Management</h1>
            <p className="text-sm sm:text-base text-slate-600">View and manage system features</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all font-medium text-sm sm:text-base">
          <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
          Add Feature
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-slate-200 bg-card p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className={`text-sm font-medium mt-2 ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-slate-600'
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
        <div className="p-4 sm:p-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search features by name or description..."
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
                className="px-4 py-2.5 sm:py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm sm:text-base bg-card text-foreground"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="development">In Development</option>
                <option value="deprecated">Deprecated</option>
              </select>
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={handleCategoryFilterChange}
              className="px-4 py-2.5 sm:py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm sm:text-base bg-card text-foreground"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
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
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">Feature</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">Category</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">Priority</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">Usage</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">Last Updated</th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredFeatures.map((feature) => (
                <tr key={feature.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 sm:px-6 py-4">
                    <div>
                      <p className="text-sm sm:text-base font-medium text-slate-800">{feature.name}</p>
                      <p className="text-xs sm:text-sm text-slate-500">{feature.description}</p>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm sm:text-base text-slate-600">{feature.category}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    {getStatusBadge(feature.status)}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    {getPriorityBadge(feature.priority)}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm sm:text-base font-medium text-slate-800">{feature.usage}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm sm:text-base text-slate-600">{feature.lastUpdated}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => handleViewFeature(feature)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
                        title="View"
                      >
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
        <div className="md:hidden px-4 sm:px-6 py-4 space-y-3">
          {filteredFeatures.map((feature) => (
            <div key={feature.id} className="bg-card border rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm shrink-0">
                  {feature.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-semibold text-slate-900 truncate">{feature.name}</span>
                    {getStatusBadge(feature.status)}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 truncate">{feature.description}</p>
                </div>
                {getPriorityBadge(feature.priority)}
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Category</p>
                    <p className="text-sm font-semibold text-slate-900">{feature.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Usage</p>
                    <p className="text-sm font-semibold text-slate-900">{feature.usage}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleViewFeature(feature)}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
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
            Showing <span className="font-medium text-slate-800">1</span> to <span className="font-medium text-slate-800">{filteredFeatures.length}</span> of <span className="font-medium text-slate-800">{features.length}</span> features
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-all">
              1
            </button>
            <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Feature View Modal */}
      {viewingFeature && (
        <FeatureView feature={viewingFeature} onClose={handleCloseView} />
      )}
    </div>
  )
}
