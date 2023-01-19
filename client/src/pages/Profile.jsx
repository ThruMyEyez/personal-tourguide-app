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
    <div className="w-full ">
      <div className="bg-white my-12 pb-6 w-full  justify-center items-center overflow-hidden rounded-lg shadow-sm mx-auto md:max-w-screen-md ">
        <div className="relative h-40">
          {/* //TODO: Create a modal to adda picture to the user */}
          <img
            className="absolute h-full w-full object-cover"
            src={
              "https://images.unsplash.com/photo-1448932133140-b4045783ed9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
            }
            alt=" "
          />
        </div>
        {isOwnProfile && (
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
        )}

        <div className="mt-16">
          <h1 className="text-lg text-center font-semibold">
            {(profileOwner.firstName || profileOwner.name) +
              " " +
              (profileOwner.lastName || "")}
          </h1>
          <p className="text-sm text-gray-600 text-center">
            My id: {profileOwner._id} Or Profile Owner: {profileOwner._id}
          </p>

          <p className="text-sm text-gray-600 text-center">
            {profileOwner.email}
          </p>
          <p className="text-sm text-gray-600 text-center">
            Tax Id:
            {profileOwner.providerProfile && profileOwner.providerProfile.taxID}
          </p>

          <p className="text-sm text-gray-600 text-center">
            {"My Role: " + profileOwner.role}
          </p>
          <p className="text-sm text-gray-600 text-center">
            Provider Type:
            {profileOwner.providerProfile &&
              profileOwner.providerProfile.providerType}
          </p>
          <p className="text-sm text-gray-600 text-center">
            {"Is my own profile: " + isOwnProfile}{" "}
            {/* TODO: Remove after use */}
          </p>
        </div>

        <div className="mt-6 pt-3 flex flex-wrap justify-between mx-6 border-t">
          {
            (!isOwnProfile && id && <Follow profileId={id} />) || (
              <></>
            ) /* TODO: CHANGE TO IS NOT OWN PROFILE*/
          }
          {id && <Rating id={id} />}
          {/* TODO: Link to a real id */}
        </div>
        <div className="">
          {userFullDetails && userFullDetails.providerProfile && (
            <Bio bio={userFullDetails.providerProfile.bio}></Bio>
          )}

          {profileOwner._id && <ProductsCarousel id={profileOwner._id} />}
          {profileOwner._id && <ProductsCarouselCopy id={profileOwner._id} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
