import { createSlice } from "@reduxjs/toolkit";
import { FriendsAPI } from "../../services/friends";

const Friends = createSlice({
  name: "Friends slice",
  initialState: {
    friends: [],
    count: null,
    incoming_requests: null,
    outgoing_requests: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FriendsAPI.getAll.fulfilled, (state, action) => {
        const { data, count } = action.payload;

        state.friends = data;
        state.count = count;
      })

      .addCase(FriendsAPI.getAllFriendRequests.fulfilled, (state, action) => {
        const { incoming_requests, outgoing_requests } = action.payload;

        state.incoming_requests = incoming_requests;
        state.outgoing_requests = outgoing_requests;
      });
  },
});

export const { setProducts } = Friends.actions;

export default Friends;
