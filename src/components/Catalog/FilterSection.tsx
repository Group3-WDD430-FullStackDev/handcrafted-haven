"use client";
import { useSearchParams } from "next/navigation";
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
    <div className="flex flex-col p-2">
      <span className="font-bold">{title}</span>
      {options.map((option) => {
        const option_id = option.id.toString();
        const filter_id = `${option.id}-${title}`;
        return (
          <label
            onClick={() => setURL(option_id)}
            htmlFor={filter_id}
            key={filter_id}
            className="flex flex-row items-center justify-start gap-2 p-1"
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
  );
}
