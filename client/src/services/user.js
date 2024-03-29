import { api, authHeaders, getAuthHeaders } from "./api";

export const getFullOwnUserDetails = () => {
  return api.get(`/user/`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("AuthToken")}` },
  });
};

export const getOwnUserPurchases = () => api.get(`/user/purchases`, authHeaders);

export const getAllUsers = () => api.get("/user/all");

export const getPurchaseDetails = (purchaseId) =>
  api.get(`/user/purchases/${purchaseId}`, authHeaders);

// get public user profile
export const getFullUserDetails = (userId) => api.get(`/user/${userId}`);

// Following a specific user. req.body.followee aIs the target user to be followed
export const followedUser = (followee) =>
  api
    .get(`/user/followed/${followee}`, authHeaders)
    .then((response) => response.data)
    .catch((err) => console.log(err));

// Following a specific user. req.body.followee Is the target user to be followed
export const followUser = (followee) =>
  api.post(`/user/follow/`, { followee }, authHeaders).then((response) => response.data);

// Unfollowing a specific user. :id Is the targetUser to be unfollowed
export const unfollowUser = (userId) => api.delete(`/user/unfollow/${userId}`, authHeaders);

// data should contain string of new targetRole >> see backend
// "admin" role required for this route to work
export const updateUserRole = (data, userId) =>
  api.put(`/user/update-role/${userId}`, data, authHeaders);

// If the user.role is "provider" or "admin", user can create a provider profile
export const createProviderProfile = (data) => {
  console.log(authHeaders);
  getAuthHeaders();
  return api.post("/user/new-provider-profile", data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("AuthToken")}` },
  });
};

// If the user.role is "provider" or "admin", user can update his provider profile
export const updateProviderProfile = (data) => {
  getAuthHeaders();
  return api.put(`/user/edit-profile/`, data, authHeaders);
};

export const getUserRatings = (userId) => api.get(`/user/${userId}/ratings`, authHeaders);

export const updateUser = (data) => {
  getAuthHeaders();
  return api.put(`/user/update`, data, authHeaders);
};
