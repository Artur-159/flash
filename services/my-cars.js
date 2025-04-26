import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosGet from "../axios/axios-get";

export const MyCarsAPI = Object.freeze({
  getAll: createAsyncThunk(
    "get/get-all",
    async (params, { rejectWithValue }) => {
      try {
        const response = await axiosGet.get(`user/vehicles`, { params });
        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response ? error.response.data : error.message
        );
      }
    }
  ),
  getOne: createAsyncThunk("get/get-one", async (id, { rejectWithValue }) => {
    try {
      const response = await axiosGet.get(`user/vehicles/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }),
  create: createAsyncThunk("post/create", async (data, { rejectWithValue }) => {
    try {
      const response = await axiosGet.post(`user/vehicles`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }),
  remove: createAsyncThunk("delete/delete", async (id, { rejectWithValue }) => {
    try {
      await axiosGet.delete(`user/vehicles/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }),
  update: createAsyncThunk("put/update", async (data, { rejectWithValue }) => {
    try {
      const response = await axiosGet.put(`user/vehicles/${data.id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }),
});
