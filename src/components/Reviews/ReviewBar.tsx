import { useState } from "react";
import { IReviewBarData } from "@/typing/IReview";
import UserProfilePic from "../Users/UserProfilePic";
import clsx from "clsx";

export default function ReviewBar({
  reviewData,
  isEditable,
  isNew,
  onReviewChange,
}: {
  reviewData: IReviewBarData;
  isEditable: boolean;
  isNew: boolean;
  onReviewChange: () => void;
}) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [userRating, setUserRating] = useState<number>(
    reviewData.review_rating
  );
  const [comment, setComment] = useState<string | null>(reviewData.review_text);
  const [buttonText, setButtonText] = useState<string>(
    isNew ? "Add Review" : "Update Review"
  );

  const handleStarClick = (rating: number) => {
    if (isEditable) {
      setUserRating(rating);
    }
  };

  const handleMouseEnter = (rating: number) => {
    if (isEditable) {
      setHoverRating(rating);
    }
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleSave = async () => {
    const originalText = buttonText;

    try {
      setButtonText("Saving...");

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          review_id: reviewData.review_id,
          user_id: reviewData.user_id,
          prod_id: reviewData.prod_id,
          review_rating: userRating,
          review_text: comment,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save review");
      }

      const data = await response.json();
      console.log("Review saved:", data);

      setButtonText("Update Review");
      onReviewChange();
      
    } catch (error) {
      console.error("Error saving review:", error);
      setButtonText(originalText);
    }
  };

  const authorImg =
  reviewData.author_image && reviewData.author_image.startsWith("http")
      ? reviewData.author_image
      : reviewData.author_image
        ? `/users/${reviewData.author_image}`
        : "/users/default-image.jpg";

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center space-x-3">
        {!reviewData.isSummaryReview && (
          <div className="flex flex-row justify-start space-x-2">
            <UserProfilePic
              user={{
                image: authorImg,
                displayName: reviewData.author_name,
              }}
            />
            <p className="ps-2">{reviewData.author_name}</p>
          </div>
        )}
        <div className="flex items-center space-x-2">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            const ratingToShow = isEditable
              ? hoverRating || userRating
              : reviewData.review_rating;
            const isFull = ratingToShow >= starValue;
            const isHalf =
              ratingToShow >= starValue - 0.5 && ratingToShow < starValue;

            return (
              <span
                key={index}
                className={clsx(
                  "relative",
                  isEditable ? "cursor-pointer" : "cursor-default"
                )}
                onClick={() => handleStarClick(starValue)}
                onMouseEnter={() => handleMouseEnter(starValue)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Outline Star */}
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

                {/* Full Star */}
                {isFull && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={clsx(
                      "size-5",
                      "absolute",
                      "top-0",
                      "left-0",
                      reviewData.isSummaryReview ? "size-6" : "size-5",
                      "text-yellow-500"
                    )}
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
                    className={clsx(
                      "size-5",
                      "absolute",
                      "top-0",
                      "left-0",
                      reviewData.isSummaryReview ? "size-6" : "size-5",
                      "text-yellow-500"
                    )}
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
        </div>
      </div>

      {isEditable ? (
        <div className="flex flex-col space-y-2 mt-3">
          <textarea
            value={comment || ""}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder={isNew ? "Write your review here..." : "Edit your"}
          />
          <button
            onClick={handleSave}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {buttonText}
          </button>
        </div>
      ) : (
        <p>{comment}</p>
      )}
    </div>
  );
}
