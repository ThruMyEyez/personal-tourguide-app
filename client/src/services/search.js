import { api } from "./api";

export const searchProduct = (searchTerm) => api.get(`search/${searchTerm}`);
