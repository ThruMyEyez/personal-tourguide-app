import { api, authHeaders } from "./api";

// Already included in the event route service. A Product contains a "happening" date
// and is named "Event".
// export const getAllProducts = () => api.get("/products/");

//get all products from a specific provider (public)
export const getProviderProducts = (userId) => {
  return api.get(`/product/provider/${userId}`);
};

// get all productItems from a specific provider
export const getAllProviderProductItems = (userId) =>
  api.get(`/product/event-items/${userId}`);

// Already included in the event route service.
//export const getProductDetails = (productId) => api.get(`/product/${productId}`);

// Provider can created a Product from a productItem and save in the DB.
export const createNewProduct = (data) =>
  api.post(`/product/create`, data, authHeaders);

// Provider can edit a Product that he already has created in the DB.
export const updateProduct = (data, productId) =>
  api.put(`/product/edit/${productId}`, data, authHeaders);

// Provider can delete a Product that he already has created in the DB.
export const deleteProduct = (productId) =>
  api.delete(`/product/delete/${productId}`, authHeaders);

// Provider can create a productItem from WYSIWYG and his places under this route service
// The productItem is neccessary for the provider to be enabled creating new Products
export const createEventItem = (data) => {
  return api.post("/product/item/create", data, authHeaders);
};

// Provider can edit a productItem that he already has created in the DB.
export const updateEventItem = (data, productItemId) =>
  api.put(`/product/item/edit/${productItemId}`, data, authHeaders);

// Provider can delete a productItem that he already has created in the DB.
export const deleteEventItem = (productItemId) =>
  api.delete(`/product/item/delete/${productItemId}`, authHeaders);

// Already included in the event route service.
// export const rateProduct = (data, productId) =>
//   api.post(`/product/rate/${productId}`, data, authHeaders);
