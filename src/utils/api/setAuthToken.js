import ApiClient from "./ApiClient";
import { setItem } from "../handleStorage";

export default (token) => {
  ApiClient.defaults.headers["x-auth-token"] = token;
  setItem("authToken", token);
};
