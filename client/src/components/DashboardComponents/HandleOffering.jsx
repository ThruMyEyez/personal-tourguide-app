import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleEvent } from "../../services/event";
import { createNewProduct, updateProduct } from "../../services/product";

const HandleOffering = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [offerData, setOfferData] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    getSingleEvent(id)
      .then((response) => {
        console.log(response.data.message);
        setOfferData(response.data.data);
      })
      .catch((error) => {
        setErrorMsg(error.response.data.error.message);
        console.error(error.response.data);
      });
  }, [id]);

  const handleInput = (e) => {
    const { name, value, valueAsNumber } = e.target;
    setOfferData({ ...offerData, [name]: valueAsNumber || value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      //Update
      updateProduct(offerData, id)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          setErrorMsg(error.response.data.error.message);
          console.error(error.response);
        });
    } else {
      //Create
      createNewProduct(offerData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          setErrorMsg(error.response.data.error.message);
          console.error(error.response);
        });
    }
  };

  return (
    <div className="w-full px-6 my-3">
      <h3>{(id && "Update this Offer") || "Create new Offer"}</h3>
      <div>
        <form onSubmit={handleSubmit}>
          {/* Product title */}
          <label className="block" htmlFor="input-title">
            <span className="form-label">Set Offer Title</span>
          </label>
          <input
            className="block w-full my-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            id="input-title"
            type="text"
            name="title"
            placeholder="New "
            value={offerData?.title}
            onChange={handleInput}
          />
          {/* Product tagline */}
          <label className="block" htmlFor="input-tagline">
            <span className="form-label">Set Tagline description</span>
          </label>
          <input
            className="block w-full my-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            id="input-title"
            type="text"
            name="tagline"
            value={offerData?.tagline}
            onChange={handleInput}
          />
          {/* Product price */}
          <label className="block" htmlFor="input-price">
            <span className="form-label">Set a Price</span>
          </label>
          <input
            className="block w-full my-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            id="input-price"
            type="number"
            name="priceInCents"
            value={offerData?.priceInCents}
            onChange={handleInput}
          />
          {/***
           * Idea: show default form data,
           * if there is data from API, show the API data instead the default data.
           * Finaly render update btn instead of create btn if API data is present
           ***/}
          {(id && <button className="btn-primary">Update</button>) || (
            <button className="btn-primary">Create</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default HandleOffering;
