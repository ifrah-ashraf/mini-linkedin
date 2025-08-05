import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true, // Sends HttpOnly cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;