import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASEURL;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

// Dynamically attach token per request so it always reflects current auth state
userRequest.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = user && JSON.parse(user).currentUser;
  const token = currentUser?.accessToken;
  if (token) {
    config.headers["token"] = `Bearer ${token}`;
  }
  return config;
});
