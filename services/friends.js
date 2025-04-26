import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosGet from "../axios/axios-get";
import axiosPost from "../axios/axios-post";
import axiosDelete from "../axios/axios-delete";
import axiosPut from "../axios/axios-put";

export const FriendsAPI = Object.freeze({
  getAll: createAsyncThunk(
    "get/get-friends",
    async (params, { rejectWithValue }) => {
      try {
        const response = await axiosGet.get("/user/connections", { params });

        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),

  addFriend: createAsyncThunk(
    "post/send-friend-request",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axiosPost.post("user/friend-requests/send", {
          ...data,
        });

        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),

  getAllFriendRequests: createAsyncThunk(
    "get/get-friend-requests",
    async (type, { rejectWithValue }) => {
      try {
        const response = await axiosGet.get(
          `/user/friend-requests?type=${type}`
        );

        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),

  deleteFriend: createAsyncThunk(
    "delete/delete-friend",
    async (user_relation_id, { rejectWithValue }) => {
      try {
        const response = await axiosDelete.delete("/user/remove-friend", {
          data: { user_relation_id },
        });

        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),

  rejectFriendRequest: createAsyncThunk(
    "delete/reject-friend-request",
    async (user_relation_id, { rejectWithValue }) => {
      try {
        const response = await axiosDelete.delete(
          "/user/friend-requests/reject",
          { data: { user_relation_id } }
        );

        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),

  acceptFriendRequest: createAsyncThunk(
    "accept/accept-friend-request",
    async (user_relation_id, { rejectWithValue }) => {
      try {
        const response = await axiosPut.put("/user/friend-requests/accept", {
          user_relation_id,
        });

        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),

  cancelFriendRequest: createAsyncThunk(
    "cancel/cancel-friend-request",
    async (user_relation_id, { rejectWithValue }) => {
      try {
        const response = await axiosDelete.delete(
          "/user/friend-requests/cancel",
          { data: { user_relation_id } }
        );

        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),
});
