import { useState } from "react";
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
        <form className="" onSubmit={handleSearch}>
          <label className="hidden" htmlFor="search">
            Search
          </label>
          <input
            className="text-black input input-bordered w-64"
            type="text"
            name="search"
            value={searchTerm}
            placeholder="Search for a tour..."
            onChange={handleSearchTerm}
          />
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
