import { useEffect, useState } from "react";
import { followedUser, followUser, unfollowUser } from "../../services/user";

const Follow = ({ provider, profileId }) => {
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
    <div className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
      <button onClick={handleFollowingStatus}>
        {console.log("Provider", provider)}
        {(following && "Unfollow") || "Follow"}
      </button>
    </div>
  );
};

export default Follow;
