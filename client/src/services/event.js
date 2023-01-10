import { api, authHeaders } from "./api";

// A Complete Product is named "Event"!
// I think this is easier to understand,
// because this are the main Public functionality routes

// Get all events/products from the API
export const getAllEvents = () => api.get("/event/");

export const getSingleEvent = (id) => api.get(`/event/${id}`);

// Customer can create a new Rating if he visited the event
// and the event is already over.
export const newEventRating = (data, productId) =>
  api.post(`/event/rating/${productId}`, data, authHeaders);
