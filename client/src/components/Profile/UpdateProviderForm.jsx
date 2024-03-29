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
    setFormData({ ...formData, [name]: value });
  };
  // Create a new provider profile
  return (
    <div>
      <form className="text-black" onSubmit={handleFormSubmit}>
        <label className="block" htmlFor="provider-type">
          <span className="form-label text-white">Type of provider</span>
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
          <span className="form-label text-white">Tax ID</span>
        </label>
        <input
          className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          id="tax-id"
          type="text"
          name="taxID"
          value={formData.taxID}
          onChange={handleInput}
        />
        <label className="block" htmlFor="company">
          <span className="form-label text-white">Company Name</span>
        </label>
        <input
          className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          id="company"
          type="text"
          maxLength="60"
          name="company"
          value={formData.company}
          onChange={handleInput}
        />
        <label className="block" htmlFor="provider-type">
          <span className="form-label text-white">Biography</span>
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
        <button className="btn-primary">Edit your provider info</button>
      </form>
      {errorMsg && <OnErrorAlert msg={errorMsg} />}
    </div>
  );
};

export default UpdateProviderForm;
