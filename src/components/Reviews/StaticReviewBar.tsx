import { IReviewBarData } from "@/typing/IReview";
import clsx from "clsx";

export default function StaticReviewBar({
  reviewData,
}: {
  reviewData: IReviewBarData;
}) {
  return (
    <div className="flex mb-4 items-center">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        const isFull = reviewData.reviewRating >= starValue;
        const isHalf =
          reviewData.reviewRating >= starValue - 0.5 &&
          reviewData.reviewRating < starValue;

        return (
          <span key={index} className="relative">
            {/* Outline Star (Default) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={clsx(
                "size-5",
                reviewData.isSummaryReview ? "size-6" : "size-5",
                "text-yellow-500"
              )}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
              />
            </svg>

            {/* Filled Star (Full) */}
            {isFull && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-yellow-500 absolute top-0 left-0"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
            )}

            {/* Half-filled Star */}
            {isHalf && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-yellow-500 absolute top-0 left-0"
              >
                <defs>
                  <clipPath id={`half-star-${index}`}>
                    <rect x="0" y="0" width="12" height="24" />
                  </clipPath>
                </defs>
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipPath={`url(#half-star-${index})`}
                  clipRule="evenodd"
                />
              </svg>
            )}
          </span>
        );
      })}
      <span className="text-md ms-3">
        {reviewData.isSummaryReview && (
          <>
            {reviewData.reviewRating} ({reviewData.totalReviews} Reviews)
          </>
        )}
      </span>
    </div>
  );
}
