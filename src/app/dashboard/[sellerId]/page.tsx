import SellerProfile from "@/components/SellerDashboard/SellerProfile";
import {
  fetchProductCategories,
  fetchProductPages,
  fetchProducts,
} from "@/app/lib/products/queries";
import CardCatalog from "@/components/Catalog/CardCatalog";
import { fetchSellerData } from "@/app/lib/sellers/queries";

export default async function Dashboard(props: {
  params: Promise<{
    sellerId: string;
  }>;
  searchParams?: Promise<{
    query?: string;
    page?: string;
    Category: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const sellerId = (await props.params).sellerId;
  const sellerData = await fetchSellerData(+sellerId);
  if (!sellerData) {
    return <div>Invalid Seller Id</div>;
  }

  const currentPage = +(searchParams?.page || 1);
  const categoryFilter = searchParams?.Category;
  const filters = {
    Seller: sellerId,
    Category: categoryFilter,
  };

  const [pageCount, cards, categories] = await Promise.all([
    fetchProductPages(filters),
    fetchProducts(currentPage - 1, filters),
    fetchProductCategories(),
  ]);

  return (
    <div className="flex flex-col">
      <SellerProfile sellerData={sellerData} />
      <CardCatalog
        title={`${sellerData.displayName}'s Products`}
        cards={cards}
        categories={categories}
        sellers={[]}
        currentPage={currentPage}
        pageCount={pageCount}
      />
    </div>
  );
}
