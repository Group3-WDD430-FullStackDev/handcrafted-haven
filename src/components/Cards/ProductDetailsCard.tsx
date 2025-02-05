import React from "react";
import { IProductDetailCard, IReview } from "@/typing/ICards";
import Image from "next/image";

const ProductDetailCard: React.FC<{ product: IProductDetailCard }> = ({
  product,
}) => {
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
            <p className="text-2xl font-bold mr-2">
              ${product.prod_price.toString()}
            </p>
            {/*Review Bar */}
            <div className="flex items-center my-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-yellow-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-yellow-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-yellow-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-yellow-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-yellow-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
            </div>
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
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;
