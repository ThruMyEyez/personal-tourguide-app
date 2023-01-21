import React, { useEffect, useState } from "react";
import { useContext } from "react";

import { AuthContext } from "../../context/authentication";
import { updateProviderProfile } from "../../services/user";
import { OnErrorAlert } from "../UI/Alerts";

const UpdateProviderForm = () => {
  const { user, userFullDetails, getUserDetails } = useContext(AuthContext);

  const [errorMsg, setErrorMsg] = useState(null);
  const [formData, setFormData] = useState({ taxID: "" });

  useEffect(() => {
    console.log(userFullDetails);
    if (userFullDetails && userFullDetails.providerProfile) {
      setFormData(userFullDetails.providerProfile);
    }
  }, [user, userFullDetails]);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateProviderProfile(formData)
      .then((response) => {
        //Changes the user details saved on context
        getUserDetails();
        console.log("Create Provider Profile", response);
      })
      .catch((error) => {
        console.log("Error creating Provider Profile", error);
        setErrorMsg(error.response.data.message);
      });
  };

  const handleInput = (e) => {
    const { value, name } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };
  console.log("FormData", formData);
  // Create a new provider profile
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label className="block" htmlFor="provider-type">
          <span className="form-label">Type of provider </span>
        </label>
        <select
          className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          id="provider-type"
          type="text"
          value={formData.providerType}
          name="providerType"
          onChange={handleInput}
          multiple={false}
        >
          <option value={"Host"}>Host </option>
          <option value={"Tourguide"}>Tourguide</option>
        </select>
        <label className="block" htmlFor="tax-id">
          <span className="form-label">Tax Id</span>
        </label>
        <input
          className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          id="tax-id"
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
          name="bio"
          value={formData.bio}
          onChange={handleInput}
        ></textarea>
        <p className="mt-5">
          Write somthing to address ypur potentials clients
        </p>
        <button className="btn-primary">Edit Your Provider Info </button>
      </form>
      {errorMsg && <OnErrorAlert msg={errorMsg} />}
    </div>
  );
};

export default UpdateProviderForm;
