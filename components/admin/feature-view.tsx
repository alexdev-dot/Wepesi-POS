"use client"

import { X, Clock, Users, TrendingUp, CheckCircle, AlertCircle, Calendar, Tag, Target, Zap } from "@/components/admin/icons"

interface FeatureViewProps {
  feature: {
    id: number
    name: string
    description: string
    category: string
    status: string
    priority: string
    usage: string
    lastUpdated: string
    details?: {
      version?: string
      releaseDate?: string
      documentation?: string
      dependencies?: string[]
      metrics?: {
        satisfaction?: string
        bugs?: string
        requests?: string
      }
    }
  }
  onClose: () => void
}

export function FeatureView({ feature, onClose }: FeatureViewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "development":
        return "bg-amber-100 text-amber-700"
      case "deprecated":
        return "bg-red-100 text-red-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700"
      case "medium":
        return "bg-amber-100 text-amber-700"
      case "low":
        return "bg-slate-100 text-slate-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  return (
    <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Feature Details</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Feature Name and Description */}
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="text-2xl font-bold text-slate-800">{feature.name}</h3>
              <div className="flex gap-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(feature.status)}`}>
                  {feature.status.charAt(0).toUpperCase() + feature.status.slice(1)}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(feature.priority)}`}>
                  {feature.priority.charAt(0).toUpperCase() + feature.priority.slice(1)} Priority
                </span>
              </div>
            </div>
            <p className="text-slate-600">{feature.description}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-slate-600">Active Users</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">{feature.usage}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-slate-600">Usage Trend</span>
              </div>
              <p className="text-2xl font-bold text-green-600">+12.5%</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium text-slate-600">Performance</span>
              </div>
              <p className="text-2xl font-bold text-amber-600">98.2%</p>
            </div>
          </div>

          {/* Feature Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-slate-700">Category</span>
                </div>
                <p className="text-slate-800">{feature.category}</p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-slate-700">Last Updated</span>
                </div>
                <p className="text-slate-800">{feature.lastUpdated}</p>
              </div>

              {feature.details?.version && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-slate-700">Version</span>
                  </div>
                  <p className="text-slate-800">{feature.details.version}</p>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {feature.details?.metrics && (
                <>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-semibold text-slate-700">User Satisfaction</span>
                    </div>
                    <p className="text-slate-800">{feature.details.metrics.satisfaction}</p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <span className="text-sm font-semibold text-slate-700">Open Bugs</span>
                    </div>
                    <p className="text-slate-800">{feature.details.metrics.bugs}</p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold text-slate-700">Feature Requests</span>
                    </div>
                    <p className="text-slate-800">{feature.details.metrics.requests}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Dependencies */}
          {feature.details?.dependencies && feature.details.dependencies.length > 0 && (
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-slate-700">Dependencies</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {feature.details.dependencies.map((dep, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-card border border-slate-200 rounded-lg text-sm text-slate-700"
                  >
                    {dep}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Documentation Link */}
          {feature.details?.documentation && (
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-800">Documentation Available</span>
                </div>
                <a
                  href={feature.details.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Docs →
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
            Edit Feature
          </button>
        </div>
      </div>
    </div>
  )
}
