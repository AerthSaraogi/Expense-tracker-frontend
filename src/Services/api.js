// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // Replace with your production backend URL when deploying
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically add Authorization header if token is available
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
