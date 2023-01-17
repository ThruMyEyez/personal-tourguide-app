import { useState, useEffect } from "react";
import { getAllEvents } from "../../services/event";
import { Link } from "react-router-dom";
import { createPurchase } from "../../services/purchase";

const ProductsFromDatabase = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const allProducts = await getAllEvents();
    setProducts([...allProducts.data.places]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // handle purchasing and redirecting to stripe checkout

  const handlePurchase = async (productId) => {
    const purchase = await createPurchase(productId);
    window.location = purchase.data.session.url;
  };

  return (
    <div className="flex flex-wrap justify-around">
      {products &&
        products.map((product) => {
          console.log(product);
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
                  <Link to={`event/${product._id}`}>
                    <h2 className="text-black card-title">{product.title}</h2>
                  </Link>
                  <p>{product.tagline}</p>
                  <div className="justify-end card-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => handlePurchase(product._id)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProductsFromDatabase;
