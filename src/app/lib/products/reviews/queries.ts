import { prisma } from "@/app/lib/prisma";

export const getReviewByUserProdKey = async (prod_id: number) => {
  return await prisma.reviews.findMany({
    where: { prod_id: prod_id },
    include: {
      users: {
        select: { displayName: true, image: true },
      },
    },
  });
};
