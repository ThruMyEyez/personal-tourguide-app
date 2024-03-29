import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/authentication";
import { getSingleEvent } from "../../services/event";
import { getProviderProducts } from "../../services/product";

const Rating = ({ id, value }) => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [products, setProducts] = useState([]);
  const getUserRating = () => {
    getProviderProducts(id).then((products) => {
      setProducts(products);
      const divider = products.data.data
        .filter((product) => {
          return product.rating.length > 0;
        })
        .map((result) => {
          return result.rating.length;
        });
      const ratingsAverage = products.data.data
        .map((product) => {
          return product.rating
            .map((number) => {
              return number.stars;
            })
            .reduce((acc, rating) => {
              return acc + Number(rating);
            }, 0);
        })
        .reduce((acc, rating) => {
          return acc + Number(rating);
        }, 0);
      setRating(ratingsAverage / divider.shift() || 0);
    });
  };

  const getProductRatings = () => {
    getSingleEvent(id).then((product) => {
      const divider = product.data.data.rating.length;
      const ratingsAverage = product.data.data.rating
        .map((rating) => {
          return rating.stars;
        })
        .reduce((acc, rating) => {
          return acc + Number(rating);
        }, 0);
      setRating(ratingsAverage / divider || 0);
    });
  };

  useEffect(() => {
    if (value === "user") {
      getUserRating();
    }
    if (value === "product") {
      getProductRatings();
    }
  }, [value, id]);

  const fullStarCount = Math.round(Number(rating || 0));
  const emptyStarCount = 5 - fullStarCount;

  return (
    <div className="btn btn-wider bg-white text-xl mr-2 my-1 uppercase  border px-2 text-yellow-600 border-yellow-600 hover:bg-yellow-600 hover:text-yellow-100 cursor-default">
      {"★".repeat(fullStarCount) + "☆".repeat(emptyStarCount)}
    </div>
  );
};

export default Rating;
