"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { JSX } from "react";

export default function FilterSection({
  title,
  options,
  selectedOptions, 
  onChange, 
}: {
  title: string;
  options: {
    id: number;
    name: string;
  }[];
  selectedOptions: number[]; // Track selected options as an array of ids
  onChange: (selectedIds: number[]) => void; // Handler to update selected options
}): JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Memoize the filters to prevent unnecessary recalculations
  const filterString = searchParams.get(title) || "";
  const filters = useMemo(() => (filterString ? filterString.split(",") : []), [filterString]);

  const [isOpen, setIsOpen] = useState(false);

  // Sync component state with selected options to manage accordion open/close
  useEffect(() => {
    if (filters.length > 0 || selectedOptions.length > 0) {
      setIsOpen(true); // Keep the accordion open if there are filters or selected options
    }
  }, [filters, selectedOptions]);

  // Update the URL and selected options based on the current state
  function setURL(value: string) {
    const newSelectedOptions = [...selectedOptions];
    const optionId = parseInt(value);

    // Toggle the selection of the filter
    if (newSelectedOptions.includes(optionId)) {
      const index = newSelectedOptions.indexOf(optionId);
      newSelectedOptions.splice(index, 1);
    } else {
      newSelectedOptions.push(optionId);
    }

    // Update the parent with the new selected options
    onChange(newSelectedOptions);

    const params = new URLSearchParams(searchParams.toString());
    params.set(title, newSelectedOptions.join(","));
    router.push(`?${params.toString()}`, { scroll: false });
    // Update the URL parameters
    // const url = new URL(window.location.href);
    // const newFilters = newSelectedOptions.join(",");
    // url.searchParams.set(title, newFilters);
    // window.history.pushState({}, "", url.toString());
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden text-black">
      <button
        type="button"
        className="w-full flex items-center justify-between p-3 bg-gray-100 hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)} // Toggle the accordion on click
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
                onClick={() => setURL(option_id)} // Toggle the filter on click
                htmlFor={filter_id}
                key={filter_id}
                className="flex items-center gap-2 p-1 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name={filter_id}
                  id={filter_id}
                  checked={selectedOptions.includes(option.id)} // Use controlled value
                  onChange={() => setURL(option_id)} // Add the onChange handler
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
