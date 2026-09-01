"use client"

import { Users } from "lucide-react"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 sm:p-4 rounded-lg bg-primary/10 text-primary">
          <Users className="h-6 w-6 sm:h-7 sm:w-7" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Super Admin Users</h1>
          <p className="text-sm sm:text-base text-slate-600">Manage super admin user accounts</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-8 sm:p-12 text-center shadow-sm">
        <Users className="h-16 w-16 sm:h-20 sm:w-20 text-slate-300 mx-auto mb-4" />
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-2">User Management</h2>
        <p className="text-sm sm:text-base text-slate-600">This page is under development</p>
      </div>
    </div>
  )
}
