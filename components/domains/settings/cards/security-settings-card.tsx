"use client"

import { useState } from "react"
import { Shield, Lock, Eye, EyeOff, KeyRound } from "lucide-react"

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
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [passwordMessage, setPasswordMessage] = useState({ type: "", text: "" })
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const handlePasswordChange = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordMessage({ type: "error", text: "Please fill in all password fields" })
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({ type: "error", text: "New passwords do not match" })
      return
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordMessage({ type: "error", text: "Password must be at least 8 characters" })
      return
    }

    setIsChangingPassword(true)
    setPasswordMessage({ type: "", text: "" })

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      })

      const data = await response.json()

      if (response.ok) {
        setPasswordMessage({ type: "success", text: "Password updated successfully" })
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      } else {
        setPasswordMessage({ type: "error", text: data.error || "Failed to update password" })
      }
    } catch (error) {
      setPasswordMessage({ type: "error", text: "Network error occurred" })
    } finally {
      setIsChangingPassword(false)
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600 shadow-sm  ">
          <Shield className="h-6 w-6" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">Security Settings</h3>
          <p className="text-sm text-muted-foreground">Configure security options</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Session Timeout */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Session Timeout</label>
          <select
            value={securitySettings.sessionTimeout}
            onChange={(e) => onChange({ ...securitySettings, sessionTimeout: e.target.value })}
            className="h-11 w-full px-4 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
          </select>
        </div>

        {/* Require Password Toggle */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <label className="text-sm font-medium text-foreground block">Require Password for Sensitive Actions</label>
            <p className="text-xs text-muted-foreground mt-1">Extra security for important actions</p>
          </div>
          <button
            onClick={() => onChange({ ...securitySettings, requirePassword: !securitySettings.requirePassword })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${securitySettings.requirePassword ? 'bg-blue-600' : 'bg-muted'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-card transition-transform ${securitySettings.requirePassword ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        {/* Two-Factor Auth Toggle */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <label className="text-sm font-medium text-foreground block">Two-Factor Authentication</label>
            <p className="text-xs text-muted-foreground mt-1">Add an extra layer of security</p>
          </div>
          <button
            onClick={() => onChange({ ...securitySettings, twoFactorAuth: !securitySettings.twoFactorAuth })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${securitySettings.twoFactorAuth ? 'bg-blue-600' : 'bg-muted'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-card transition-transform ${securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        {/* Password Change Section */}
        <div className="pt-6 border-t border-border">
          <div className="flex items-center gap-2 mb-5">
            <KeyRound className="h-5 w-5 text-foreground" />
            <h4 className="text-base font-semibold text-foreground">Change Password</h4>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full px-4 py-3 pr-12 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-4 py-3 pr-12 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Enter new password (min 8 characters)"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 pr-12 text-sm border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button
              onClick={handlePasswordChange}
              disabled={isChangingPassword}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isChangingPassword ? "Updating..." : "Update Password"}
            </button>
            {passwordMessage.text && (
              <div className={`p-4 rounded-lg text-sm ${passwordMessage.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                {passwordMessage.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
