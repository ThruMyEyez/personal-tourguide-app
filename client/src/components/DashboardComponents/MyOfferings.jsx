import { useState, useEffect, useContext } from "react";
import { getProviderProducts } from "../../services/product";
import { AuthContext } from "../../context/authentication";
import { CloseNavigateBtn } from "../UI";
import { OnErrorAlert } from "../UI/Alerts";
import { ProductPreviewCard } from "../Product/";

const MyOfferings = () => {
  const [offerings, setOfferings] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { isLoading, user } = useContext(AuthContext);

  useEffect(() => {
    !isLoading &&
      getProviderProducts(user._id)
        .then((response) => {
          console.log("status: ", response.data.status);
          console.log("message: ", response.data.message);
          console.log(user.role);
          setOfferings(response.data.data);
        })
        .catch((error) => {
          setErrorMsg(error.response.data.error.message);
          console.error(error.response.data);
          console.log(error);
        });
  }, []);

  return (
    <div className="w-full p-3 border border-sky-600">
      <CloseNavigateBtn navigateTo={-1} />

      <h3>MyOfferings</h3>
      {errorMsg && <OnErrorAlert msg={errorMsg} />}
      {(offerings && (
        <div>
          {offerings.map((product) => {
            console.log(product);
            return (
              <ProductPreviewCard
                key={product._id}
                product={product}
                provider={user}
                isOwn
                offers={offerings}
                setOffers={setOfferings}
              />
            );
          })}
        </div>
      )) || <h4>... Loading Content ...</h4>}
    </div>
  );
};

export default MyOfferings;
