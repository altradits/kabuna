"use client";

import type { LucideIcon } from "lucide-react";
import { Coffee } from "lucide-react";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { getCoffeeImage } from "@/lib/data/kabuna-coffee-data";

type ProductImageProps = Omit<ImageProps, "src"> & {
  src: string | null | undefined;
  iconClassName?: string;
  icon?: LucideIcon;
};

export function ProductImage({
  src,
  iconClassName = "w-8 h-8",
  icon: Icon = Coffee,
  onError,
  fetchPriority,
  ...rest
}: ProductImageProps): React.JSX.Element {
  const [hasError, setHasError] = useState(false);

  const isInvalidOrLocalhost =
    !src ||
    src.includes("localhost:") ||
    src.includes("127.0.0.1") ||
    src.includes("/rails/active_storage");

  const fallbackSrc = getCoffeeImage(rest.alt?.toString());
  const resolvedSrc = isInvalidOrLocalhost ? fallbackSrc || src : src;
  const effectiveSrc = (hasError ? fallbackSrc : resolvedSrc) || fallbackSrc;

  if (
    !effectiveSrc ||
    (hasError && (!fallbackSrc || fallbackSrc === resolvedSrc))
  ) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-50/80 via-stone-100 to-amber-100/50 text-amber-700/60">
        <Icon className={iconClassName} />
      </div>
    );
  }

  return (
    <Image
      src={effectiveSrc}
      onError={(e) => {
        if (!hasError && fallbackSrc && fallbackSrc !== resolvedSrc) {
          setHasError(true);
        } else {
          setHasError(true);
          onError?.(e);
        }
      }}
      fetchPriority={fetchPriority}
      loading={fetchPriority === "high" ? "eager" : undefined}
      {...rest}
    />
  );
}
