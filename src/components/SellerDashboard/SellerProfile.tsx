"use client";

import { PencilIcon } from "@heroicons/react/24/solid";
import { users } from "@prisma/client";

export default function SellerProfile({ sellerData }: { sellerData: users }) {
  // switch to get the profile from props and the props gets the profile id from the [id] field in the link
  const { displayName, user_bio } = sellerData;
  let { image } = sellerData;

  if (!image.includes("https")) {
    image = `/users/${image}`;
  }

  return (
    <div className="grid grid-cols-[80px,1fr] bg-handcraftedSlate-100  m-2  rounded-md relative items-end p-2 gap-2">
      <img
        className="rounded-full max-h-[80px] max-w-[80px] w-auto mx-auto"
        src={image}
        alt={`Profile Image of ${displayName}`}
        width="80"
        height="80"
      />
      <h2 className="col-start-2 text-left text-2xl">{displayName}</h2>
      <p className="col-span-2">
        {user_bio || `${displayName} has not entered a bio.`}
      </p>
      <button
        type="button"
        className="absolute right-2 top-2 p-2 rounded-md flex flex-col items-center justify-center bg-handcraftedBlue-300"
        aria-label="Edit Profile"
      >
        <PencilIcon width={30} height={20} className="fill-slate-700" />
      </button>
    </div>
  );
}
