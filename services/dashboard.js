import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosGet from "../axios/axios-get";

export const DashboardAPI = Object.freeze({
  getAll: createAsyncThunk("get/dashboard", async (_, { rejectWithValue }) => {
    try {
      const response = await axiosGet.get("/user/dashboard");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }),
});
