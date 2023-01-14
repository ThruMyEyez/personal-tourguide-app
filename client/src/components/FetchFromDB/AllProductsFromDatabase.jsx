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
    <div className="flex justify-around flex-wrap">
      {products &&
        products.map((product) => {
          return (
            <div className="" key={product._id}>
              <Link to={`/event/${product._id}`}>
                <div className="mb-5 card w-128 bg-base-100 shadow-xl">
                  <figure>
                    {
                      <img
                        src="https://placeimg.com/400/225/arch"
                        alt={product.title}
                        className="card-image"
                      />
                    }
                  </figure>
                  <div className="card-body">
                    <h2 className="text-black card-title">{product.title}</h2>
                    <p>{product.tagline}</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">Buy Now</button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default ProductsFromDatabase;
