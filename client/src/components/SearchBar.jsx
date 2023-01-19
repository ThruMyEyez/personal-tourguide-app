import { MagnifyingGlass } from "phosphor-react";
import { useState, useEffect } from "react";
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
    console.log(searchResults.data.products);
    setSearchResults(searchResults.data.products);
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
          return (
            <div className="" key={product._id}>
              <div className="mb-5 shadow-xl card w-128 bg-base-100">
                <figure>
                  {
                    <img
                      src={product.productThumbnail}
                      alt={product.title}
                      className="w-96 card-image"
                    />
                  }
                </figure>
                <div className="card-body">
                  <h2 className="text-black card-title">{product.title}</h2>
                  <p>{product.tagline}</p>
                  <div className="justify-end card-actions">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SearchBar;
