"use client";

import React, { useState, useEffect } from "react";
import { IProductDetailCard } from "@/typing/ICards";
import { IReviewWithUser } from "@/typing/IReview";
import Image from "next/image";
import ReviewBar from "../Reviews/ReviewBar";
import ReviewSection from "../Reviews/ReviewSection";
import { useSession } from "next-auth/react";

const ProductDetailCard: React.FC<{ product: IProductDetailCard }> = ({
  product,
}) => {
  const { data: session } = useSession();
  // Local state for reviews
  const [reviews, setReviews] = useState<IReviewWithUser[]>([]);
  const [loadingReviews, setLoadingReviews] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews?prod_id=${product.prod_id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch reviews.");
        }

        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [product.prod_id]);

  // Get users review for this product if exists
  const userReview: IReviewWithUser | undefined = reviews.find(
    (review) => review.user_id === session?.user.id
  );

  // Create placeholder userReview data if the user doesn't have a current review
  const placeholderReview: IReviewWithUser = {
    review_id: 0,
    user_id: session?.user.id || 0,
    prod_id: product.prod_id,
    review_rating: 5, // Default rating to 5
    review_text: "",
    review_date: new Date(),
    author_name: session?.user.displayName || "",
    author_image: session?.user.image || "",
  };

  // Get the summary information from product reviews
  const reviewSummary = reviews.reduce(
    (acc, review) => {
      // Add the review rating to the total
      acc.totalRatings += review.review_rating;

      // Increment the total number of reviews
      acc.totalReviews += 1;

      return acc;
    },
    { totalRatings: 0, totalReviews: 0 }
  );

  // calculate the average rating
  const averageRating = reviewSummary.totalReviews
    ? reviewSummary.totalRatings / reviewSummary.totalReviews
    : 0;

  const imageUrl =
    product.prod_image && product.prod_image.startsWith("http")
      ? product.prod_image
      : product.prod_image
        ? `/products/${product.prod_image}`
        : "/products/default-image.jpg";

  const sellerImg =
    product.prod_seller_image && product.prod_seller_image.startsWith("http")
      ? product.prod_seller_image
      : product.prod_seller_image
        ? `/users/${product.prod_seller_image}`
        : "/users/default-image.jpg";

  const handleReviewChange = async () => {
    setLoadingReviews(true);

    try {
      const response = await fetch(`/api/reviews?prod_id=${product.prod_id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching updated reviews:", error);
    } finally {
      setLoadingReviews(false);
    }
  };

  return (
    <div className="container mx-auto px-2 py-6 flex flex-col md:flex-row gap-3">
      {/* Product Image */}
      <div className="md:w-1/2 flex justify-center items-start">
        {imageUrl && (
          <div className="relative w-full h-[500px] max-h-[100vh]">
            <Image
              src={imageUrl}
              alt="product Image"
              layout="fill"
              objectFit="contain"
              objectPosition="top"
            />
          </div>
        )}
      </div>
      {/*Product Details & Reviews */}
      <div className="w-full md:w-1/2 px-4">
        <div className="flex justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{product.prod_name}</h2>
            {/* Summary Review Bar at top */}
            <ReviewBar
              // Summary data for the summary bar, no specific data
              reviewData={{
                review_id: 0,
                user_id: 0,
                prod_id: 0,
                author_image: null,
                author_name: "",
                review_text: "",
                review_date: new Date(),
                review_rating: averageRating,
                totalReviews: reviewSummary.totalReviews,
                isSummaryReview: true,
              }}
              isEditable={false}
              isNew={false}
              onReviewChange={handleReviewChange}
            />
            <p className="text-2xl font-bold mr-2">
              ${product.prod_price.toString()}
            </p>
          </div>
          {product.prod_seller_image && (
            <Image
              src={sellerImg}
              alt="Sellers Image"
              width={100}
              height={100}
              className="w-20 h-20 rounded-full"
            />
          )}
        </div>
        {/* Product Description */}
        <p>{product.prod_description}</p>
        <div className="border-t-8 my-4">
          <h3 className="text-2xl font-bold mt-3">Reviews</h3>
          {loadingReviews ? (
            <p>Reviews loading...</p>
          ) : (
            <>
              {/* User Review */}
              {!session?.user ? (
                <p>Log in to leave a review of your own.</p>
              ) : !userReview ? (
                <ReviewSection
                  review={placeholderReview}
                  isEditable={true}
                  isNew={true}
                  onReviewChange={handleReviewChange}
                />
              ) : (
                <ReviewSection
                  review={userReview}
                  isEditable={true}
                  isNew={false}
                  onReviewChange={handleReviewChange}
                />
              )}

              {/* Other Reviews */}
              {reviews.length === 0 ? (
                <p className="text-enter">No other reviews yet</p>
              ) : (
                // Get all but the current users reviews for this product
                reviews
                  .filter((review) => review.user_id !== session?.user?.id)
                  .map((review) => {
                    return (
                      <ReviewSection
                        key={review.review_id}
                        review={review}
                        isEditable={false}
                        isNew={false}
                        onReviewChange={handleReviewChange}
                      />
                    );
                  })
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;
