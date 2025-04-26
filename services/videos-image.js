import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPost from "../axios/axios-post";

export const VideoImageAPI = Object.freeze({
  postMedia: createAsyncThunk("post/upload-image", async (data) => {
    try {
      const response = await axiosPost.post("/upload-images", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),
});
