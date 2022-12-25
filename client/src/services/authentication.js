import api from "./api";

export const login = (loginData) => api.post("/authentication/login", loginData);

export const signup = (signupData) => api.post("/authentication/signup", signupData);

export const verify = (token) =>
  api.get("/authentication/verify", { headers: { Authorization: `Bearer ${token}` } });

export const passwordReset = (email) => api.post("/authentication/password-reset", { email });
