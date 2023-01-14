import { useEffect, useState } from "react";
import {
  followedUser,
  followUser,
  privateRoute,
  unfollowUser,
} from "../../services/user";

const Follow = (profileId) => {
  const [following, setFollowing] = useState(null);
  const [clicked, setClicked] = useState(false);

  profileId = "63b8544b32f2eca6481fedbe"; //TODO: remove

  useEffect(() => {
    followedUser(profileId)
      .then((following) => {
        console.log("Got the Following Document  ", following); //TODO: Erase
        if (following.data) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      })
      .catch((error) => console.log(error));
  }, [clicked, profileId]);

  const handleFollowingStatus = () => {
    if (following) {
      setFollowing(false);
      unfollowUser(profileId /*"USER ID "*/).catch((error) => {
        console.log(error);
      });
    }
    if (!following) {
      setFollowing(true);
      followUser(profileId /*"USER ID "*/).catch((error) => {
        console.log(error);
      });
    }
    setClicked(!clicked);
  };

  return (
    <div className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
      <button onClick={handleFollowingStatus}>
        {(following && "Unfollow") || "Follow"}
      </button>
    </div>
  );
};

export default Follow;
