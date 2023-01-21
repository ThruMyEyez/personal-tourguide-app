import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authentication";
import { createProviderProfile } from "../../services/user";
import { OnErrorAlert } from "../UI/Alerts";

//This Only Shows if User does not have a Provider Profile

const CreateProviderForm = () => {
  const { user, userFullDetails, getUserDetails } = useContext(AuthContext);

  const [errorMsg, setErrorMsg] = useState(null);
  const [hasProfile, setHasProfile] = useState(false);
  const [formData, setFormData] = useState({
    providerType: "Host",
    taxID: "",
    bio: "",
    company: "",
  });

  useEffect(() => {
    if (userFullDetails && userFullDetails.providerProfile) {
      setHasProfile(true);
    } else {
      setHasProfile(false);
    }
  }, [userFullDetails, user]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    createProviderProfile(formData)
      .then((response) => {
        console.log("Create Provider Profile", response);
        //This Updates userfulldetails, for the user
        getUserDetails();
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

  return (
    // Do I have already have a provider profile?
    // Create a new provider profile
    <div>
      {(!hasProfile && (
        <>
          <h1>You Need To Make Your Provider Profile </h1>

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
            <label className="block" htmlFor="company">
              <span className="form-label">Company Name</span>
            </label>
            <input
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              id="company"
              type="text"
              name="company"
              value={formData.company}
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
            <p className="mt-5">Write somthing to address ypur potentials clients</p>
            <button className="btn-primary">Save</button>
          </form>
          {errorMsg && <OnErrorAlert msg={errorMsg} />}
        </>
      )) || <></>}
    </div>
  );
};

export default CreateProviderForm;
