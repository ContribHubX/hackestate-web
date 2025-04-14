import Axios from "axios";

export const api = Axios.create({
    //  baseURL: "http://localhost:3000",
    // baseURL: "https://xdkbcbc8-5000.asse.devtunnels.ms",
    baseURL: "http://127.0.0.1:5000",
    withCredentials: true
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage (or sessionStorage)
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
