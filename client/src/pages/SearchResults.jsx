import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchProduct } from "../services/search";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);

  const { searchTerm } = useParams();

  useEffect(() => {
    const fetchSearchResults = async () => {
      console.log({ searchTerm });
      const searchResults = await searchProduct(searchTerm);
      setSearchResults(searchResults.data.products);
      console.log(searchResults.data);
    };
    fetchSearchResults();
  }, [searchTerm]);

  return (
    <div>
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
                  <Link to={`/event/${product._id}`}>
                    <h2 className="text-black card-title">{product.title}</h2>
                  </Link>
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

export default SearchResults;
