"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { JSX } from "react";

export default function FilterSection({
  title,
  options,
}: {
  title: string;
  options: {
    id: number;
    name: string;
  }[];
}): JSX.Element {
  const searchParams = useSearchParams();
  const filterString = searchParams.get(title) || "";
  const filters = filterString ? filterString.split(",") : [];

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (filters.length > 0) {
      setIsOpen(true);
    }
  }, [filters]);

  function setURL(value: string) {
    const url = new URL(window.location.href);
    if (filters.includes(value)) {
      filters.splice(filters.indexOf(value), 1);
    } else {
      filters.push(value);
    }
    const newFilters = filters.join(",");
    url.searchParams.set(title, newFilters);
    window.location.href = url.toString();
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden text-black">
      <button
        type="button"
        className="w-full flex items-center justify-between p-3 bg-gray-100 hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold">{title}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
        </svg>
      </button>
      {isOpen && (
        <div className="p-2 border-t border-gray-300">
          {options.map((option) => {
            const option_id = option.id.toString();
            const filter_id = `${option.id}-${title}`;
            return (
              <label
                onClick={() => setURL(option_id)}
                htmlFor={filter_id}
                key={filter_id}
                className="flex items-center gap-2 p-1 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name={filter_id}
                  id={filter_id}
                  defaultChecked={filters.includes(option_id)}
                />
                {option.name}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
