import axios from "axios";

export const axiosConfig = {
  baseURL: "/api",
  withCredentials: true,
};

const axiosClient = axios.create(axiosConfig);

export default axiosClient;
