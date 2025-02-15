import { categories, users } from "@prisma/client";
import CardsLayout from "./CardsLayout";
import Pagination from "./Pagination";
import Sidebar from "./Sidebar";
import { IProduct } from "@/typing/IProduct";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function CardCatalog({
  title,
  cards,
  categories,
  sellers,
  isUserOwner,
  currentPage,
  pageCount,
  className = "",
}: {
  title: string;
  cards: IProduct[];
  categories: categories[];
  sellers: users[];
  isUserOwner: boolean;
  currentPage: number;
  pageCount: number;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col sm_md:grid sm_md:grid-cols-[auto,1fr] relative min-h-[600px]",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row items-start px-5 py-2 w-full">
        <h2 className="text-3xl flex text-left">{title}</h2>
        {isUserOwner && (
          <Link
            href={"/product/create"}
            className="text-lg text-blue-500 mt-2 sm:mt-0 sm:ml-2"
            aria-label="Create New Product"
          >
            <button
              className="bg-handcraftedBlue-300 text-white p-2 rounded-md"
              aria-label="Add New Product"
            >
              <PlusIcon width={20} height={18} className="fill-black" />
            </button>
          </Link>
        )}
      </div>

      <Sidebar
        className="col-start-1 row-span-2 row-start-1 absolute right-0 top-0 z-10 sm_md:relative"
        categories={categories}
        sellers={sellers}
      />

      {cards.length > 0 ? (
        <>
          <CardsLayout cards={cards} />
          <Pagination currentPage={currentPage} pageCount={pageCount} />
        </>
      ) : (
        <div className="mx-5 p-2 text-xl">No products found</div>
      )}
    </div>
  );
}
