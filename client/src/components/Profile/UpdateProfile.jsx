import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authentication";
import { updateUser } from "../../services/user";

const UpdateProfile = ({ children }) => {
  const { user, userFullDetails, getUserDetails } = useContext(AuthContext);
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    if (userFullDetails) setFormData(userFullDetails);
  }, [userFullDetails, user]);

  const onFileUploadSuccess = (ikPicture) => {
    const { url } = ikPicture;
    console.log("File UploadSuccess", ikPicture);
    setFormData({ ...formData, profilePicture: url });
  };

  const onFileUploadError = (ikUploadErr) => {
    console.log("File UploadError", ikUploadErr);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    updateUser(formData).then((response) => {
      console.log("Edited the user Profile", response);
      getUserDetails();
    });
  };

  const handleInput = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Create a new provider profile
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {(formData.firstName && (
          <>
            <label className="block" htmlFor="firstName">
              <span className="form-label">First Name</span>
            </label>
            <input
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInput}
            />
          </>
        )) || (
          <>
            <label className="block" htmlFor="name">
              <span className="form-label">Name</span>
            </label>
            <input
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInput}
            />
          </>
        )}
        {formData.lastName && (
          <>
            <label className="block" htmlFor="lastName">
              <span className="form-label">Last Name</span>
            </label>
            <input
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInput}
            />
          </>
        )}
        <label className="block" htmlFor="profilePicture">
          <span className="form-label">ProfilePicture</span>
        </label>
        <IKContext
          urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL}
          publicKey={process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY}
          authenticationEndpoint={
            process.env.REACT_APP_SERVER_POINT +
            process.env.REACT_APP_IMAGEKIT_AUTHENTICTION_ENDPOINT
          }
        >
          <IKUpload
            className="my-2 block file-input file-input-bordered file-input-primary w-full max-w-xs"
            onSuccess={onFileUploadSuccess}
            onError={onFileUploadError}
          />
          {formData.profilePicture && (
            <IKImage
              className="mx-auto my-3 rounded-md shadow-lg hover:shadow-xl"
              src={formData.profilePicture}
              transformation={[
                {
                  height: "160",
                  width: "auto",
                },
              ]}
            />
          )}
        </IKContext>

        {children}
        <button className="btn-primary">Edit Profile Info</button>
      </form>
      {/* {errorMsg && <OnErrorAlert msg={errorMsg} />} */}
    </div>
  );
};

export default UpdateProfile;
