import { IUserCard } from "@/typing/ICards";
import { users } from "../../../../prisma/placeholder-data";

export async function fetchFeaturedSellers(): Promise<IUserCard[]> {
  // For Testing suspense feature on home page
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(users.filter((user) => user.user_is_seller).slice(0, 3));
    }, 1000);
  });
}
