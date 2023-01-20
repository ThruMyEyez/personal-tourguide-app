import { api, stripeHeaders } from "./api";

export const createPurchase = (productId) => {
  return api.post(`/purchase/${productId}`, stripeHeaders);
};

export const getPurchase = (sessionId) => {
  return api.get(`/purchase/success/${sessionId}`, stripeHeaders);
};
