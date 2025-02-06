import React from "react";
import { IProductDetailCard, IReview } from "@/typing/ICards";
import Image from "next/image";
import UserProfilePic from "../Users/UserProfilePic";
import StaticReviewBar from "../Reviews/StaticReviewBar";
import { reviews } from "../../../prisma/placeholder-data";

const ProductDetailCard: React.FC<{ product: IProductDetailCard }> = ({
  product,
}) => {
  // Get the summary information from product reviews
  const reviewSummary = product.prod_reviews.reduce(
    (acc, review) => {
      // Add the review rating to the total
      acc.totalRatings += review.rating;

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

  return (
    <div className="container mx-auto px-2 py-6 flex flex-col md:flex-row gap-3">
      {/* Product Image */}
      <div className="md:w-1/2 flex justify-center items-start">
        {product.prod_image && (
          <div className="relative w-full h-[500px] max-h-[100vh]">
            <Image
              src={product.prod_image}
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
            {/*Review Bar */}
            <StaticReviewBar
              reviewData={{
                reviewRating: averageRating,
                totalReviews: reviewSummary.totalReviews,
                isSummaryReview: true,
              }}
            />
            <p className="text-2xl font-bold mr-2">
              ${product.prod_price.toString()}
            </p>
          </div>
          {product.prod_seller_image && (
            <Image
              src={
                product.prod_seller_image.startsWith("http")
                  ? product.prod_seller_image
                  : `/users/${product.prod_seller_image}`
              }
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
          {product.prod_reviews.length === 0 ? (
            <p className="text-center">No Reviews Yet</p>
          ) : (
            product.prod_reviews.map((review: IReview) => (
              <div key={review.id} className="p-4 border-b">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row justify-start items-center">
                    <UserProfilePic
                      user={{
                        image: review.author_image,
                        displayName: review.author,
                      }}
                    />
                    <p className="ps-2">{review.author}</p>
                  </div>
                  <StaticReviewBar
                    reviewData={{
                      reviewRating: review.rating,
                      totalReviews: null,
                      isSummaryReview: false,
                    }}
                  />
                </div>
                <p className="text-gray-700 mt-5">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;
