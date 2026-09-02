export default function DashboardLoading() {
  return (
    <div className="space-y-6 p-6">
      {/* Header skeleton */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 bg-slate-200 rounded-xl animate-pulse" />
        <div className="flex-1">
          <div className="h-8 bg-slate-200 rounded animate-pulse w-64 mb-2" />
          <div className="h-4 bg-slate-200 rounded animate-pulse w-96" />
        </div>
      </div>
      
      {/* Stats grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-card p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="h-4 bg-slate-200 rounded animate-pulse w-24 mb-2" />
                <div className="h-8 bg-slate-200 rounded animate-pulse w-32 mb-2" />
                <div className="h-4 bg-slate-200 rounded animate-pulse w-16" />
              </div>
              <div className="h-12 w-12 bg-slate-200 rounded-xl animate-pulse" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Content grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-card p-6 shadow-sm">
          <div className="h-6 bg-slate-200 rounded animate-pulse w-40 mb-6" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-slate-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-card p-6 shadow-sm">
          <div className="h-6 bg-slate-200 rounded animate-pulse w-32 mb-6" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-slate-200 rounded animate-pulse w-full" />
                <div className="h-2 bg-slate-100 rounded-full animate-pulse w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Quick actions skeleton */}
      <div className="rounded-xl border border-slate-200 bg-card p-6 shadow-sm">
        <div className="h-6 bg-slate-200 rounded animate-pulse w-32 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-slate-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
