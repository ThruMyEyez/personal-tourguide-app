import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleEvent } from "../services/event";
import { TourMapProviderWrapper } from "../context/tourmapping";
import { EditorView } from "../components/Editor";
import RenderEventItem from "../components/RenderEventItem";
import { createPurchase } from "../services/purchase";
import Rating from "../components/Profile/Rating";

const PublicTours = () => {
  const [product, setProduct] = useState(null);
  const [date, setDate] = useState(null);
  const { id } = useParams();

  const fetchProduct = async () => {
    const specificProduct = await getSingleEvent(id);
    console.log(specificProduct.data.date);
    setDate(specificProduct.data.date);
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

  //const { eventDate } = product?.productItem;
  //const date = new Date(eventDate);

  return (
    <div>
      {product && (
        <>
          <h2 className="w-3/4 px-6 py-3 mx-auto mt-3 font-bold border rounded-lg glass border-primary text-zinc-500">
            {product.productType.toUpperCase()} for the {date}
          </h2>

          <div className="w-full text-center">
            <EditorView content={product.productItem.description} />
            <TourMapProviderWrapper>
              {/* single tour/event place's rendering */}
              <RenderEventItem placesToRender={product.productItem.places} />
              {/* single tour/event place's rendering */}
            </TourMapProviderWrapper>
            {/*className="flex items-center justify-center"*/}
            <div className="w-[62%]  my-6 shadow-xl stats bg-primary text-primary-content glass hover:bg-primary">
              <div className="w-full stat">
                <div className="m-3 stat-value">Price: {product.priceInCents / 100} €</div>
                <div className="stat-actions">
                  <button
                    className="z-50 self-start w-full shadow-xl hover:shadow-indigo-300 btn btn-primary text-zinc-100 tooltip tooltip-info tooltip-right"
                    data-tip={`continue with Stripe`}
                    onClick={() => handlePurchase(product._id)}
                  >
                    BOOK NOW
                  </button>
                </div>
              </div>
              {id && <Rating value={"product"} id={id} />}
              <div className="w-full stat">
                <div className="stat-title">4.2/5 Stars</div>
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
                <div className="stat-actions">Check out what others thought below:</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PublicTours;
