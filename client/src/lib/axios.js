import axios from 'axios';

// Base Axios instance for Node.js backend
export const axiosInstance  = axios.create({
  baseURL: 'http://localhost:5001/api', // ✅ change this to your backend URL in production
  withCredentials: true,                // ✅ includes cookies for auth
});

