import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleEvent } from "../services/event";
import { TourMapProviderWrapper } from "../context/tourmapping";
import { EditorView } from "../components/Editor";
import RenderEventItem from "../components/RenderEventItem";
import { createPurchase } from "../services/purchase";

const PublicTours = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const fetchProduct = async () => {
    const specificProduct = await getSingleEvent(id);
    setProduct(specificProduct.data.data);
  };

  // handle purchasing and redirecting to stripe checkout
  const handlePurchase = async (productId) => {
    const purchase = await createPurchase(productId);
    window.location = purchase.data.session.url;
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    //console.log(product);
  }, [product]);

  return (
    <div>
      {product && (
        <>
          <h2 className="p-3 mx-auto">
            Type: {product.productType.toUpperCase()}, on the
            {product.productItem.eventDate}'
          </h2>

          <div className="w-full">
            <EditorView content={product.productItem.description} />
            <TourMapProviderWrapper>
              {/* single tour/event place's rendering */}
              <RenderEventItem placesToRender={product.productItem.places} />
              {/* single tour/event place's rendering */}
            </TourMapProviderWrapper>
            {/*className="flex items-center justify-center"*/}
            <div className="w-full my-2 ml-6 shadow-xl stats bg-primary text-primary-content glass hover:bg-primary">
              <div className="w-full stat">
                <div className="stat-title">Book now!</div>
                <div className="m-3 stat-value">
                  {product.priceInCents / 100} €
                </div>
                <div className="stat-actions">
                  <button
                    className="z-50 self-start w-full shadow-xl hover:shadow-indigo-300 btn btn-primary text-zinc-100 tooltip tooltip-info tooltip-right"
                    data-tip={`continue with Stripe`}
                    onClick={() => handlePurchase(product._id)}
                  >
                    book {product.productType} for <br />
                    {product.priceInCents / 100} €
                  </button>
                </div>
              </div>
              <div className="w-full stat">
                <div className="stat-title">Avarage of 42! Ratings</div>
                <div className="mx-auto rating rating-md">
                  <input
                    type="radio"
                    name="rating"
                    className="m-1 bg-orange-400 mask mask-star-2"
                  />
                  <input
                    type="radio"
                    name="rating"
                    className="m-1 bg-orange-400 mask mask-star-2"
                  />
                  <input
                    type="radio"
                    name="rating"
                    className="m-1 bg-orange-400 mask mask-star-2"
                  />
                  <input
                    type="radio"
                    name="rating"
                    className="m-1 bg-orange-400 mask mask-star-2"
                  />
                  <input
                    type="radio"
                    name="rating"
                    className="m-1 bg-orange-400 mask mask-star-2"
                  />
                </div>
                <div className="stat-actions">
                  Read customer ratings down below "click"
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PublicTours;
