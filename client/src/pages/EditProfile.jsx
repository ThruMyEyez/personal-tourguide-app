import React from "react";
import UpdateProfile from "../components/Profile/UpdateProfile";
import UpdateProviderForm from "../components/Profile/UpdateProviderForm";

const EditProfile = () => {
  return (
    <div className="">
      <div className="text-white">
        Edit Profile
        <UpdateProfile />
      </div>
      <div className="text-white">
        Edit Provider Info
        <UpdateProviderForm />
      </div>
    </div>
  );
};

export default EditProfile;
