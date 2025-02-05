"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import SearchBar from "../SearchBar";

export default function Header() {
  const { data: session, status } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getInitials = (fullName: string) => {
    const nameParts = fullName.split(" ");
    const initials = nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join("");

    return initials;
  };

  if (status === "loading") {
    return (
      <header className="w-full bg-white border-gray-200 dark:bg-gray-900">
        <nav className="max-w-6xl mx-auto bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
            Loading...
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="w-full bg-white border-gray-200 dark:bg-gray-900">
      <nav className="max-w-6xl mx-auto bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              HancraftedHaven
            </span>
          </Link>

          {/* Middle Section (SearchBar) */}
          <div className="flex-1 flex justify-center max-w-[500px] mx-auto">
            <SearchBar />
          </div>

          {/* Right Section (Profile & Hamburger) */}
          <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {session ? (
              // Authenticated User - Show Profile Button
              <>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded={isProfileOpen ? "true" : "false"}
                >
                  <span className="sr-only">Open user menu</span>
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
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                      >
                        Settings
                      </Link>
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

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
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
        </div>

        {/* Mobile Menu (links) */}
        <div
          className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}
          id="navbar-user"
        >
          <ul className="flex flex-col space-y-4 p-4 bg-gray-50 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-blue-700 md:text-white rounded-sm md:bg-transparent md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
