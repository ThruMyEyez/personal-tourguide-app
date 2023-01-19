import React, { useContext, useEffect, useState } from "react";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import { AuthContext } from "../../context/authentication";
import { updateUser } from "../../services/user";
import { CloseNavigateBtn } from "../UI";
import { useNavigate } from "react-router-dom";
import { OnErrorAlert } from "../UI/Alerts";

const EditProfilePictureModal = () => {
  const { user, userFullDetails, getUserDetails } = useContext(AuthContext);

  const [errorMsg, setErrorMsg] = useState(null);
  const [formData, setFormData] = useState(user);

  const navigate = useNavigate();

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
    const response = await updateUser(formData).catch((error) => {
      console.log("Error creating Provider Profile", error);
      setErrorMsg(error.response.data.message);
    });
    console.log("Edited the user Profile", response);
    getUserDetails();
    navigate(-1);
  };

  return (
    <div className="z-50 fullscreen-modal-container">
      <div className="absolute w-2/3 p-2 mx-auto space-y-4 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-200 rounded-lg shadow-xl h-2/3 top-1/2 left-1/2">
        <CloseNavigateBtn navigateTo={-1} />
        <h1>Edit Your Profile Picture</h1>
        <form onSubmit={handleFormSubmit}>
          <label className="block" htmlFor="profilePicture">
            <span className="form-label">Choose Your profile Picture</span>
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

          <button className="btn-primary">Edit</button>
        </form>
        {errorMsg && <OnErrorAlert msg={errorMsg} />}
      </div>
    </div>
  );
};

export default EditProfilePictureModal;