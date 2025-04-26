import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosGet from "../axios/axios-get";

export const TransactionAPI = Object.freeze({
  getAll: createAsyncThunk(
    "get/get-all",
    async (params, { rejectWithValue }) => {
      try {
        const response = await axiosGet.get("user/transactions", { params });
        return response;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),
  getOne: createAsyncThunk("get/get-one", async (id, { rejectWithValue }) => {
    try {
      const response = await axiosGet.get(`user/transactions/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }),

  getTypes: createAsyncThunk(
    "get/get-transaction-types",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosGet.get(`transaction-types`);
        return response;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),

  getStatusInfo: createAsyncThunk(
    "get/get-status-info",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosGet.get(`transaction-statuses`);
        return response;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),
});
