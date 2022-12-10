import api from "./api";
import { isExpired, decodeToken } from "react-jwt";
//import { useJwt } from "react-jwt";

const authToken = localStorage.getItem("AuthToken");
console.log(authToken);

//const { decodedToken, isExpired, reEvaluateToken } = useJwt(authToken);
export const createNewUser = data =>
  api
    .post("/authentication/sign-up", data, { withCredentials: true })
    .then(response => response.data)
    .catch(error => console.log(error.message));

export const signIn = data =>
  api
    .post("/authentication/sign-in", data, { withCredentials: true })
    .then(response => response.data)
    .catch(error => console.log(error.message));

export const headerAuthToken = {
  headers: { "auth-token": authToken },
};

export const checkToken = () =>
  api
    .get("/authentication/checkToken", headerAuthToken, { withCredentials: true })
    .then(response => response.data)
    .catch(error => console.log(error.message));

export const encryptedToken = decodeToken(authToken);
export const isTokenExpired = isExpired(authToken);

/*
export const updateToken = newToken => {
  reEvaluateToken(newToken);
};*/

export const authRoute = () =>
  api
    .get("/authentication/me", headerAuthToken, { withCredentials: true })
    .then(response => response.data)
    .catch(error => console.log(error.message));
