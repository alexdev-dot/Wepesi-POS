"use client"

import { useState, useMemo, useCallback } from "react"
import { Activity, Server, Database, Cpu, HardDrive, Wifi, AlertTriangle, CheckCircle, XCircle, Clock, Search, Filter, Download, MoreVertical, Eye, RefreshCw, ArrowUpRight, ArrowDownRight, Zap } from "lucide-react"

// Static data moved outside component
const systemStats = [
    {
      title: "CPU Usage",
      value: "42%",
      change: "+5%",
      trend: "up",
      icon: Cpu,
      color: "blue",
      status: "normal"
    },
    {
      title: "Memory Usage",
      value: "68%",
      change: "+2%",
      trend: "up",
      icon: Database,
      color: "purple",
      status: "normal"
    },
    {
      title: "Disk Space",
      value: "45%",
      change: "+1%",
      trend: "up",
      icon: HardDrive,
      color: "amber",
      status: "normal"
    },
    {
      title: "Network",
      value: "1.2 GB/s",
      change: "-0.3",
      trend: "down",
      icon: Wifi,
      color: "green",
      status: "normal"
    }
  ]

  const services = [
    { name: "API Server", status: "operational", uptime: "99.9%", responseTime: "45ms", lastCheck: "2 min ago" },
    { name: "Database", status: "operational", uptime: "99.8%", responseTime: "12ms", lastCheck: "2 min ago" },
    { name: "Redis Cache", status: "operational", uptime: "99.9%", responseTime: "3ms", lastCheck: "2 min ago" },
    { name: "Payment Gateway", status: "operational", uptime: "99.7%", responseTime: "120ms", lastCheck: "1 min ago" },
    { name: "Email Service", status: "degraded", uptime: "98.5%", responseTime: "450ms", lastCheck: "5 min ago" },
    { name: "CDN", status: "operational", uptime: "99.9%", responseTime: "25ms", lastCheck: "2 min ago" },
    { name: "Storage Service", status: "operational", uptime: "99.8%", responseTime: "89ms", lastCheck: "2 min ago" },
    { name: "Auth Service", status: "operational", uptime: "99.9%", responseTime: "18ms", lastCheck: "1 min ago" }
  ]

  const logs = [
    {
      id: 1,
      timestamp: "2024-03-15 14:32:15",
      level: "info",
      service: "API Server",
      message: "User authentication successful",
      userId: "USR-001",
      ip: "192.168.1.100"
    },
    {
      id: 2,
      timestamp: "2024-03-15 14:31:45",
      level: "warning",
      service: "Database",
      message: "Slow query detected (2.5s)",
      userId: null,
      ip: "192.168.1.50"
    },
    {
      id: 3,
      timestamp: "2024-03-15 14:30:22",
      level: "error",
      service: "Payment Gateway",
      message: "Payment processing failed: Invalid card",
      userId: "USR-045",
      ip: "192.168.1.200"
    },
    {
      id: 4,
      timestamp: "2024-03-15 14:29:10",
      level: "info",
      service: "Email Service",
      message: "Invoice email sent successfully",
      userId: "USR-023",
      ip: "192.168.1.75"
    },
    {
      id: 5,
      timestamp: "2024-03-15 14:28:55",
      level: "debug",
      service: "API Server",
      message: "Cache hit for product list",
      userId: null,
      ip: "192.168.1.120"
    },
    {
      id: 6,
      timestamp: "2024-03-15 14:27:30",
      level: "info",
      service: "Auth Service",
      message: "New user registered",
      userId: "USR-046",
      ip: "192.168.1.180"
    },
    {
      id: 7,
      timestamp: "2024-03-15 14:26:15",
      level: "warning",
      service: "Storage Service",
      message: "Disk space warning: 85% used",
      userId: null,
      ip: "192.168.1.10"
    },
    {
      id: 8,
      timestamp: "2024-03-15 14:25:00",
      level: "info",
      service: "CDN",
      message: "Cache purged successfully",
      userId: null,
      ip: "192.168.1.30"
    }
  ]

export default function SystemLogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")

  // Memoize filtered logs
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           log.service.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesLevel = levelFilter === "all" || log.level === levelFilter
      const matchesService = serviceFilter === "all" || log.service === serviceFilter
      return matchesSearch && matchesLevel && matchesService
    })
  }, [searchQuery, levelFilter, serviceFilter])

  // Memoize event handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const handleLevelFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevelFilter(e.target.value)
  }, [])

  const handleServiceFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setServiceFilter(e.target.value)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="h-3 w-3" />
            Operational
          </span>
        )
      case "degraded":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
            <AlertTriangle className="h-3 w-3" />
            Degraded
          </span>
        )
      case "down":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <XCircle className="h-3 w-3" />
            Down
          </span>
        )
      default:
        return null
    }
  }

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "info":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            Info
          </span>
        )
      case "warning":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
            <AlertTriangle className="h-3 w-3" />
            Warning
          </span>
        )
      case "error":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <XCircle className="h-3 w-3" />
            Error
          </span>
        )
      case "debug":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            Debug
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
            <Activity className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">System Health & Logs</h1>
            <p className="text-sm sm:text-base text-slate-600">Monitor system health and view activity logs</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all text-sm sm:text-base font-medium text-slate-700">
          <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
          Refresh
        </button>
      </div>

      {/* System Stats Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {systemStats.map((stat) => (
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
                    <ArrowUpRight className="h-4 w-4 text-amber-600" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-green-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-amber-600' : 'text-green-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${
                stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                stat.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                'bg-green-100 text-green-600'
              }`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    stat.status === 'normal' ? 'bg-green-500' :
                    stat.status === 'warning' ? 'bg-amber-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: stat.value }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Services Status */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="px-4 sm:px-6 py-4 border-b border-slate-200">
          <h2 className="text-base sm:text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Server className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400" />
            Service Status
          </h2>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <div
                key={service.name}
                className="p-4 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm sm:text-base font-medium text-slate-800">{service.name}</h3>
                  {getStatusBadge(service.status)}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-500">Uptime</span>
                    <span className="text-slate-700 font-medium">{service.uptime}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-500">Response</span>
                    <span className="text-slate-700 font-medium">{service.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-500">Last Check</span>
                    <span className="text-slate-700 font-medium">{service.lastCheck}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Logs */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Filters and Search */}
        <div className="p-4 sm:p-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search logs by message or service..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm sm:text-base"
              />
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={levelFilter}
                onChange={handleLevelFilterChange}
                className="px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm sm:text-base bg-white"
              >
                <option value="all">All Levels</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
                <option value="debug">Debug</option>
              </select>
            </div>

            {/* Service Filter */}
            <select
              value={serviceFilter}
              onChange={handleServiceFilterChange}
              className="px-4 py-2.5 sm:py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm sm:text-base bg-white"
            >
              <option value="all">All Services</option>
              <option value="API Server">API Server</option>
              <option value="Database">Database</option>
              <option value="Payment Gateway">Payment Gateway</option>
              <option value="Email Service">Email Service</option>
              <option value="Auth Service">Auth Service</option>
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
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Timestamp</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Level</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Service</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Message</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">User ID</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">IP Address</th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm text-slate-600 font-mono">{log.timestamp}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    {getLevelBadge(log.level)}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm text-slate-800">{log.service}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <p className="text-sm text-slate-800 max-w-md truncate">{log.message}</p>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm text-slate-600 font-mono">{log.userId || "-"}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm text-slate-600 font-mono">{log.ip}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="View Details">
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

        {/* Mobile Card View */}
        <div className="md:hidden px-4 sm:px-6 py-4 space-y-3">
          {filteredLogs.map((log) => (
            <div key={log.id} className="bg-white border rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 font-semibold text-sm shrink-0">
                  {log.service.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900 truncate">{log.service}</span>
                    {getLevelBadge(log.level)}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 truncate">{log.message}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Time</p>
                    <p className="text-sm font-semibold text-slate-900 font-mono">{log.timestamp.split(' ')[1]}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">IP</p>
                    <p className="text-sm font-semibold text-slate-900 font-mono truncate max-w-20">{log.ip}</p>
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
            Showing <span className="font-medium text-slate-800">1</span> to <span className="font-medium text-slate-800">{filteredLogs.length}</span> of <span className="font-medium text-slate-800">{logs.length}</span> logs
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
