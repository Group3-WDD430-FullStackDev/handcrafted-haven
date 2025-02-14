import { prisma } from "@/app/lib/prisma";
import { IUserCard } from "@/typing/ICards";
import { users } from "@prisma/client";

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

export async function fetchSellerData(
  sellerId?: number
): Promise<users | null> {
  const sellerData = await prisma.users.findUnique({
    where: {
      user_id: sellerId,
    },
  });
  return sellerData;
}

export async function fetchAllSellers(): Promise<users[]> {
  const sellers = await prisma.users.findMany({
    where: {
      user_is_seller: true,
    },
  });
  return sellers;
}

const SELLERS_PER_PAGE = 30;

/*
 * Fetches the number of pages for the seller page
 * @returns {Promise<number>} The number of pages
 */
export async function fetchSellerPages(): Promise<number> {
  // query the database for the sellers
  const data = await prisma.users.findMany({
    where: {
      user_is_seller: true,
    },
  });

  // return the number of pages
  return Math.ceil(data.length / SELLERS_PER_PAGE);
}

/*
 * Fetches the products for the product catalog
 * @param {string} page - The current page number
 * @param {string} filters - The filters to apply to the query
 * @returns {Promise<IProduct[]>} The products
 */
export async function fetchSellers(page: number): Promise<IUserCard[]> {
  // offfset is the number of sellers to skip
  const offset = page * SELLERS_PER_PAGE;

  // query the database for the sellers
  const rawdata = await prisma.users.findMany({
    where: {
      user_is_seller: true,
    },
    select: {
      user_id: true,
      displayName: true,
      image: true,
      user_bio: true,
    },
    skip: offset,
    take: SELLERS_PER_PAGE,
  });

  const data = rawdata.map((x) => ({
    ...x,

    // Handle potential null values
    image: x.image ?? "",
    user_bio: x.user_bio ?? "",
  }));

  // return the sellers
  return data;
}
