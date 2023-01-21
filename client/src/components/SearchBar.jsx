import { MagnifyingGlass } from "phosphor-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchResults from "../pages/SearchResults";
import { searchProduct } from "../services/search";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchTerm = (event) => {
    if (event.target.value.length === 0) {
      setSearchResults([]);
    }
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchResults = await searchProduct(searchTerm);
    console.log(searchResults.data);
    setSearchResults(searchResults.data.products);
    window.location = `/search/${searchTerm}`;
  };

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center">
        <form className="flex items-center h-full" onSubmit={handleSearch}>
          <label className="hidden" htmlFor="search">
            Search
          </label>
          <input
            className="text-black dark:border-pink-500 input input-bordered w-96 search-bar"
            type="text"
            name="search"
            value={searchTerm}
            placeholder="Search for a tour..."
            onChange={handleSearchTerm}
          />
          {searchTerm.length > 0 && (
            <Link to={`/search/${searchTerm}`}>
              <MagnifyingGlass
                size={46}
                className="mag-glass dark:text-white hover:text-black text-black p-2 hover:p-1.5 hover:bg-gradient-to-r from:pink-500 to:violet-500 relative ml-3 border border-indigo-500 dark:border-pink-500 rounded-full cursor-pointer "
              />
            </Link>
          )}
        </form>
      </div>

      {searchResults &&
        searchResults.map((product) => {
          return <SearchResults />;
        })}
    </div>
  );
};

export default SearchBar;
