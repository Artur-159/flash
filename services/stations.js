import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosGet from "../axios/axios-get";

export const StationsAPI = Object.freeze({
  getAll: createAsyncThunk(
    "stations/get-all",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosGet.get("stations");
        return response;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),
});
