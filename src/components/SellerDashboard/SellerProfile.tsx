"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/solid";
import { users } from "@prisma/client";

export default function SellerProfile({ sellerData }: { sellerData: users }) {
  // switch to get the profile from props and the props gets the profile id from the [id] field in the link
  const { user_id, displayName, user_bio, image } = sellerData;

  const profileImage =
  image && image.startsWith("http")
    ? image
    : image
      ? `/users/${image}`
      : "/users/default-image.jpg";

  // check if the seller profile matches the logged in user
  const { data: session } = useSession();
  const isUserOwner = session?.user?.id === user_id;

  return (
    <div className="grid grid-cols-[80px,1fr] bg-handcraftedSlate-100  m-2  rounded-md relative items-end p-2 gap-2">
      <img
        className="rounded-full max-h-[80px] max-w-[80px] w-auto mx-auto"
        src={profileImage}
        alt={`Profile Image of ${displayName}`}
        width="80"
        height="80"
      />
      <h2 className="col-start-2 text-left text-2xl">{displayName}</h2>
      <p className="col-span-2">
        {user_bio || `${displayName} has not entered a bio.`}
      </p>
      {isUserOwner && (
        <Link href={`/dashboard/${user_id}/edit`}>
          <button
            type="button"
            className="absolute right-2 top-2 p-2 rounded-md flex flex-col items-center justify-center bg-handcraftedBlue-300"
            aria-label="Edit Profile"
          >
            <PencilIcon width={30} height={20} className="fill-slate-700" />
          </button>
        </Link>
      )}
    </div>
  );
}
