import axios from "axios";

// Use environment variable for API base URL
const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = (data) => axios.post(`${API_URL}/users/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/users/login`, data);
export const fetchMedicines = () => axios.get(`${API_URL}/medicines`);
export const placeOrder = (data) => axios.post(`${API_URL}/orders`, data);
export const getUserOrders = (userId) => axios.get(`${API_URL}/orders/${userId}`);
