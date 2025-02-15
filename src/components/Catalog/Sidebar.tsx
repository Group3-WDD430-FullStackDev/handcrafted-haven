"use client";

import { JSX, useState } from "react";
import FilterSection from "./FilterSection";
import clsx from "clsx";
import { categories, users } from "@prisma/client";
import { useSearchParams, useRouter } from "next/navigation";
import PriceFilter from "./PriceFilter";

export default function Sidebar({
  className = "",
  categories,
  sellers = [],
  minPrice,
  maxPrice,
}: {
  className?: string;
  categories: categories[];
  sellers: users[];
  minPrice?: number;
  maxPrice?: number;
}): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
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

  // Function to reset all filters
  const resetFilters = () => {
    const params = new URLSearchParams();
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const categoryOptions = categories.map((x) => ({
    id: x.cat_id,
    name: x.cat_name,
  }));
  const sellerOptions = sellers.map((x) => ({
    id: x.user_id,
    name: x.displayName,
  }));

  const ShowButton = (
    <button
      aria-label="Open Filter Bar"
      type="button"
      className={clsx(
        "sm_md:hidden p-1 items-center flex justify-center w-[50px] h-[50px]",
        className
      )}
      onClick={() => {
        setIsOpen(true);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-10 stroke-black dark:stroke-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
  );

  const ShowMask = (
    <div
      className={clsx(
        "w-full h-full backdrop-blur-md overflow-hidden transition-all duration-300 row-span-4",
        className,
        {
          "max-w-[0] sm_md:max-w-[100%] bg-black/0": !isOpen,
          "max-w-[100%] bg-slate-300/20": isOpen,
        }
      )}
      onClick={() => setIsOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col rounded-md bg-white border-l-2 border-t-2 sm:border-2 border-handcraftedSlate-400 absolute sm_md:relative right-0 sm_md:mx-0 w-[200px] my-5"
      >
        <span className="w-full text-xl bg-handcraftedSlate-100 text-center">
          Filters
        </span>
        <div className="flex flex-col sticky gap-2 p-3">
          <PriceFilter minPrice={minPrice} maxPrice={maxPrice} />

          {sellers.length > 0 && (
            <FilterSection title="Seller" options={sellerOptions} />
            )}

          {categories.length > 0 && (
            <FilterSection title="Category" options={categoryOptions} />
            )}
            
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 p-2 bg-gray-200 text-black rounded-md hover:bg-gray-300"
          >
            Reset Filters
          </button>
        </div>
        <div className="h-full w-[3px] bg-[#eee5e9]" />
      </div>
    </div>
  );

  return (
    <>
      {ShowButton}
      {ShowMask}
    </>
  );
}
