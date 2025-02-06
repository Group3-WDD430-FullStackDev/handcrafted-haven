import { categories, users } from "@prisma/client";
import CardsLayout from "./CardsLayout";
import Pagination from "./Pagination";
import Sidebar from "./Sidebar";
import { IProduct } from "@/typing/IProduct";

export default function CardCatalog({
  title,
  cards,
  categories,
  sellers,
  currentPage,
  pageCount,
}: {
  title: string;
  cards: IProduct[];
  categories: categories[];
  sellers: users[];
  currentPage: number;
  pageCount: number;
}) {
  return (
    <div className="flex flex-col sm_md:grid sm_md:grid-cols-[auto,1fr] relative md:w-4/5 md:mx-auto mx-0 sm_md:mx-5 min-h-[600px]">
      <h2 className="text-3xl p-2 text-left col-start-2">{title}</h2>
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
