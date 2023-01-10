import { api } from "./api";

export const login = (loginData) => api.post("/authentication/login", loginData);

export const signup = (signupData) => api.post("/authentication/signup", signupData);

export const verify = (token) =>
  api.get("/authentication/verify", { headers: { Authorization: `Bearer ${token}` } });

export const passwordReset = (email) => api.post("/authentication/password-reset", { email });

export const verifyPasswordReset = (id, token) =>
  api.get(`/authentication/password-reset/${id}/${token}`);

export const newPassword = (id, token, password) =>
  api.put(`/authentication/password-reset/${id}/${token}`, { password });

export const signupGoogle = (googleToken) =>
  api.post("/authentication/google/signup", { googleAccessToken: googleToken });

export const loginGoogle = (googleToken) =>
  api.post("/authentication/google/login", { googleAccessToken: googleToken });
