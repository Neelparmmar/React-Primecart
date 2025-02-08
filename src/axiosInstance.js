import axios from "axios";

const API_TOKEN = process.env.REACT_APP_API_TOKEN;

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export default axiosInstance;
