import { products } from "@prisma/client";
import ProductCard from "../Cards/ProductCard";

export default async function CardsLayout({ cards }: { cards: products[] }) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-2 pr-5 w-full">
      {cards.map((card, index) => (
        <ProductCard key={index} {...card} />
      ))}
    </div>
  );
}
