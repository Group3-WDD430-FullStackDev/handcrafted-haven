import CardCatalog from "@/components/Catalog/CardCatalog";
import { fetchSellerPages, fetchSellers } from "../lib/sellers/queries";

export default async function Dashboard(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = +(searchParams?.page || 1);

  const [pageCount, cards] = await Promise.all([
    fetchSellerPages(),
    fetchSellers(currentPage - 1),
  ]);

  return (
    <CardCatalog
      title="All Sellers"
      usesSellerCard={true}
      cards={cards}
      categories={[]}
      sellers={[]}
      isUserOwner={false}
      currentPage={currentPage}
      pageCount={pageCount}
      className="p-3 md:mx-auto mx-0 sm_md:mx-5"
    />
  );
}
