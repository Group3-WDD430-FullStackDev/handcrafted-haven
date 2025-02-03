"use client";

import { JSX } from "react";
import FilterSection from "./FilterSection";
import clsx from "clsx";

export default function Sidebar({
  className = "",
}: {
  className?: string;
}): JSX.Element {
  return (
    <div className={clsx("flex flex-col h-fit rounded-md", className)}>
      <span className="w-full text-xl bg-handcraftedSlate-100 text-center">
        Filters
      </span>
      <div className="flex flex-col sticky gap-2 ">
        <FilterSection
          title="Seller"
          options={["Seller 1", "Seller 2", "Seller 3"]}
        />
        <FilterSection title="Category" options={["Cat 1", "Cat 2", "Cat 3"]} />
      </div>
      <div className="h-full w-[3px] bg-[#eee5e9]" />
    </div>
  );
}
