"use client";

import { JSX, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import clsx from "clsx";

export default function PriceFilter({
  minPrice,
  maxPrice,
}: {
  minPrice?: number;
  maxPrice?: number;
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

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden text-black">
      <button
        type="button"
        className="w-full flex items-center justify-between p-3 bg-gray-100 hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold">Price Range</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="p-2 border-t border-gray-300">
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className="border p-1 rounded w-1/2"
              defaultValue={minPrice || ""}
              onBlur={(e) => updateFilters("minPrice", e.target.value || null)}
            />
            <input
              type="number"
              placeholder="Max"
              className="border p-1 rounded w-1/2"
              defaultValue={maxPrice || ""}
              onBlur={(e) => updateFilters("maxPrice", e.target.value || null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
