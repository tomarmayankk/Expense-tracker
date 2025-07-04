import axios from 'axios';

// Base Axios instance for Node.js backend
export const axiosInstance  = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
  withCredentials: true,                
});

