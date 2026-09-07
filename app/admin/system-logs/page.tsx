"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { Activity, Server, AlertTriangle, CheckCircle, XCircle, Search, Filter, Download, MoreVertical, Eye, RefreshCw, Loader2, Trash2, X } from "lucide-react"

interface AuditLog {
  id: string
  admin_id: string | null
  action: string
  resource: string | null
  details: any
  ip_address: string | null
  user_agent: string | null
  success: boolean
  created_at: string
  super_admins?: { email: string }
}

export default function SystemLogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [actionFilter, setActionFilter] = useState("all")
  const [successFilter, setSuccessFilter] = useState("all")
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [totalLogs, setTotalLogs] = useState(0)
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [logToDelete, setLogToDelete] = useState<AuditLog | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch audit logs
  const fetchLogs = useCallback(async () => {
    setError("")
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "50"
      })
      if (actionFilter !== "all") params.append("action", actionFilter)
      if (successFilter !== "all") params.append("success", successFilter)

      const response = await fetch(`/api/admin/audit-logs?${params}`)
      const data = await response.json()

      if (response.ok) {
        setLogs(data.logs || [])
        setTotalLogs(data.pagination?.total || 0)
      } else {
        setError(data.error || "Failed to fetch audit logs")
      }
    } catch (err) {
      setError("Network error while fetching logs")
    }
  }, [page, actionFilter, successFilter])

  useEffect(() => {
    fetchLogs()
  }, [fetchLogs])

  // Memoize filtered logs
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = searchQuery === "" || 
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (log.resource && log.resource.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (log.super_admins?.email && log.super_admins.email.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesSearch
    })
  }, [logs, searchQuery])

  // Memoize event handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const handleActionFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setActionFilter(e.target.value)
    setPage(1)
  }, [])

  const handleSuccessFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSuccessFilter(e.target.value)
    setPage(1)
  }, [])

  const handleRefresh = useCallback(() => {
    fetchLogs()
  }, [fetchLogs])

  const handleViewLog = useCallback((log: AuditLog) => {
    setSelectedLog(log)
    setIsViewModalOpen(true)
  }, [])

  const handleCloseViewModal = useCallback(() => {
    setIsViewModalOpen(false)
    setSelectedLog(null)
  }, [])

  const handleDeleteClick = useCallback((log: AuditLog) => {
    setLogToDelete(log)
    setIsDeleteModalOpen(true)
  }, [])

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false)
    setLogToDelete(null)
  }, [])

  const handleDeleteConfirm = useCallback(async () => {
    if (!logToDelete) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/audit-logs?id=${logToDelete.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        handleCloseDeleteModal()
        fetchLogs()
      } else {
        const data = await response.json()
        setError(data.error || "Failed to delete audit log")
      }
    } catch (err) {
      setError("Network error while deleting log")
    } finally {
      setIsDeleting(false)
    }
  }, [logToDelete, fetchLogs, handleCloseDeleteModal])

  const getUniqueActions = useMemo(() => {
    const actions = new Set(logs.map(log => log.action))
    return Array.from(actions).sort()
  }, [logs])

  const getSuccessBadge = (success: boolean) => {
    if (success) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          <CheckCircle className="h-3 w-3" />
          Success
        </span>
      )
    } else {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
          <XCircle className="h-3 w-3" />
          Failed
        </span>
      )
    }
  }

  const getActionBadge = (action: string) => {
    const actionLower = action.toLowerCase()
    if (actionLower.includes("login") || actionLower.includes("logout")) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
          Auth
        </span>
      )
    } else if (actionLower.includes("create") || actionLower.includes("insert") || actionLower.includes("add")) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          Create
        </span>
      )
    } else if (actionLower.includes("update") || actionLower.includes("edit") || actionLower.includes("modify")) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
          Update
        </span>
      )
    } else if (actionLower.includes("delete") || actionLower.includes("remove")) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
          Delete
        </span>
      )
    } else {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
          {action}
        </span>
      )
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
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
        <button 
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all text-sm sm:text-base font-medium text-slate-700"
        >
          <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-center gap-3 text-red-700">
          <AlertTriangle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Activity Logs */}
      <div className="rounded-xl border border-slate-200 bg-card shadow-sm">
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

            {/* Action Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={actionFilter}
                onChange={handleActionFilterChange}
                className="px-4 py-2.5 sm:py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm sm:text-base bg-card text-foreground"
              >
                <option value="all">All Actions</option>
                {getUniqueActions.map(action => (
                  <option key={action} value={action}>{action}</option>
                ))}
              </select>
            </div>

            {/* Success Filter */}
            <select
              value={successFilter}
              onChange={handleSuccessFilterChange}
              className="px-4 py-2.5 sm:py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all text-sm sm:text-base bg-card text-foreground"
            >
              <option value="all">All Status</option>
              <option value="true">Success</option>
              <option value="false">Failed</option>
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
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Action</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Resource</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Admin</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">IP Address</th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 sm:px-6 py-8 text-center">
                    <p className="text-slate-600">No audit logs found</p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 sm:px-6 py-4">
                      <span className="text-sm text-slate-600 font-mono">{formatTimestamp(log.created_at)}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      {getActionBadge(log.action)}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="text-sm text-slate-800">{log.resource || "-"}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="text-sm text-slate-600 font-mono">{log.super_admins?.email || "-"}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      {getSuccessBadge(log.success)}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="text-sm text-slate-600 font-mono">{log.ip_address || "-"}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => handleViewLog(log)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(log)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" 
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
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
        <div className="md:hidden px-4 sm:px-6 py-4 space-y-3">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-8 text-slate-600">
              No audit logs found
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div key={log.id} className="bg-card border rounded-xl p-4 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 font-semibold text-sm shrink-0">
                    {log.action.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900 truncate">{log.action}</span>
                      {getSuccessBadge(log.success)}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 truncate">{log.resource || "No resource"}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-slate-500">Time</p>
                      <p className="text-sm font-semibold text-slate-900 font-mono">{formatTimestamp(log.created_at).split(',')[1] || formatTimestamp(log.created_at)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Admin</p>
                      <p className="text-sm font-semibold text-slate-900 font-mono truncate max-w-20">{log.super_admins?.email || "-"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleViewLog(log)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(log)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="px-4 sm:px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm sm:text-base text-slate-600">
            Showing <span className="font-medium text-slate-800">{filteredLogs.length}</span> of <span className="font-medium text-slate-800">{totalLogs}</span> logs
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
              disabled={filteredLogs.length < 50}
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      {isViewModalOpen && selectedLog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-semibold text-slate-800">Audit Log Details</h2>
              <button 
                onClick={handleCloseViewModal}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Timestamp</p>
                  <p className="text-sm text-slate-800 font-mono">{formatTimestamp(selectedLog.created_at)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Status</p>
                  {getSuccessBadge(selectedLog.success)}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Action</p>
                  <p className="text-sm text-slate-800">{selectedLog.action}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Resource</p>
                  <p className="text-sm text-slate-800">{selectedLog.resource || "-"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Admin Email</p>
                  <p className="text-sm text-slate-800 font-mono">{selectedLog.super_admins?.email || "-"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">IP Address</p>
                  <p className="text-sm text-slate-800 font-mono">{selectedLog.ip_address || "-"}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">User Agent</p>
                <p className="text-sm text-slate-800 break-all">{selectedLog.user_agent || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Details</p>
                <pre className="text-sm text-slate-800 bg-slate-50 p-4 rounded-lg overflow-x-auto">
                  {JSON.stringify(selectedLog.details, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && logToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">Delete Audit Log</h2>
              </div>
              <p className="text-slate-600 mb-6">
                Are you sure you want to delete this audit log? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={handleCloseDeleteModal}
                  disabled={isDeleting}
                  className="px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </>
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
