import React from "react";
import { useState, useEffect, useContext } from "react";
import { getProviderProducts } from "../../services/product";
import { AuthContext } from "../../context/authentication";
import { Link } from "react-router-dom";

const ProductsCarouselCopy = ({ id }) => {
  const [productItems, setProductItems] = useState([]);
  const [index, setIndex] = useState(0);

  const { isLoading } = useContext(AuthContext);
  const fetchProductItems = async () => {
    if (!isLoading) {
      const allOwnProviderItems = await getProviderProducts(id);
      setProductItems([...allOwnProviderItems.data.data]);
      console.log("Products", allOwnProviderItems.data.data);
    }
  };

  useEffect(() => {
    fetchProductItems();
  }, []);

  const nextProduct = () => {
    if (index + 1 === productItems.length) {
      setIndex(0);
    } else {
      const newIndex = index + 1;
      setIndex(newIndex);
    }
  };

  const previousProduct = (e) => {
    if (index - 1 === -1) {
      setIndex(productItems.length - 1);
    } else {
      const newIndex = index - 1;
      setIndex(newIndex);
    }
  };

  return (
    <div>
      <div className=" m-10">
        <h1 className="text-lg text-center font-semibold">
          {(productItems.length && "See Below My Products") ||
            "No Products Available"}
        </h1>
      </div>
      <div className="carousel carousel-center w-[800px] m-auto rounded-box scroll ">
        {productItems.map((product, index, productItems) => {
          return (
            <div
              key={product._id}
              id={"slide" + index}
              className="carousel-item  m-10 p-11"
            >
              <div className="card w-96 bg-base-100 shadow-xl image-full">
                <figure>
                  <img src={product.productThumbnail} alt={product.title} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.title}!</h2>
                  <h3 className="">
                    {(product.priceInCents / 100).toFixed(2)}€
                  </h3>
                  <p>{product.tagline}</p>
                  <p>This product is: {product.productType}</p>
                  <Link to={`/event/${product._id}`}>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">See More</button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsCarouselCopy;
