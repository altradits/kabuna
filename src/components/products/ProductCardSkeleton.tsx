import type * as React from "react";

/**
 * Skeleton placeholder for a single product card.
 * Matches the layout of `<ProductCard>` — no border, rounded image,
 * text placeholders below.
 */
export function ProductCardSkeleton(): React.JSX.Element {
  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-stone-200/80 overflow-hidden animate-pulse">
      <div className="aspect-square bg-stone-200" />
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <div className="h-4 bg-stone-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-stone-100 rounded w-1/2 mb-4" />
        <div className="mt-auto pt-2.5 sm:pt-3 flex flex-wrap items-center justify-between gap-y-2 gap-x-2">
          <div className="h-4 sm:h-5 bg-stone-200 rounded w-12 sm:w-16" />
          <div className="h-[30px] sm:h-[34px] bg-stone-200 rounded-full w-20 sm:w-24 shrink-0" />
        </div>
      </div>
    </div>
  );
}
