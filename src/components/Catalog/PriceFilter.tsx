"use client";

import { JSX } from "react";
import { useSearchParams, useRouter } from "next/navigation";
// import clsx from "clsx";

export default function PriceFilter({
  minPrice,
  maxPrice,
  onPriceChange,
}: {
  minPrice?: number | null;
  maxPrice?: number | null;
  onPriceChange: (min: number | null, max: number | null) => void;
}): JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Function to update URL params
  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, key: string) => {
    if (e.key === "Enter") {
      updateFilters(key, (e.target as HTMLInputElement).value || null);
    }
  };

  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
    const value = e.target.value ? +e.target.value : null;
    if (type === "min") {
      onPriceChange(value, maxPrice ?? null); // Update min price
    } else {
      onPriceChange(minPrice ?? null, value); // Update max price
    }
    updateFilters(type === "min" ? "minPrice" : "maxPrice", value?.toString() || null);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden text-black">
      <div className="w-full flex items-center justify-between p-3 bg-gray-100">
        <span className="font-bold">Price Range</span>
      </div>
      <div className="p-2 border-t border-gray-300">
        <div className="flex gap-2">
          <input
            type="number"
            aria-label="Min Price"
            placeholder="Min"
            className="border p-1 rounded w-1/2"
            value={minPrice ?? ""}
            onChange={(e) => handlePriceInputChange(e, "min")}
            onBlur={(e) => updateFilters("minPrice", e.target.value || null)}
            onKeyDown={(e) => handleKeyDown(e, "minPrice")}
          />
          <input
            type="number"
            aria-label="Max Price"
            placeholder="Max"
            className="border p-1 rounded w-1/2"
            value={maxPrice ?? ""}
            onChange={(e) => handlePriceInputChange(e, "max")}
            onBlur={(e) => updateFilters("maxPrice", e.target.value || null)}
            onKeyDown={(e) => handleKeyDown(e, "maxPrice")}
          />
        </div>
      </div>
    </div>
  );
}
