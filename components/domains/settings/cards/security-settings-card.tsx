"use client"

import { Shield } from "lucide-react"

interface SecuritySettings {
  sessionTimeout: string
  requirePassword: boolean
  twoFactorAuth: boolean
}

interface SecuritySettingsCardProps {
  securitySettings: SecuritySettings
  onChange: (settings: SecuritySettings) => void
}

export function SecuritySettingsCard({ securitySettings, onChange }: SecuritySettingsCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600 shadow-sm  ">
          <Shield className="h-5 w-5" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
          <p className="text-xs text-muted-foreground">Configure security options</p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Session Timeout</label>
          <select
            value={securitySettings.sessionTimeout}
            onChange={(e) => onChange({ ...securitySettings, sessionTimeout: e.target.value })}
            className="h-10 w-full px-3 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Require Password for Sensitive Actions</label>
          <button
            onClick={() => onChange({ ...securitySettings, requirePassword: !securitySettings.requirePassword })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${securitySettings.requirePassword ? 'bg-blue-600' : 'bg-muted'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-card transition-transform ${securitySettings.requirePassword ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Two-Factor Authentication</label>
          <button
            onClick={() => onChange({ ...securitySettings, twoFactorAuth: !securitySettings.twoFactorAuth })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${securitySettings.twoFactorAuth ? 'bg-blue-600' : 'bg-muted'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-card transition-transform ${securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>
    </div>
  )
}
