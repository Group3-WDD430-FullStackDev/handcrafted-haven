import { useState } from "react";

export default function SearchBar() {
  function updateSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  // State value to store the search term from the search bar
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Empty search value if there is no search term
  let searchValue: string = "";

  // If there is a search term, add it to the search value
  if (searchTerm) searchValue = `?q=${searchTerm}`;

  return (
    <>
      {/* Search Bar */}
      <div className="w-full relative">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Explore"
          className="block w-full p-2 pe-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onInput={updateSearch}
        />
        <a
          type="submit"
          href={`/catalog${searchValue}`}
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </a>
      </div>

      {/* Submit Button */}
    </>
  );
}
