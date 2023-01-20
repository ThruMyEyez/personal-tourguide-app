import React from "react";
import { Link } from "react-router-dom";

const PurchaseCanceled = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <div className="flex flex-row items-baseline  ">
              <h1 className="text-5xl font-bold">We are sorry</h1>
              <span className="text-9xl animate-[bounce_1s_infinite] ">.</span>
              <span className=" text-9xl animate-[bounce_2s_infinite]">.</span>
              <span className=" text-9xl animate-[bounce_1.5s_infinite]">
                .
              </span>
            </div>
            <div className="alert alert-error shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                ></svg>
                <span>Error! Something went wrong.</span>
              </div>
            </div>
            <p className="py-6">Please try again later</p>
            <Link to={"/"}>
              <button className="btn btn-primary">Keep Exploring</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCanceled;
