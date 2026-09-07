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
    <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 shadow-sm  ">
          <Bell className="h-6 w-6" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">Notification Settings</h3>
          <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
        </div>
      </div>
      <div className="space-y-5">
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <label className="text-sm font-medium text-foreground block">Low Stock Alerts</label>
            <p className="text-xs text-muted-foreground mt-1">Get notified when inventory is low</p>
          </div>
          <button
            onClick={() => onChange({ ...notificationSettings, lowStockAlerts: !notificationSettings.lowStockAlerts })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notificationSettings.lowStockAlerts ? 'bg-blue-600' : 'bg-muted'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-card transition-transform ${notificationSettings.lowStockAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <label className="text-sm font-medium text-foreground block">Email Notifications</label>
            <p className="text-xs text-muted-foreground mt-1">Receive updates via email</p>
          </div>
          <button
            onClick={() => onChange({ ...notificationSettings, emailNotifications: !notificationSettings.emailNotifications })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notificationSettings.emailNotifications ? 'bg-blue-600' : 'bg-muted'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-card transition-transform ${notificationSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <label className="text-sm font-medium text-foreground block">Push Notifications</label>
            <p className="text-xs text-muted-foreground mt-1">Receive in-app notifications</p>
          </div>
          <button
            onClick={() => onChange({ ...notificationSettings, pushNotifications: !notificationSettings.pushNotifications })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notificationSettings.pushNotifications ? 'bg-blue-600' : 'bg-muted'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-card transition-transform ${notificationSettings.pushNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <label className="text-sm font-medium text-foreground block">Daily Sales Report</label>
            <p className="text-xs text-muted-foreground mt-1">Get daily sales summary</p>
          </div>
          <button
            onClick={() => onChange({ ...notificationSettings, dailySalesReport: !notificationSettings.dailySalesReport })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notificationSettings.dailySalesReport ? 'bg-blue-600' : 'bg-muted'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-card transition-transform ${notificationSettings.dailySalesReport ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>
    </div>
  )
}
