"use client";

import Image from "next/image";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/solid";
import SearchBar from "../SearchBar";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  console.log("Header [Session]", session);

  return (
    <header className="w-full">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/logo.png"
              alt="HancraftedHaven Logo"
              width={100}
              height={40}
            />
          </Link>
          {/* Middle Section (SearchBar) */}
          <div className="flex-1 flex justify-center">
            <SearchBar />
          </div>
          {/* Right Section (Profile & Hamburger) */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {session ? (
              // Authenticated User - Show Profile Button
              <>
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="relative flex items-center justify-center w-10 h-10 bg-accent hover:bg-[var(--accent-hover)] rounded-full focus:ring-4 focus:ring-[var(--accent)] dark:focus:ring-[var(--accent)] transition duration-200"
                  aria-expanded={isProfileOpen}
                >
                  <span className="sr-only">Open user menu</span>
                  {session.user?.image ? (
                    <Image
                      className="w-full h-full rounded-full object-cover"
                      src={session.user.image}
                      alt="User Photo"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <UserIcon className="w-6 h-6" /> // Tailwind Placeholder Icon
                  )}
                </button>
                {/* Profile Dropdown Menu */}
                <div
                  className={`${isProfileOpen ? "block" : "hidden"} w-full`}
                  id="user-menu"
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
              // Unauthenticated User - Show Sign-In Button
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
                <span>Login with Google</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
