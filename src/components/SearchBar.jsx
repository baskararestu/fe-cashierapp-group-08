import React from "react";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
  return (
    <div className="min-w-full flex flex-col justify-center items-center">
      <form>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 pl-10 text-sm text-gray-100 border border-slate-200 rounded-lg bg-gray-50 focus:ring-slate-100 focus:border-slate-100 "
            required
          />
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-slate-50 hover:bg-slate-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
