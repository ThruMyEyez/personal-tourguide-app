import { api, authHeaders } from "./api";

export const getFullOwnUserDetails = () => api.get(`/user/`, authHeaders);

export const getOwnUserPurchases = () =>
  api.get(`/user/purchases`, authHeaders);

export const getPurchaseDetails = (purchaseId) =>
  api.get(`/user/purchases/${purchaseId}`, authHeaders);

// get public user profile
export const getFullUserDetails = (userId) => api.get(`/user/${userId}`);

// Following a specific user. req.body.followee Is the target user to be followed
export const followUser = (data) =>
  api.post(`/user/follow/`, data, authHeaders);

// Unfollowing a specific user. :id Is the targetUser to be unfollowed
export const unfollowUser = (userId) =>
  api.delete(`/user/unfollow/${userId}`, authHeaders);

// data should contain string of new targetRole >> see backend
// "admin" role required for this route to work
export const updateUserRole = (data, userId) =>
  api.put(`/user/update-role/${userId}`, data, authHeaders);

// If the user.role is "provider" or "admin", user can create a provider profile
export const createProviderProfile = (data) =>
  api.post("/user/new-provider-profile", data, authHeaders);

// If the user.role is "provider" or "admin", user can update his provider profile
export const updateProviderProfile = (data) =>
  api.put(`/user/edit-profile/`, data, authHeaders);
