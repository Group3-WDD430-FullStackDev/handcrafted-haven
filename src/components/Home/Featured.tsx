import { IProductCard, IUserCard } from "@/typing/ICards";
import ProductCard from "../Cards/ProductCard";
import SellerCard from "../Cards/SellerCard";
import { fetchFeaturedProducts } from "@/app/lib/products/queries";
import { fetchFeaturedSellers } from "@/app/lib/sellers/queries";
import { JSX } from "react";

/**
 * Featured Component that displays an array of either product or seller cards
 * @param {IProductCard[] | IUserCard[]} featuredData - An array of either product or seller data
 * @param {"product" | "seller"} featuredDataType - The type of data to display.
 * @returns {JSX.Element} The rendered component
 */
export default async function Featured({
  featuredDataType,
}: {
  featuredDataType: "product" | "seller";
}): Promise<JSX.Element> {
  let featuredData: IProductCard[] | IUserCard[] = [];

  // Fetch the data depending on the type (product or seller)
  if (featuredDataType === "product") {
    featuredData = await fetchFeaturedProducts();
  } else {
    featuredData = await fetchFeaturedSellers();
  }

  // Initialize Card and Title variables
  let featuredCards: JSX.Element[] = [];
  let featuredTitle: string = "";

  if (featuredDataType === "product") {
    featuredTitle = "Featured Products";
    featuredCards = (featuredData as IProductCard[]).map((product) => (
      <ProductCard key={product.prod_id} {...product} />
    ));
  } else if (featuredDataType === "seller") {
    featuredTitle = "Featured Sellers";
    featuredCards = (featuredData as IUserCard[]).map((seller) => (
      <SellerCard key={seller.user_id} {...seller} />
    ));
  }

  // Return the rendered component
  return (
    <div className="flex flex-col items-center justify-center bg-[#eee5e9] py-2 pb-5 px-1">
      <h3 className="text-2xl pb-2">{featuredTitle}</h3>
      <div className="grid grid-cols-1 sm:flex flex-row items-center justify-evenly w-full gap-4">
        {featuredCards}
      </div>
    </div>
  );
}
