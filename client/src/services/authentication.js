import axios from "axios";
import api from "./api";

export const login = loginData => api.post("/authentication/login", loginData).then(response => response.data);

export const signup = (signupData) => api.post("/authentication/signup", signupData).then(response => response.data);

export const verify = token =>
  api
    .get("/authentication/verify", { headers: { Authorization: `Bearer ${token}` } })
    .then(response => response.data)
    .catch(error => console.log(`${error.message}: Login again with valid Credentials`));

export const storeAuthToken = token => {
  localStorage.setItem("AuthToken", token);
  axios.defaults.headers.common["Authorization"] = token;
};
 