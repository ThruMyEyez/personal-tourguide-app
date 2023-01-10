import { api, authHeaders } from "./api";

// A Complete Product is named "Event"!
// I think this is easier to understand,
// because this are the main Public functionality routes

export const getAllEvents = () => api.get("/event/");

export const getSingleEvent = (id) => api.get(`/event/${id}`);

export const newEventRating = (data, productId) =>
  api.post(`/event/rating/${productId}`, data, authHeaders);
