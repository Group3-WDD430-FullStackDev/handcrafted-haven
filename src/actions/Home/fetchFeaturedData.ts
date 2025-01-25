import { IProductCard, IUserCard } from "@/typing/ICards";
import { products, users } from "../../../prisma/placeholder-data";

export async function fetchFeaturedData(): Promise<{
  featuredProducts: IProductCard[];
  featuredSellers: IUserCard[];
}> {
  return new Promise((resolve) => {
    resolve({
      featuredProducts: products.slice(0,3),  // limit to 3 products
      featuredSellers: users.filter((user) => user.user_is_seller).slice(0, 3), // limit to 3 users
    });
  });
}
