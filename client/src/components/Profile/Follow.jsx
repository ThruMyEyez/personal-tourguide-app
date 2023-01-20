import { useEffect, useState } from "react";
import { followedUser, followUser, unfollowUser } from "../../services/user";

const Follow = ({ profileId }) => {
  const [following, setFollowing] = useState(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    followedUser(profileId)
      .then((following) => {
        if (following.data) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      })
      .catch((error) => console.log(error));
  }, [profileId]);

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
    <div className=" btn btn-wider bg-white text-xl mr-2 my-1 uppercase  border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
      <button className="" onClick={handleFollowingStatus}>
        {(following && "Unfollow") || "Follow"}
      </button>
    </div>
  );
};

export default Follow;
