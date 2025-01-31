"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-gray-200 dark:border-gray-600 dark:bg-gray-900">
      <hr className="mx-4 border-gray-600" />
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <div className="items-center justify-between font-medium hidden w-full md:flex md:w-auto md:order-1">
          <div className="flex flex-row md:space-x-8 rtl:space-x-reverse">
            <Link
              className={clsx(
                "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700",
                {
                  "bg-customColor-300": pathname === "/catalog",
                }
              )}
              href="/catalog"
            >
              Catalog
            </Link>

            <Link
              className={clsx(
                "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700",
                {
                  "bg-customColor-300": pathname === "/account/login",
                }
              )}
              href="/account/login"
            >
              Login
            </Link>

            <Link
              className={clsx(
                "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700",
                {
                  "bg-customColor-300": pathname === "/account/profile",
                }
              )}
              href="/account/profile"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
