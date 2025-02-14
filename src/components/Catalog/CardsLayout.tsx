import ProductCard from "../Cards/ProductCard";
import { IProduct } from "@/typing/IProduct";
import SellerCard from "../Cards/SellerCard";
import { IUserCard } from "@/typing/ICards";

export default async function CardsLayout({
  cards,
  usesSellerCard,
}: {
  cards: IProduct[] | IUserCard[];
  usesSellerCard: boolean;
}) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-2 px-5 sm_md:pr-5 w-full justify-center sm_md:justify-start">
      {cards.map((card, index) => {
        if (usesSellerCard) {
          return <SellerCard key={index} {...(card as IUserCard)} />;
        } else {
          return <ProductCard key={index} {...(card as IProduct)} />;
        }
      })}
    </div>
  );
}
