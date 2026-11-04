export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-amber-100 dark:border-slate-800 animate-pulse">
          <div className="h-48 bg-amber-100 dark:bg-slate-800" />
          <div className="p-5 space-y-3">
            <div className="h-5 bg-amber-100 dark:bg-slate-800 rounded-full w-3/4" />
            <div className="h-4 bg-amber-100 dark:bg-slate-800 rounded-full w-1/2" />
            <div className="h-4 bg-amber-100 dark:bg-slate-800 rounded-full w-full" />
            <div className="h-9 bg-amber-100 dark:bg-slate-800 rounded-full w-1/3 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}