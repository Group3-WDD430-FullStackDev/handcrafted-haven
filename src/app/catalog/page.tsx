import {
  fetchProducts,
  fetchProductPages,
  fetchProductCategories,
} from "../lib/products/queries";
import CardCatalog from "@/components/Catalog/CardCatalog";
import { fetchAllSellers } from "../lib/sellers/queries";

export default async function Dashboard(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    Category: string;
    Seller: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const filters = {
    Category: searchParams?.Category,
    Seller: searchParams?.Seller,
  };

  const currentPage = +(searchParams?.page || 1);

  const [pageCount, cards, categories, sellers] = await Promise.all([
    fetchProductPages(filters),
    fetchProducts(currentPage - 1, filters),
    fetchProductCategories(),
    fetchAllSellers(),
  ]);

  return (
    <CardCatalog
      title="All Products"
      cards={cards}
      categories={categories}
      sellers={sellers}
      isUserOwner={false}
      currentPage={currentPage}
      pageCount={pageCount}
    />
  );
}
