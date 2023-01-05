import api from "./api";

export const getProviderPlaces = (data) => api.get("/place", data);

export const saveNewPlace = (data, id) => api.post("/place/create", { ...data, userId: id });

export const editPlace = (data, placeId) => api.put(`/place/edit/${placeId}`, data);

export const deletePlace = (data, placeId) => api.delete(`/place/delete/${placeId}`, data);
