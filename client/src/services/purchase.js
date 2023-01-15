import { api, stripeHeaders } from "./api";

export const createPurchase = (productId) => api.post(`/purchase/${productId}`);
