import { JSX } from "react";
import { CardSkeleton } from "./CardSkeleton";

/**
 * Featured Skeleton Component that displays an array of either product or seller cards
 * @param {"product" | "seller"} featuredDataType - The type of data to display.
 * @returns {JSX.Element} The rendered component
 */
export default async function FeaturedSkeleton({
  featuredDataType,
}: {
  featuredDataType: "product" | "seller";
}): Promise<JSX.Element> {
  // Initialize Card and Title variables
  const featuredCards: JSX.Element[] = Array.from({ length: 3 }).map(
    (_, index) => <CardSkeleton key={index} />
  );
  const featuredTitle: string =
    featuredDataType === "product" ? "Featured Products" : "Featured Sellers";

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
