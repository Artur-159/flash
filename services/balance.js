import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosGet from "../axios/axios-get";

export const BalanceAPI = Object.freeze({
  getBalances: createAsyncThunk(
    "my-balance",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosGet.get("/user/product-balances");

        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),
  postAddBalance: createAsyncThunk(
    "add-balance",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axiosGet.post("/payment/register", data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),
});
