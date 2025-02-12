import React from "react";
import { IReviewWithUser } from "@/typing/IReview";
import ReviewBar from "../Reviews/ReviewBar";

const ReviewSection = ({
  review,
  isEditable,
  isNew,
  onReviewChange,
}: {
  review: IReviewWithUser;
  isEditable: boolean;
  isNew: boolean;
  onReviewChange: () => void
}) => (
  <div key={review.review_id} className="p-4 border-b">
    <ReviewBar
      reviewData={{
        review_id: review.review_id,
        user_id: review.user_id,
        prod_id: review.prod_id,
        review_rating: review.review_rating || 0,
        review_text: review.review_text || "",
        review_date: new Date(),
        author_name: review.author_name || "",
        author_image: review.author_image || null,
        totalReviews: null,
        isSummaryReview: false,
      }}
      isEditable={isEditable}
      isNew={isNew}
      onReviewChange={onReviewChange}
    />
  </div>
);

export default ReviewSection;
