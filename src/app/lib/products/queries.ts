import { prisma } from "@/app/lib/prisma";
import { IProductCard } from "@/typing/ICards";
import { Decimal } from "@prisma/client/runtime/library";

export async function fetchFeaturedProducts(): Promise<IProductCard[]> {
  // queryRaw is used because Prisma doesn't support server-side randomization
  const products = await prisma.$queryRaw<
    {
      prod_id: number;
      prod_name: string;
      prod_image: string | null;
      prod_price: Decimal;
    }[]
  >`SELECT prod_id, prod_name, prod_image, prod_price FROM products ORDER BY RANDOM() LIMIT 3`;

  return products.map((product) => ({
    ...product,
    // convert from Decimal to number
    prod_price: product.prod_price.toNumber(),
    prod_image: product.prod_image ?? "", // Handle potential null values
  }));
}
