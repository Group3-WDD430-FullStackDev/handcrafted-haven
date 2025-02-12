"use client";

import { JSX } from "react";
import { montserrat } from "../fonts";
import clsx from "clsx";
import Link from "next/link";
// import SearchBar from "../SearchBar";

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

        {/* Action Buttons Bar */}
        <div className="grid grid-cols-[1fr_auto] absolute bottom-3 p-2 w-full max-w-[600px] left-1/2 transform -translate-x-1/2">
          {/* ACtion Buttons Bar Title - Hidden on smaller screens */}
          <h3 className="col-span-2 text-center text-3xl text-white hidden sm:block pb-2">
            Discover Amazing Products
          </h3>
          <div className="w-full relative flex flex-row justify-center gap-9 mb-9">
            <Link href="/catalog">
              <button className="bg-handcraftedBlue-400 hover:bg-handcraftedBlue-200 text-black font-bold py-2 px-4 bg-handcraftedBlue-700 hover:bg-handcraftedBlue-500 rounded">
                View Catalog
              </button>
            </Link>
            <Link href="/sellers">
              <button className="bg-handcraftedBlue-400 hover:bg-handcraftedBlue-200 text-black font-bold py-2 px-4 bg-handcraftedBlue-700 hover:bg-handcraftedBlue-500 rounded">
                View Sellers
              </button>
            </Link>
          </div>
          {/* <SearchBar /> */}
        </div>
      </div>
    </div>
  );
}
