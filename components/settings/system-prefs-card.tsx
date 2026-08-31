"use client"

import { Monitor } from "lucide-react"

interface SystemPrefs {
  currency: string
  dateFormat: string
  timeFormat: string
  language: string
  timezone: string
}

interface SystemPrefsCardProps {
  systemPrefs: SystemPrefs
  onChange: (prefs: SystemPrefs) => void
}

export function SystemPrefsCard({ systemPrefs, onChange }: SystemPrefsCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600 shadow-sm">
          <Monitor className="h-5 w-5" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">System Preferences</h3>
          <p className="text-xs text-slate-500">Configure regional and language settings</p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Currency</label>
          <select
            value={systemPrefs.currency}
            onChange={(e) => onChange({ ...systemPrefs, currency: e.target.value })}
            className="h-10 w-full px-3 text-sm border rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="KSh">KSh - Kenyan Shilling</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Date Format</label>
          <select
            value={systemPrefs.dateFormat}
            onChange={(e) => onChange({ ...systemPrefs, dateFormat: e.target.value })}
            className="h-10 w-full px-3 text-sm border rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Time Format</label>
          <select
            value={systemPrefs.timeFormat}
            onChange={(e) => onChange({ ...systemPrefs, timeFormat: e.target.value })}
            className="h-10 w-full px-3 text-sm border rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="12h">12-hour (AM/PM)</option>
            <option value="24h">24-hour</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Language</label>
          <select
            value={systemPrefs.language}
            onChange={(e) => onChange({ ...systemPrefs, language: e.target.value })}
            className="h-10 w-full px-3 text-sm border rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="en">English</option>
            <option value="sw">Swahili</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Timezone</label>
          <select
            value={systemPrefs.timezone}
            onChange={(e) => onChange({ ...systemPrefs, timezone: e.target.value })}
            className="h-10 w-full px-3 text-sm border rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="Africa/Nairobi">Africa/Nairobi</option>
            <option value="Africa/Cairo">Africa/Cairo</option>
            <option value="Africa/Lagos">Africa/Lagos</option>
            <option value="Europe/London">Europe/London</option>
          </select>
        </div>
      </div>
    </div>
  )
}
