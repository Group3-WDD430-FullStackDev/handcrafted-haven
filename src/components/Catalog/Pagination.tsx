import {
  ChevronDoubleRightIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";

export default function Pagination({
  currentPage,
  pageCount,
}: {
  currentPage: number;
  pageCount: number;
}) {
  const visibleButtonCount = 5;
  const buttonOffset = Math.ceil(visibleButtonCount / 2);

  function createPaginationURLs(page: number): string {
    const constrainedPageURL = Math.max(1, Math.min(page, pageCount));
    return `?page=${constrainedPageURL}`;
  }

  return (
    <div className="mt-2 flex flex-col w-full justify-center items-center col-span-2">
      <span>{`Page ${currentPage} of ${pageCount}`}</span>
      <div className=" flex flex-row justify-center border-2 border-handcraftedSlate-100 rounded-lg [&>a]:flex [&>a]:items-center [&>a]:justify-center">
        <Link
          href={createPaginationURLs(1)}
          className="paginationButton"
          aria-label="Skip to start page"
        >
          <ChevronDoubleLeftIcon className="w-4" />
        </Link>
        <Link
          href={createPaginationURLs(currentPage - 1)}
          className="paginationButton"
          aria-label="Navigate to Previous Page"
        >
          <ChevronLeftIcon className="w-4" />
        </Link>
        {Array.from({ length: visibleButtonCount })
          .fill(0)
          .map((_, i) => {
            let page = i + 1;
            if (currentPage > buttonOffset) {
              page += currentPage - buttonOffset;
            }
            const isActive = page === currentPage;
            const isTooMany = page > pageCount;
            return !isTooMany ? (
              <Link
                href={createPaginationURLs(page)}
                key={i}
                className={clsx("paginationButton w-[35px] text-center", {
                  "bg-handcraftedSlate-100": isActive,
                })}
              >
                {page}
              </Link>
            ) : (
              <div key={page} className="w-[35px]"></div>
            );
          })}
        <Link
          href={createPaginationURLs(currentPage + 1)}
          className="paginationButton"
          aria-label="Navigate to next page"
        >
          <ChevronRightIcon className="w-4" />
        </Link>
        <Link
          href={createPaginationURLs(pageCount)}
          className="paginationButton"
          aria-label="Skip to last page"
        >
          <ChevronDoubleRightIcon className="w-4" />
        </Link>
      </div>
    </div>
  );
}
