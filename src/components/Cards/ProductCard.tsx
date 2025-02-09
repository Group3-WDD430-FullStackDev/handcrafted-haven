"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IProductCard } from "@/typing/ICards";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";

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

  const handlePencilClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click event from bubbling up to the parent div
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer flex flex-col"
      onClick={handleClick}
    >
      {/* Product Image */}
      <div className="w-80 h-80 relative">
        <img
          src={prod_image || undefined}
          alt={`Image of ${prod_name}`}
          className="absolute inset-0 w-full h-full object-cover group-hover:opacity-75"
        />

        {/* Pencil Icon for Edit Button */}
        <Link
          href={`/product/${prod_id}/edit`}
          className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-lg hover:bg-gray-100"
          onClick={handlePencilClick}
        >
          <PencilIcon width={20} height={20} className="text-gray-700" />
        </Link>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col justify-between h-[80px]">
        <h3 className="mt-1 text-lg font-medium text-gray-900">{`$${prod_price}`}</h3>
        <p className="mt-1 text-sm text-gray-700">{`${prod_name}`}</p>
      </div>
    </div>
  );
};

export default ProductCard;
