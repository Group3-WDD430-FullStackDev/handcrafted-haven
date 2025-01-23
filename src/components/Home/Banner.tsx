"use client";

import { JSX, useState } from "react";
import { montserrat } from "../fonts";
import clsx from "clsx";

/**
 * Banner Component that displays a banner image with a title, description, and search bar.
 * @param {string} className - The class name for the component
 * @returns {JSX.Element} The rendered component
 */
export default function Banner({
  className,
}: {
  className: string;
}): JSX.Element {
  function updateSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  // State value to store the search term from the search bar
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Empty search value if there is no search term
  let searchValue: string = "";

  // If there is a search term, add it to the search value
  if (searchTerm) searchValue = `?q=${searchTerm}`;

  return (
    <div
      className={clsx(
        "relative overflow-hidden max-h-[400px] flex items-center",
        className
      )}
    >
      {/* Banner Image */}
      <img
        className="z-0 w-full h-auto"
        src="/Banner.webp"
        alt="Banner Image"
        width="800"
        height="533"
      />

      {/* Banner Light/Dark Overlay */}
      <div className="absolute flex flex-row items-center justify-between top-0 z-[1] w-full h-full rotate-[81deg] [&>div]:w-full [&>div]:h-[120vw] [&>div]:bg-opacity-[0.4]">
        {/* Light Overlay */}
        <div className="bg-white translate-x-[-0%]" />

        {/* Dark Overlay */}
        <div className="bg-black translate-x-[0%]" />
      </div>

      {/* Banner Content */}
      <div className="absolute z-[2] w-full h-full top-0">
        {/* Banner Title and Description */}
        <div className="absolute left-0 top-0 p-5">
          {/* Banner Title */}
          <h1
            className={`flex flex-col text-4xl ${montserrat.className} font-bold`}
          >
            Handcrafted Haven
          </h1>

          {/* Banner Descriptions - Hidden on smaller screens */}
          <p className="py-2 text-lg w-2/3 hidden sm:block">
            Build and Share Your Creative Ideas With Us.
          </p>
        </div>

        {/* Search Bar */}
        <div className="grid grid-cols-[1fr_auto] absolute bottom-3 p-2 w-full max-w-[600px] left-1/2 transform -translate-x-1/2">
          {/* Search Bar Title - Hidden on smaller screens */}
          <h3 className="col-span-2 text-center text-3xl text-white hidden sm:block pb-2">
            Discover Amazing Products
          </h3>

          {/* Search Bar */}
          <label htmlFor="search" aria-label="Search" className="ml-5">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Explore"
              className="w-full h-full rounded-l-lg p-2"
              onInput={updateSearch}
            />
          </label>

          {/* Submit Button */}
          <a
            type="submit"
            href={`/catalog${searchValue}`}
            className="w-[60px] h-[40px] bg-[#92DCE5] rounded-r-lg mr-5 flex items-center justify-center hover:brightness-90"
          >
            GO
          </a>
        </div>
      </div>
    </div>
  );
}
