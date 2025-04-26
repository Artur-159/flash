import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPost from "../axios/axios-post";

export const FileAPI = Object.freeze({
  postUploadFiles: createAsyncThunk("post/upload-file", async (data) => {
    try {
      const response = await axiosPost.post("/upload-files", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }),
});
