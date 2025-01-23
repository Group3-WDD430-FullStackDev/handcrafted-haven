import { IProductCard, IUserCard } from "@/typing/ICards";
import { products, users } from "../../../prisma/placeholder-data";

export async function fetchFeaturedData(): Promise<{
  featuredProducts: IProductCard[];
  featuredSellers: IUserCard[];
}> {
  return new Promise((resolve) => {
    resolve({
      featuredProducts: [...products, ...products, ...products],
      featuredSellers: [
        ...users.filter((user) => user.user_is_seller),
        ...users.filter((user) => user.user_is_seller),
        ...users.filter((user) => user.user_is_seller),
      ],
    });
  });
}
