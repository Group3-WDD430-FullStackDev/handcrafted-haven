import { categories, users } from "@prisma/client";
import CardsLayout from "./CardsLayout";
import Pagination from "./Pagination";
import Sidebar from "./Sidebar";
import { IProduct } from "@/typing/IProduct";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { JSX } from "react";
import { IUserCard } from "@/typing/ICards";

/**
 * CardCatalog Component
 *
 * This component displays a catalog of cards with optional filters,
 * pagination, and additional UI elements.
 *
 * @param {string} title - The title of the catalog.
 * @param {IProduct[]|IUserCard[]} cards - An array of product/seller cards to display.
 * @param {boolean} usesSellerCard - Boolean indicating if the cards are sellers.
 * @param {categories[]} categories - An array of categories for filtering.
 * @param {users[]} sellers - An array of sellers for filtering.
 * @param {boolean} isUserOwner - Boolean indicating if the user is the owner.
 * @param {number} currentPage - The current page number for pagination.
 * @param {number} pageCount - Total number of pages available.
 * @param {string} [className] - Optional additional class names for styling.
 *
 * @returns {JSX.Element} The rendered CardCatalog component.
 */
export default function CardCatalog({
  title,
  usesSellerCard = false,
  cards,
  categories,
  sellers,
  isUserOwner,
  currentPage,
  pageCount,
  className = "",
}: {
  title: string;
  usesSellerCard?: boolean;
  cards: IProduct[] | IUserCard[];
  categories: categories[];
  sellers: users[];
  isUserOwner: boolean;
  currentPage: number;
  pageCount: number;
  className?: string;
}): JSX.Element {
  let hasFilters = false;
  if (categories.length > 0 || sellers.length > 0) {
    hasFilters = true;
  }

  return (
    <div
      className={clsx("flex flex-col relative min-h-[600px]", className, {
        "sm_md:grid sm_md:grid-cols-[auto,1fr]": hasFilters,
        "mx-auto": !hasFilters,
      })}
    >
      <div className="flex flex-col sm:flex-row items-start px-5 py-2 w-full">
        <h2 className="text-3xl flex text-left">{title}</h2>
        {isUserOwner && (
          <Link
            href={"/product/create"}
            className="text-lg text-blue-500 mt-2 sm:mt-0 sm:ml-2"
          >
            <button
              type="button"
              className="bg-handcraftedBlue-300 text-white p-2 rounded-md"
              aria-label="Add New Product"
            >
              <PlusIcon width={20} height={18} className="fill-black" />
            </button>
          </Link>
        )}
      </div>

      {hasFilters && (
        <Sidebar
          className="col-start-1 row-span-2 row-start-1 absolute right-0 top-0 z-10 sm_md:relative"
          categories={categories}
          sellers={sellers}
        />
      )}

      {cards.length > 0 ? (
        <>
          <CardsLayout cards={cards} usesSellerCard={usesSellerCard} />
          <Pagination currentPage={currentPage} pageCount={pageCount} />
        </>
      ) : (
        <div className="mx-5 p-2 text-xl">No products found</div>
      )}
    </div>
  );
}
