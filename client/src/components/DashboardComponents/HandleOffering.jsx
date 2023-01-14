// ToDo split this into smaller components
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IKContext, IKUpload, IKImage } from "imagekitio-react";
import { Selector } from "../UI";
import { AuthContext } from "../../context/authentication";
import { getSingleEvent } from "../../services/event";
import {
  getAllProviderProductItems,
  createNewProduct,
  updateProduct,
} from "../../services/product";

const itemEmptyObject = {
  userId: "",
  title: "",
  priceInCents: 0,
  productThumbnail: "",
  tagline: "",
  productType: "event",
  productItem: [],
};

// Need to get all productItems for specific user here!
const HandleOffering = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [offerData, setOfferData] = useState(itemEmptyObject);
  const [isProductItemsLoading, setIsProductItemsLoading] = useState(true);
  const [productItems, setProductItems] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedProductItem, setSelectedProductItem] = useState(null);
  const { isLoading, user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    id &&
      getSingleEvent(id)
        .then((response) => {
          setSelectedProductItem(response.data.data);
          setOfferData(response.data.data);
        })
        .catch((error) => {
          setErrorMsg(error.response.data);
        });
  }, [id]);

  useEffect(() => {
    if (!isLoading) {
      const { _id } = user;
      getAllProviderProductItems(_id)
        .then((response) => {
          response.data.data.map((item) => {
            item.value = item._id;
            item.label = item.title;
            return item;
          });
          setProductItems(response.data.data);
          setIsProductItemsLoading(false);
        })
        .catch((error) => {
          setErrorMsg(error.response.data.error);
        });
    }
  }, []);

  useEffect(() => {
    setOfferData({ ...offerData, productItem: selectedProductItem });
  }, [selectedProductItem]);

  const handleInput = (e) => {
    const { name, value, valueAsNumber } = e.target;
    setOfferData({ ...offerData, [name]: valueAsNumber || value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    delete offerData.__v;
    if (id) {
      //On Update
      updateProduct(offerData, id)
        .then((response) => {
          console.log(response.data);
          navigate("/dashboard/my-offerings");
        })
        .catch((error) => {
          setErrorMsg(error.response.data.error.message);
          console.error(error.response);
        });
    } else {
      //On Create
      createNewProduct(offerData)
        .then((response) => {
          console.log(response.data);
          navigate("/dashboard/my-offerings");
        })
        .catch((error) => {
          setErrorMsg(error.response.data.error.message);
          console.error(error.response);
        });
    }
  };

  const handleSelect = (data) => {
    setSelectedProductItem(data);
  };

  const handleTypeSelect = (data) => {
    setOfferData({ ...offerData, productType: data.value });
    //setSelectedType(data);
  };

  const onFileUploadSuccess = (ikPicture) => {
    const { url } = ikPicture;
    setOfferData({ ...offerData, productThumbnail: url });
  };

  const onFileUploadError = (ikUploadErr) => {
    console.log("File UploadError", ikUploadErr);
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
            placeholder="Chose a "
            value={offerData.title}
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
            value={offerData.tagline}
            onChange={handleInput}
          />

          <IKContext
            urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL}
            publicKey={process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY}
            authenticationEndpoint={
              process.env.REACT_APP_SERVER_POINT +
              process.env.REACT_APP_IMAGEKIT_AUTHENTICTION_ENDPOINT
            }
          >
            <IKUpload onSuccess={onFileUploadSuccess} onError={onFileUploadError} />
            {offerData.productThumbnail && (
              <IKImage
                className="mx-auto"
                src={offerData.productThumbnail}
                transformation={[
                  {
                    height: "150",
                    width: "auto",
                  },
                ]}
              />
            )}
          </IKContext>

          {/* Product price */}
          <label className="block" htmlFor="input-price">
            <span className="form-label">Set a Price</span>
          </label>
          <input
            className="block w-full my-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            id="input-price"
            type="number"
            name="priceInCents"
            value={offerData.priceInCents}
            onChange={handleInput}
          />

          {/* productType selector */}
          <label className="block" htmlFor="input-price">
            <span className="form-label">... is it a Tour or Event?</span>
          </label>
          <Selector
            placeholder="Select your Offering type ..."
            options={[
              { value: "tour", label: "Tour" },
              { value: "event", label: "Event" },
            ]}
            handleChange={handleTypeSelect}
            value={""}
          />

          {offerData.productType}
          <p>{selectedType}</p>

          {/* productItem selector */}
          <label className="block">
            <span className="form-label">Select your Event or Tour</span>
          </label>
          <Selector
            loading={isProductItemsLoading}
            options={productItems}
            handleChange={handleSelect}
            value={selectedProductItem}
            placeholder="Search & select your places for the tour or event."
          />

          {(id && <button className="btn-primary">Update</button>) || (
            <button className="btn-primary">Create</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default HandleOffering;