import React from "react";
import { IUserCard } from "@/typing/ICards";

const SellerCard: React.FC<IUserCard> = ({ image, displayName, user_bio }) => {
  const truncatedBio =
    user_bio.length > 25 ? `${user_bio.slice(0, 25)}...` : user_bio;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Fixed size for the card */}
      <div className="w-80 h-80 relative">
        <img
          src={image}
          alt={`Image of seller ${displayName}`}
          className="absolute inset-0 w-full h-full object-cover group-hover:opacity-75"
        />
      </div>

      <div className="p-4">
        <h3 className="mt-1 text-lg font-medium text-gray-900">
          {displayName}
        </h3>
        <p className="mt-1 text-sm text-gray-700">{truncatedBio}</p>
      </div>
    </div>
  );
};

export default SellerCard;
