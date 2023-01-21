import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/authentication";
import { useLocation } from "react-router-dom";

import { Link, useParams } from "react-router-dom";
import Follow from "../components/Profile/Follow";
import Rating from "../components/Profile/Rating";
import Bio from "../components/Profile/Bio";
import { getFullUserDetails } from "../services/user";
import ProductsCarousel from "../components/Profile/ProductsCarousel";
import ProductsCarouselCopy from "../components/Profile/ProductsCarouselCopy";

const Profile = ({ self, children }) => {
  const { user, userFullDetails } = useContext(AuthContext);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [profileOwner, setProfileOwner] = useState({});
  const location = useLocation();
  let { id } = useParams();

  if (self && user) {
    id = user._id;
  }

  //Profile recives a prop id to render the especified user
  const refreshUser = (id) => {
    id &&
      getFullUserDetails(id).then((user) => {
        if (user.data.data) {
          setProfileOwner(user.data.data);
        }
      });
  };

  //Sets Own Profile or Another Profile
  useEffect(() => {
    console.log("UserIn id to string", user);
    if (user && user._id.toString() === id) {
      setIsOwnProfile(true);
      if (userFullDetails) {
        setProfileOwner(userFullDetails);
      }
    } else {
      setIsOwnProfile(false);
      refreshUser(id);
    }
  }, [id, userFullDetails, user]);

  return (
    <div className="w-full  h-full  flex flex-col items-center ">
      <div className="w-full">
        <div className="bg-white my-12 pb-6 w-full  justify-center items-center overflow-hidden rounded-lg shadow-xl mx-auto md:max-w-screen-md ">
          <div className="relative w-full h-40">
            {/* //TODO: Create a modal to adda picture to the user */}
            <img
              className="absolute h-full w-full object-cover"
              src={
                "https://images.unsplash.com/photo-1448932133140-b4045783ed9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              }
              alt=" "
            />
          </div>
          {(isOwnProfile && (
            <Link state={{ background: location }} to="/profile/edit/picture">
              <div className="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4 bg-primary">
                {profileOwner.profilePicture && (
                  <img
                    referrerPolicy="no-referrer"
                    className="object-cover w-full h-full "
                    src={profileOwner.profilePicture}
                    alt=" "
                  />
                )}
              </div>
            </Link>
          )) || (
            <div className="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4 bg-primary">
              {profileOwner.profilePicture && (
                <img
                  referrerPolicy="no-referrer"
                  className="object-cover w-full h-full "
                  src={profileOwner.profilePicture}
                  alt=" "
                />
              )}
            </div>
          )}
          <div className="flex flex-col m-10 items-center justify-center">
            <div className="flex items-center justify-center space-x-2 mt-2">
              <p className="text-2xl">
                {(profileOwner.firstName || profileOwner.name) +
                  " " +
                  (profileOwner.lastName || "")}
              </p>
            </div>
            <p className="text-gray-700">
              {profileOwner.providerProfile &&
                profileOwner.providerProfile.providerType}
            </p>
            <p className="text-sm text-gray-500"> {profileOwner.email}</p>
          </div>
          <div className="mt-6 pt-3 flex flex-wrap justify-between mx-6 border-t">
            {
              (!isOwnProfile && id && <Follow profileId={id} />) || (
                <></>
              ) /* TODO: CHANGE TO IS NOT OWN PROFILE*/
            }
            {id && <Rating value={"user"} id={id} />}
            {/* TODO: Link to a real id */}
          </div>
        </div>
        {/* bg-white my-12 pb-6 w-full  justify-center items-center overflow-hidden rounded-lg shadow-xl mx-auto md:max-w-screen-md */}
      </div>

      <div className="w-full">
        <div className="items-center  bg-white my-12 pb-6 w-full  justify-center shadow-xl  overflow-hidden rounded-lg  mx-auto  flex-col  md:max-w-screen-md ">
          <div className="w-full flex flex-col ">
            <div className="flex-1 bg-white rounded-lg  p-8">
              <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
              <ul className="mt-2 text-gray-700">
                <li className="flex border-y py-2">
                  <span className="font-bold w-24">Full name:</span>
                  <span className="text-gray-700">
                    {" "}
                    {(profileOwner.firstName || profileOwner.name) +
                      " " +
                      (profileOwner.lastName || "")}
                  </span>
                </li>
                {isOwnProfile && (
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Account Id:</span>
                    <span className="text-gray-700">{profileOwner._id}</span>
                  </li>
                )}
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Email:</span>
                  <span className="text-gray-700">{profileOwner.email}</span>
                </li>
                {isOwnProfile && (
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">Financial Info:</span>
                    <span className="text-gray-700">
                      {" "}
                      {profileOwner.providerProfile &&
                        profileOwner.providerProfile.taxID}
                    </span>
                  </li>
                )}

                {isOwnProfile && (
                  <li className="flex border-b py-2">
                    <span className="font-bold w-24">My Role :</span>
                    <span className="text-gray-700">
                      {profileOwner && profileOwner.role}
                    </span>
                  </li>
                )}
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Provider Type:</span>
                  <span className="text-gray-700">
                    {profileOwner.providerProfile &&
                      profileOwner.providerProfile.providerType}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        {profileOwner && profileOwner.providerProfile && (
          <Bio bio={profileOwner.providerProfile.bio}></Bio>
        )}

        {profileOwner._id && <ProductsCarousel id={profileOwner._id} />}
      </div>
    </div>
  );
};

export default Profile;
