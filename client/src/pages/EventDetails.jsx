import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleEvent } from "../services/event";
import { TourMapProviderWrapper } from "../context/tourmapping";
import { EditorView } from "../components/Editor";
import RenderEventItem from "../components/RenderEventItem";

const PublicTours = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  console.log("ID: " + id);

  const fetchProduct = async () => {
    const specificProduct = await getSingleEvent(id);
    setProduct(specificProduct.data.data);
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
          <EditorView content={product.productItem.description} />
          <TourMapProviderWrapper>
            {/* single tour/event place's rendering */}
            <RenderEventItem placesToRender={product.productItem.places} />
            {/* single tour/event place's rendering */}
          </TourMapProviderWrapper>
          <button className="mx-6 btn btn-primary">purchase</button>
        </>
      )}
    </div>
  );
};

export default PublicTours;
