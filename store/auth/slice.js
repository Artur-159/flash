import { createSlice } from "@reduxjs/toolkit";

import { AuthAPI } from "../../services/auth";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    userType: null,
    accessToken: null,
    refreshToken: null,
    isAuth: null,
    userInfo: JSON.parse(localStorage.getItem("user_info")) || null,
  },
  reducers: {
    setIsAuthenticated: (state, action) => {
      const { accessToken, refreshToken, userType } = action.payload;

      state.isAuth = accessToken && refreshToken && userType ? true : false;
      state.userType = userType;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },

    setUserData: (state, action) => {
      const data = {
        ...state.userInfo,
        ...action.payload,
      };

      state.userInfo = data;

      localStorage.setItem("user_info", JSON.stringify(data));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(AuthAPI.verifyTwoFactorAuthCode.fulfilled, (state, action) => {
        const {
          access_token,
          refresh_token,
          user_type,
          user_full_name,
          user_profile_picture,
          user_id,
        } = action.payload;

        const userInfo = {
          id: user_id,
          fullname: user_full_name,
          profilePicture: user_profile_picture,
        };

        state.userType = user_type;
        state.accessToken = access_token;
        state.refreshToken = refresh_token;
        state.userInfo = userInfo;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("user_type", user_type);
        localStorage.setItem("user_info", JSON.stringify(userInfo));
      })

      .addCase(AuthAPI.logout.fulfilled, (state) => {
        localStorage.clear();
        state.isAuth = null;

        state.userType = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addCase(AuthAPI.postFcmToken.fulfilled, (_, action) => {
        if (action?.payload?.status === 200) {
          localStorage.setItem("fcm_token_send", true);
        }
      });
  },
});

export const { setIsAuthenticated, setUserData } = AuthSlice.actions;

export default AuthSlice;
