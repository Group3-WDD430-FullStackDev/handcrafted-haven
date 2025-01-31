"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IProductCard } from "@/typing/ICards";

const ProductCard: React.FC<IProductCard> = ({
  prod_id,
  prod_name,
  prod_image,
  prod_price,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${prod_id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer flex flex-col"
      onClick={handleClick}
    >
      {/* Fixed size for the card */}
      <div className="w-80 h-80 relative">
        <img
          src={prod_image}
          alt={`Image of ${prod_name}`}
          className="absolute inset-0 w-full h-full object-cover group-hover:opacity-75"
        />
      </div>

      <div className="p-4 flex flex-col justify-between h-[80px]">
        <h3 className="mt-1 text-lg font-medium text-gray-900">{prod_name}</h3>
        <p className="mt-1 text-sm text-gray-700">{`$${prod_price}`}</p>
      </div>
    </div>
  );
};

export default ProductCard;
