import SellerProfile from "@/components/SellerDashboard/SellerProfile";
import {
  fetchProductCategories,
  fetchProductPages,
  fetchProducts,
} from "@/app/lib/products/queries";
import CardCatalog from "@/components/Catalog/CardCatalog";
import { fetchSellerData } from "@/app/lib/sellers/queries";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import NotFoundPage from "@/components/Common/NotFound";

export default async function Dashboard(props: {
  params: Promise<{
    sellerId: string; // session user id
  }>;
  searchParams?: Promise<{
    query?: string;
    page?: string;
    Category: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}) {
  const session = await getServerSession(authOptions);
  const loggedInUser = session?.user?.id;

  const searchParams = await props.searchParams;
  const sellerId = (await props.params).sellerId;
  const sellerData = await fetchSellerData(+sellerId);
  if (!sellerData || sellerData.user_is_seller === false) {
    return <NotFoundPage errorMessage="Seller not found." />;
  }
  const isUserOwner = sellerId === String(loggedInUser);
  const currentPage = +(searchParams?.page || 1);
  const categoryFilter = searchParams?.Category;

  const filters = {
    Seller: sellerId,
    Category: categoryFilter,
    minPrice: searchParams?.minPrice ? +searchParams?.minPrice : undefined,
    maxPrice: searchParams?.maxPrice ? +searchParams?.maxPrice : undefined,
  };

  const [pageCount, cards, categories] = await Promise.all([
    fetchProductPages(filters),
    fetchProducts(currentPage - 1, filters),
    fetchProductCategories(),
  ]);

  return (
    <div className="flex flex-col p-3">
      <SellerProfile sellerData={sellerData} />
      <CardCatalog
        title={`${sellerData.displayName}'s Products`}
        cards={cards}
        categories={categories}
        sellers={[]}
        isUserOwner={isUserOwner}
        currentPage={currentPage}
        pageCount={pageCount}
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        className="m-2"
      />
    </div>
  );
}
