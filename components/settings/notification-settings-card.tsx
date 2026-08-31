"use client"

import { Bell } from "lucide-react"

interface NotificationSettings {
  lowStockAlerts: boolean
  emailNotifications: boolean
  pushNotifications: boolean
  dailySalesReport: boolean
}

interface NotificationSettingsCardProps {
  notificationSettings: NotificationSettings
  onChange: (settings: NotificationSettings) => void
}

export function NotificationSettingsCard({ notificationSettings, onChange }: NotificationSettingsCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600 shadow-sm">
          <Bell className="h-5 w-5" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Notification Settings</h3>
          <p className="text-xs text-slate-500">Manage your notification preferences</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">Low Stock Alerts</label>
          <button
            onClick={() => onChange({ ...notificationSettings, lowStockAlerts: !notificationSettings.lowStockAlerts })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notificationSettings.lowStockAlerts ? 'bg-blue-600' : 'bg-slate-200'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationSettings.lowStockAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">Email Notifications</label>
          <button
            onClick={() => onChange({ ...notificationSettings, emailNotifications: !notificationSettings.emailNotifications })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notificationSettings.emailNotifications ? 'bg-blue-600' : 'bg-slate-200'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">Push Notifications</label>
          <button
            onClick={() => onChange({ ...notificationSettings, pushNotifications: !notificationSettings.pushNotifications })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notificationSettings.pushNotifications ? 'bg-blue-600' : 'bg-slate-200'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationSettings.pushNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">Daily Sales Report</label>
          <button
            onClick={() => onChange({ ...notificationSettings, dailySalesReport: !notificationSettings.dailySalesReport })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notificationSettings.dailySalesReport ? 'bg-blue-600' : 'bg-slate-200'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationSettings.dailySalesReport ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>
    </div>
  )
}
