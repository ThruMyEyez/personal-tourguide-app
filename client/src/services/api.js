import axios from "axios";
const { REACT_APP_SERVER_POINT } = process.env;

const api = axios.create({
  baseURL: REACT_APP_SERVER_POINT,
});

export default api;
