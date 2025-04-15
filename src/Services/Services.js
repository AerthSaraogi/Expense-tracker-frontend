// src/services/authService.js
import API from "./api";

export const signup = async (userData) => {
  const res = await API.post("/signup", userData);
  return res.data;
};

export const login = async (credentials) => {
  const res = await API.post("/login", credentials);
  const { token, username } = res.data;
  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
  return username;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};
export const addExpense = async (expenseData) => {
    const res = await API.post("/expenses", expenseData);
    return res.data;
  };
  
  export const getExpenses = async () => {
    const res = await API.get("/expenses");
    return res.data;
  };
  
  export const deleteExpense = async (id) => {
    const res = await API.delete(`/expenses/${id}`);
    return res.data;
  };