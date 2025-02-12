"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function GoodbyePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000); // Redirect after 5 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Account Deactivated</h1>
      <p className="text-gray-600 mt-2">
        You will be redirected to the homepage shortly. If you change your mind,
        please contact support.
      </p>
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Return to Home
      </Link>
    </div>
  );
}
