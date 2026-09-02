"use client"

import { Palette } from "lucide-react"

interface DisplaySettings {
  theme: string
  sidebarDefault: string
  itemsPerPage: string
}

interface DisplaySettingsCardProps {
  displaySettings: DisplaySettings
  onChange: (settings: DisplaySettings) => void
}

export function DisplaySettingsCard({ displaySettings, onChange }: DisplaySettingsCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-100 text-pink-600 shadow-sm  ">
          <Palette className="h-5 w-5" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Display Settings</h3>
          <p className="text-xs text-muted-foreground">Customize the appearance</p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Theme</label>
          <select
            value={displaySettings.theme}
            onChange={(e) => onChange({ ...displaySettings, theme: e.target.value })}
            className="h-10 w-full px-3 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="light">Light</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Sidebar Default State</label>
          <select
            value={displaySettings.sidebarDefault}
            onChange={(e) => onChange({ ...displaySettings, sidebarDefault: e.target.value })}
            className="h-10 w-full px-3 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="expanded">Expanded</option>
            <option value="collapsed">Collapsed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Items Per Page</label>
          <select
            value={displaySettings.itemsPerPage}
            onChange={(e) => onChange({ ...displaySettings, itemsPerPage: e.target.value })}
            className="h-10 w-full px-3 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="10">10 items</option>
            <option value="25">25 items</option>
            <option value="50">50 items</option>
            <option value="100">100 items</option>
          </select>
        </div>
      </div>
    </div>
  )
}
