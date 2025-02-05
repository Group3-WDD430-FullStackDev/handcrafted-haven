import CardsLayout from "@/components/Catalog/CardsLayout";
import Sidebar from "@/components/Catalog/Sidebar";
import {
  fetchProducts,
  fetchProductPages,
  fetchProductCategories,
} from "../lib/products/queries";
import Pagination from "@/components/Catalog/Pagination";

export default async function Dashboard(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    filters?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = +(searchParams?.page || 1);
  const filters = searchParams?.filters || "";
  const pageCount = await fetchProductPages(filters);
  const cards = await fetchProducts(currentPage - 1, filters);
  const categories = await fetchProductCategories();

  return (
    <div className="flex flex-col sm_md:grid sm_md:grid-cols-[auto,1fr] relative md:w-4/5 md:mx-auto mx-0 sm_md:mx-5">
      <h2 className="text-3xl p-2 text-left col-start-2">All Products</h2>
      <Sidebar
        className="col-start-1 row-span-2 row-start-1  absolute right-0 top-0 z-10  sm_md:relative"
        categories={categories}
      />
      <CardsLayout cards={cards} />
      <Pagination currentPage={currentPage} pageCount={pageCount} />
    </div>
  );
}
