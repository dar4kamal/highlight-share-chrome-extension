import axios from "axios";
import axiosRetry from "axios-retry";

const ApiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  validateStatus: () => true,
});

axiosRetry(ApiClient, { retries: 3 });

export default ApiClient;
