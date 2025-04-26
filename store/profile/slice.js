import { createSlice } from "@reduxjs/toolkit";

import { ProfileAPI } from "../../services/profile";

const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    userData: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(ProfileAPI.getUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
  },
});

export const { setUserData } = ProfileSlice.actions;

export default ProfileSlice;
