import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosGet from "../axios/axios-get";
import axiosPatch from "../axios/axios-patch";

export const ProfileAPI = Object.freeze({
  getUserData: createAsyncThunk(
    "profile/me",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosGet.get("/user/me");

        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),

  updateUserData: createAsyncThunk(
    "profile/change-user-data",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axiosPatch.patch(
          "/user/change-user-details",
          data
        );

        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),

  updateProfilePicture: createAsyncThunk(
    "profile/change-user-picture",
    async (file, { rejectWithValue }) => {
      try {
        const formData = new FormData();
        formData.append("profile_picture", file);

        const response = await axiosPatch.patch(
          "/user/change-profile-picture",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),

  updatePassword: createAsyncThunk(
    "profile/change-password",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axiosPatch.patch("/user/change-password", data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),

  updateEmail: createAsyncThunk(
    "profile/change-email",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axiosPatch.patch("/user/change-email", data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),
  updateNewsletter: createAsyncThunk(
    "profile/newsletter",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axiosPatch.patch("/user/newsletter", data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  ),
});
