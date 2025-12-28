export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-20 animate-pulse space-y-8">
      {/* Hero Skeleton */}
      <div className="h-64 sm:h-96 bg-muted rounded-xl w-full" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-square bg-muted rounded-xl w-full" />
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
