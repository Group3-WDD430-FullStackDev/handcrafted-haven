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
      <label htmlFor="search" aria-label="Search" className="ml-5">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Explore"
          className="w-full h-full rounded-l-lg p-2 border"
          onInput={updateSearch}
        />
      </label>

      {/* Submit Button */}
      <a
        type="submit"
        href={`/catalog${searchValue}`}
        className="w-[60px] h-[40px] bg-[#92DCE5] rounded-r-lg mr-5 flex items-center justify-center hover:brightness-90"
      >
        GO
      </a>
    </>
  );
}
