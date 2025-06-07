import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header skeleton */}
      <div>
        <Skeleton className="h-8 w-32 mb-4" />
        <Skeleton className="h-10 w-3/4" />
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content skeleton */}
        <div className="col-span-2 flex flex-col gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        
        {/* Sidebar skeleton */}
        <div className="flex flex-col gap-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
}
