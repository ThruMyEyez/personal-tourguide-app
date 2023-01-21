import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/authentication";
import { getPurchase } from "../services/purchase";

const PurchaseSuccess = () => {
  const { user } = useContext(AuthContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const [session, setSession] = useState();
  searchParams.get("session_id");

  useEffect(() => {
    getPurchase(searchParams.get("session_id"))
      .then((purchase) => {
        setSession(purchase.data.purchase);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <div>
      {session && (
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src={session.product.productThumbnail}
              className="max-w-sm rounded-lg shadow-2xl"
              alt=""
            />
            <div>
              <h1 className="text-5xl font-bold">
                Great News! You're going to {session.product.productType}{" "}
                {session.product.productItem.places.map((place) => {
                  return (
                    <span key={place._id} className="">
                      {" "}
                      {place.title}
                    </span>
                  );
                })}
              </h1>

              <div className="alert alert-success shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Your purchase has been confirmed! Your event will take place
                    on
                    {session.product.productItem.eventDate}
                  </span>
                </div>
              </div>

              <p className="py-6">
                An email was sent to{" "}
                {session.session.customer_email || user.email}
              </p>
              <Link to={"/"}>
                <button className="btn btn-primary">Keep Exploring</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseSuccess;
