import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosGet from "../axios/axios-get";
import axiosPatch from "../axios/axios-patch";

export const MessagesAPI = Object.freeze({
  getAll: createAsyncThunk(
    "get/notifications-all",
    async (params, { rejectWithValue }) => {
      try {
        const response = await axiosGet.get(`user/notifications`, { params });
        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response ? error.response.data : error.message
        );
      }
    }
  ),

  remove: createAsyncThunk(
    "remove/notifications-remove",
    async (id, { rejectWithValue }) => {
      try {
        await axiosGet.delete(`user/notifications/${id}`);
        return id;
      } catch (error) {
        return rejectWithValue(
          error.response ? error.response.data : error.message
        );
      }
    }
  ),

  notificationIsRead: createAsyncThunk(
    "mark-as-read/notification-mark-as-read",
    async (id, { rejectWithValue }) => {
      try {
        await axiosPatch.patch(`user/notifications/read/${id}`);
      } catch (error) {
        return rejectWithValue(
          error.response ? error.response.data : error.message
        );
      }
    }
  ),
});
