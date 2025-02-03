"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IUserCard } from "@/typing/ICards";

const SellerCard: React.FC<IUserCard> = ({
  user_id,
  image,
  displayName,
  user_bio,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/sellers/${user_id}`);
  };
  const imageUrl = image.startsWith("http") ? image : `/users/${image}`;
  const truncatedBio =
    user_bio.length > 25 ? `${user_bio.slice(0, 25)}...` : user_bio;

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer flex flex-col"
      onClick={handleClick}
    >
      {/* Fixed size for the card */}
      <div className="w-80 h-80 relative">
        <img
          src={imageUrl}
          alt={`Image of seller ${displayName}`}
          className="absolute inset-0 w-full h-full object-cover group-hover:opacity-75"
        />
      </div>

      <div className="p-4 flex flex-col justify-between h-[80px]">
        <h3 className="mt-1 text-lg font-medium text-gray-900">
          {displayName}
        </h3>
        <p className="mt-1 text-sm text-gray-700">{truncatedBio}</p>
      </div>
    </div>
  );
};

export default SellerCard;