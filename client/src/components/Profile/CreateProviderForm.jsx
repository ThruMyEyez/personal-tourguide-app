import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authentication";
import { createProviderProfile } from "../../services/user";
import { FormHelper } from "../UI/UIHelper";

const CreateProviderForm = () => {
  const [formData, setFormData] = useState({
    providerType: "",
    taxID: "",
    bio: "",
  });
  const handleFormSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    createProviderProfile(formData).then((response) => {
      console.log("Create Provider Profile", response);
    });
  };

  const handleInput = (e) => {
    console.log(e.target.value);
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Do I have already have a provider profile?

  // Create a new provider profile
  return (
    <div>
      CreateProviderForm{" "}
      <form onSubmit={handleFormSubmit}>
        <label className="block" htmlFor="provider-type">
          <span className="form-label">Type of provider </span>
        </label>
        <select
          className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          id="provider-type"
          value={formData.providerType}
          name="providerType"
          onChange={handleInput}
        >
          <option value="Host">Host </option>
          <option valu3="Tourguide">Tourguide</option>
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
        <label className="block" htmlFor="bio">
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
      </form>
      {/* {errorMsg && <OnErrorAlert msg={errorMsg} />} */}
    </div>
  );
};

export default CreateProviderForm;
