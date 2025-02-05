"use client";

import Link from "next/link";

export default function Profile() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Seller&apos;s Profile View</h1>

      <Link href="/product/create">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </Link>
    </div>
  );
}
