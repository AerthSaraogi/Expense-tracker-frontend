// // src/services/authService.js
// import API from "./api";

// export const signup = async (userData) => {
//   const res = await API.post("/auth/signup", userData);
//   return res.data;
// };

// export const login = async (credentials) => {
//   const res = await API.post("/auth/login", credentials);
//   const { token, email } = res.data;
//   localStorage.setItem("token", token);
//   localStorage.setItem("username", email);
//   console.log("token:",token);
//   console.log("email:",email);
//   return token;
// };

// export const logout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("username");
// };
// export const addExpense = async (expenseData) => {
//     const res = await API.post("/expenses", expenseData);
//     return res.data;
//   };
  
//   export const getExpenses = async () => {
//     const res = await API.get("/expenses");
//     return res.data;
//   };
  
//   export const deleteExpense = async (id) => {
//     const res = await API.delete(`/expenses/${id}`);
//     return res.data;
//   };

// src/services/service.js
import API from "./api";

export const signup = async (userData) => {
  const res = await API.post("/auth/signup", userData);
  return res.data;
};

export const login = async (credentials) => {
  const res = await API.post("/auth/login", credentials);
  const { token, email } = res.data;
  localStorage.setItem("token", token); 
  localStorage.setItem("username", email);
  return token;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};

export const addExpense = async (expenseData) => {
  const res = await API.post("/expenses/", expenseData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

export const getExpenses = async () => {
  const res = await API.get("/expenses", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

export const deleteExpense = async (id) => {
  const res = await API.delete(`/expenses/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};
