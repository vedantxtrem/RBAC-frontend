import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/v1/";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;