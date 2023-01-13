import { useState, useEffect } from "react";
import { getAllEvents } from "../../services/event";
import { Link } from "react-router-dom";

const ProductsFromDatabase = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const allProducts = await getAllEvents();
    setProducts([...allProducts.data.places]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {products &&
        products.map((product) => {
          return (
            <div key={product._id}>
              <Link to={`/event/${product._id}`}>
                <h1>{product.title}</h1>
                <p>{product.tagline}</p>
                <p>£{product.priceInCents / 100}</p>
                <button>View Event</button>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default ProductsFromDatabase;
