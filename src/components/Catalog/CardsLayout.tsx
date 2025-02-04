import ProductCard from "../Cards/ProductCard";
import { IProduct } from "@/typing/IProduct";

export default async function CardsLayout({ cards }: { cards: IProduct[] }) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-2 px-5 sm_md:pr-5 w-full justify-center sm_md:justify-start">
      {cards.map((card, index) => (
        <ProductCard key={index} {...card} />
      ))}
    </div>
  );
}
