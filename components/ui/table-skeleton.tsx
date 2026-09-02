export function TableSkeleton({ rows = 5, columns = 6 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-3">
      {/* Header skeleton */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted">
        {Array.from({ length: columns }).map((_, i) => (
          <div
            key={i}
            className="h-4 w-20 bg-muted-foreground/10 rounded animate-pulse"
          />
        ))}
      </div>
      
      {/* Row skeletons */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex items-center gap-2 px-4 py-4 border-b border-border">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className={`h-4 bg-muted-foreground/10 rounded animate-pulse ${
                colIndex === 0 ? 'w-32' : colIndex === 1 ? 'w-24' : 'w-20'
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="h-11 w-11 bg-muted-foreground/10 rounded-xl animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-24 bg-muted-foreground/10 rounded animate-pulse" />
        <div className="h-8 w-32 bg-muted-foreground/10 rounded animate-pulse" />
      </div>
    </div>
  )
}
