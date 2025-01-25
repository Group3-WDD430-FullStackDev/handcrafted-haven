import { IProductCard, IUserCard } from "@/typing/ICards";
import { JSX } from "react";
import ProductCard from "../Cards/ProductCard";
import SellerCard from "../Cards/SellerCard";

// // Placeholder Card
// function TestProductCard(data: IProductCard, index: number): JSX.Element {
//   return (
//     <div
//       key={`product-${index}`}
//       className="flex flex-col items-center justify-center bg-slate-100"
//     >
//       PLACEHOLDER CARD
//       <img
//         src={data.prod_image}
//         alt={data.prod_name}
//         width={100}
//         height={100}
//       />
//       <p className="font-bold text-sm">{data.prod_name}</p>
//       <span className="text-lg">{data.prod_price}</span>
//     </div>
//   );
// }

// // Placeholder Card
// function TestSellerCard(data: IUserCard, index: number): JSX.Element {
//   return (
//     <div
//       key={`seller-${index}`}
//       className="flex flex-col items-center justify-center bg-slate-100"
//     >
//       PLACEHOLDER CARD
//       <img
//         src={data.user_image}
//         alt={data.user_name}
//         width={100}
//         height={100}
//       />
//       {data.user_name}
//     </div>
//   );
// }

/**
 * Featured Component that displays an array of either product or seller cards
 * @param {IProductCard[] | IUserCard[]} featuredData - An array of either product or seller data
 * @param {"product" | "seller"} featuredDataType - The type of data to display.
 * @returns {JSX.Element} The rendered component
 */
export default function Featured({
  featuredData,
  featuredDataType,
}: {
  featuredData: IProductCard[] | IUserCard[];
  featuredDataType: "product" | "seller";
}): JSX.Element {
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