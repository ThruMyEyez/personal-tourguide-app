import React from "react";
import UpdateProfile from "../components/Profile/UpdateProfile";
import UpdateProviderForm from "../components/Profile/UpdateProviderForm";

const EditProfile = () => {
  return (
    <div>
      <div>
        Edit Profile
        <UpdateProfile />
      </div>
      <div>
        Edit Provider Info
        <UpdateProviderForm />
      </div>
    </div>
  );
};

export default EditProfile;
