import { api, authHeaders } from "./api";

export const getProviderPlaces = () => api.get("/place", authHeaders);

export const getSpecificPlace = (placeId) => api.get(`/place/${placeId}`, authHeaders);

export const saveNewPlace = (data) => api.post("/place/create", { ...data }, authHeaders);

export const editPlace = (data, placeId) =>
  api.put(`/place/edit/${placeId}`, data, authHeaders);

export const deletePlace = (placeId) => api.delete(`/place/delete/${placeId}`, authHeaders);
