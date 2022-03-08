import { toast } from "react-toastify";

import ApiClient from "./ApiClient";

export const apiGetRequest = async (url, params) => {
  return await ApiMethodWrapper(ApiClient.get, [`/${url}`, { params }]);
};

export const apiPostRequest = async (url, body) => {
  return await ApiMethodWrapper(ApiClient.post, [`/${url}`, body]);
};

export const apiPatchRequest = async (url, body) => {
  return await ApiMethodWrapper(ApiClient.patch, [`/${url}`, body]);
};

export const apiDeleteRequest = async (url, params) => {
  return await ApiMethodWrapper(ApiClient.patch, [`/${url}`, { params }]);
};

export const ApiMethodWrapper = async (apiMethod, args) => {
  try {
    const response = await apiMethod.apply(this, args);
    const {
      data: { result, errors },
    } = response;

    if (errors.length > 0) {
      errors.forEach((err) =>
        toast.error(err.message, {
          bodyClassName: "text-red-500",
          className: "text-base",
        })
      );
    }
    return result;
  } catch (error) {
    toast.error(error.message);
    return;
  }
};
