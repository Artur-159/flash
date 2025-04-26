import axiosPost from "../axios/axios-post";
import { handleError } from "./handle-error";

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    const body = {
      refresh_token: refreshToken,
    };
    const response = await axiosPost.post("/token-refresh", body);

    const { access_token } = response.data;
    localStorage.setItem("access_token", access_token);

    console.log("Token refreshed successfully");

    return access_token;
  } catch (error) {
    handleError(error);
  }
};
