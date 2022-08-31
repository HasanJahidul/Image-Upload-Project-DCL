import axios from "axios";
import { baseApiUrl } from "../consts";
import { getAccessToken } from "../utils/AuthUtils";
export const authService = axios.create({
  baseURL: `${baseApiUrl}`,
});
export const jsxService = (token: string = getAccessToken()) =>
  axios.create({
    baseURL: `${baseApiUrl}`,
    headers: {
      AUTHORIZATION: token,
    },
  });
