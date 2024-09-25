import { Skeleton } from "@/components/ui/skeleton";

export function EditStudentFormSkeleton() {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="flex flex-col items-center md:flex-row gap-4">
        <div className="w-full md:w-[350px] space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="w-full md:w-[350px] space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <Skeleton className="h-10 w-40 mt-20" />
    </div>
  );
}
