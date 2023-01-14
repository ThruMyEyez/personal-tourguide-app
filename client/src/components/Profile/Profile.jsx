import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/authentication";
import { useParams } from "react-router-dom";

const Profile = ({ children }) => {
  const { id } = useParams();
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="w-full ">
      <div className="bg-white my-12 pb-6 w-full  justify-center items-center overflow-hidden rounded-lg shadow-sm mx-auto md:max-w-screen-md ">
        <div className="relative h-40">
          <img
            className="absolute h-full w-full object-cover"
            src={
              "https://images.unsplash.com/photo-1448932133140-b4045783ed9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
            }
            alt=" "
          />
        </div>
        <div className="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
          {user.profilePicture && (
            <img
              referrerPolicy="no-referrer"
              className="object-cover w-full h-full"
              src={user.profilePicture}
              alt=" "
            />
          )}
        </div>
        <div className="mt-16">
          <h1 className="text-lg text-center font-semibold">{user.name}</h1>
          <p className="text-sm text-gray-600 text-center">{user.email}</p>
        </div>

        <div className="mt-6 pt-3 flex flex-wrap justify-between mx-6 border-t">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Profile;
