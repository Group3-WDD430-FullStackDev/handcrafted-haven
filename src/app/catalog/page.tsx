import CardsLayout from "@/components/Catalog/CardsLayout";
import Sidebar from "@/components/Catalog/Sidebar";
import { fetchProducts, fetchProductPages } from "../lib/products/queries";
import Pagination from "@/components/Catalog/Pagination";

export default async function Dashboard(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = +(searchParams?.page || 1);
  const pageCount = await fetchProductPages();
  const cards = await fetchProducts(currentPage - 1);

  return (
    <div className="flex flex-col sm:grid sm:grid-cols-[auto,1fr] relative  sm:w-4/5 mx-auto">
      <h2 className="text-3xl p-2 text-left col-start-2">All Products</h2>
      <Sidebar className="col-start-1 row-span-2 row-start-1 border-2 border-handcraftedSlate-100 mx-5 w-[200px] my-5" />
      <CardsLayout cards={cards} />
      <Pagination currentPage={currentPage} pageCount={pageCount} />
    </div>
  );
}
