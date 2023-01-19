import { api } from "./api";

export const searchProduct = (query) => api.get(`search/${query}`);
