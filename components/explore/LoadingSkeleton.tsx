export default function LoadingSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
        >
          <div className="h-56 animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%]" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-3/4 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-3 w-1/2 animate-pulse rounded-lg bg-gray-100" />
            <div className="flex gap-2 pt-1">
              <div className="h-6 w-14 animate-pulse rounded-lg bg-gray-100" />
              <div className="h-6 w-16 animate-pulse rounded-lg bg-gray-100" />
            </div>
            <div className="h-10 w-full animate-pulse rounded-xl bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
