import { prisma } from "@/app/lib/prisma";
import { IReviewWithUser } from "@/typing/IReview";

export const addUpdateReview = async (review: IReviewWithUser) => {
  return await prisma.reviews.upsert({
    where: {
      review_id: review.review_id,
    },
    create: {
      user_id: review.user_id,
      prod_id: review.prod_id,
      review_rating: review.review_rating,
      review_text: review.review_text,
    },
    update: {
      review_rating: review.review_rating,
      review_text: review.review_text,
    },
  });
};
