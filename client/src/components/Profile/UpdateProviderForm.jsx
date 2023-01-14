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
    </div>
  );
};

export default UpdateProviderForm;
