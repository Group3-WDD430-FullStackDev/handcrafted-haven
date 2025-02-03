import { prisma } from "@/app/lib/prisma";
import { IUserCard } from "@/typing/ICards";

export async function fetchFeaturedSellers(): Promise<IUserCard[]> {
  return new Promise(async (resolve) => {
    // setTimeout(async () => {
      // queryRaw is used because Prisma doesn't support server-side randomization
      const sellers = await prisma.$queryRaw<
      {
        user_id: number;
        displayName: string;
        image: string | null;
        user_bio: string;
      }[]
      >`SELECT user_id, "displayName", image, user_bio FROM users WHERE user_is_seller = true ORDER BY RANDOM() LIMIT 3`;

    resolve(
      sellers.map((seller) => ({
        ...seller,
        // Handle potential null values
        image: seller.image ?? "",
        user_bio: seller.user_bio ?? "",
      }))
    );
    // }, 1000);
  });
}
