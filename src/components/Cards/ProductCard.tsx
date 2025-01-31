import React from "react";
import { products } from "@prisma/client";

const ProductCard: React.FC<products> = ({
  prod_name,
  prod_image,
  prod_price,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Fixed size for the card */}
      <div className="w-80 h-80 relative">
        <img
          src={prod_image || ""}
          alt={`Image of ${prod_name}`}
          className="absolute inset-0 w-full h-full object-cover group-hover:opacity-75"
        />
      </div>

      <div className="p-4">
        <h3 className="mt-1 text-lg font-medium text-gray-900">{prod_name}</h3>
        <p className="mt-1 text-sm text-gray-700">{`$${prod_price}`}</p>
      </div>
    </div>
  );
};

export default ProductCard;
