//import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteOwnProduct from "./DeleteOwnProduct";

const ProductPreviewCard = ({ product, provider, isOwn, offers, setOffers }) => {
  //const formatedDate = product.productItem.eventDate.toLocaleDateString("en-GB");

  return (
    <div
      className="relative block p-6 mx-6 mb-2 overflow-hidden bg-center bg-cover border rounded-lg border-slate-100"
      style={{ backgroundImage: `url(${product.productThumbnail})` }}
    >
      {/*<Link
        className="relative block p-8 ml-6 mr-6 overflow-hidden bg-white border rounded-lg border-slate-100"
        to="/"
  >*/}
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-indigo-300 via-blue-500 to-purple-400"></span>

      <div className="justify-between sm:flex">
        <div>
          <h5 className="text-xl font-bold text-white [text-shadow:#000_1px_1px_4px]">
            {product.title}
          </h5>
          <p className="mt-1 text-xs font-medium text-slate-200 [text-shadow:#000_1px_1px_2px]">
            Provider: {provider.name}
          </p>
        </div>

        {!isOwn && (
          <div className="flex-shrink-0 hidden ml-3 sm:block">
            {
              <img
                className="object-cover w-16 h-16 rounded-lg shadow-sm"
                src={provider.profilePicture}
                alt="Provider Avatar"
              />
            }
          </div>
        )}
      </div>

      <div className="mt-4 sm:pr-8">
        <p className="text-sm  text-slate-200 [text-shadow:#000_1px_1px_2px]">
          {product.tagline}
        </p>
      </div>

      <dl className="flex mt-5 [text-shadow:#000_1px_1px_1px]">
        <div className="flex flex-col">
          <dt className="text-xs capitalize text-slate-100">{product.productType} on:</dt>
          <dd className="text-sm font-medium text-slate-200">
            {product.productItem?.eventDate}
          </dd>
        </div>

        {(!isOwn && (
          <div className="flex flex-col mx-auto">
            <dt className="text-sm font-medium capitalize text-slate-200">
              Book this {product.productType}:
            </dt>
            <dd className="text-sm font-medium text-slate-200">
              Price {product.priceInCents / 100}$
            </dd>
          </div>
        )) || (
          <div className="flex mx-auto">
            <Link
              className="px-4 py-2 mx-3 my-5 text-sm font-medium rounded bg-indigo-400/60 hover:bg-indigo-500/80 text-slate-200"
              to={`/dashboard/manage-offering/${product._id}`}
            >
              Edit Article
            </Link>
            <DeleteOwnProduct
              curProduct={product}
              productId={product._id}
              title={product.title}
              type={product.productType}
              offers={offers}
              setOffers={setOffers}
            />
          </div>
        )}
      </dl>
      {/*</Link>*/}
    </div>
  );
};

export default ProductPreviewCard;
