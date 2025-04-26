import { createSlice } from "@reduxjs/toolkit";
import { MessagesAPI } from "../../services/messages";

const MessagesSlice = createSlice({
  name: "MessagesSlice ",
  initialState: {
    messages: [],
    oneMessage: [],
    total: null,
  },

  extraReducers: (builder) => {
    builder.addCase(MessagesAPI.getAll.fulfilled, (state, action) => {
      const { data, count } = action.payload;
      state.messages = data;
      state.total = count;
    });
  },
});

export default MessagesSlice;
