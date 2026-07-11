import Skeleton from "react-loading-skeleton";

export default function PageSkeleton() {
  return (
    <div className="space-y-8 px-6 py-8 md:px-10 md:py-10">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton circle width={56} height={56} />
          <div className="space-y-2">
            <Skeleton width={180} height={18} />
            <Skeleton width={120} height={12} />
          </div>
        </div>
        <Skeleton width={140} height={40} />
      </div>

      <Skeleton height={360} className="rounded-3xl" />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <Skeleton height={18} width="55%" />
          <Skeleton height={14} count={4} />
          <Skeleton height={200} className="rounded-2xl" />
        </div>
        <div className="space-y-4">
          <Skeleton height={180} className="rounded-2xl" />
          <Skeleton height={220} className="rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
