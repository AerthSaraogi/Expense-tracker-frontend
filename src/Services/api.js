// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://127.0.0.1:5000",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true, // 🚀 Important for cookies/auth headers
// });

// API.interceptors.request.use(
//   (req) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       req.headers.Authorization = `Bearer ${token}`;
//     }
//     return req;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default API;


import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export default API;
