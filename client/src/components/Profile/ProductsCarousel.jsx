import React from "react";
import { useState, useEffect, useContext } from "react";
import { getProviderProducts } from "../../services/product";
import { AuthContext } from "../../context/authentication";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const ProductsCarousel = ({ id }) => {
  const [productItems, setProductItems] = useState([]);
  const [ind, setInd] = useState(0);
  console.log(productItems);

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

  useEffect(() => {});

  const nextProduct = () => {
    if (ind + 1 === productItems.length) {
      setInd(0);
    } else {
      const newIndex = ind + 1;
      setInd(newIndex);
      console.log("Index", ind);
    }
  };

  const previousProduct = (e) => {
    if (ind - 1 === -1) {
      setInd(productItems.length - 1);
    } else {
      const newIndex = ind - 1;
      setInd(newIndex);
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
      <div className="carousel  max-w-[500px] m-auto rounded-box justify-center  ">
        {productItems.map((product, index, productItems) => {
          return (
            <div
              key={product._id}
              id={"slide" + index}
              className={`carousel-item transition-transform focus:scale-100  relative m-10 p-11 ${
                ind !== index ? " hidden scale-0" : ""
              }`}
            >
              <div className="card w-96 bg-base-100 shadow-xl">
                <figure>
                  <img
                    className="mask mask-parallelogram-2"
                    src={product.productThumbnail}
                    alt={product.title}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.title}!</h2>
                  <div className="stats shadow">
                    <div className="stat">
                      <div className=" stat-value text-info">Price</div>
                      <div className="stat-value text">
                        {" "}
                        {(product.priceInCents / 100).toFixed(2)}€
                      </div>
                    </div>
                  </div>
                  <p>{product.tagline}</p>
                  <p>This product is: {product.productType}</p>
                  <Rating value={"product"} id={product._id} />
                  <Link to={`/event/${product._id}`}>
                    <div className="card-actions justify-end">
                      <button className="btn btn-info hover:animate-pulse">
                        See More
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="absolute flex justify-between transform-translate-y-1/2 left-1 right-1 top-1/2 z-99">
                <div onClick={previousProduct} className="btn btn-circle">
                  ❮
                </div>
                <div onClick={nextProduct} className="btn btn-circle">
                  ❯
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsCarousel;
