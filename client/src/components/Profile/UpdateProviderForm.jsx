import React, { useEffect, useState } from "react";
import { useContext } from "react";

import { AuthContext } from "../../context/authentication";
import {
  getFullOwnUserDetails,
  updateProviderProfile,
} from "../../services/user";

const UpdateProviderForm = () => {
  const [formData, setFormData] = useState({
    providerType: "Tourguide",
    taxID: "3456",
  });
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  if (user.providerProfile) {
  }
  // Get profile information
  useEffect(() => {
    // getFullOwnUserDetails().then((data) => {
    //   setFormData(data.data.user.providerProfile);
    console.log(formData);
    // });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateProviderProfile(formData).then((response) => {
      console.log("Create Provider Profile", response);
    });
  };

  const handleInput = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Create a new provider profile
  return (
    <div>
      UpdateProviderForm{" "}
      <form onSubmit={handleFormSubmit}>
        <label className="block" htmlFor="provider-type">
          <span className="form-label">Type of provider </span>
        </label>
        <select
          className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          id="provider-type"
          type="input"
          value={formData.providerType}
          name="providerType"
          onChange={handleInput}
        >
          <option value={"Host"}>Host </option>
          <option value={"Tourguide"}>Tourguide</option>
        </select>
        <label className="block" htmlFor="tax-id">
          <span className="form-label">Tax Id</span>
        </label>
        <input
          className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          id="login-email"
          type="text"
          name="taxID"
          value={formData.taxID}
          onChange={handleInput}
        />
        <label className="block" htmlFor="provider-type">
          <span className="form-label">Biography</span>
        </label>

        <textarea
          id="bio"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder='A short "Bio" or "About Me". Describe yourself!'
        ></textarea>
        <p className="mt-5">
          Write somthing to address ypur potentials clients
        </p>
      </form>
      {/* {errorMsg && <OnErrorAlert msg={errorMsg} />} */}
      <div className="max-w-2xl mx-auto">
        <div id="default-carousel" className="relative" data-carousel="static">
          <div className="overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <span className="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-gray-800">
                First Slide
              </span>
              <img
                src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
                alt="..."
              />
            </div>
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img
                src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
                alt="..."
              />
            </div>
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img
                src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
                alt="..."
              />
            </div>
          </div>
          <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 1"
              data-carousel-slide-to="0"
            ></button>
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 2"
              data-carousel-slide-to="1"
            ></button>
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 3"
              data-carousel-slide-to="2"
            ></button>
          </div>
          <button
            type="button"
            className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
            data-carousel-prev
          >
            <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              <span className="hidden">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
            data-carousel-next
          >
            <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span className="hidden">Next</span>
            </span>
          </button>
        </div>

        <p className="mt-5">
          This carousel slider component is part of a larger, open-source
          library of Tailwind CSS components. Learn more by going to the
          official
        </p>
        <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
      </div>
    </div>
  );
};

export default UpdateProviderForm;
