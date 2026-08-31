"use client"

import { ShieldCheck } from "lucide-react"

export default function PermissionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-primary/10 text-primary">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Roles & Permissions</h1>
          <p className="text-slate-600">Configure user roles and system permissions</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
        <ShieldCheck className="h-16 w-16 text-slate-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-slate-800 mb-2">Permissions Management</h2>
        <p className="text-slate-600">This page is under development</p>
      </div>
    </div>
  )
}
