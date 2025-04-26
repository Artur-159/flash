import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPost from "../axios/axios-post";
import axiosDelete from "../axios/axios-delete";

export const AuthAPI = Object.freeze({
  login: createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
    try {
      const response = await axiosPost.post("/login", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }),

  logout: createAsyncThunk("auth/logout", async (data, { rejectWithValue }) => {
    try {
      const response = await axiosPost.post("/logout", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }),

  register: createAsyncThunk(
    "auth/register",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axiosPost.post("/register", data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),

  resendEmail: createAsyncThunk(
    "auth/resend-email",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axiosPost.post("/resend/register", data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),

  resendTwoFactorAuthCode: createAsyncThunk(
    "auth/resend-two-auth-code",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axiosPost.post("/resend/login", data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),

  verifyTwoFactorAuthCode: createAsyncThunk(
    "auth/verify-two-auth-code",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axiosPost.post("/verify-2fa", data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),

  resetPassword: createAsyncThunk(
    "auth/reset-password",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axiosPost.post("/password-reset", data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),

  postFcmToken: createAsyncThunk(
    "auth/post-fcm-token",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axiosPost.post("/user/fcm-token", data);
        return response;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),
  deleteFcmToken: createAsyncThunk(
    "auth/delete-fcm-token",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axiosDelete.delete("/user/fcm-token", { data });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),
});
