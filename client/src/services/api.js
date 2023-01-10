import axios from "axios";
const { REACT_APP_SERVER_POINT } = process.env;

export const api = axios.create({
  baseURL: REACT_APP_SERVER_POINT,
});

export const authHeaders = {
  headers: { Authorization: `Bearer ${localStorage.getItem("AuthToken")}` },
}; // for server side security
