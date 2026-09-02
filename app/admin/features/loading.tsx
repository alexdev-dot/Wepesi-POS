export default function FeaturesLoading() {
  return (
    <div className="space-y-6 p-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 bg-slate-200 rounded-xl animate-pulse" />
          <div>
            <div className="h-8 bg-slate-200 rounded animate-pulse w-48 mb-2" />
            <div className="h-4 bg-slate-200 rounded animate-pulse w-64" />
          </div>
        </div>
        <div className="h-10 w-40 bg-slate-200 rounded-lg animate-pulse" />
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
      
      {/* Table skeleton */}
      <div className="rounded-xl border border-slate-200 bg-card shadow-sm">
        {/* Filters skeleton */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 h-10 bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-10 w-40 bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-10 w-32 bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-10 w-24 bg-slate-200 rounded-lg animate-pulse" />
          </div>
        </div>
        
        {/* Table header skeleton */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200">
          <div className="flex gap-4">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-4 bg-slate-200 rounded animate-pulse flex-1" />
            ))}
          </div>
        </div>
        
        {/* Table rows skeleton */}
        <div className="divide-y divide-slate-200">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="px-6 py-4">
              <div className="flex gap-4">
                {[...Array(7)].map((_, j) => (
                  <div key={j} className="h-4 bg-slate-100 rounded animate-pulse flex-1" />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination skeleton */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="h-4 bg-slate-200 rounded animate-pulse w-48" />
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-8 w-10 bg-slate-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
