"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();
  const isSeller = session?.user?.user_is_seller;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {isSeller && (
        <Link href="/product/create">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Product
          </button>
        </Link>
      )}
    </div>
  );
}
