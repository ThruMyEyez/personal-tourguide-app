import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authentication";
import { getOwnUserPurchases } from "../../services/user";

const Purchases = ({ id }) => {
  const [purchases, setPurchases] = useState([]);
  const { isLoading, user } = useContext(AuthContext);

  useEffect(() => {
    getOwnUserPurchases().then((purchasesDoc) => {
      const purchases = purchasesDoc.data.purchases.map((purchase) => {
        const productComplete = JSON.parse(purchase.product);
        return { ...purchase, product: productComplete };
      });

      setPurchases([...purchases]);
    });
  }, [id]);

  return (
    <div>
      {purchases.map((purchase) => (
        <div key={purchase._id}>
          <h1 className="text-lg text-center font-semibold">
            You bought this product
          </h1>

          <p>Purchase ID:{purchase._id}</p>
          <p>Purchase status:{purchase.status}</p>
          <p>Purchase product:{purchase.product.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default Purchases;
