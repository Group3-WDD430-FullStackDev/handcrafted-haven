import {Prisma} from "@/app/lib/prisma";

export type IReviewWithUser = Prisma.reviewsGetPayload<object> & {
  author_name: string;
  author_image: string | null;
}

export type IReviewBarData = IReviewWithUser & {
  totalReviews: number | null;
  isSummaryReview: boolean;
};
