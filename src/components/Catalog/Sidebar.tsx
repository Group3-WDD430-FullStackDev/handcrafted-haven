"use client";

import { JSX, useState } from "react";
import FilterSection from "./FilterSection";
import clsx from "clsx";
import { categories } from "@prisma/client";

export default function Sidebar({
  className = "",
  categories,
}: {
  className?: string;
  categories: categories[];
}): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const ShowButton = (
    <button
      aria-label="Filters"
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
        "w-full h-full backdrop-blur-md overflow-hidden transition-all duration-300",
        className,
        {
          "max-w-[0] sm_md:max-w-[100%] bg-black/0": !isOpen,
          "max-w-[100%] bg-slate-300/20": isOpen,
        }
      )}
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div className="flex flex-col h-full rounded-md bg-white border-l-2 border-t-2 sm:border-2 border-handcraftedSlate-400 absolute sm_md:relative right-0 sm_md:mx-0 w-[200px] my-5">
        <span className="w-full text-xl bg-handcraftedSlate-100 text-center">
          Filters
        </span>
        <div className="flex flex-col sticky gap-2 ">
          {/* <FilterSection
            title="Seller"
            options={[
              {cat_id:1, cat_name:"Seller 1" },
              {cat_id:2, cat_name:"Seller 2" },
              {cat_id:3, cat_name:"Seller 3"}
            ]}
          /> */}
          <FilterSection title="Category" options={categories} />
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
