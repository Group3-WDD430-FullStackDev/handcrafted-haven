import { fetchFeaturedProducts } from "@/app/lib/products/queries";
import { fetchFeaturedSellers } from "@/app/lib/sellers/queries";

import Banner from "@/components/Home/Banner";
import Featured from "@/components/Home/Featured";

export default async function Home() {
  const featuredProducts = await fetchFeaturedProducts();
  const featuredSellers = await fetchFeaturedSellers();

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-10 mt-12 mx-auto">
      <Banner className="col-span-2" />
      <Featured featuredData={featuredProducts} featuredDataType="product" />
      <Featured featuredData={featuredSellers} featuredDataType="seller" />
    </div>
  );
}
