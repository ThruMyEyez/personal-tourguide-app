// get all events from specific provider (providerId)

import { useEffect, useState } from "react";
import { getProviderProducts } from "../../services/product";
import { Link, useParams } from "react-router-dom";

const AllProviderProducts = () => {
  const [providerProducts, setProviderProducts] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchProviderProducts = async () => {
      const allProviderProducts = await getProviderProducts(id);
      console.log(allProviderProducts.data.data);
      setProviderProducts([...allProviderProducts.data.data]);
    };
    fetchProviderProducts();
  }, [id]);

  return (
    <div>
      {providerProducts &&
        providerProducts.map((providerProduct) => {
          return (
            <div key={providerProduct._id}>
              <Link to={`/event/${providerProduct._id}`}>
                <h1>{providerProduct.title}</h1>
                <p>{providerProduct.tagline}</p>
                <p>£{providerProduct.priceInCents / 100}</p>
                <button>View Event</button>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default AllProviderProducts;
