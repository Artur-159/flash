import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosGet from "../axios/axios-get";

export const ProductsAPI = Object.freeze({
  getAll: createAsyncThunk(
    "get/get-products",
    async (params, { rejectWithValue }) => {
      try {
        const response = await axiosGet.get("products", { params });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),
});
