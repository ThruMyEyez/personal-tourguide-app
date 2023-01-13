import { useState, useEffect, useContext } from "react";
import { getProviderProducts } from "../../services/product";
import { AuthContext } from "../../context/authentication";

const MyOfferings = () => {
  const [offerings, setOfferings] = useState(null);

  const { isLoading, user } = useContext(AuthContext);

  useEffect(() => {
    console.log(isLoading);
    console.log("user: " + user._id);
    !isLoading &&
      getProviderProducts(user._id).then((products) => {
        console.log("products: ", products);
      });
    //getProviderProducts();
  }, []);

  return <div>{(!isLoading && <>MyOfferings</>) || <h3>Content loading...</h3>}</div>;
};

export default MyOfferings;
