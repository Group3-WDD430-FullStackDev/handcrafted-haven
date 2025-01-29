import { prisma } from "@/app/lib/prisma";

export async function fetchFeaturedProducts() {
  return await prisma.products.findMany({
    where: {},
  });
}
