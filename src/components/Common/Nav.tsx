"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  // all placeholder content
  const pathname = usePathname();

  return (
    <div className="flex flex-row [&>a]:p-2 hover:[&>a]:bg-gray-200 bg-gray-300">
      <Link
        className={clsx({
          "bg-customColor-300": pathname === "/catalog",
        })}
        href="/catalog"
      >
        Catalog
      </Link>

      <Link
        className={clsx({
          "bg-customColor-300": pathname === "/account/login",
        })}
        href="/account/login"
      >
        Login
      </Link>
      <Link
        className={clsx({
          "bg-customColor-300": pathname === "/account/profile",
        })}
        href="/account/profile"
      >
        Profile
      </Link>
    </div>
  );
}
