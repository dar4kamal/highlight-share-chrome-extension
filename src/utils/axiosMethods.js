import axios from "axios";
import axiosRetry from "axios-retry";
import { toast } from "react-toastify";

axiosRetry(axios, { retries: 3 });

const AxiosWrapper = async (apiMethod, args) => {
  try {
    const { data } = await apiMethod.apply(this, args);
    return data;
  } catch (error) {
    toast.error(error.message);
    return;
  }
};

export const defaultGetRequest = async (url) => {
  return await AxiosWrapper(axios.get, [url]);
};
