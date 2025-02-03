import { IProductCard, IUserCard } from "@/typing/ICards";
import { JSX } from "react";
import ProductCard from "../Cards/ProductCard";
import SellerCard from "../Cards/SellerCard";
import { fetchFeaturedProducts } from "@/app/lib/products/queries";
import { fetchFeaturedSellers } from "@/app/lib/sellers/queries";

/**
 * Featured Component that displays an array of either product or seller cards
 * @param {"product" | "seller"} featuredDataType - The type of data to display.
 * @returns {JSX.Element} The rendered component
 */
export default async function Featured({
  featuredDataType,
}: {
  featuredDataType: "product" | "seller";
}): Promise<JSX.Element> {
  let featuredData: IProductCard[] | IUserCard[] = [];
  if (featuredDataType === "product") {
    featuredData = await fetchFeaturedProducts();
  } else {
    featuredData = await fetchFeaturedSellers();
  }

  // Initialize Card and Title variables
  let featuredCards: JSX.Element[] = [];
  let featuredTitle: string = "";

  if (featuredDataType === "product") {
    // If featuredDataType is "product", map the data to the product card template and set the title
    featuredCards = (featuredData as IProductCard[]).map((product, index) => (
      <ProductCard key={index} {...product} />
    ));
    featuredTitle = "Featured Products";
  } else if (featuredDataType === "seller") {
    // If featuredDataType is "seller", map the data to the seller card template and set the title
    featuredTitle = "Featured Sellers";
    featuredCards = (featuredData as IUserCard[]).map((seller, index) => (
      <SellerCard key={index} {...seller} />
    ));
  }

  // Return the rendered component
  return (
    <div className="flex flex-col items-center justify-center bg-[#eee5e9] py-2 pb-5 px-1">
      <h3 className="text-2xl pb-2">{featuredTitle}</h3>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row items-center justify-evenly w-full">
        {featuredCards}
      </div>
    </div>
  );
}
