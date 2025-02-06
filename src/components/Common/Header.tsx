"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
// import SearchBar from "../SearchBar";

export default function Header() {
  const { data: session, status } = useSession();
  console.log(status);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getInitials = (fullName: string) => {
    const nameParts = fullName.split(" ");
    const initials = nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join("");

    return initials;
  };
  console.log(session);

  return (
    <header className="w-full bg-white border-gray-200 dark:bg-gray-900">
      <nav className="max-w-6xl mx-auto bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              HancraftedHaven
            </span>
          </Link>

          {/* Middle Section (Navigation Links)*/}
          <div
            id="nav-menu"
            className={clsx(
              "absolute top-16 left-0 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg flex flex-col space-y-2 p-2 z-50",
              "md:static md:w-auto md:bg-transparent md:shadow-none md:flex md:flex-row md:space-x-8 md:space-y-0 md:p-0",
              { hidden: !isMenuOpen, flex: isMenuOpen }
            )}
          >
            <Link
              className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              href="/catalog"
            >
              Catalog
            </Link>
            <Link
              className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              href="/sellers"
            >
              Sellers
            </Link>
          </div>

          {/* Right Section (Profile) */}
          <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {/* If status is loading, show a spinning icon */}
            {status === "loading" ? (
              <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            ) : session ? (
              // Authenticated User - Show Profile Button
              <>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded={isProfileOpen ? "true" : "false"}
                >
                  {session.user?.image ? (
                    <Image
                      className="w-8 h-8 rounded-full"
                      src={session.user.image}
                      alt="User Photo"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-white rounded-full dark:bg-gray-600">
                      <span className="font-medium text-foreground dark:text-background">
                        {session?.user?.displayName
                          ? getInitials(session.user.displayName)
                          : "NA"}
                      </span>
                    </div>
                  )}
                </button>

                {/* Profile Dropdown Menu */}
                <div
                  className={`${isProfileOpen ? "block" : "hidden"} absolute top-[25px] right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600`}
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {session.user?.displayName}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {session.user?.email}
                    </span>
                  </div>
                  <ul className="py-2">
                    <li>
                      {session.user?.user_is_seller ? (
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                          Seller Dashboard
                        </Link>
                      ) : (
                        <Link
                          href="/seller/create"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                          Become Seller
                        </Link>
                      )}
                    </li>
                    <li>
                      <button
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              // Unauthenticated User - Show Google Sign-In Button
              <button
                onClick={() => signIn("google")}
                className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
              >
                <Image
                  className="w-6 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                  height={75}
                  width={75}
                />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
