import axios from "axios";
const { REACT_APP_SERVER_POINT, REACT_APP_STRIPE_PRIVATE_KEY } = process.env;

export const api = axios.create({
  baseURL: REACT_APP_SERVER_POINT,
});

export const stripeHeaders = {
  headers: {
    Authorization: `Bearer ${REACT_APP_STRIPE_PRIVATE_KEY}`,
  },
};

export const authHeaders = {
  headers: { Authorization: `Bearer ${localStorage.getItem("AuthToken")}` },
}; // for server side security
